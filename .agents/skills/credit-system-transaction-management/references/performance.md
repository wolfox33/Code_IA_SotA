# Credit System — Performance Optimization

Conteúdo referencial de otimização de performance para credit-system-transaction-management.

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

- [PostgreSQL Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)
- [Drizzle Transactions](https://orm.drizzle.team/docs/transactions)
- [ACID Properties](https://en.wikipedia.org/wiki/ACID)
- [Optimistic vs Pessimistic Locking](https://stackoverflow.com/questions/129329/optimistic-vs-pessimistic-locking)
