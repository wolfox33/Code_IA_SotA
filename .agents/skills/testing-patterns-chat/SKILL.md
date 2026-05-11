---
name: testing-patterns-chat
description: "Padrões de testes para aplicações de chat incluindo unit tests, integration tests, E2E tests com Playwright, mocking LLMs, testing streaming, concurrent scenarios e testing Server Components/Actions."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "development"
  complexity: 6
  tags:
    - testing
    - jest
    - playwright
    - vitest
    - mocking
    - e2e
    - chat
---

# Testing Patterns for Chat Applications

Guia completo de testes para aplicações de chat com Next.js, LangGraph e streaming.

## Objetivo

Fornecer:
- **Unit tests** para services e utilities
- **Integration tests** para database e APIs
- **E2E tests** com Playwright
- **Mocking patterns** para LLMs e external APIs
- **Testing streaming** responses
- **Concurrent scenarios** testing
- **Server Components/Actions** testing

## Use this skill when

- Implementing tests para chat
- Testing AI integrations
- Validating streaming behavior
- Testing concurrent operations
- E2E testing chat flows
- Mocking external services

## Do not use this skill when

- A aplicação não ser de chat
- A tarefa for apenas configurar framework de teste sem implementar casos
- A tarefa for apenas código sem testes
- A aplicação não usar Next.js ou frameworks suportados

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Unit tests para services e utilities
- Integration tests para APIs e database
- E2E tests com Playwright para fluxos críticos
- Mocks para LLMs e external services
- Tests de streaming e concurrent operations
- Setup de isolamento de database para testes

## Procedure

### 1. Configurar framework de testes

Use Vitest para unit/integration tests e Playwright para E2E:

```bash
npm install -D vitest @playwright/test
```

### 2. Escrever unit tests

Teste services e utilities isoladamente:

```typescript
describe('debitCredits', () => {
  beforeEach(async () => {
    await db.delete(users)
    await db.insert(users).values({ id: 1, credits: 100 })
  })

  it('should debit credits successfully', async () => {
    await debitCredits(1, 10, 'test')
    const user = await db.select().from(users).where(eq(users.id, 1))
    expect(user[0].credits).toBe(90)
  })
})
```

### 3. Escrever integration tests

Teste APIs e database:

```typescript
describe('POST /api/chat/send', () => {
  it('should send message successfully', async () => {
    const request = new Request('http://localhost/api/chat/send', {
      method: 'POST',
      body: JSON.stringify({ conversationId: 1, content: 'Hello' }),
    })
    const response = await POST(request)
    expect(response.status).toBe(200)
  })
})
```

### 4. Escrever E2E tests

Teste fluxos completos com Playwright:

```typescript
test('should send and receive chat message', async ({ page }) => {
  await page.goto('http://localhost:3000/chat/1')
  await page.fill('[placeholder="Type a message..."]', 'Hello AI')
  await page.click('button:has-text("Send")')
  await expect(page.locator('text=Hello AI')).toBeVisible()
})
```

### 5. Mock LLMs e external services

Crie mocks para LLMs e APIs externas:

```typescript
export function mockLLMStream(response: string) {
  return vi.fn(async function* () {
    const words = response.split(' ')
    for (const word of words) {
      yield { messages: [{ content: word, _getType: () => 'ai' }] }
    }
  })
}
```

### 6. Isolar database

Limpe database antes de cada teste:

```typescript
beforeEach(async () => {
  await db.delete(messages)
  await db.delete(conversations)
  await db.delete(users)
})
```

### 7. Testar streaming

Teste streaming de respostas:

```typescript
it('should stream response chunks', async () => {
  const response = await fetch('/api/chat/stream', {
    method: 'POST',
    body: JSON.stringify({ message: 'Hello' }),
  })
  const reader = response.body?.getReader()
  const decoder = new TextDecoder()
  const chunks: string[] = []
  while (true) {
    const { done, value } = await reader!.read()
    if (done) break
    chunks.push(decoder.decode(value))
  }
  expect(chunks.length).toBeGreaterThan(0)
})
```

### 8. Testar cenários concorrentes

Teste race conditions e operações concorrentes:

```typescript
it('should handle concurrent debits correctly', async () => {
  await db.insert(users).values({ id: 1, credits: 10 })
  const operations = Array(15).fill(null).map(() => debitCredits(1, 1, 'test'))
  const results = await Promise.allSettled(operations)
  const successful = results.filter((r) => r.status === 'fulfilled').length
  expect(successful).toBe(10)
})
```

## Verification

- Unit tests cobrem services e utilities
- Integration tests cobrem APIs e database
- E2E tests cobrem fluxos críticos
- LLMs e external services estão mockados
- Database é isolado entre testes
- Streaming é testado corretamente
- Cenários concorrentes são testados

> **Skill log**
> - [2026-05-11] Skill criada com padrões de testes para aplicações de chat.
> - [2026-05-11] Stage 6 (Batch 6) adicionou seções operacionais faltantes e removeu emoji de heading Objetivo.

