# Real-time Chat — Error Handling

Conteúdo referencial de error handling para realtime-chat-implementation.

## 🛡️ Error Handling

### Timeout

```typescript
const sendMessageWithTimeout = async (content: string, timeout = 30000) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch('/api/chat/stream', {
      method: 'POST',
      body: JSON.stringify({ content }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    return response
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout')
    }
    throw error
  }
}
```

### Retry Logic

```typescript
const sendMessageWithRetry = async (
  content: string,
  maxRetries = 3,
  baseDelay = 1000
) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await sendMessage(content)
    } catch (error) {
      if (attempt === maxRetries - 1) throw error

      const delay = baseDelay * 2 ** attempt
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
}
```

## 🔗 Links Úteis

- [MDN SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [React Query](https://tanstack.com/query/latest)
- [WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
