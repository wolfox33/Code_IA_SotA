# Next.js App Router — Data Fetching

Conteúdo referencial de patterns de data fetching para nextjs-app-router-patterns.

## 📡 Data Fetching

### Pattern 1: Direct Async

**Simplest**: Fetch directly in Server Component.

```typescript
async function PostsPage() {
  const posts = await db.select().from(posts)

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

### Pattern 2: Parallel Fetching

**Faster**: Fetch múltiplas requests em paralelo.

```typescript
async function DashboardPage() {
  // Start both requests in parallel
  const userPromise = getUser()
  const postsPromise = getPosts()

  // Wait for both
  const [user, posts] = await Promise.all([userPromise, postsPromise])

  return (
    <div>
      <UserProfile user={user} />
      <PostsList posts={posts} />
    </div>
  )
}
```

### Pattern 3: Streaming with Suspense

**Best UX**: Stream parts progressively.

```typescript
// app/dashboard/page.tsx
import { Suspense } from 'react'

export default function DashboardPage() {
  return (
    <div>
      <UserInfo /> {/* Fast - shows immediately */}

      <Suspense fallback={<SkeletonPosts />}>
        <Posts /> {/* Slow - streams when ready */}
      </Suspense>

      <Suspense fallback={<SkeletonComments />}>
        <Comments /> {/* Slower - streams after */}
      </Suspense>
    </div>
  )
}

// Each component fetches independently
async function Posts() {
  const posts = await getPosts() // Slow query
  return <PostsList posts={posts} />
}
```
