# Next.js App Router — Route Handlers

Conteúdo referencial de patterns de Route Handlers para nextjs-app-router-patterns.

## 🛣️ Route Handlers

### Pattern 1: API Route

```typescript
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/core/auth'
import { z } from 'zod'

const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(50000),
})

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers })

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ✅ Filtrar por userId — nunca retornar dados de outros usuários
  const userPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.userId, session.user.id))

  return NextResponse.json({ posts: userPosts })
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers })

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ✅ Validar input com Zod
  const body = await req.json()
  const parsed = createPostSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.issues },
      { status: 400 }
    )
  }

  // ✅ Usar userId do session, nunca do body
  const [post] = await db
    .insert(posts)
    .values({
      title: parsed.data.title,
      content: parsed.data.content,
      userId: session.user.id,
    })
    .returning()

  return NextResponse.json({ post }, { status: 201 })
}
```

### Pattern 2: Dynamic Route

```typescript
// app/api/posts/[id]/route.ts
import { auth } from '@/core/auth'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // 1. Autenticar
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2. Validar param
  const postId = parseInt(params.id)
  if (isNaN(postId) || postId <= 0) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  // 3. Buscar com ownership check
  const post = await db
    .select()
    .from(posts)
    .where(
      and(
        eq(posts.id, postId),
        eq(posts.userId, session.user.id)
      )
    )
    .limit(1)

  if (!post[0]) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ post: post[0] })
}
```