## Quick Reference

### Unit Test (Vitest)

```typescript
// features/credits/service/debit-credits.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { debitCredits } from '@/features/credits/service/debit-credits'

describe('debitCredits', () => {
  beforeEach(async () => {
    await db.delete(users)
    await db.insert(users).values({ id: 1, credits: 100 })
  })

  it('should debit credits successfully', async () => {
    await debitCredits(1, 10, 'test')

    const user = await db.select().from(users).where(eq(users.id, 1))
    expect(user[0].credits).toBe(90)
  })

  it('should throw on insufficient credits', async () => {
    await expect(debitCredits(1, 200, 'test')).rejects.toThrow(
      'Insufficient credits'
    )
  })
})
```

### Integration Test (API)

```typescript
// features/chat/api/send.test.ts
import { describe, it, expect } from 'vitest'
import { POST } from '@/app/api/chat/send/route'

describe('POST /api/chat/send', () => {
  it('should send message successfully', async () => {
    const request = new Request('http://localhost/api/chat/send', {
      method: 'POST',
      body: JSON.stringify({
        conversationId: 1,
        content: 'Hello',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.message).toBeDefined()
  })

  it('should return 401 without auth', async () => {
    const request = new Request('http://localhost/api/chat/send', {
      method: 'POST',
    })

    const response = await POST(request)
    expect(response.status).toBe(401)
  })
})
```

### E2E Test (Playwright)

```typescript
// e2e/chat.spec.ts
import { test, expect } from '@playwright/test'

test('should send and receive chat message', async ({ page }) => {
  await page.goto('http://localhost:3000/chat/1')

  // Type message
  await page.fill('[placeholder="Type a message..."]', 'Hello AI')
  await page.click('button:has-text("Send")')

  // User message appears immediately (optimistic)
  await expect(page.locator('text=Hello AI')).toBeVisible()

  // AI response streams in
  await expect(page.locator('text=AI is typing...')).toBeVisible()
  await expect(page.locator('.message.assistant')).toBeVisible({ timeout: 10000 })
})
```

### Mock LLM

```typescript
// lib/test-utils/mock-llm.ts
import { vi } from 'vitest'

export function mockLLMStream(response: string) {
  return vi.fn(async function* () {
    const words = response.split(' ')
    for (const word of words) {
      yield { messages: [{ content: word, _getType: () => 'ai' }] }
    }
  })
}

// Use in tests
const mockStream = mockLLMStream('This is a mocked response')
vi.spyOn(agent, 'stream').mockImplementation(mockStream)
```

## 🧪 Testing Patterns

### Pattern 1: Database Isolation

```typescript
import { beforeEach, afterEach } from 'vitest'

beforeEach(async () => {
  // Clear database before each test
  await db.delete(messages)
  await db.delete(conversations)
  await db.delete(users)
})

afterEach(async () => {
  // Cleanup after test
  await db.delete(messages)
})
```

### Pattern 2: Mock Authentication

```typescript
// lib/test-utils/mock-auth.ts
import { vi } from 'vitest'

export function mockAuth(userId: number) {
  vi.mock('@/core/auth', () => ({
    auth: {
      api: {
        getSession: vi.fn(() =>
          Promise.resolve({
            user: { id: userId, email: 'test@example.com' },
          })
        ),
      },
    },
  }))
}
```

### Pattern 3: Test Streaming

```typescript
describe('Streaming', () => {
  it('should stream response chunks', async () => {
    const response = await fetch('/api/chat/stream', {
      method: 'POST',
      body: JSON.stringify({ message: 'Hello' }),
    })

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()
    const chunks: string[] = []

    while (true) {
      const { done, value } = await reader!.read()
      if (done) break

      const chunk = decoder.decode(value)
      chunks.push(chunk)
    }

    expect(chunks.length).toBeGreaterThan(0)
    expect(chunks[chunks.length - 1]).toContain('done: true')
  })
})
```

### Pattern 4: Concurrent Operations

```typescript
describe('Concurrent Credits', () => {
  it('should handle concurrent debits correctly', async () => {
    await db.insert(users).values({ id: 1, credits: 10 })

    // Simulate 15 concurrent requests
    const operations = Array(15)
      .fill(null)
      .map(() => debitCredits(1, 1, 'test'))

    const results = await Promise.allSettled(operations)

    const successful = results.filter((r) => r.status === 'fulfilled').length
    const failed = results.filter((r) => r.status === 'rejected').length

    expect(successful).toBe(10) // Only 10 should succeed
    expect(failed).toBe(5)

    const user = await db.select().from(users).where(eq(users.id, 1))
    expect(user[0].credits).toBe(0)
  })
})
```

## 🔗 Links Úteis

- [Vitest](https://vitest.dev)
- [Playwright](https://playwright.dev)
- [Testing Library](https://testing-library.com)

