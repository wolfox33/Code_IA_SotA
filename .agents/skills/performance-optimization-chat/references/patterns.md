# Performance Optimization — Patterns

Conteúdo referencial de optimization patterns para performance-optimization-chat.

## Pattern 3: Debounce Expensive Operations

```typescript
import { useMemo } from 'react'
import debounce from 'lodash/debounce'

function SearchInput() {
  const debouncedSearch = useMemo(
    () =>
      debounce(async (query: string) => {
        const results = await fetch(`/api/search?q=${query}`)
        // Update results...
      }, 300),
    []
  )

  return <input onChange={(e) => debouncedSearch(e.target.value)} />
}
```

## Pattern 4: Batch Streaming Updates

```typescript
let buffer: string[] = []
let lastFlush = Date.now()
const FLUSH_INTERVAL = 50 // ms

for await (const token of stream) {
  buffer.push(token)

  if (Date.now() - lastFlush > FLUSH_INTERVAL) {
    controller.enqueue(
      encoder.encode(`data: ${JSON.stringify({ tokens: buffer })}\n\n`)
    )
    buffer = []
    lastFlush = Date.now()
  }
}
```
