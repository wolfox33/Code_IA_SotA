# Next.js App Router — Components

Conteúdo referencial de patterns de componentes para nextjs-app-router-patterns.

## Instructions

1. **Choose component type**: Server (default) vs Client (when needed)
2. **Implement data fetching**: async Server Components + caching
3. **Add streaming**: Suspense boundaries para progressive rendering
4. **Error handling**: error.tsx + error boundaries
5. **Loading states**: loading.tsx + Suspense fallbacks
6. **Server Actions**: for mutations
7. **Route Handlers**: for APIs

## Safety

- **SEMPRE** usar Server Components por default
- **VALIDAR** input em Server Actions
- **REVALIDAR** cache apropriadamente
- **HANDLE** errors em boundaries
- **STREAMING** para better UX
- **SECURITY**: Never expose secrets em Client Components

## 📚 Quick Reference

### Server Component (Default)

```typescript
// app/dashboard/page.tsx
async function DashboardPage() {
  const data = await fetchData() // ✅ Can async/await directly

  return <div>{data.title}</div>
}
```

### Client Component

```typescript
// components/Counter.tsx
'use client' // ← Required

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0) // ✅ Can use hooks

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

### Server Action

```typescript
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  await db.insert(posts).values({ title })
  revalidatePath('/posts')
}
```

## 🎨 Component Patterns

### Pattern 1: Server Component Composition

**Best**: Keep as much Server-side as possible.

```typescript
// app/page.tsx (Server Component)
import { ClientButton } from './ClientButton'

async function Page() {
  const data = await fetchData()

  return (
    <div>
      <h1>{data.title}</h1> {/* Server-rendered */}
      <ClientButton /> {/* Interactive island */}
    </div>
  )
}
```

### Pattern 2: Props from Server → Client

**Pass data from Server Component to Client Component via props**.

```typescript
// app/page.tsx (Server)
async function Page() {
  const user = await getUser()

  return <ClientComponent user={user} /> {/* ✅ Pass as prop */}
}

// components/ClientComponent.tsx
'use client'

export function ClientComponent({ user }: { user: User }) {
  const [count, setCount] = useState(0)

  return (
    <div>
      Hello {user.name}! Count: {count}
    </div>
  )
}
```

### Pattern 3: Client Component wrapping Server

**Use slot pattern for Server inside Client**.

```typescript
// components/Tabs.tsx (Client)
'use client'

export function Tabs({ children }: { children: React.ReactNode }) {
  const [tab, setTab] = useState(0)

  return (
    <div>
      <button onClick={() => setTab(0)}>Tab 1</button>
      <button onClick={() => setTab(1)}>Tab 2</button>
      <div>{children}</div> {/* ✅ Can be Server Component */}
    </div>
  )
}

// app/page.tsx (Server)
async function Page() {
  const data = await fetchData()

  return (
    <Tabs>
      <div>{data.content}</div> {/* Server-rendered */}
    </Tabs>
  )
}
```
