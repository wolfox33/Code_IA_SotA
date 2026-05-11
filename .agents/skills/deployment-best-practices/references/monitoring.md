# Deployment Best Practices — Monitoring

Conteúdo referencial de error tracking e health check para deployment-best-practices.

## Pattern 2: Error Tracking (Sentry)

```typescript
// core/sentry.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
})

// Use in error boundaries
export function logError(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, { extra: context })
}
```

## Pattern 3: Health Check

```typescript
// app/api/health/route.ts
// ⚠️ Público: retorna APENAS status (sem detalhes de infraestrutura)
import { NextResponse } from 'next/server'
import { db } from '@/core/db'

export async function GET() {
  try {
    await db.execute(sql`SELECT 1`)
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    // ❌ NUNCA expor error.message (pode conter connection strings, etc.)
    return NextResponse.json({ status: 'unhealthy' }, { status: 500 })
  }
}

// app/api/health/detailed/route.ts
// 🔒 Protegido: detalhes apenas para admin autenticado
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/core/auth'
import { db } from '@/core/db'

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    await db.execute(sql`SELECT 1`)
    const stripeStatus = await checkStripe()
    const openaiStatus = await checkOpenAI()

    return NextResponse.json({
      status: 'healthy',
      database: 'ok',
      stripe: stripeStatus,
      openai: openaiStatus,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: (error as Error).message },
      { status: 500 }
    )
  }
}
```
