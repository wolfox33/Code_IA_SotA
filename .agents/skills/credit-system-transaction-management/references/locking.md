# Credit System — Locking Strategies

Conteúdo referencial de estratégias de locking para credit-system-transaction-management.

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
