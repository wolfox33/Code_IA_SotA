# Real-time Chat — Optimistic Updates

Conteúdo referencial de optimistic updates para realtime-chat-implementation.

## ⚡ Optimistic Updates

### Pattern 1: Add Immediately, Remove on Error

```typescript
const sendMessage = async (content: string) => {
  // Add optimistically
  const tempId = `temp-${Date.now()}`
  const optimisticMessage = { id: tempId, role: 'user', content, pending: true }

  setMessages((prev) => [...prev, optimisticMessage])

  try {
    const response = await fetch('/api/chat/send', {
      method: 'POST',
      body: JSON.stringify({ content }),
    })

    if (!response.ok) throw new Error('Failed')

    const { messageId } = await response.json()

    // Replace temp with real ID
    setMessages((prev) =>
      prev.map((m) =>
        m.id === tempId ? { ...m, id: messageId, pending: false } : m
      )
    )
  } catch (error) {
    // Remove on error
    setMessages((prev) => prev.filter((m) => m.id !== tempId))
    setError('Failed to send message')
  }
}
```

### Pattern 2: Mark as Pending

```typescript
interface Message {
  id: string
  content: string
  pending?: boolean
  error?: boolean
}

// UI
{message.pending && <Spinner />}
{message.error && <RetryButton />}
```
