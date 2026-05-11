---
name: credit-system-transaction-management
description: "Use quando a tarefa alterar ledger ou operações críticas de créditos/tokens: débito, crédito, reembolso, reserva, idempotência, locking, audit trail ou concorrência em PostgreSQL/Drizzle."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "development"
  complexity: 6
  tags:
    - credits
    - transactions
    - drizzle
    - postgresql
    - acid
    - concurrency
    - audit
---

# Credit System & Transaction Management

Guia completo para implementar sistema de créditos confiável com transactions, idempotency e audit trail.

## Objetivo

Fornecer database transactions (ACID), idempotency patterns, locking strategies (optimistic vs pessimistic), audit trail completo, race condition prevention, rollback strategies, balance validation.

## Use this skill when

- Implementar ou alterar débito, crédito, reserva, estorno ou expiração de créditos/tokens
- Garantir ACID, idempotência, locking ou consistência sob concorrência
- Criar audit trail/ledger para operações monetárias ou de uso
- Integrar eventos de billing a atualização transacional de saldo
- Escrever testes de race condition, double spend ou processamento duplicado

## Do not use this skill when

- A tarefa só menciona créditos como texto de UI, pricing ou copy
- O foco é checkout/webhook Stripe sem alterar ledger; use a skill Stripe
- Não há saldo, transação, concorrência, auditoria ou garantia de consistência
- Sistema é single-user ou protótipo sem risco de double spend
- Accuracy não é crítica para o comportamento solicitado

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Schema de database para créditos e audit log
- Funções de débito e crédito com transactions
- Idempotency keys implementados
- Locking strategies (pessimistic ou optimistic)
- Audit trail completo
- Funções de reconciliação de saldo
- Tests de cenários concorrentes

## Procedure

### 1. Criar schema de database

```typescript
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  credits: integer('credits').default(0).notNull(),
  version: integer('version').default(0).notNull(),
})

export const creditLog = pgTable('credit_log', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  amount: integer('amount').notNull(),
  balanceBefore: integer('balance_before').notNull(),
  balanceAfter: integer('balance_after').notNull(),
  operation: text('operation', { enum: ['credit', 'debit'] }).notNull(),
  reason: text('reason').notNull(),
  idempotencyKey: text('idempotency_key').unique(),
})
```

### 2. Implementar débito com locking

```typescript
export async function debitCredits(userId, amount, reason, idempotencyKey) {
  return await db.transaction(async (tx) => {
    const user = await tx.select().from(users)
      .where(eq(users.id, userId))
      .for('update')
      .limit(1)

    if (user[0].credits < amount) throw new InsufficientCreditsError()

    await tx.update(users)
      .set({ credits: user[0].credits - amount })
      .where(eq(users.id, userId))

    await tx.insert(creditLog).values({
      userId, amount: -amount, balanceBefore: user[0].credits,
      balanceAfter: user[0].credits - amount, operation: 'debit', reason, idempotencyKey
    })
  })
}
```

### 3. Implementar idempotency

```typescript
if (idempotencyKey) {
  const existing = await tx.select().from(creditLog)
    .where(eq(creditLog.idempotencyKey, idempotencyKey))
    .limit(1)
  if (existing.length > 0) return existing[0]
}
```

### 4. Implementar audit trail

```typescript
await tx.insert(creditLog).values({
  userId, amount, balanceBefore, balanceAfter, operation, reason, metadata
})
```

### 5. Implementar reconciliação

```typescript
export async function reconcileBalance(userId) {
  const logs = await db.select().from(creditLog).where(eq(creditLog.userId, userId))
  const expectedBalance = logs.reduce((sum, log) => sum + log.amount, 0)
  const actualBalance = await getBalance(userId)
  return { reconciled: expectedBalance === actualBalance, expected: expectedBalance, actual: actualBalance }
}
```

## Verification

- Schema de database está definido
- Funções de débito e crédito usam transactions
- Idempotency keys são verificados antes de executar
- Locking (pessimistic ou optimistic) está implementado
- Audit trail loga todas as operações
- Funções de reconciliação existem
- Tests de cenários concorrentes estão implementados

> **Skill log**
> - [2026-05-11] Skill criada com padrões de sistema de créditos.
> - [2026-05-11] Stage 6 (Batch 7) adicionou seções operacionais faltantes e removeu emoji de heading Objetivo.
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/` com arquivos divididos por especialidade.

## References

Conteúdo referencial detalhado, padrões de transações e implementação de auditoria estão disponíveis em:
- `references/schema.md` - Database schema, indexes, quick reference
- `references/operations.md` - Credit operations (debit, add, get balance)
- `references/locking.md` - Optimistic vs pessimistic locking strategies
- `references/audit.md` - Audit trail, history, reconciliation
- `references/performance.md` - Batch operations, performance optimization
