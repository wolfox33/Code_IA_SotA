---
name: vertical-slice-modular-monolith
description: "Use quando a tarefa definir ou revisar arquitetura modular de SaaS/app web: boundaries de features, vertical slices, modular monolith, acoplamento entre módulos ou refactor estrutural."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "architecture"
  complexity: 4
  tags:
    - architecture
    - vertical-slice
    - modular-monolith
    - saas
    - clean-code
---

# Vertical Slice + Modular Monolith Architecture

Arquitetura padrão obrigatória para todos os novos projetos SaaS. Combina **Vertical Slice Architecture** com **Modular Monolith** para criar sistemas escaláveis, mantíveis e de rápido desenvolvimento.

## 🎯 Objetivo

Criar aplicações que:
- Escalam até **50k-100k usuários** sem reescrita
- Permitem **alta velocidade de desenvolvimento**
- Mantêm **baixo acoplamento** entre módulos
- Facilitam **manutenção e evolução**
- Evitam **overengineering** e abstrações prematuras
- Possibilitam **migração futura** para microservices (se necessário)

## Use this skill when

- Iniciando um SaaS/app web sem arquitetura de módulos definida.
- Planejando boundaries entre features, domínios, services e dados.
- Refatorando monólito em camadas para módulos/coortes de features.
- Revisando acoplamento entre módulos ou criando padrões arquiteturais do projeto.
- Projetando multi-tenant, multi-módulo ou crescimento gradual sem microservices.

## Do not use this skill when

- A tarefa é uma correção local sem mudança estrutural.
- Sistema já é microservices bem estabelecido.
- Projeto é script simples, ferramenta CLI ou app com poucos módulos.
- Time/projeto já tem arquitetura consolidada e funcional.
- A necessidade comprovada é separação física de serviços, não monólito modular.

## Instructions

1. **Entender domínio**: Identificar bounded contexts e features principais
2. **Estruturar projeto**: Criar estrutura base (core/, features/, lib/, app/)
3. **Definir features**: Cada feature como vertical slice independente
4. **Estabelecer regras**: Comunicação entre features via services, nunca repos diretos
5. **Implementar isolamento**: Cada feature com sua própria lógica, dados e UI
6. **Validar arquitetura**: Revisar contra princípios e anti-patterns

Consulte `resources/implementation-guide.md` para estrutura detalhada, exemplos de código e checklists.

## Safety

- **Evitar acoplamento**: Features não devem acessar repositórios de outras features diretamente
- **Prevenir god objects**: Manter core/ apenas com infraestrutura, sem lógica de negócio
- **Documentar decisões**: Usar ADRs para decisões arquiteturais importantes
- **Validar isolamento**: Garantir que features podem ser testadas independentemente

## 🧠 Princípios Fundamentais

### 1. Modular Monolith por Padrão

**Todo projeto começa como monólito modular:**
- ✅ Um único deploy
- ✅ Um único banco de dados
- ✅ Código organizado em módulos isolados
- ❌ Sem microservices no início

**Microservices só quando:**
- Múltiplos times independentes
- Volume massivo comprovado (>100k usuários ativos)
- Necessidade clara de separação física
- Domínios completamente independentes

**Antes disso → monólito modular.**

### 2. Vertical Slice como Estrutura Base

**Toda funcionalidade é uma slice independente:**
- Cada feature contém: lógica + dados + endpoints + UI
- Organização por **feature**, não por camada técnica
- Evitar separação artificial (controllers/, services/, repositories/)

**❌ Evitar:**
```
controllers/
services/
utils/
repositories/
```

**✅ Preferir:**
```
features/
  auth/
  billing/
  users/
```

### 3. Simplicidade > Complexidade

- Se parecer overengineering → **está errado**
- Criar abstrações **só quando necessário**
- Código legível > código "enterprise"
- Evitar camadas vazias e interfaces desnecessárias

## 🧱 Estrutura Obrigatória do Projeto

```
src/
 ├─ core/           # Infraestrutura compartilhada
 ├─ features/       # Vertical slices (domínios)
 ├─ lib/            # Bibliotecas e utilitários compartilhados
 └─ app/            # Configuração da aplicação
```

### 📦 CORE (Infraestrutura Compartilhada)

**Contém apenas código global reutilizável:**

```
core/
 ├─ db.ts           # Conexão e configuração do banco
 ├─ db/
 │   └─ schema.ts   # Schema do banco (Drizzle/Prisma)
 ├─ auth.ts         # Sistema de autenticação
 ├─ auth-client.ts  # Cliente de auth (React hooks)
 ├─ config.ts       # Configurações globais
 ├─ logger.ts       # Sistema de logging
 ├─ cache.ts        # Cache (Redis, etc.)
 ├─ stripe.ts       # Cliente Stripe
 ├─ llm.ts          # Cliente LLM (OpenAI, Anthropic)
 ├─ sentry.ts       # Error tracking
 └─ security.ts     # Middlewares de segurança
```

**Regras:**
- ❌ Sem lógica de negócio
- ❌ Sem regras de domínio
- ✅ Apenas infraestrutura técnica
- ✅ Código reutilizável por todas as features

### 🧩 FEATURES (Vertical Slices)

**Cada domínio do sistema é uma feature isolada:**

