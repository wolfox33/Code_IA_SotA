---
name: ai-sdk-ui-chat
description: "Use somente quando a tarefa envolver interface React de chat com Vercel AI SDK UI (`@ai-sdk/react`), especialmente `useChat`, streaming de mensagens, tool calling no client ou persistência de UIMessage em Next.js."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "development"
  complexity: 6
  tags:
    - ai-sdk
    - useChat
    - streaming
    - chat-ui
    - react
    - nextjs
    - vercel-ai
---

# AI SDK UI for Chat Applications

Guia completo para construir interfaces de chat usando Vercel AI SDK UI (`@ai-sdk/react`), alinhado com arquitetura vertical-slice e boas práticas de segurança.

## Objetivo

Fornecer useChat hook para streaming de mensagens em tempo real, useCompletion para text completions, useObject para streaming de objetos JSON, persistência de mensagens com Drizzle + PostgreSQL, segurança integrada (auth, validation, ownership, credits), error handling robusto com retry e fallback, tool calling com type safety.

## Use this skill when

- Criar ou alterar uma interface React de chat baseada em `@ai-sdk/react`
- Implementar `useChat`, `useCompletion`, `useObject` ou UIMessage
- Integrar streaming de AI com Next.js App Router no lado da UI
- Implementar tool calling visível na interface do chat
- Persistir mensagens de chat no formato esperado pelo AI SDK UI
- Migrar uma UI de chat manual para os hooks do Vercel AI SDK UI

## Do not use this skill when

- Apenas porque a tarefa menciona LLM, prompt, agente ou backend de IA
- Para operações one-shot sem UI de chat ou sem streaming
- Para backends não-JavaScript sem client React usando `@ai-sdk/react`
- Para chat sem AI ou mensagens em tempo real genéricas; use padrões de realtime/SSE
- Para cobrança, créditos ou autenticação isolados sem impacto direto na UI do chat

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Componente React com `useChat` configurado corretamente
- Route Handler com autenticação e validação
- Service com streaming, ownership check e verificação de créditos
- Persistência de mensagens com Drizzle
- Tool calling implementado se aplicável
- Error handling genérico no client

## Procedure

### 1. Configurar stack

Instale os pacotes necessários:

```bash
bun add ai @ai-sdk/react @ai-sdk/openai
# ou para Anthropic:
bun add ai @ai-sdk/react @ai-sdk/anthropic
```

### 2. Criar componente com useChat

Implemente o componente client com `useChat`:

```typescript
'use client'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useState } from 'react'

export function ChatInterface({ chatId, initialMessages }) {
  const { messages, sendMessage, status, stop, error, regenerate } = useChat({
    chatId,
    initialMessages,
    transport: new DefaultChatTransport({
      api: '/api/chat',
      credentials: 'include',
    }),
    onError: (error) => {
      console.error('Chat error:', error.message)
    },
  })
  const [input, setInput] = useState('')
  // ... render
}
```

### 3. Implementar Route Handler com autenticação

Crie o endpoint com auth e delegação para service:

```typescript
export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }
  return handleChatStream(req, session)
}
```

### 4. Implementar service com segurança

Adicione validação, ownership check, rate limiting e verificação de créditos:

```typescript
export async function handleChatStream(req: Request, session: any) {
  const body = await req.json()
  const parsed = chatRequestSchema.safeParse(body)
  if (!parsed.success) {
    return new Response('Invalid input', { status: 400 })
  }

  // Rate limiting
  const limit = rateLimit(`chat:${session.user.id}`, {
    windowMs: 60_000,
    maxRequests: 20,
  })
  if (!limit.success) {
    return new Response('Too many requests', { status: 429 })
  }

  // Ownership check
  const conversation = await db.select().from(conversations)
    .where(and(eq(conversations.id, chatId), eq(conversations.userId, session.user.id)))
    .limit(1)
  if (!conversation[0]) {
    return new Response('Conversation not found', { status: 404 })
  }

  // Verificar créditos
  const hasBal = await hasCredits(session.user.id, 1)
  if (!hasBal) {
    return new Response('Insufficient credits', { status: 402 })
  }

  // Validar messages
  const validatedMessages = await validateUIMessages({
    messages: messages as UIMessage[],
  })

  // Stream
  const result = streamText({
    model,
    messages: await convertToModelMessages(validatedMessages),
  })

  result.consumeStream()

  return result.toUIMessageStreamResponse({
    originalMessages: validatedMessages,
    onFinish: async ({ messages: allMessages }) => {
      await debitCredits(session.user.id, 1, 'message_sent', { conversationId: chatId })
      await saveMessages(chatId, allMessages)
    },
    onError: (error) => {
      console.error('Stream error:', error)
      return 'An error occurred.'
    },
  })
}
```

### 5. Adicionar tool calling se necessário

Implemente tools com type safety:

```typescript
const result = streamText({
  model,
  messages: await convertToModelMessages(messages),
  tools: {
    searchKnowledge: {
      description: 'Search the knowledge base',
      inputSchema: z.object({ query: z.string() }),
      execute: async ({ query }) => {
        return searchKnowledgeBase(query, session.user.id)
      },
    },
  },
})
```

### 6. Implementar persistência de mensagens

Use `consumeStream()` e `onFinish` para garantir persistência:

```typescript
result.consumeStream()

return result.toUIMessageStreamResponse({
  originalMessages: validatedMessages,
  onFinish: async ({ messages }) => {
    await saveMessages(chatId, messages)
  },
})
```

## Verification

- Componente usa `useChat` com `DefaultChatTransport`
- Route Handler autentica com `auth.api.getSession`
- Service verifica ownership da conversa
- Rate limiting está configurado
- Créditos são verificados antes do streaming
- Créditos são debitados após sucesso
- `consumeStream()` é chamado antes de retornar
- Error messages são genéricos no client

> **Skill log**
> - [2026-05-11] Skill criada com padrões de AI SDK UI para aplicações de chat.
> - [2026-05-11] Stage 6 (Batch 5) adicionou seções operacionais faltantes e removeu emojis de headings para validador reconhecer seções.
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/` com arquivos divididos por especialidade.

## References

Conteúdo referencial detalhado, setup, implementação e patterns estão disponíveis em:
- `references/setup.md` - Stack, instalação, configuração, safety guidelines
- `references/client.md` - Client component (useChat)
- `references/server.md` - Route handler e feature service
- `references/patterns.md` - Patterns (tool calling, usage tracking, reasoning, etc.)
- `references/security.md` - Security checklist e common gotchas
