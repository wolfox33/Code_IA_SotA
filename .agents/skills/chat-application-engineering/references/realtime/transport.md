# Real-time Chat — Transport Options

Conteúdo referencial de opções de transporte para chat-application-engineering.

## Instructions

1. **Choose transport**: SSE vs WebSockets
2. **Implement streaming**: Server-side streaming
3. **Client implementation**: React hooks para SSE
4. **Optimistic updates**: Update UI before server confirms
5. **Persistence**: Save messages após streaming
6. **Error handling**: Timeout, network errors, retry
7. **Loading states**: Typing indicators, skeleton
8. **Message ordering**: Timestamp-based ordering

## Safety

- **VALIDAR** user input antes de enviar
- **SANITIZAR** AI output antes de exibir
- **IMPLEMENTAR** rate limiting
- **USAR** timeouts para prevenir hanging
- **PERSISTIR** messages apenas após sucesso
- **LOG** errors para debugging
- **IMPLEMENTAR** retry com backoff

## 📚 Quick Reference

### SSE Endpoint (Next.js)

```typescript
// app/api/chat/stream/route.ts
import { NextRequest } from 'next/server'
import { auth } from '@/core/auth'
import { z } from 'zod'

const streamSchema = z.object({
  content: z.string().min(1).max(10000),
  conversationId: z.number().int().positive(),
})

export async function POST(req: NextRequest) {
  // 1. Autenticar
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  // 2. Validar input
  const body = await req.json()
  const result = streamSchema.safeParse(body)
  if (!result.success) {
    return new Response('Invalid input', { status: 400 })
  }

  const { content, conversationId } = result.data

  // 3. Verificar ownership da conversa
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

  // 4. Stream response
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of aiResponse) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`)
          )
        }
        controller.close()
      } catch (error) {
        controller.error(error)
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
```

### React Hook

```typescript
const { messages, sendMessage, isLoading } = useChat({
  api: '/api/chat/stream',
})
```

## 🔄 Transport Options

### SSE (Server-Sent Events)

**Quando usar**:
- Streaming unidirecional (server → client)
- AI chat responses
- Simpler setup
- HTTP/2 friendly

**Vantagens**:
- ✅ Automatic reconnection
- ✅ Built-in event IDs
- ✅ Works through HTTP
- ✅ Simple protocol

**Desvantagens**:
- ❌ Unidirecional apenas
- ❌ Max 6 connections (HTTP/1.1)
- ❌ No binary data (text only)

```typescript
// Client
const eventSource = new EventSource('/api/stream')
eventSource.onmessage = (event) => {
  console.log(event.data)
}
```

### WebSockets

**Quando usar**:
- Bidirecional communication
- Low latency required
- Binary data
- Multiplayer features

**Vantagens**:
- ✅ Full duplex
- ✅ Binary support
- ✅ Low latency
- ✅ No connection limit

**Desvantagens**:
- ❌ More complex
- ❌ Requires WebSocket server
- ❌ Manual reconnection

```typescript
// Client
const ws = new WebSocket('ws://localhost:3000')
ws.onmessage = (event) => {
  console.log(event.data)
}
```

**Recomendação para Chat AI**: **SSE** (mais simples, suficiente para streaming de respostas)