```
features/
 ├─ auth/           # Autenticação e autorização
 ├─ users/          # Gestão de usuários
 ├─ billing/        # Faturamento e pagamentos
 ├─ credits/        # Sistema de créditos
 ├─ chat/           # Chat/mensagens
 ├─ agents/         # Agentes AI (se aplicável)
 ├─ templates/      # Templates/modelos
 ├─ conversations/  # Conversas/histórico
 └─ analytics/      # Analytics e métricas
```

**Cada feature funciona como mini-sistema independente.**

### 📂 Estrutura Interna de uma Feature

**Exemplo: `chat/`**

```
features/chat/
 ├─ api/                    # Endpoints HTTP
 │   ├─ send-message.ts     # POST /api/chat/send
 │   └─ get-history.ts      # GET /api/chat/history
 │
 ├─ service/                # Lógica de negócio
 │   ├─ send-message.ts     # Orquestra envio de mensagem
 │   └─ process-ai.ts       # Processa resposta AI
 │
 ├─ repo/                   # Acesso a dados
 │   └─ chat-repo.ts        # CRUD de mensagens
 │
 ├─ types.ts                # TypeScript types/interfaces
 ├─ validators.ts           # Validação de dados (Zod, etc.)
 │
 └─ components/             # UI (se houver)
     ├─ ChatInterface.tsx
     └─ MessageList.tsx
```

## 🔒 Regras de Isolamento

### Regra 1: Feature NÃO Acessa DB de Outra Diretamente

**❌ Errado:**
```typescript
// features/chat/service/send-message.ts
import { creditsRepo } from '@/features/credits/repo/credits-repo'

// Acessando repositório de outra feature diretamente
const balance = await creditsRepo.getBalance(userId)
```

**✅ Certo:**
```typescript
// features/chat/service/send-message.ts
import { debitCredits } from '@/features/credits/service/debit'

// Chamando service público de outra feature
const result = await debitCredits(userId, amount)
```

### Regra 2: Comunicação Entre Features Via Service

**Sempre via função de serviço:**
```typescript
// features/credits/service/debit.ts
export async function debitCredits(userId: string, amount: number) {
  // Lógica interna da feature
  const balance = await creditsRepo.getBalance(userId)
  if (balance < amount) throw new Error('Insufficient credits')
  
  return await creditsRepo.debit(userId, amount)
}
```

**Nunca acessar repo direto de outra feature.**

### Regra 3: Nada de Pasta `utils/` Global Gigante

**Se util pertence a uma feature:**
```
features/chat/utils/
  format-message.ts
```

**Se é global (usado por 3+ features):**
```
lib/
  date-utils.ts
  string-utils.ts
```

### Regra 4: Código Próximo de Quem Usa

**Princípio da proximidade:**
- Tudo deve estar próximo da feature que utiliza
- Evitar helpers globais desnecessários
- Evitar abstrações prematuras
- Evitar camadas vazias

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

## ✅ Boas Práticas Obrigatórias

1. **Simplicidade > Arquitetura Complexa**
   - Se parecer overengineering → está errado

2. **Criar Abstrações Só Quando Necessário**
   - Nunca antecipar abstrações
   - Regra dos 3: abstrair quando usado 3+ vezes

3. **Código Legível > Código "Enterprise"**
   - Preferir clareza a padrões complexos

4. **Evitar Camadas Vazias**
   - Não criar controllers inúteis
   - Não criar interfaces desnecessárias
   - Não criar classes abstratas sem motivo

5. **Testes Próximos ao Código**
   ```
   features/chat/
     service/
       send-message.ts
       send-message.test.ts  ← Teste ao lado
   ```

## 🚫 Anti-Patterns Proibidos

### ❌ Arquitetura em Camadas Tradicional
```
controllers/
services/
repositories/
models/
```

### ❌ Pasta `utils/` Gigante
```
utils/
  helpers/
    global.ts
    everything.ts
```

### ❌ Microservices Prematuros
- Separar serviços cedo demais
- Antes de 50k usuários
- Sem necessidade comprovada

### ❌ Hexagonal/Clean Architecture Pesada
**Só usar quando:**
- Múltiplos devs (5+)
- Domínio extremamente complexo
- Necessidade de trocar implementações frequentemente

**Para SaaS típico → overkill.**

## 📈 Escalabilidade Esperada

**Essa arquitetura suporta:**
- ✅ Até **50k–100k usuários**
- ✅ Múltiplas features (10-50+)
- ✅ Múltiplos agentes AI
- ✅ Crescimento contínuo
- ✅ Sem necessidade de reescrever

**Quando migrar para microservices:**
- Sistema com 100k+ usuários ativos
- Múltiplos times independentes (3+)
- Alto volume extremo comprovado
- Domínios completamente independentes

**Antes disso: manter simples e modular.**

## 🏁 Regra Final

**Todo novo projeto deve começar com:**
> **Modular Monolith + Vertical Slice**

**Se em algum momento:**
- Sistema ficar grande demais
- Múltiplos times independentes
- Alto volume extremo

**Aí sim avaliar:**
- Extração de serviços específicos
- Migração gradual (Strangler Pattern)

**Antes disso:**
> **Manter simples e modular.**

## Resources

- `resources/implementation-guide.md` - Guia detalhado de implementação
- `resources/feature-template.md` - Template de feature

## Example Interactions

- "Criar nova feature de notificações seguindo vertical slice"
- "Refatorar módulo de pagamentos para modular monolith"
- "Revisar arquitetura do projeto para identificar acoplamento"
- "Estabelecer comunicação entre features auth e users"
- "Migrar pasta utils/ para estrutura modular"
- "Criar ADR para decisão de usar monólito vs microservices"

