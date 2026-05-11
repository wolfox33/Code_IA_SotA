# Stripe Integration — Setup

Conteúdo referencial de setup inicial para stripe-integration.

## Instructions

1. **Setup inicial**: Instalar SDK Stripe e configurar API keys
2. **Configurar produtos**: Criar produtos e prices no Stripe Dashboard
3. **Implementar checkout**: Criar checkout sessions para compra de créditos
4. **Configurar webhooks**: Setup endpoint e validação de signatures
5. **Implementar idempotência**: Prevenir processamento duplicado
6. **Integrar com DB**: Persistir purchases e atualizar créditos
7. **Testar localmente**: Usar Stripe CLI para simular webhooks
8. **Customer Portal**: Permitir usuários gerenciar billing

## Safety

- **Nunca** commitar API keys
- **Sempre** validar webhook signatures
- **Implementar** idempotency keys
- **Usar** database transactions
- **Validar** amounts antes de processar
- **Log** todas as transações
- **Implementar** rate limiting em endpoints
- **Usar** HTTPS em produção

## 📚 Quick Reference

### Environment Variables

```bash
# Obrigatórias
STRIPE_SECRET_KEY="sk_test_..."  # Test key
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Produção
STRIPE_SECRET_KEY="sk_live_..."  # Live key
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

**⚠️ Nunca usar live keys em desenvolvimento!**

### Stripe CLI Commands

```bash
# Login
stripe login

# Listen to webhooks (forward to localhost)
stripe listen --forward-to localhost:3000/api/billing/webhook

# Trigger eventos manualmente
stripe trigger payment_intent.succeeded
stripe trigger checkout.session.completed

# Ver logs
stripe logs tail
```

### Produtos e Preços

Criar no Stripe Dashboard ou via API:

```bash
# Criar produto
stripe products create --name="100 Credits" --description="100 message credits"

# Criar price
stripe prices create \
  --product=prod_xxx \
  --unit-amount=999 \
  --currency=usd
```

## 🔧 Core Setup

### 1. Instalação

```bash
npm install stripe
# ou
pnpm add stripe
```

### 2. Cliente Stripe

```typescript
// core/stripe.ts
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia', // Usar versão mais recente
  typescript: true,
})
```

### 3. Database Schema (Drizzle)

```typescript
// core/db/schema.ts
import { pgTable, serial, integer, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  credits: integer('credits').default(0).notNull(),
  stripeCustomerId: text('stripe_customer_id'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const purchases = pgTable('purchases', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  credits: integer('credits').notNull(),
  amount: integer('amount').notNull(), // cents
  currency: text('currency').default('usd').notNull(),
  stripeCheckoutSessionId: text('stripe_checkout_session_id').unique().notNull(),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  status: text('status').notNull(), // 'pending' | 'completed' | 'failed'
  createdAt: timestamp('created_at').defaultNow(),
  completedAt: timestamp('completed_at'),
})
```
