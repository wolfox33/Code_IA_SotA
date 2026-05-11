---
name: testing-patterns-chat
description: "Use quando implementar, revisar ou padronizar testes para aplicações de chat; esta skill orienta unit, integration, E2E, mocking e streaming sem cobrir configuração de CI/CD."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "development"
  complexity: 6
  status: active
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

## Pitfalls

- **Não mockar database em integration tests**: isso testa a borda errada; use database de teste real
- **Testes E2E que dependem de estado de outros testes**: cada teste E2E deve ser independente
- **Não testar streaming sem validar ordem dos chunks**: verifique que os chunks chegam na sequência correta
- **Concurrent tests sem controle de transação**: use isolamento adequado para evitar flakes

> **Skill log**
> - [2026-05-11] Skill criada com padrões de testes para aplicações de chat.
> - [2026-05-11] Stage 6 (Batch 6) adicionou seções operacionais faltantes e removeu emoji de heading Objetivo.
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/` — densidade de 30% para 58%.

## References

- `references/quick-reference.md` — Templates prontos de unit tests, integration tests, E2E e mocks
- `references/testing-patterns.md` — Padrões de database isolation, mock auth, streaming e concorrência
- `references/resources.md` — Links úteis (Vitest, Playwright, Testing Library)

