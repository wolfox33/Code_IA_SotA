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

Fornecer:
- **Database transactions** (ACID)
- **Idempotency** patterns
- **Locking strategies** (optimistic vs pessimistic)
- **Audit trail** completo
- **Race condition prevention**
- **Rollback strategies**
- **Balance validation**

## Use this skill when

- Implementar ou alterar débito, crédito, reserva, estorno ou expiração de créditos/tokens.
- Garantir ACID, idempotência, locking ou consistência sob concorrência.
- Criar audit trail/ledger para operações monetárias ou de uso.
- Integrar eventos de billing a atualização transacional de saldo.
- Escrever testes de race condition, double spend ou processamento duplicado.

## Do not use this skill when

- A tarefa só menciona créditos como texto de UI, pricing ou copy.
- O foco é checkout/webhook Stripe sem alterar ledger; use a skill Stripe.
- Não há saldo, transação, concorrência, auditoria ou garantia de consistência.
- Sistema é single-user ou protótipo sem risco de double spend.
- Accuracy não é crítica para o comportamento solicitado.

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

## Instructions

1. **Setup database**: Schema para créditos e audit log
2. **Implement transactions**: Use Drizzle transactions
3. **Add idempotency**: Prevenir operações duplicadas
4. **Implement locking**: Choose between optimistic/pessimistic
5. **Audit trail**: Log todas as operações
6. **Validation**: Check balance antes de debitar
7. **Error handling**: Proper rollbacks
8. **Testing**: Test concurrent scenarios

Consulte `resources/transaction-patterns.md` para padrões de transações e `resources/audit-trail.md` para implementação de auditoria.

## Safety

- **SEMPRE** usar transactions para operações de crédito
- **NUNCA** confiar em reads sem locking
- **VALIDAR** balance antes de debitar
- **IMPLEMENTAR** idempotency keys
- **LOG** todas as transações
- **TESTAR** cenários concorrentes
- **MONITORAR** discrepâncias

## 📚 Quick Reference

### Basic Debit

```typescript
await db.transaction(async (tx) => {
  const user = await tx
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .for('update') // Lock row
    .limit(1)

  if (user[0].credits < amount) {
    throw new InsufficientCreditsError()
  }

  await tx
    .update(users)
    .set({ credits: user[0].credits - amount })
    .where(eq(users.id, userId))

  await tx.insert(creditLog).values({
    userId,
    amount: -amount,
    operation: 'debit',
    reason: 'message_sent',
  })
})
```

## 🗄️ Database Schema

### Users Table

```typescript
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  credits: integer('credits').default(0).notNull(),
  version: integer('version').default(0).notNull(), // For optimistic locking
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
```

### Credit Log (Audit Trail)

```typescript
export const creditLog = pgTable('credit_log', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  amount: integer('amount').notNull(), // Positive for credit, negative for debit
  balanceBefore: integer('balance_before').notNull(),
  balanceAfter: integer('balance_after').notNull(),
  operation: text('operation', { enum: ['credit', 'debit'] }).notNull(),
  reason: text('reason').notNull(), // 'purchase', 'message_sent', 'refund', etc.
  metadata: jsonb('metadata'), // Additional context
  idempotencyKey: text('idempotency_key').unique(),
  createdAt: timestamp('created_at').defaultNow(),
})
```

### Indexes

```typescript
// Add indexes for common queries
export const creditLogIndexes = {
  userIdIdx: index('credit_log_user_id_idx').on(creditLog.userId),
  createdAtIdx: index('credit_log_created_at_idx').on(creditLog.createdAt),
  idempotencyKeyIdx: index('credit_log_idempotency_key_idx').on(
    creditLog.idempotencyKey
  ),
}
```

## 💳 Credit Operations

### Debit Credits (Pessimistic Locking)

