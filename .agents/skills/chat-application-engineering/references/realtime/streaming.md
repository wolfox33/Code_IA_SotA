# Real-time Chat — Server-Side Streaming

Conteúdo referencial de implementação de streaming no servidor para chat-application-engineering.

## 🚀 Implementation

### Server-Side Streaming

```typescript
// app/api/chat/stream/route.ts
import { NextRequest } from 'next/server'
import { streamResponse } from '@/features/chat/service/stream-response'
import { auth } from '@/core/auth'
import { z } from 'zod'

const streamSchema = z.object({
  content: z.string().min(1).max(10000),
  conversationId: z.number().int().positive(),
  templateId: z.number().int().positive().optional(),
})

export async function POST(req: NextRequest) {
  // 1. Authenticate
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  // 2. Validate input
  const body = await req.json()
  const parsed = streamSchema.safeParse(body)
  if (!parsed.success) {
    return new Response('Invalid input', { status: 400 })
  }

  const { content, conversationId, templateId } = parsed.data

  // 3. Verify conversation ownership (prevent IDOR)
  const conversation = await db
    .select()
    .from(conversations)
    .where(
      and(
        eq(conversations.id, conversationId),
        eq(conversations.userId, session.user.id)
      )
    )
    .limit(1)

  if (!conversation[0]) {
    return new Response('Conversation not found', { status: 404 })
  }

  // 4. Get AI stream
  const aiStream = await streamResponse({
    userId: session.user.id,
    conversationId,
    templateId,
    content,
  })

  // Convert to SSE
  const encoder = new TextEncoder()

  const readable = new ReadableStream({
    async start(controller) {
      try {
        let fullResponse = ''

        for await (const chunk of aiStream) {
          const messages = chunk.messages
          const lastMessage = messages[messages.length - 1]

          if (lastMessage && lastMessage._getType() === 'ai') {
            fullResponse = lastMessage.content as string

            // Send chunk
            const data = JSON.stringify({
              content: fullResponse,
              done: false,
            })

            controller.enqueue(encoder.encode(`data: ${data}\n\n`))
          }
        }

        // Persist message após streaming completo
        await db.insert(messages).values({
          conversationId,
          role: 'assistant',
          content: fullResponse,
        })

        // Send done event
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ content: fullResponse, done: true })}\n\n`
          )
        )

        controller.close()
      } catch (error) {
        console.error('Stream error:', error)

        // Send error event
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ error: 'Failed to stream response', done: true })}\n\n`
          )
        )

        controller.close()
      }
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable nginx buffering
    },
  })
}
```
