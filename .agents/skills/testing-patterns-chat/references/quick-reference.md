# Quick Reference — Testing Patterns for Chat

Templates prontos de testes para aplicações de chat.

## Unit Test (Vitest)

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

## Integration Test (API)

```typescript
// features/chat/api/send.test.ts
import { describe, it, expect } from 'vitest'
import { POST } from '@/app/api/chat/send/route'

describe('POST /api/chat/send', () => {
  it('should send message successfully', async () => {
    const request = new Request('http://localhost/api/chat/send', {
      method: 'POST',
      body: JSON.stringify({ conversationId: 1, content: 'Hello' }),
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

## E2E Test (Playwright)

```typescript
// e2e/chat.spec.ts
import { test, expect } from '@playwright/test'

test('should send and receive chat message', async ({ page }) => {
  await page.goto('http://localhost:3000/chat/1')
  await page.fill('[placeholder="Type a message..."]', 'Hello AI')
  await page.click('button:has-text("Send")')
  await expect(page.locator('text=Hello AI')).toBeVisible()
  await expect(page.locator('.message.assistant')).toBeVisible({ timeout: 10000 })
})
```

## Mock LLM

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
