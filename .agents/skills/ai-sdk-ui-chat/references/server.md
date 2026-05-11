# AI SDK UI — Server Implementation

Conteúdo referencial de implementação server-side para ai-sdk-ui-chat.

### Route Handler (Server)

```typescript
// app/api/chat/route.ts (thin wrapper — delega para feature service)
import { NextRequest } from 'next/server'
import { auth } from '@/core/auth'
import { handleChatStream } from '@/features/chat/service/handle-chat-stream'

export const maxDuration = 30

export async function POST(req: NextRequest) {
  // 1. Autenticar
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  // 2. Delegar para service
  return handleChatStream(req, session)
}
```

### Feature Service

```typescript
// features/chat/service/handle-chat-stream.ts
import {
  convertToModelMessages,
  streamText,
  UIMessage,
  validateUIMessages,
} from 'ai'
import { z } from 'zod'
import { db } from '@/core/db'
import { conversations, messages as messagesTable } from '@/core/db/schema'
import { eq, and } from 'drizzle-orm'
import { hasCredits, debitCredits } from '@/features/credits/service/debit-credits'
import { rateLimit } from '@/core/rate-limit'
import { getModel } from '@/features/chat/service/get-model'

const chatRequestSchema = z.object({
  messages: z.array(z.any()).min(1),
  chatId: z.string().min(1).max(100),
})

export async function handleChatStream(req: Request, session: any) {
  // 1. Validar input
  const body = await req.json()
  const parsed = chatRequestSchema.safeParse(body)
  if (!parsed.success) {
    return new Response('Invalid input', { status: 400 })
  }

  const { messages, chatId } = parsed.data

  // 2. Rate limiting
  const limit = rateLimit(`chat:${session.user.id}`, {
    windowMs: 60_000,
    maxRequests: 20,
  })
  if (!limit.success) {
    return new Response('Too many requests', { status: 429 })
  }

  // 3. Verificar ownership da conversa (prevenir IDOR)
  const conversation = await db
    .select()
    .from(conversations)
    .where(
      and(
        eq(conversations.id, chatId),
        eq(conversations.userId, session.user.id)
      )
    )
    .limit(1)

  if (!conversation[0]) {
    return new Response('Conversation not found', { status: 404 })
  }

  // 4. Verificar créditos (sem debitar ainda)
  const hasBal = await hasCredits(session.user.id, 1)
  if (!hasBal) {
    return new Response('Insufficient credits', { status: 402 })
  }

  // 5. Validar messages (importante para tools/metadata)
  const validatedMessages = await validateUIMessages({
    messages: messages as UIMessage[],
  })

  // 6. Stream com AI SDK
  const model = getModel(conversation[0].templateId)

  const result = streamText({
    model,
    system: conversation[0].systemPrompt || 'You are a helpful assistant.',
    messages: await convertToModelMessages(validatedMessages),
  })

  // 7. Consumir stream para garantir persistência mesmo com disconnect
  result.consumeStream()

  // 8. Retornar stream com persistência
  return result.toUIMessageStreamResponse({
    originalMessages: validatedMessages,
    onFinish: async ({ messages: allMessages }) => {
      // ✅ Debitar crédito SOMENTE após sucesso
      await debitCredits(session.user.id, 1, 'message_sent', {
        conversationId: chatId,
      })

      // ✅ Persistir mensagens
      await saveMessages(chatId, allMessages)
    },
    // ⚠️ Nunca expor erro interno ao client
    onError: (error) => {
      console.error('Stream error:', error)
      return 'An error occurred.'
    },
  })
}
```
