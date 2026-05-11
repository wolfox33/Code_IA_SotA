# Stripe Integration — Security & Best Practices

Conteúdo referencial de segurança e best practices para stripe-integration.

## 🔐 Security Best Practices

### 1. Validar Webhook Signatures

```typescript
// SEMPRE verificar signature
event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
```

### 2. Idempotency

```typescript
// Verificar se já processou antes de executar
const existing = await db.select().from(purchases).where(eq(purchases.stripeCheckoutSessionId, sessionId))
if (existing.length > 0) return
```

### 3. Database Transactions

```typescript
// SEMPRE usar transactions para operações atômicas
await db.transaction(async (tx) => {
  // Create purchase + update credits atomically
})
```

### 4. Validation

```typescript
// Validar amounts
if (session.amount_total !== expectedAmount) {
  throw new Error('Amount mismatch')
}

// Validar metadata
if (!session.metadata?.userId) {
  throw new Error('Missing userId in metadata')
}
```

### 5. Error Handling

```typescript
try {
  await processPayment(session)
} catch (error) {
  // Log error mas retornar 200 para evitar retry infinito
  console.error('Payment processing failed:', error)
  // Adicionar a dead letter queue para retry manual
  await addToDeadLetterQueue(session)
  return NextResponse.json({ received: true })
}
```

## 📊 Monitoring

### Logs Essenciais

```typescript
console.log('Checkout created:', { userId, sessionId, credits })
console.log('Payment processing:', { sessionId, userId, credits, amount })
console.log('Payment completed:', { userId, newBalance: user.credits })
console.error('Payment failed:', { sessionId, error })
```

### Stripe Dashboard

- **Payments**: Monitorar sucesso/falhas
- **Webhooks**: Ver eventos e retries
- **Customers**: Ver histórico de compras

### Alertas

- Taxa de falha de pagamentos > 5%
- Webhooks com retry > 3x
- Discrepância entre Stripe e DB

## ⚠️ Common Gotchas

### 1. Raw Body para Webhooks

Next.js parseia body por default. Precisa desabilitar:

```typescript
// Usar req.text() ao invés de req.json()
const body = await req.text()
```

### 2. Webhook Secret Diferente

Test e Live modes têm secrets diferentes:

```bash
# Test
STRIPE_WEBHOOK_SECRET=whsec_test_...

# Live
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Customer ID Persistence

Salvar `stripeCustomerId` no DB para reusar:

```typescript
if (!user.stripeCustomerId) {
  const customer = await stripe.customers.create({ email: user.email })
  await db.update(users).set({ stripeCustomerId: customer.id })
}
```

### 4. Retries Infinitos

Webhook failing → Stripe retries → Failing again → Loop

**Solução**: Sempre retornar 200, mesmo com erro. Log e investigar depois.

## 🎯 Alinhamento com Arquitetura

### Vertical Slice Structure

```
src/features/billing/
├── api/
│   ├── checkout.ts          # POST /api/billing/checkout
│   └── webhook.ts            # POST /api/billing/webhook
├── service/
│   ├── create-checkout.ts   # Business logic
│   └── process-payment.ts   # Business logic
├── repo/
│   └── purchases.ts          # Data access
└── components/
    └── PricingCard.tsx       # UI
```

### Integração com Better Auth

```typescript
// Usar Better Auth para auth
const session = await auth.api.getSession({ headers: req.headers })
const userId = session.user.id
```

### Integração com Credits Feature

```typescript
// billing chama credits.service para debitar
import { debitCredits } from '@/features/credits/service/debit-credits'
await debitCredits(userId, 1) // Ao enviar mensagem
```

## 🔗 Links Úteis

- [Stripe Docs](https://stripe.com/docs)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- [Webhook Testing](https://stripe.com/docs/webhooks/test)
- [Security Best Practices](https://stripe.com/docs/security/best-practices)
