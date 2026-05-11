# Stripe Integration — Testing

Conteúdo referencial de testes para stripe-integration.

## 🧪 Testing

### Local Testing com Stripe CLI

```bash
# 1. Instalar Stripe CLI
# https://stripe.com/docs/stripe-cli

# 2. Login
stripe login

# 3. Forward webhooks
stripe listen --forward-to localhost:3000/api/billing/webhook

# 4. Copiar webhook secret e adicionar ao .env.local
# STRIPE_WEBHOOK_SECRET=whsec_...

# 5. Trigger evento de teste
stripe trigger checkout.session.completed
```

### Integration Test

```typescript
// features/billing/service/checkout.test.ts
import { createCheckout } from '@/features/billing/service/create-checkout'
import { processPayment } from '@/features/billing/service/process-payment'
import { db } from '@/core/db'
import { users, purchases } from '@/core/db/schema'
import { eq } from 'drizzle-orm'

describe('Billing Flow', () => {
  it('should create checkout session', async () => {
    const userId = 1
    const credits = 100

    const { sessionId, url } = await createCheckout({
      userId,
      credits,
      priceId: 'price_test',
      successUrl: 'http://localhost:3000/success',
      cancelUrl: 'http://localhost:3000/cancel',
    })

    expect(sessionId).toBeDefined()
    expect(url).toContain('checkout.stripe.com')
  })

  it('should process payment and add credits', async () => {
    const userId = 1
    const initialCredits = 10

    // Setup
    await db.insert(users).values({ id: userId, email: 'test@example.com', credits: initialCredits })

    // Mock Stripe session
    const mockSession = {
      id: 'cs_test_123',
      amount_total: 999,
      currency: 'usd',
      payment_intent: 'pi_test_123',
      metadata: {
        userId: userId.toString(),
        credits: '100',
      },
    } as any

    // Process payment
    await processPayment(mockSession)

    // Verify credits added
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1)
    expect(user[0].credits).toBe(initialCredits + 100)

    // Verify purchase created
    const purchase = await db
      .select()
      .from(purchases)
      .where(eq(purchases.stripeCheckoutSessionId, 'cs_test_123'))
      .limit(1)

    expect(purchase[0]).toBeDefined()
    expect(purchase[0].status).toBe('completed')
  })

  it('should be idempotent - not process same checkout twice', async () => {
    const mockSession = {
      id: 'cs_test_456',
      amount_total: 999,
      currency: 'usd',
      payment_intent: 'pi_test_456',
      metadata: { userId: '1', credits: '100' },
    } as any

    // Process first time
    await processPayment(mockSession)

    const userAfterFirst = await db.select().from(users).where(eq(users.id, 1)).limit(1)
    const creditsAfterFirst = userAfterFirst[0].credits

    // Process second time (should be ignored)
    await processPayment(mockSession)

    const userAfterSecond = await db.select().from(users).where(eq(users.id, 1)).limit(1)
    expect(userAfterSecond[0].credits).toBe(creditsAfterFirst) // Unchanged
  })
})
```
