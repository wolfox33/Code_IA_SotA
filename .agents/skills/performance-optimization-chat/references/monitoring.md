# Performance Optimization — Monitoring

Conteúdo referencial de monitoring para performance-optimization-chat.

## Custom Metrics

```typescript
// lib/metrics.ts
export function trackMetric(name: string, value: number, tags?: Record<string, string>) {
  // Send to analytics service (autenticado via cookie de sessão)
  fetch('/api/metrics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, value, tags }),
    credentials: 'include', // Enviar cookies de auth
  })
}

// Usage
trackMetric('message_send_time', performance.now() - startTime)
// ⚠️ NUNCA enviar userId no client — extrair do session no server
```

```typescript
// app/api/metrics/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/core/auth'
import { z } from 'zod'

const metricSchema = z.object({
  name: z.string().min(1).max(100),
  value: z.number(),
  tags: z.record(z.string()).optional(),
})

export async function POST(req: NextRequest) {
  // 🔒 Autenticar — prevenir injeção de métricas falsas
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = metricSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid metric' }, { status: 400 })
  }

  // Usar userId do session, não do client
  await saveMetric({
    ...parsed.data,
    userId: session.user.id,
  })

  return NextResponse.json({ ok: true })
}
```

## Performance Monitoring

```typescript
// Monitor API response times
export async function GET(req: NextRequest) {
  const start = performance.now()

  const data = await fetchData()

  const duration = performance.now() - start
  console.log(`API call took ${duration}ms`)

  if (duration > 1000) {
    // Alert on slow requests
    console.warn('Slow API call detected')
  }

  return NextResponse.json(data)
}
```

## 🔗 Links Úteis

- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web Vitals](https://web.dev/vitals/)
- [React Query](https://tanstack.com/query/latest)
