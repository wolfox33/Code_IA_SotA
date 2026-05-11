---
name: performance-optimization-chat
description: "Padrões de otimização de performance para aplicações de chat incluindo caching strategies, database indexing, query optimization, streaming optimization, bundle size reduction e monitoring."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "development"
  complexity: 6
  tags:
    - performance
    - optimization
    - caching
    - monitoring
    - database
    - chat
---

# Performance Optimization for Chat

Guia completo de otimização de performance para aplicações de chat.

## Objetivo

Fornecer:
- **Caching strategies** (Next.js, React Query)
- **Database optimization** (indexes, query optimization)
- **Streaming optimization** (batching, compression)
- **Bundle size reduction** (code splitting, tree shaking)
- **Image optimization** (Next.js Image)
- **Monitoring & profiling** (Vercel Analytics, custom metrics)

## Use this skill when

- App feeling slow
- Database queries slow
- Bundle size too large
- High server costs
- Poor user experience
- Need analytics/monitoring

## Do not use this skill when

- A aplicação não ter problemas de performance
- A tarefa for apenas funcionalidade sem otimização
- A otimização for prematura (sem medição)
- A aplicação não ser de chat

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Caching strategy implementada (Next.js ou React Query)
- Database indexes criados para queries comuns
- N+1 queries eliminados
- Code splitting implementado
- Bundle size reduzido (<500KB)
- Monitoring configurado (Vercel Analytics, custom metrics)

## Procedure

### 1. Identificar bottlenecks

Meça performance antes de otimizar:

```typescript
const start = performance.now()
const data = await fetchData()
const duration = performance.now() - start
console.log(`Query took ${duration}ms`)
```

### 2. Implementar caching Next.js

Use revalidate ou tags:

```typescript
const posts = await fetch('/api/posts', {
  next: { revalidate: 3600 },
})

const data = await fetch('/api/data', {
  next: { tags: ['posts'] },
})

import { revalidateTag } from 'next/cache'
revalidateTag('posts')
```

### 3. Criar database indexes

Adicione indexes para queries comuns:

```typescript
export const messagesIndexes = {
  conversationIdx: index('messages_conversation_id_idx').on(messages.conversationId),
  createdAtIdx: index('messages_created_at_idx').on(messages.createdAt),
  userConversationIdx: index('conversations_user_id_idx').on(conversations.userId),
}
```

### 4. Otimizar queries

Evite N+1 queries com joins:

```typescript
// ❌ BAD: N+1
const conversations = await db.select().from(conversations)
for (const conv of conversations) {
  const messages = await db.select().from(messages)
    .where(eq(messages.conversationId, conv.id))
}

// ✅ GOOD: Single query com join
const conversationsWithMessages = await db.select()
  .from(conversations)
  .leftJoin(messages, eq(messages.conversationId, conversations.id))
```

### 5. Implementar code splitting

Lazy load componentes pesados:

```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false,
})
```

### 6. Configurar React Query cache

Use React Query para client-side caching:

```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      cacheTime: 5 * 60 * 1000,
    },
  },
})
```

### 7. Implementar virtual scrolling

Para listas longas de mensagens:

```typescript
const virtualizer = useVirtualizer({
  count: messages.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 100,
})
```

### 8. Adicionar monitoring

Configure custom metrics:

```typescript
export function trackMetric(name: string, value: number, tags?: Record<string, string>) {
  fetch('/api/metrics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, value, tags }),
    credentials: 'include',
  })
}
```

## Verification

- Caching está configurado e funcionando
- Database indexes estão criados
- Queries otimizadas sem N+1
- Bundle size está abaixo de 500KB
- Virtual scrolling implementado para listas longas
- Custom metrics estão sendo coletadas
- Performance monitorada com Vercel Analytics

> **Skill log**
> - [2026-05-11] Skill criada com padrões de otimização de performance para aplicações de chat.
> - [2026-05-11] Stage 6 (Batch 5) adicionou seções operacionais faltantes e removeu emoji de heading Objetivo.
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/` com arquivos divididos por especialidade.

## References

Conteúdo referencial detalhado, caching, database, code splitting, patterns e monitoring estão disponíveis em:
- `references/caching.md` - Next.js caching e React Query cache
- `references/database.md` - Database indexes e query optimization
- `references/code-splitting.md` - Code splitting e virtual scrolling
- `references/patterns.md` - Optimization patterns (debounce, batch streaming)
- `references/monitoring.md` - Monitoring e custom metrics
