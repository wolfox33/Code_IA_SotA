# Credit System — Database Schema

Conteúdo referencial de schema de database para credit-system-transaction-management.

## Instructions

1. **Setup database**: Schema para créditos e audit log
2. **Implement transactions**: Use Drizzle transactions
3. **Add idempotency**: Prevenir operações duplicadas
4. **Implement locking**: Choose between optimistic/pessimistic
5. **Audit trail**: Log todas as operações
6. **Validation**: Check balance antes de debitar
7. **Error handling**: Proper rollbacks
8. **Testing**: Test concurrent scenarios

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
