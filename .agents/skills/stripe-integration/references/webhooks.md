# Stripe Integration — Webhooks

Conteúdo referencial de implementação de webhooks para stripe-integration.

## 🪝 Webhook Implementation

### Webhook Handler

```typescript
// app/api/billing/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/core/stripe'
import { processPayment } from '@/features/billing/service/process-payment'
import Stripe from 'stripe'

// ⚠️ IMPORTANTE: Disable body parsing para raw body
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    // Verificar signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Processar evento
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        await processPayment(session)
        break

      case 'payment_intent.succeeded':
        // Opcional: log adicional
        console.log('Payment succeeded:', event.data.object.id)
        break

      case 'payment_intent.payment_failed':
        // Opcional: notificar usuário
        console.error('Payment failed:', event.data.object.id)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    // ⚠️ Retornar 200 mesmo com erro para evitar retry infinito
    // Log error para investigar depois
    return NextResponse.json({ received: true })
  }
}
```

### Process Payment (com Idempotência)

```typescript
// features/billing/service/process-payment.ts
import { db } from '@/core/db'
import { users, purchases } from '@/core/db/schema'
import { eq } from 'drizzle-orm'
import type Stripe from 'stripe'

export async function processPayment(session: Stripe.Checkout.Session) {
  const checkoutSessionId = session.id
  const userId = parseInt(session.metadata!.userId)
  const credits = parseInt(session.metadata!.credits)
  const amount = session.amount_total! // cents
  const paymentIntentId = session.payment_intent as string

  // Usar transaction para atomicidade
  await db.transaction(async (tx) => {
    // 1. Verificar idempotência
    const existing = await tx
      .select()
      .from(purchases)
      .where(eq(purchases.stripeCheckoutSessionId, checkoutSessionId))
      .limit(1)

    if (existing.length > 0) {
      console.log('Payment already processed:', checkoutSessionId)
      return // Já processado
    }

    // 2. Criar purchase record
    await tx.insert(purchases).values({
      userId,
      credits,
      amount,
      currency: session.currency || 'usd',
      stripeCheckoutSessionId: checkoutSessionId,
      stripePaymentIntentId: paymentIntentId,
      status: 'completed',
      completedAt: new Date(),
    })

    // 3. Adicionar créditos ao usuário
    const user = await tx.select().from(users).where(eq(users.id, userId)).limit(1)

    if (!user[0]) {
      throw new Error(`User ${userId} not found`)
    }

    await tx
      .update(users)
      .set({ credits: (user[0].credits || 0) + credits })
      .where(eq(users.id, userId))

    console.log(`Added ${credits} credits to user ${userId}`)
  })
}
```
