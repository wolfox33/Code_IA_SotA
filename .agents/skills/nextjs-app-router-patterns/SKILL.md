---
name: nextjs-app-router-patterns
description: "Use quando a tarefa alterar implementação Next.js App Router: Server/Client Components, Server Actions, Route Handlers, cache/revalidation, streaming/Suspense, loading/error boundaries ou data fetching."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "development"
  complexity: 5
  status: active
  tags:
    - nextjs
    - react
    - server-components
    - app-router
    - streaming
    - suspense
---

# Next.js App Router Patterns

Guia completo de patterns e best practices para Next.js 16 App Router.

## Objetivo

Fornecer Server vs Client Components quando usar cada um, Server Actions patterns, Route Handlers for APIs, Streaming & Suspense for performance, Error boundaries e loading states, Data fetching strategies, Caching patterns.

## Use this skill when

- Criar ou alterar rotas, layouts, pages ou components no App Router
- Decidir Server Component vs Client Component por causa de dados, estado ou browser APIs
- Implementar Server Actions, Route Handlers, cache/revalidation ou data fetching
- Adicionar streaming/Suspense, `loading.tsx`, `error.tsx` ou boundaries
- Corrigir bug específico de App Router, rendering, cache ou hydration

## Do not use this skill when

- A tarefa só menciona React/frontend sem Next.js App Router
- Usando Next.js Pages Router (legacy), SPA puro sem SSR ou outro framework
- A mudança é puramente visual; use `frontend-design`
- A mudança é backend externo, banco, billing, auth ou infra sem Route Handler/Server Action

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Server Components por default
- Client Components apenas quando necessário
- Server Actions para mutations
- Route Handlers para APIs
- Streaming com Suspense boundaries
- Error boundaries e loading states
- Caching patterns apropriados

## Procedure

### 1. Escolher tipo de componente

Use Server Component por default. Use Client Component apenas para:
- State (useState, useReducer)
- Browser APIs (window, document)
- Event handlers (onClick, onChange)
- React hooks personalizados

### 2. Implementar data fetching em Server Components

```typescript
async function PostsPage() {
  const posts = await db.select().from(posts)
  return <div>{posts.map(post => <PostCard key={post.id} post={post} />)}</div>
}
```

### 3. Implementar streaming com Suspense

```typescript
export default function DashboardPage() {
  return (
    <div>
      <UserInfo />
      <Suspense fallback={<SkeletonPosts />}>
        <Posts />
      </Suspense>
    </div>
  )
}
```

### 4. Implementar Server Actions

```typescript
'use server'
export async function createPost(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) throw new Error('Unauthorized')
  await db.insert(posts).values({ title: formData.get('title'), userId: session.user.id })
  revalidatePath('/posts')
}
```

### 5. Implementar Route Handlers

```typescript
export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const posts = await db.select().from(posts).where(eq(posts.userId, session.user.id))
  return NextResponse.json({ posts })
}
```

### 6. Configurar caching

```typescript
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 }, // Cache por 1 hora
})
```

### 7. Implementar error boundaries

```typescript
// error.tsx
export default function Error({ error }: { error: Error }) {
  return <div>Error: {error.message}</div>
}
```

## Verification

- Server Components são usados por default
- Client Components têm 'use client' apenas quando necessário
- Server Actions têm autenticação e validação
- Route Handlers têm autenticação e ownership check
- Streaming com Suspense está implementado
- Caching é apropriado para o caso de uso
- Error boundaries e loading states existem

> **Skill log**
> - [2026-05-11] Skill criada com padrões de Next.js App Router.
> - [2026-05-11] Stage 6 (Batch 7) adicionou seções operacionais faltantes e removeu emoji de heading Objetivo.
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/` com arquivos divididos por especialidade.

## References

Conteúdo referencial detalhado, patterns e exemplos estão disponíveis em:
- `references/components.md` - Component patterns (Server vs Client, composition patterns)
- `references/data-fetching.md` - Data fetching patterns (direct async, parallel, streaming)
- `references/server-actions.md` - Server Actions patterns (form submission, programmatic)
- `references/route-handlers.md` - Route Handlers patterns (API routes, dynamic routes)
- `references/caching.md` - Caching patterns (fetch cache, unstable_cache, revalidation)
