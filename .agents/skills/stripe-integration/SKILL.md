---
name: stripe-integration
description: "Use quando a tarefa tocar integração Stripe diretamente: checkout, prices/products, webhooks, customer portal, assinaturas, pagamentos, billing ou testes com Stripe CLI."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "development"
  complexity: 5
  status: active
  tags:
    - stripe
    - payments
    - webhooks
    - saas
    - credits
    - billing
---

# Stripe Integration Best Practices

Guia completo de integração do Stripe para sistemas de créditos em aplicações SaaS, com foco em robustez, idempotência e segurança.

## Objetivo

Fornecer setup correto do Stripe em projetos SaaS, padrões de checkout para venda de créditos, webhook handling com idempotência, integração com Better Auth e Drizzle, testing com Stripe CLI, error handling e retry logic, security best practices.

## Use this skill when

- Criar ou alterar checkout sessions, payment links, subscriptions ou customer portal
- Configurar products/prices, venda de créditos/pacotes ou billing no Stripe
- Implementar, validar ou debugar webhooks Stripe e idempotência
- Processar eventos de pagamento que alteram créditos, acesso ou invoices
- Testar fluxos de pagamento com Stripe CLI ou fixtures

## Do not use this skill when

- A tarefa só menciona créditos, planos ou limites sem Stripe, checkout, cobrança ou webhook
- Projeto não precisa de pagamentos ou usa outro gateway (PayPal, Mercado Pago, etc.)
- A mudança é apenas ledger/transação interna; use a skill de créditos
- A tarefa é UI de pricing estática sem integração de pagamento
- Projeto não tem backend ou endpoint para processar eventos de pagamento

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Stripe SDK configurado com API keys
- Produtos e prices criados no Stripe
- Checkout session endpoint implementado
- Webhook endpoint com signature validation
- Idempotência implementada para evitar processamento duplicado
- Database transactions para atomicidade
- Tests com Stripe CLI

## Procedure

### 1. Instalar e configurar Stripe SDK

```bash
npm install stripe
```

```typescript
// core/stripe.ts
import Stripe from 'stripe'
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
})
```

### 2. Criar produtos e prices

Use Stripe Dashboard ou CLI:

```bash
stripe products create --name="100 Credits"
stripe prices create --product=prod_xxx --unit-amount=999 --currency=usd
```

### 3. Implementar checkout session

Crie endpoint para criar checkout:

```typescript
export async function createCheckout({ userId, credits, priceId, successUrl, cancelUrl }) {
  // Buscar ou criar Stripe customer
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1)
  let customerId = user[0].stripeCustomerId

  if (!customerId) {
    const customer = await stripe.customers.create({ email: user[0].email })
    customerId = customer.id
    await db.update(users).set({ stripeCustomerId: customerId }).where(eq(users.id, userId))
  }

  // Criar checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { userId: userId.toString(), credits: credits.toString() },
  })

  return { sessionId: session.id, url: session.url }
}
```

### 4. Implementar webhook handler

Configure endpoint com signature validation:

```typescript
export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed':
      await processPayment(event.data.object as Stripe.Checkout.Session)
      break
  }

  return NextResponse.json({ received: true })
}
```

### 5. Implementar idempotência

Verifique se já processou antes de executar:

```typescript
export async function processPayment(session: Stripe.Checkout.Session) {
  await db.transaction(async (tx) => {
    const existing = await tx.select().from(purchases)
      .where(eq(purchases.stripeCheckoutSessionId, session.id))
      .limit(1)
    if (existing.length > 0) return // Já processado

    await tx.insert(purchases).values({
      userId,
      credits,
      amount: session.amount_total!,
      stripeCheckoutSessionId: session.id,
      status: 'completed',
    })

    await tx.update(users)
      .set({ credits: (user[0].credits || 0) + credits })
      .where(eq(users.id, userId))
  })
}
```

### 6. Testar localmente com Stripe CLI

```bash
stripe listen --forward-to localhost:3000/api/billing/webhook
stripe trigger checkout.session.completed
```

## Verification

- Stripe SDK está configurado com API keys corretas
- Produtos e prices existem no Stripe Dashboard
- Checkout session cria customer se não existir
- Webhook valida signature antes de processar
- Idempotência evita processamento duplicado
- Database transactions garantem atomicidade
- Webhook retorna 200 mesmo com erro para evitar retry infinito

> **Skill log**
> - [2026-05-11] Skill criada com padrões de integração Stripe.
> - [2026-05-11] Stage 6 (Batch 6) adicionou seções operacionais faltantes e removeu emoji de heading Objetivo.
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/` com arquivos divididos por especialidade.

## References

Conteúdo referencial detalhado, setup, implementação e best practices estão disponíveis em:
- `references/setup.md` - Setup inicial, instalação, configuração, schema de banco
- `references/checkout.md` - Checkout implementation (criar session, API route)
- `references/webhooks.md` - Webhook implementation e processamento com idempotência
- `references/testing.md` - Testing com Stripe CLI e integration tests
- `references/security.md` - Security best practices, monitoring, common gotchas
