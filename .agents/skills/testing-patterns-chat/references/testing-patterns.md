# Testing Patterns — Chat Applications

Padrões reutilizáveis para testes de aplicações de chat.

## Pattern 1: Database Isolation

Limpe o database antes de cada teste para garantir independência.

```typescript
import { beforeEach, afterEach } from 'vitest'

beforeEach(async () => {
  await db.delete(messages)
  await db.delete(conversations)
  await db.delete(users)
})

afterEach(async () => {
  await db.delete(messages)
})
```

## Pattern 2: Mock Authentication

Mock de sessão para testes que requerem autenticação.

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

## Pattern 3: Test Streaming

Teste de respostas em streaming via fetch.

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
      chunks.push(decoder.decode(value))
    }

    expect(chunks.length).toBeGreaterThan(0)
    expect(chunks[chunks.length - 1]).toContain('done: true')
  })
})
```

## Pattern 4: Concurrent Operations

Teste de race conditions e operações concorrentes.

```typescript
describe('Concurrent Credits', () => {
  it('should handle concurrent debits correctly', async () => {
    await db.insert(users).values({ id: 1, credits: 10 })
    const operations = Array(15).fill(null).map(() => debitCredits(1, 1, 'test'))
    const results = await Promise.allSettled(operations)

    const successful = results.filter((r) => r.status === 'fulfilled').length
    const failed = results.filter((r) => r.status === 'rejected').length

    expect(successful).toBe(10)
    expect(failed).toBe(5)

    const user = await db.select().from(users).where(eq(users.id, 1))
    expect(user[0].credits).toBe(0)
  })
})
```
