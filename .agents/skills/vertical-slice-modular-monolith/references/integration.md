# Vertical Slice + Modular Monolith — Integration

Conteúdo referencial de integração para vertical-slice-modular-monolith.

## 🌐 Organização de API

**Lógica de negócio fica dentro da própria feature:**

```
features/chat/service/send-message.ts    # Lógica de negócio
features/billing/service/process-payment.ts
features/auth/service/login.ts
```

**O roteamento apenas conecta (thin wrapper):**
```typescript
// app/routes.ts (Express/Fastify)
import { sendMessage } from '@/features/chat/api/send'
import { webhookHandler } from '@/features/billing/api/webhook'

app.post('/api/chat/send', sendMessage)
app.post('/api/billing/webhook', webhookHandler)
```

### Integração com Next.js App Router

Next.js exige que routes fiquem em `app/api/`. Nesse caso, os `route.ts` devem ser **thin wrappers** que delegam toda lógica para `features/*/service/`:

```typescript
// app/api/chat/send/route.ts (thin wrapper)
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/core/auth'
import { sendMessage } from '@/features/chat/service/send-message'

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const result = await sendMessage({ userId: session.user.id, ...body })
  return NextResponse.json(result)
}
```

**Regras para Next.js:**
- `app/api/*/route.ts` → Apenas auth, parsing e delegação
- `features/*/service/` → Toda lógica de negócio
- ❌ Nunca colocar lógica de domínio em `route.ts`

**Server Actions também ficam dentro da feature:**
```
features/posts/actions/create-post.ts
features/billing/actions/checkout.ts
```

## 🧠 Serviços de Domínio

**Lógica real fica em `service/`:**

```
features/chat/service/
  send-message.ts      # Orquestra envio
  validate-input.ts    # Valida entrada
  process-ai.ts        # Processa AI

features/billing/service/
  create-checkout.ts   # Cria checkout
  process-payment.ts   # Processa pagamento
  
features/credits/service/
  debit.ts            # Debita créditos
  credit.ts           # Credita créditos
```

**Nunca misturar SQL dentro de service.**

## 🗄️ Repositórios (Acesso a Dados)

**Acesso ao banco fica isolado em `repo/`:**

```typescript
// features/chat/repo/chat-repo.ts
export const chatRepo = {
  async saveMessage(message: Message) {
    return await db.messages.create({ data: message })
  },
  
  async getHistory(userId: string, limit: number) {
    return await db.messages.findMany({
      where: { userId },
      take: limit,
      orderBy: { createdAt: 'desc' }
    })
  }
}
```

**Regras:**
- Repositório é a **única camada** que fala com o banco
- Service **nunca** tem SQL direto
- Repositório retorna **entidades de domínio**, não objetos do ORM

## 🎨 Frontend (Next.js/React)

**UI também segue vertical slice:**

```
features/chat/components/
  ChatInterface.tsx
  MessageList.tsx
  MessageInput.tsx

features/billing/components/
  CheckoutForm.tsx
  PricingTable.tsx

features/dashboard/components/
  StatsCard.tsx
  ActivityFeed.tsx
```

**Evitar pasta global gigante de componentes.**

**Componentes compartilhados:**
```
lib/components/
  Button.tsx
  Input.tsx
  Modal.tsx
```

## 🔌 Integração com Serviços Externos

### Integrações Globais (core/)

```
core/
 ├─ stripe.ts       # Cliente Stripe
 ├─ cache.ts        # Cliente Redis/Cache
 ├─ llm.ts          # Cliente LLM (OpenAI, Anthropic)
 ├─ sentry.ts       # Error tracking
```

### Wrappers Específicos por Feature

```
features/billing/stripe-service.ts
features/agents/llm-client.ts
features/cache/redis-cache.ts
```

**Princípio:**
- Cliente genérico em `core/`
- Lógica específica em `features/*/`

## 🤖 Arquitetura para Agentes AI (quando existir)

**Agentes sempre isolados em serviço próprio:**

```
agent/                    # Serviço separado (Python/FastAPI)
 ├─ main.py              # Entry point
 ├─ graph/               # LangGraph workflows
 ├─ tools/               # Ferramentas do agente
 ├─ templates/           # Prompts
 └─ config/              # Configurações
```

**Frontend nunca contém lógica de reasoning.**

**Comunicação:**
```
Frontend → Backend API → Agent Service (HTTP/gRPC)
```
