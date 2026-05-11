# Tech Stack Decision — Stack Standard

Conteúdo referencial de stack padrão recomendada para tech-stack-decision.

## Instructions

1. **Identificar tipo de projeto**: SaaS, API, Full-stack, Agent-based
2. **Avaliar requisitos**: Performance, escalabilidade, DX, time expertise
3. **Consultar stack padrão**: Verificar tecnologias recomendadas
4. **Validar compatibilidade**: Garantir que tecnologias funcionam juntas
5. **Documentar decisão**: Registrar escolha e justificativa

## Safety

- **Evitar bleeding edge**: Preferir versões estáveis a versões beta/canary
- **Validar compatibilidade**: Garantir que versões são compatíveis entre si
- **Considerar manutenção**: Avaliar suporte de longo prazo
- **Documentar decisões**: Usar ADRs para decisões importantes

## 📊 Stack Padrão Recomendada (Fevereiro 2026)

### Frontend

| Tecnologia | Versão Recomendada | Status | Notas |
|------------|-------------------|--------|-------|
| **Runtime** | Bun | `1.3.9+` | ✅ Stable - Mais rápido que Node/npm |
| **Framework** | Next.js | `16.0.10+` | ✅ Stable - Turbopack default, React 19 |
| **Styling** | Tailwind CSS | `4.0+` | ✅ Stable - Engine reescrita, muito mais rápido |
| **UI Components** | shadcn/ui | `latest` | ✅ Stable - Componentes copiáveis, não lib |
| **Auth** | Better Auth | `1.4.18+` | ✅ Stable - TypeScript-first, completo |
| **AI Chat UI** | AI SDK UI (`@ai-sdk/react`) | `1.0+` (SDK `6.0+`) | ✅ Stable - useChat, streaming, tools |
| **Design System** | Bagual (Tailwind v4 tokens) | - | 📐 Ver skill `frontend-design` |
| **Icons** | Lucide React | `latest` | ✅ Stable - SVG, tree-shakeable |

### Backend / Agent

| Tecnologia | Versão Recomendada | Status | Notas |
|------------|-------------------|--------|-------|
| **Runtime** | Python | `3.12+` | ✅ Stable - Performance melhorada |
| **Framework** | FastAPI | `0.129.0+` | ✅ Stable - Async, auto docs, Pydantic |
| **Agent Framework** | LangGraph | `1.0+` | ✅ Stable - v1.0 desde out/2025 |
| **Checkpointer** | langgraph-checkpoint-postgres | `latest` | ✅ Stable - Persistência de estado |

### Database & ORM

| Tecnologia | Versão Recomendada | Status | Notas |
|------------|-------------------|--------|-------|
| **Database** | PostgreSQL | `16+` | ✅ Stable - Performance e features |
| **ORM (TypeScript)** | Drizzle | `0.45.1+` | ✅ Stable - Type-safe, lightweight |
| **ORM (Python)** | SQLAlchemy | `2.0+` | ✅ Stable - Async support |

### Payments & External Services

| Tecnologia | Versão Recomendada | Status | Notas |
|------------|-------------------|--------|-------|
| **Payments** | Stripe | `latest SDK` | ✅ Stable - API bem documentada |
| **Email** | Resend | `latest` | ✅ Stable - DX excelente |
| **Storage** | S3-compatible | - | ✅ Stable - AWS S3, Cloudflare R2, etc |

### Testing

| Tecnologia | Versão Recomendada | Status | Notas |
|------------|-------------------|--------|-------|
| **E2E Testing** | Playwright | `latest` | ✅ Stable - Multi-browser, rápido |
| **Unit (TypeScript)** | Vitest | `latest` | ✅ Stable - Compatível com Vite/Bun |
| **Unit (Python)** | pytest | `latest` | ✅ Stable - Padrão da indústria |

## ⚠️ Versões a Evitar

### ❌ Não Usar

| Tecnologia | Versão | Motivo |
|------------|--------|--------|
| Next.js | `< 15` | Falta Turbopack, React 19 |
| Tailwind | `< 4.0` | Engine antiga, mais lento |
| LangGraph | `< 1.0` | Breaking changes frequentes |
| Python | `< 3.10` | Falta type hints modernos |
| PostgreSQL | `< 14` | Falta features importantes |

### ⚠️ Usar com Cuidado

| Tecnologia | Versão | Motivo |
|------------|--------|--------|
| Next.js | `canary` | Instável, pode quebrar |
| Bun | `< 1.3` | Bugs em Windows |
| Better Auth | `beta` | API pode mudar |
| Drizzle | `1.0-beta` | Ainda em beta |
