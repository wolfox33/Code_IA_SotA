# AI SDK UI — Patterns

Conteúdo referencial de patterns para chat-application-engineering.

## 🚀 Patterns

### Pattern 1: Enviar apenas última mensagem (otimização)

```typescript
// features/chat/components/ChatInterface.tsx
'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'

export function ChatInterface({ chatId, initialMessages }) {
  const chat = useChat({
    chatId,
    initialMessages,
    transport: new DefaultChatTransport({
      api: '/api/chat',
      credentials: 'include',
      // Enviar apenas a última mensagem (server carrega histórico)
      prepareSendMessagesRequest({ messages, id }) {
        return {
          body: {
            message: messages[messages.length - 1],
            chatId: id,
          },
        }
      },
    }),
  })

  // ... render
}
```

```typescript
// features/chat/service/handle-chat-stream.ts (variante last-message)
import {
  convertToModelMessages,
  streamText,
  UIMessage,
  validateUIMessages,
} from 'ai'

export async function handleChatStreamLastMessage(req: Request, session: any) {
  const { message, chatId } = await req.json()

  // ... auth, ownership, rate limit checks ...

  // Carregar mensagens anteriores do DB
  const previousMessages = await loadMessages(chatId)

  // Validar todas as mensagens
  const validatedMessages = await validateUIMessages({
    messages: [...previousMessages, message],
  })

  const result = streamText({
    model,
    messages: await convertToModelMessages(validatedMessages),
  })

  result.consumeStream()

  return result.toUIMessageStreamResponse({
    originalMessages: validatedMessages,
    onFinish: async ({ messages }) => {
      await debitCredits(session.user.id, 1, 'message_sent', { conversationId: chatId })
      await saveMessages(chatId, messages)
    },
  })
}
```

### Pattern 2: Tool Calling

```typescript
// app/api/chat/route.ts (com tools)
import { convertToModelMessages, streamText, UIMessage } from 'ai'
import { auth } from '@/core/auth'
import { z } from 'zod'

export const maxDuration = 30

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model,
    messages: await convertToModelMessages(messages),
    tools: {
      // Server-side tool (executa automaticamente no server)
      searchKnowledge: {
        description: 'Search the knowledge base for relevant information',
        inputSchema: z.object({
          query: z.string().describe('Search query'),
        }),
        execute: async ({ query }) => {
          // ✅ Usar userId do session, não do client
          return searchKnowledgeBase(query, session.user.id)
        },
      },
      // Client-side tool (sem execute — UI renderiza)
      askConfirmation: {
        description: 'Ask the user for confirmation',
        inputSchema: z.object({
          message: z.string().describe('Confirmation message'),
        }),
      },
    },
  })

  return result.toUIMessageStreamResponse()
}
```

```typescript
// features/chat/components/ChatWithTools.tsx
'use client'

import { useChat } from '@ai-sdk/react'
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
} from 'ai'
import { useState } from 'react'

export function ChatWithTools({ chatId }) {
  const {
    messages,
    sendMessage,
    addToolOutput,
    status,
  } = useChat({
    chatId,
    transport: new DefaultChatTransport({
      api: '/api/chat',
      credentials: 'include',
    }),
    // Auto-submit quando todos os tool results estiverem disponíveis
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    // Executar client-side tools automaticamente
    onToolCall({ toolCall }) {
      if (toolCall.dynamic) return

      if (toolCall.toolName === 'getLocation') {
        addToolOutput({ toolCallId: toolCall.toolCallId, output: 'São Paulo' })
      }
    },
  })
  const [input, setInput] = useState('')

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          {message.parts.map((part, index) => {
            if (part.type === 'text') {
              return <p key={index}>{part.text}</p>
            }
            // Renderizar tool calls client-side
            if (part.type === 'tool-askConfirmation') {
              return (
                <div key={index} className="border p-4 rounded">
                  <p>{part.toolInvocation.input.message}</p>
                  {'output' in part.toolInvocation ? (
                    <span>{part.toolInvocation.output}</span>
                  ) : (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() =>
                          addToolOutput({
                            toolCallId: part.toolInvocation.toolCallId,
                            output: 'confirmed',
                          })
                        }
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() =>
                          addToolOutput({
                            toolCallId: part.toolInvocation.toolCallId,
                            output: 'denied',
                          })
                        }
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              )
            }
            return null
          })}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (input.trim()) {
            sendMessage({ text: input })
            setInput('')
          }
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={status !== 'ready'}
        />
      </form>
    </div>
  )
}
```

