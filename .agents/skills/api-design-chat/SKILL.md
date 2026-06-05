---
name: api-design-chat
description: "Padrões de design de API REST para aplicações de chat incluindo route handlers, authentication, validation, error handling, rate limiting e streaming endpoints."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "development"
  complexity: 5
  status: active
  tags:
    - api
    - rest
    - nextjs
    - authentication
    - validation
    - chat
---

# API Design for Chat Applications

Guia completo de design de APIs para chat com Next.js Route Handlers.

## Objetivo

Fornecer:
- **RESTful design** patterns
- **Authentication** middleware
- **Input validation** (Zod)
- **Error handling** consistente
- **Rate limiting** patterns
- **Streaming** endpoints

## Use this skill when

- Designar APIs REST para aplicações de chat com Next.js Route Handlers
- Implementar autenticação em endpoints
- Adicionar validação de input com Zod
- Configurar rate limiting para endpoints públicos
- Criar endpoints de streaming para chat
- Padronizar error handling em APIs

## Do not use this skill when

- A aplicação não usar Next.js Route Handlers
- A API não for RESTful (GraphQL, gRPC, etc.)
- A tarefa for apenas configurar framework sem implementar endpoints
- A autenticação já estiver implementada e não precisar de mudança

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Endpoints implementados com autenticação, validação e error handling
- Middleware de rate limiting configurado
- Schema de validação Zod definido para inputs
- Exemplos de streaming endpoints se aplicável
- Documentação de padrões de error handling

## Procedure

### 1. Identificar os endpoints necessários

Liste quais endpoints a aplicação de chat precisa:

- Conversations (list, create, get, update, delete)
- Messages (create, list, get)
- Templates (list, create, update, delete)
- Streaming (SSE ou similar)

### 2. Implementar autenticação

Use `auth.api.getSession()` para proteger endpoints:

```typescript
import { auth } from '@/core/auth'

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // ... lógica do endpoint
}
```

### 3. Adicionar validação com Zod

Defina schemas para inputs:

```typescript
import { z } from 'zod'

const createMessageSchema = z.object({
  conversationId: z.number(),
  content: z.string().min(1).max(10000),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = createMessageSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: result.error.issues },
      { status: 400 }
    )
  }
  // ... use validated data
}
```

### 4. Configurar rate limiting

Implemente rate limiting para endpoints públicos ou caros:

```typescript
import { rateLimit } from '@/core/rate-limit'

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const limit = rateLimit(`chat:${session.user.id}`, {
    windowMs: 60_000,
    maxRequests: 20,
  })

  if (!limit.success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
    )
  }
  // ... processo normal
}
```

### 5. Padronizar error handling

Use respostas consistentes para erros:

```typescript
return NextResponse.json(
  { error: 'Descrição clara do erro' },
  { status: código HTTP apropriado }
)
```

### 6. Implementar streaming se necessário

Para endpoints de chat que precisam de streaming:

```typescript
export async function POST(req: NextRequest) {
  // ... validação e autenticação
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' }
  })
}
```

## Verification

- Endpoints têm autenticação onde necessário
- Inputs são validados com Zod
- Rate limiting está configurado para endpoints públicos
- Error handling é consistente
- Streaming endpoints usam headers corretos

> **Skill log**
> - [2026-05-11] Skill criada com padrões de API REST para aplicações de chat.
> - [2026-05-11] Stage 6 (Batch 4) adicionou seções operacionais faltantes para reduzir warnings de validação.
> - [2026-06-04] Refatorada: Quick Reference movido para references/quick-reference.md para reduzir densidade do SKILL.md.

## References

Conteúdo referencial detalhado, exemplos de implementação e patterns estão disponíveis em:
- `references/quick-reference.md` - Quick Reference com exemplos de authenticated endpoints, validation e rate limiting
