# Next.js App Router — Server Actions

Conteúdo referencial de patterns de Server Actions para nextjs-app-router-patterns.

## 🚀 Server Actions

### Pattern 1: Form Submission

```typescript
// features/posts/actions/create-post.ts
'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/core/auth'
import { headers } from 'next/headers'
import { z } from 'zod'

const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(50000),
})

export async function createPost(formData: FormData) {
  // 1. Autenticar
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    throw new Error('Unauthorized')
  }

  // 2. Validar input
  const parsed = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  })

  if (!parsed.success) {
    throw new Error('Invalid input')
  }

  // 3. Insert com userId do session (nunca do client)
  await db.insert(posts).values({
    title: parsed.data.title,
    content: parsed.data.content,
    userId: session.user.id,
  })

  // 4. Revalidate
  revalidatePath('/posts')
}

// app/new-post/page.tsx
import { createPost } from '@/features/posts/actions/create-post'

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <textarea name="content" required />
      <button type="submit">Create</button>
    </form>
  )
}
```

### Pattern 2: Programmatic Call

```typescript
// features/posts/actions/like-post.ts
'use server'

import { auth } from '@/core/auth'
import { headers } from 'next/headers'
import { z } from 'zod'

const likeSchema = z.object({
  postId: z.number().int().positive(),
})

export async function likePost(postId: number) {
  // 1. Autenticar
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    throw new Error('Unauthorized')
  }

  // 2. Validar input
  const parsed = likeSchema.safeParse({ postId })
  if (!parsed.success) {
    throw new Error('Invalid input')
  }

  // 3. Verificar se post existe
  const post = await db
    .select()
    .from(posts)
    .where(eq(posts.id, parsed.data.postId))
    .limit(1)

  if (!post[0]) {
    throw new Error('Post not found')
  }

  await db
    .update(posts)
    .set({ likes: sql`${posts.likes} + 1` })
    .where(eq(posts.id, parsed.data.postId))

  revalidateTag(`post-${parsed.data.postId}`)

  return { success: true }
}

// components/LikeButton.tsx
'use client'

import { likePost } from '@/features/posts/actions/like-post'
import { useTransition } from 'react'

export function LikeButton({ postId }: { postId: number }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      onClick={() => startTransition(() => likePost(postId))}
      disabled={isPending}
    >
      {isPending ? 'Liking...' : 'Like'}
    </button>
  )
}
```
