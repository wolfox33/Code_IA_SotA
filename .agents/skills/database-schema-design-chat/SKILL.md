---
name: database-schema-design-chat
description: "Padrões de design de schema PostgreSQL/Drizzle para aplicações de chat incluindo conversations, messages, templates, users, optimistic locking, indexes estratégicos e migrations."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "development"
  complexity: 5
  tags:
    - database
    - drizzle
    - postgresql
    - schema
    - migrations
    - chat
---

# Database Schema Design for Chat

Guia completo de design de schema para aplicações de chat com PostgreSQL e Drizzle ORM.

## Objetivo

Fornecer:
- **Schema completo** para chat (users, conversations, messages, templates)
- **Indexes estratégicos** para performance
- **Relationships** corretas (foreign keys)
- **Migrations** best practices
- **Data integrity** (constraints, validation)

## Use this skill when

- Designing chat database
- Planning schema migrations
- Optimizing query performance
- Implementing relationships
- Designing for scale

## Do not use this skill when

- A aplicação não usar PostgreSQL
- O ORM não for Drizzle
- A tarefa for apenas configurar banco sem definir schema
- O schema já estiver definido e não precisar de mudança
- A aplicação não for de chat (schema específico para conversas)

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Schema Drizzle definido com tabelas (users, conversations, messages, templates)
- Foreign keys configuradas corretamente
- Indexes estratégicos criados para performance
- Migration files geradas ou planejadas
- Documentação de relacionamentos entre tabelas

## Procedure

### 1. Definir tabelas core

Crie as tabelas básicas para chat:

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

### 2. Adicionar indexes estratégicos

Crie indexes para otimizar queries comuns:

```typescript
import { index } from 'drizzle-orm/pg-core'

// Conversation indexes
index('conversations_user_id_idx').on(conversations.userId),
index('conversations_updated_at_idx').on(conversations.updatedAt),

// Message indexes
index('messages_conversation_id_idx').on(messages.conversationId),
index('messages_created_at_idx').on(messages.createdAt),
```

### 3. Configurar relacionamentos

Use `references()` para foreign keys:

```typescript
userId: integer('user_id').references(() => users.id).notNull(),
templateId: integer('template_id').references(() => templates.id),
conversationId: integer('conversation_id').references(() => conversations.id).notNull(),
```

### 4. Planejar migrations

Use Drizzle Kit para gerar migrations:

```bash
npm run db:generate
npm run db:migrate
npm run db:push
```

### 5. Validar integridade

Confirme que:

- Foreign keys estão configuradas
- Indexes estão criados para queries comuns
- Constraints (notNull, unique) estão aplicadas
- Timestamps têm defaultNow()

## Verification

- Schema Drizzle está definido com todas as tabelas
- Foreign keys estão configuradas corretamente
- Indexes estratégicos estão criados
- Migration files foram geradas
- Queries comuns usam indexes

> **Skill log**
> - [2026-05-11] Skill criada com padrões de schema PostgreSQL/Drizzle para aplicações de chat.
> - [2026-05-11] Stage 6 (Batch 4) adicionou seções operacionais faltantes para reduzir warnings de validação.

## Quick Reference

### Core Schema

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

### Indexes

```typescript
import { index } from 'drizzle-orm/pg-core'

// Conversation indexes
index('conversations_user_id_idx').on(conversations.userId),
index('conversations_updated_at_idx').on(conversations.updatedAt),

// Message indexes
index('messages_conversation_id_idx').on(messages.conversationId),
index('messages_created_at_idx').on(messages.createdAt),
```

## 🔗 Links Úteis  

- [Drizzle ORM](https://orm.drizzle.team)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