```typescript
// features/credits/service/debit-credits.ts
import { db } from '@/core/db'
import { users, creditLog } from '@/core/db/schema'
import { eq } from 'drizzle-orm'

export class InsufficientCreditsError extends Error {
  constructor(available: number, required: number) {
    super(`Insufficient credits. Available: ${available}, Required: ${required}`)
    this.name = 'InsufficientCreditsError'
  }
}

export async function debitCredits(
  userId: number,
  amount: number,
  reason: string,
  metadata?: Record<string, any>,
  idempotencyKey?: string
) {
  if (amount <= 0) {
    throw new Error('Debit amount must be positive')
  }

  return await db.transaction(async (tx) => {
    // Check idempotency
    if (idempotencyKey) {
      const existing = await tx
        .select()
        .from(creditLog)
        .where(eq(creditLog.idempotencyKey, idempotencyKey))
        .limit(1)

      if (existing.length > 0) {
        console.log('Operation already processed:', idempotencyKey)
        return existing[0]
      }
    }

    // Lock user row (pessimistic lock)
    const user = await tx
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .for('update') // SELECT ... FOR UPDATE
      .limit(1)

    if (!user[0]) {
      throw new Error('User not found')
    }

    const currentBalance = user[0].credits

    // Validate sufficient balance
    if (currentBalance < amount) {
      throw new InsufficientCreditsError(currentBalance, amount)
    }

    const newBalance = currentBalance - amount

    // Update credits
    await tx
      .update(users)
      .set({
        credits: newBalance,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))

    // Log transaction
    const [logEntry] = await tx
      .insert(creditLog)
      .values({
        userId,
        amount: -amount, // Negative for debit
        balanceBefore: currentBalance,
        balanceAfter: newBalance,
        operation: 'debit',
        reason,
        metadata,
        idempotencyKey,
      })
      .returning()

    return logEntry
  })
}
```

### Add Credits

```typescript
export async function addCredits(
  userId: number,
  amount: number,
  reason: string,
  metadata?: Record<string, any>,
  idempotencyKey?: string
) {
  if (amount <= 0) {
    throw new Error('Credit amount must be positive')
  }

  return await db.transaction(async (tx) => {
    // Check idempotency
    if (idempotencyKey) {
      const existing = await tx
        .select()
        .from(creditLog)
        .where(eq(creditLog.idempotencyKey, idempotencyKey))
        .limit(1)

      if (existing.length > 0) {
        return existing[0]
      }
    }

    // Lock user
    const user = await tx
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .for('update')
      .limit(1)

    if (!user[0]) {
      throw new Error('User not found')
    }

    const currentBalance = user[0].credits
    const newBalance = currentBalance + amount

    // Update credits
    await tx
      .update(users)
      .set({
        credits: newBalance,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))

    // Log transaction
    const [logEntry] = await tx
      .insert(creditLog)
      .values({
        userId,
        amount, // Positive for credit
        balanceBefore: currentBalance,
        balanceAfter: newBalance,
        operation: 'credit',
        reason,
        metadata,
        idempotencyKey,
      })
      .returning()

    return logEntry
  })
}
```

### Get Balance

```typescript
export async function getBalance(userId: number) {
  const user = await db
    .select({ credits: users.credits })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)

  if (!user[0]) {
    throw new Error('User not found')
  }

  return user[0].credits
}
```

### Check Balance (Before Operation)

```typescript
export async function hasCredits(userId: number, amount: number = 1) {
  const balance = await getBalance(userId)
  return balance >= amount
}
```

## 🔒 Optimistic Locking (Alternative)

### Optimistic Debit

```typescript
export async function debitCreditsOptimistic(
  userId: number,
  amount: number,
  reason: string,
  maxRetries: number = 3
) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await db.transaction(async (tx) => {
        // Read without locking
        const user = await tx
          .select()
          .from(users)
          .where(eq(users.id, userId))
          .limit(1)

        if (!user[0]) throw new Error('User not found')

        const currentBalance = user[0].credits
        const currentVersion = user[0].version

        if (currentBalance < amount) {
          throw new InsufficientCreditsError(currentBalance, amount)
        }

        const newBalance = currentBalance - amount

        // Update with version check
        const result = await tx
          .update(users)
          .set({
            credits: newBalance,
            version: currentVersion + 1,
            updatedAt: new Date(),
          })
          .where(
            and(eq(users.id, userId), eq(users.version, currentVersion))
          )

        if (result.rowCount === 0) {
          throw new Error('Concurrent modification detected')
        }

        // Log transaction
        await tx.insert(creditLog).values({
          userId,
          amount: -amount,
          balanceBefore: currentBalance,
          balanceAfter: newBalance,
          operation: 'debit',
          reason,
        })

        return newBalance
      })
    } catch (error) {
      if (
        error.message === 'Concurrent modification detected' &&
        attempt < maxRetries - 1
      ) {
        // Retry with exponential backoff
        const delay = Math.min(100 * 2 ** attempt, 1000)
        await new Promise((resolve) => setTimeout(resolve, delay))
        continue
      }
      throw error
    }
  }

  throw new Error('Max retries exceeded')
}
```

