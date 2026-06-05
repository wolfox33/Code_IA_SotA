# Performance Optimization — Database

Conteúdo referencial de database optimization para chat-application-engineering.

## Database Indexes

```typescript
// Create indexes for common queries
export const messagesIndexes = {
  conversationIdx: index('messages_conversation_id_idx').on(
    messages.conversationId
  ),
  createdAtIdx: index('messages_created_at_idx').on(messages.createdAt),
  userConversationIdx: index('conversations_user_id_idx').on(
    conversations.userId
  ),
}
```

## Query Optimization

```typescript
// ❌ BAD: N+1 query
const conversations = await db.select().from(conversations)
for (const conv of conversations) {
  const messages = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, conv.id))
}

// ✅ GOOD: Single query with join
const conversationsWithMessages = await db
  .select()
  .from(conversations)
  .leftJoin(messages, eq(messages.conversationId, conversations.id))
```
