# Database Schema Design Chat — Quick Reference

Conteúdo referencial de quick reference para chat-application-engineering.

## Core Schema

```typescript
// core/db/schema.ts
import { pgTable, serial, text, integer, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  credits: integer('credits').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const templates = pgTable('templates', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  systemPrompt: text('system_prompt').notNull(),
  model: text('model').notNull(),
  temperature: real('temperature').default(0.7),
  isActive: boolean('is_active').default(true),
})

export const conversations = pgTable('conversations', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  templateId: integer('template_id').references(() => templates.id),
  title: text('title'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  conversationId: integer('conversation_id').references(() => conversations.id).notNull(),
  role: text('role', { enum: ['user', 'assistant', 'system'] }).notNull(),
  content: text('content').notNull(),
  tokens: integer('tokens'),
  cost: numeric('cost', { precision: 10, scale: 6 }),
  createdAt: timestamp('created_at').defaultNow(),
})
```

## Indexes

```typescript
import { index } from 'drizzle-orm/pg-core'

// Conversation indexes
index('conversations_user_id_idx').on(conversations.userId),
index('conversations_updated_at_idx').on(conversations.updatedAt),

// Message indexes
index('messages_conversation_id_idx').on(messages.conversationId),
index('messages_created_at_idx').on(messages.createdAt),
```

## Links Úteis

- [Drizzle ORM](https://orm.drizzle.team)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
