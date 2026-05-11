# Credit System — Audit & Reconciliation

Conteúdo referencial de audit trail e reconciliação para credit-system-transaction-management.

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
  cutoffDate.setDate(cutoffDate.getDate() - days)

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
