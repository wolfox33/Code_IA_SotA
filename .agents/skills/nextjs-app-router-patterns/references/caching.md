# Next.js App Router — Caching

Conteúdo referencial de patterns de caching para nextjs-app-router-patterns.

## ⚡ Caching

### Pattern 1: Fetch with Cache

```typescript
// Cached for 1 hour
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 },
})

// Never cache (always fresh)
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store',
})

// Cache forever (until manually revalidated)
const data = await fetch('https://api.example.com/data', {
  next: { tags: ['posts'] },
})
```

### Pattern 2: Unstable_cache

```typescript
import { unstable_cache } from 'next/cache'

const getCachedPosts = unstable_cache(
  async () => {
    return db.select().from(posts)
  },
  ['posts'], // Cache key
  { revalidate: 3600, tags: ['posts'] }
)
```

### Pattern 3: Revalidation

```typescript
import { revalidatePath, revalidateTag } from 'next/cache'

// Revalidate specific path
revalidatePath('/posts')

// Revalidate by tag
revalidateTag('posts')
```

## 🔗 Links Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
- [App Router Migration](https://nextjs.org/docs/app/building-your-application/upgrading)