## 📊 Audit & History

### Get User Transaction History

```typescript
export async function getTransactionHistory(
  userId: number,
  limit: number = 50,
  offset: number = 0
) {
  const history = await db
    .select()
    .from(creditLog)
    .where(eq(creditLog.userId, userId))
    .orderBy(desc(creditLog.createdAt))
    .limit(limit)
    .offset(offset)

  return history
}
```

### Get Balance Changes Over Time

```typescript
export async function getBalanceHistory(userId: number, days: number = 30) {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.setDate() - days)

  const history = await db
    .select({
      date: sql<string>`DATE(${creditLog.createdAt})`,
      totalCredits: sql<number>`SUM(CASE WHEN ${creditLog.amount} > 0 THEN ${creditLog.amount} ELSE 0 END)`,
      totalDebits: sql<number>`SUM(CASE WHEN ${creditLog.amount} < 0 THEN ABS(${creditLog.amount}) ELSE 0 END)`,
      netChange: sql<number>`SUM(${creditLog.amount})`,
    })
    .from(creditLog)
    .where(
      and(
        eq(creditLog.userId, userId),
        gte(creditLog.createdAt, cutoffDate)
      )
    )
    .groupBy(sql`DATE(${creditLog.createdAt})`)
    .orderBy(sql`DATE(${creditLog.createdAt}) DESC`)

  return history
}
```

### Reconcile Balance

```typescript
export async function reconcileBalance(userId: number) {
  // Calculate expected balance from log
  const logs = await db
    .select()
    .from(creditLog)
    .where(eq(creditLog.userId, userId))

  const expectedBalance = logs.reduce((sum, log) => sum + log.amount, 0)

  // Get actual balance
  const actualBalance = await getBalance(userId)

  if (expectedBalance !== actualBalance) {
    console.error('Balance discrepancy detected!', {
      userId,
      expected: expectedBalance,
      actual: actualBalance,
      difference: actualBalance - expectedBalance,
    })

    return {
      reconciled: false,
      expected: expectedBalance,
      actual: actualBalance,
      difference: actualBalance - expectedBalance,
    }
  }

  return {
    reconciled: true,
    balance: actualBalance,
  }
}
```

## ⚡ Performance Optimization

### Batch Operations

```typescript
export async function debitCreditsMultiple(
  operations: Array<{ userId: number; amount: number; reason: string }>
) {
  return await db.transaction(async (tx) => {
    const results = []

    for (const op of operations) {
      const user = await tx
        .select()
        .from(users)
        .where(eq(users.id, op.userId))
        .for('update')
        .limit(1)

      if (!user[0]) continue

      if (user[0].credits < op.amount) {
        throw new InsufficientCreditsError(user[0].credits, op.amount)
      }

      const newBalance = user[0].credits - op.amount

      await tx
        .update(users)
        .set({ credits: newBalance })
        .where(eq(users.id, op.userId))

      const [log] = await tx
        .insert(creditLog)
        .values({
          userId: op.userId,
          amount: -op.amount,
          balanceBefore: user[0].credits,
          balanceAfter: newBalance,
          operation: 'debit',
          reason: op.reason,
        })
        .returning()

      results.push(log)
    }

    return results
  })
}
```

## 📖 Resources

- [Transaction Patterns](./resources/transaction-patterns.md) - Padrões de transações
- [Audit Trail](./resources/audit-trail.md) - Implementação de audit log

## 🔗 Links Úteis

- [PostgreSQL Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)
- [Drizzle Transactions](https://orm.drizzle.team/docs/transactions)
- [ACID Properties](https://en.wikipedia.org/wiki/ACID)
- [Optimistic vs Pessimistic Locking](https://stackoverflow.com/questions/129329/optimistic-vs-pessimistic-locking)

