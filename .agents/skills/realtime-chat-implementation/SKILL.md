---
name: realtime-chat-implementation
description: "Use quando a tarefa implementar comportamento realtime de chat ou mensagens: SSE, WebSockets, streaming, optimistic updates, ordenação, retry, loading states ou persistência de mensagens."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "development"
  complexity: 6
  status: active
  tags:
    - chat
    - realtime
    - streaming
    - sse
    - websockets
    - optimistic-updates
    - react
---

# Real-time Chat Implementation

Guia completo para implementar chat em tempo real com streaming de respostas, SSE e optimistic updates.

## Objetivo

Fornecer streaming patterns (SSE vs WebSockets), optimistic updates para UX, message persistence correto, loading states e indicadores, error handling (timeout, network), retry logic robusto, message ordering garantido.

## Use this skill when

- Implementar transporte realtime para chat/mensagens com SSE ou WebSockets
- Adicionar streaming incremental de respostas, inclusive AI responses
- Projetar optimistic updates, estados de envio, retry/backoff ou timeout
- Garantir ordenação, persistência e reconciliação de mensagens
- Corrigir bugs de rede, duplicação ou perda de mensagens em conversa

## Do not use this skill when

- A tarefa é request/response simples sem streaming, SSE ou WebSocket
- O problema é apenas prompt/modelo/LLM sem UI ou transporte realtime
- O foco é `@ai-sdk/react`/`useChat`; use `ai-sdk-ui-chat`
- Batch processing, jobs assíncronos ou notificações não conversacionais
- A mudança é apenas schema, auth, billing ou deploy sem impacto realtime

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Endpoint SSE ou WebSocket configurado
- Client-side hook para streaming
- Optimistic updates implementados
- Loading states e indicadores
- Error handling com timeout e retry
- Message persistence após streaming
- Message ordering garantido

## Procedure

### 1. Escolher transporte

Use SSE para streaming unidirecional (AI chat responses). Use WebSockets apenas para comunicação bidirecional necessária.

### 2. Implementar endpoint SSE

Crie endpoint com autenticação e validação:

```typescript
export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) return new Response('Unauthorized', { status: 401 })

  const body = await req.json()
  const parsed = streamSchema.safeParse(body)
  if (!parsed.success) return new Response('Invalid input', { status: 400 })

  // Verificar ownership
  const conversation = await db.select().from(conversations)
    .where(and(eq(conversations.id, conversationId), eq(conversations.userId, session.user.id)))
    .limit(1)
  if (!conversation[0]) return new Response('Not found', { status: 404 })

  // Stream
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of aiResponse) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`))
      }
      controller.close()
    },
  })

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
  })
}
```

### 3. Implementar client-side hook

Crie hook com optimistic updates:

```typescript
const sendMessage = async (content: string) => {
  const userMessage = { id: `temp-${Date.now()}`, role: 'user', content }
  setMessages((prev) => [...prev, userMessage])

  try {
    const response = await fetch('/api/chat/stream', {
      method: 'POST',
      body: JSON.stringify({ content, conversationId }),
    })
    // Process stream
  } catch (err) {
    setMessages((prev) => prev.filter((m) => m.id !== userMessage.id))
  }
}
```

### 4. Implementar error handling

Adicione timeout e retry com backoff:

```typescript
const sendMessageWithTimeout = async (content: string, timeout = 30000) => {
  const controller = new AbortController()
  setTimeout(() => controller.abort(), timeout)
  try {
    return await fetch('/api/chat/stream', { signal: controller.signal })
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('Timeout')
    throw error
  }
}
```

### 5. Persistir mensagens após streaming

Salve mensagens apenas após sucesso:

```typescript
for await (const chunk of aiStream) {
  // Stream chunks
}
await db.insert(messages).values({
  conversationId,
  role: 'assistant',
  content: fullResponse,
})
```

### 6. Garantir ordenação de mensagens

Use timestamp-based ordering:

```typescript
const sortedMessages = messages.sort((a, b) =>
  a.createdAt.getTime() - b.createdAt.getTime()
)
```

## Verification

- Endpoint SSE está configurado com headers corretos
- Autenticação e ownership check estão implementados
- Optimistic updates funcionam e rollback em erro
- Timeout e retry estão configurados
- Mensagens são persistidas apenas após sucesso
- Message ordering é garantido
- Loading states são visíveis

> **Skill log**
> - [2026-05-11] Skill criada com padrões de implementação de chat realtime.
> - [2026-05-11] Stage 6 (Batch 6) adicionou seções operacionais faltantes e removeu emoji de heading Objetivo.
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/` com arquivos divididos por especialidade.

## References

Conteúdo referencial detalhado, patterns e exemplos estão disponíveis em:
- `references/transport.md` - Transport options (SSE vs WebSockets), quick reference
- `references/streaming.md` - Server-side streaming implementation
- `references/client.md` - Client-side hook e chat component
- `references/optimistic.md` - Optimistic updates patterns
- `references/error-handling.md` - Timeout, retry logic, error handling
