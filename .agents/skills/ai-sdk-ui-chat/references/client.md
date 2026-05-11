# AI SDK UI — Client Component

Conteúdo referencial de implementação client-side para ai-sdk-ui-chat.

## 📚 Quick Reference

### Client Component (useChat)

```typescript
// features/chat/components/ChatInterface.tsx
'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useState } from 'react'

interface ChatInterfaceProps {
  chatId: string
  initialMessages?: UIMessage[]
}

export function ChatInterface({ chatId, initialMessages }: ChatInterfaceProps) {
  const { messages, sendMessage, status, stop, error, regenerate } = useChat({
    chatId,
    initialMessages,
    transport: new DefaultChatTransport({
      api: '/api/chat',
      credentials: 'include', // Enviar cookies de auth
    }),
    experimental_throttle: 50, // Throttle UI updates
    onError: (error) => {
      // ⚠️ Mostrar mensagem genérica, nunca error.message do server
      console.error('Chat error:', error.message)
    },
    onFinish: ({ message }) => {
      // Callback após resposta completa
    },
  })
  const [input, setInput] = useState('')

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex flex-col">
            <span className="text-sm font-medium">
              {message.role === 'user' ? 'Você' : 'AI'}
            </span>
            {message.parts.map((part, index) => {
              if (part.type === 'text') {
                return <p key={index}>{part.text}</p>
              }
              if (part.type === 'reasoning') {
                return (
                  <details key={index} className="text-sm text-muted-foreground">
                    <summary>Raciocínio</summary>
                    <pre>{part.text}</pre>
                  </details>
                )
              }
              return null
            })}
          </div>
        ))}
      </div>

      {/* Status indicators */}
      {status === 'submitted' && <div className="p-2 text-sm">Pensando...</div>}
      {status === 'streaming' && (
        <button onClick={() => stop()} className="text-sm text-red-500">
          Parar
        </button>
      )}

      {/* Error state */}
      {error && (
        <div className="p-2 bg-destructive/10 text-destructive text-sm">
          Algo deu errado.
          <button onClick={() => regenerate()} className="ml-2 underline">
            Tentar novamente
          </button>
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (input.trim() && status === 'ready') {
            sendMessage({ text: input })
            setInput('')
          }
        }}
        className="flex gap-2 p-4 border-t"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={status !== 'ready'}
          placeholder="Digite sua mensagem..."
          className="flex-1 px-3 py-2 border rounded-md"
        />
        <button
          type="submit"
          disabled={status !== 'ready' || !input.trim()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
```