### Pattern 3: Usage Tracking com Metadata

```typescript
// features/chat/service/handle-chat-stream.ts (com usage tracking)
import { LanguageModelUsage } from 'ai'

type ChatMetadata = {
  totalUsage: LanguageModelUsage
}

export type ChatUIMessage = UIMessage<ChatMetadata>

// No route handler:
return result.toUIMessageStreamResponse({
  originalMessages: validatedMessages,
  messageMetadata: ({ part }) => {
    if (part.type === 'finish') {
      return { totalUsage: part.totalUsage }
    }
  },
  onFinish: async ({ messages }) => {
    // Persistir usage para billing
    const lastMessage = messages[messages.length - 1]
    const usage = lastMessage.metadata?.totalUsage
    if (usage) {
      await db.insert(usageLog).values({
        userId: session.user.id,
        conversationId: chatId,
        inputTokens: usage.promptTokens,
        outputTokens: usage.completionTokens,
        totalTokens: usage.totalTokens,
      })
    }

    await debitCredits(session.user.id, 1, 'message_sent', {
      conversationId: chatId,
    })
    await saveMessages(chatId, messages)
  },
})
```

```typescript
// features/chat/components/ChatInterface.tsx (exibir usage)
'use client'

import { useChat } from '@ai-sdk/react'
import type { ChatUIMessage } from '@/features/chat/service/handle-chat-stream'

const { messages } = useChat<ChatUIMessage>({
  transport: new DefaultChatTransport({
    api: '/api/chat',
    credentials: 'include',
  }),
})

// Renderizar usage
{messages.map((m) => (
  <div key={m.id}>
    {/* ... message content ... */}
    {m.metadata?.totalUsage && (
      <span className="text-xs text-muted-foreground">
        {m.metadata.totalUsage.totalTokens} tokens
      </span>
    )}
  </div>
))}
```

### Pattern 4: Reasoning (DeepSeek, Claude)

```typescript
// Server: habilitar reasoning
const result = streamText({
  model, // deepseek-r1 ou claude com extended thinking
  messages: await convertToModelMessages(validatedMessages),
})

return result.toUIMessageStreamResponse({
  sendReasoning: true,
})
```

```tsx
// Client: renderizar reasoning
{message.parts.map((part, index) => {
  if (part.type === 'text') {
    return <p key={index}>{part.text}</p>
  }
  if (part.type === 'reasoning') {
    return (
      <details key={index} className="text-sm text-muted-foreground">
        <summary>💭 Raciocínio</summary>
        <pre className="whitespace-pre-wrap">{part.text}</pre>
      </details>
    )
  }
})}
```

### Pattern 5: Chat Page com Persistência (Next.js)

```typescript
// app/chat/page.tsx (Server Component — cria nova conversa)
import { redirect } from 'next/navigation'
import { auth } from '@/core/auth'
import { headers } from 'next/headers'
import { createConversation } from '@/features/chat/service/create-conversation'

export default async function ChatPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/login')

  const id = await createConversation(session.user.id)
  redirect(`/chat/${id}`)
}
```

```typescript
// app/chat/[id]/page.tsx (Server Component — carrega conversa existente)
import { auth } from '@/core/auth'
import { headers } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import { loadConversation } from '@/features/chat/service/load-conversation'
import { ChatInterface } from '@/features/chat/components/ChatInterface'

export default async function ChatDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/login')

  // ✅ Verificar ownership no server component
  const conversation = await loadConversation(params.id, session.user.id)
  if (!conversation) notFound()

  return (
    <ChatInterface
      chatId={conversation.id}
      initialMessages={conversation.messages}
    />
  )
}
```
