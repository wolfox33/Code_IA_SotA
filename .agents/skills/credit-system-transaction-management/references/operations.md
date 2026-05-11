# Credit System — Operations

Conteúdo referencial de operações de crédito para credit-system-transaction-management.

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
