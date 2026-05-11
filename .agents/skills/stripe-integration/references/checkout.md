# Stripe Integration — Checkout

Conteúdo referencial de implementação de checkout para stripe-integration.

## 💳 Checkout Implementation

### Criar Checkout Session

```typescript
// features/billing/service/create-checkout.ts
import { stripe } from '@/core/stripe'
import { db } from '@/core/db'
import { users } from '@/core/db/schema'
import { eq } from 'drizzle-orm'

interface CreateCheckoutParams {
  userId: number
  credits: number
  priceId: string // Stripe Price ID
  successUrl: string
  cancelUrl: string
}

export async function createCheckout({
  userId,
  credits,
  priceId,
  successUrl,
  cancelUrl,
}: CreateCheckoutParams) {
  // Buscar ou criar Stripe customer
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1)
  if (!user[0]) throw new Error('User not found')

  let customerId = user[0].stripeCustomerId

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user[0].email,
      metadata: { userId: userId.toString() },
    })
    customerId = customer.id

    // Salvar customer ID
    await db.update(users).set({ stripeCustomerId: customerId }).where(eq(users.id, userId))
  }

  // Criar checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId: userId.toString(),
      credits: credits.toString(),
    },
  })

  return { sessionId: session.id, url: session.url }
}
```

### API Route (Next.js 16)

```typescript
// app/api/billing/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/core/auth'
import { createCheckout } from '@/features/billing/service/create-checkout'
import { z } from 'zod'

const checkoutSchema = z.object({
  priceId: z.string(),
  credits: z.number().int().positive(),
})

export async function POST(req: NextRequest) {
  try {
    // Autenticar
    const session = await auth.api.getSession({ headers: req.headers })
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Validar input
    const body = await req.json()
    const { priceId, credits } = checkoutSchema.parse(body)

    // Criar checkout
    const { sessionId, url } = await createCheckout({
      userId: session.user.id,
      credits,
      priceId,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?checkout=cancel`,
    })

    return NextResponse.json({ sessionId, url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 })
  }
}
```
