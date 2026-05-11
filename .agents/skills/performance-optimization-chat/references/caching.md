# Performance Optimization — Caching

Conteúdo referencial de caching strategies para performance-optimization-chat.

## Next.js Caching

```typescript
// Cached for 1 hour
const posts = await fetch('/api/posts', {
  next: { revalidate: 3600 },
})

// Cache with tags
const data = await fetch('/api/data', {
  next: { tags: ['posts'] },
})

// Revalidate
import { revalidateTag } from 'next/cache'
revalidateTag('posts')
```

## Pattern 1: React Query Cache

```typescript
// lib/query-client.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      cacheTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

// Use in components
const { data } = useQuery({
  queryKey: ['conversations'],
  queryFn: () => fetch('/api/conversations').then((r) => r.json()),
})
```
