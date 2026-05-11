---
name: tech-stack-decision
description: "Use quando a tarefa exigir decisão explícita de tecnologia, versão, framework, runtime, banco, ORM, ferramenta de teste ou migração de stack para SaaS/app com requisitos ainda em aberto."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "development"
  complexity: 3
  tags:
    - stack
    - technology
    - decision
    - saas
    - framework
    - library
---

# Tech Stack Decision Guide

Guia definitivo para decisões de stack tecnológica em projetos SaaS. Use esta skill quando estiver em dúvida sobre quais tecnologias, frameworks ou versões utilizar.

## Objetivo

Fornecer decisões claras e fundamentadas sobre:
- **Frameworks e bibliotecas** para frontend e backend
- **Versões estáveis** recomendadas
- **Critérios de escolha** baseados em requisitos
- **Alternativas** e trade-offs
- **Compatibilidade** entre tecnologias

## Use this skill when

- Iniciar projeto e escolher stack ainda não definida.
- Comparar tecnologias similares com trade-offs reais.
- Validar framework, biblioteca, runtime, ORM, banco ou ferramenta de teste antes de adotar.
- Atualizar versões quando compatibilidade ou estabilidade forem parte da decisão.
- Estabelecer padrão tecnológico do time/projeto.
- Planejar migração de uma stack para outra.

## Do not use this skill when

- A tarefa é implementar em uma stack já definida no projeto.
- A dúvida é de API/uso de uma biblioteca específica, não escolha de tecnologia.
- Projeto tem requisitos de nicho não cobertos por este guia.
- Time já tem expertise consolidada e o usuário não pediu comparação.
- A decisão é apenas arquitetura de módulos; use `vertical-slice-modular-monolith`.

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Decisão clara de tecnologia, framework ou versão
- Justificativa baseada em requisitos do projeto
- Análise de trade-offs entre alternativas
- Matriz de compatibilidade entre tecnologias
- Documentação da decisão (ADR se apropriado)

## Procedure

### 1. Identificar tipo de projeto

Classifique o projeto: SaaS Full-Stack, API Backend, Agent-Based Application, Landing Page.

### 2. Avaliar requisitos

Considere: Performance, escalabilidade, DX, time expertise, tipo de projeto.

### 3. Consultar stack padrão

Use a stack padrão recomendada (Fevereiro 2026):

**Frontend**: Next.js 16, Tailwind v4, shadcn/ui, Better Auth, AI SDK UI
**Backend**: FastAPI 0.129+, Python 3.12+, LangGraph 1.0
**Database**: PostgreSQL 16, Drizzle (TS) ou SQLAlchemy 2.0 (Python)

### 4. Validar compatibilidade

Verifique matriz de compatibilidade entre tecnologias:

```typescript
| Next.js 16 | Bun 1.3+ | Tailwind 4+ | Better Auth 1.4+ | Drizzle 0.45+ | AI SDK UI 1.0+ |
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
```

### 5. Considerar alternativas

Avalie quando usar alternativas:

- Trocar Next.js por: Remix (nested routing), SvelteKit (Svelte), Astro (menos JS)
- Trocar FastAPI por: NestJS (TypeScript), Go + Gin (performance), Rust + Axum (segurança)
- Trocar PostgreSQL por: MySQL (expertise), MongoDB (não-estruturado), SQLite (pequeno)

### 6. Documentar decisão

Use template de ADR:

```markdown
## Decisão: [Tecnologia]

**Contexto:** Tipo de projeto, requisitos, time expertise
**Opções Consideradas:** Opção 1, Opção 2, Opção 3
**Decisão:** Tecnologia X versão Y
**Justificativa:** Motivo 1, Motivo 2, Motivo 3
**Trade-offs Aceitos:** Trade-off 1, Trade-off 2
**Revisão:** Revisar em [data] ou quando [condição]
```

## Verification

- Tecnologia escolhida é estável e production-ready
- Versão é compatível com outras tecnologias da stack
- Justificativa é baseada em requisitos do projeto
- Trade-offs são documentados
- Decisão é registrada em ADR ou documentação
- Alternativas foram consideradas e rejeitadas com motivo

> **Skill log**
> - [2026-05-11] Skill criada com guia de decisões de stack tecnológica.
> - [2026-05-11] Stage 6 (Batch 6) adicionou seções operacionais faltantes e removeu emoji de heading Objetivo.

## Instructions

1. **Identificar tipo de projeto**: SaaS, API, Full-stack, Agent-based
2. **Avaliar requisitos**: Performance, escalabilidade, DX, time expertise
3. **Consultar stack padrão**: Verificar tecnologias recomendadas
4. **Validar compatibilidade**: Garantir que tecnologias funcionam juntas
5. **Documentar decisão**: Registrar escolha e justificativa

Consulte `resources/stack-reference.md` para tabela completa de tecnologias.

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

## 🧭 Guia de Decisão por Tipo de Projeto

### 1. SaaS Full-Stack (Frontend + Backend + DB)

**Stack Recomendada:**
```
Frontend: Next.js 16 + Tailwind v4 + shadcn/ui
Runtime: Bun 1.3+
Auth: Better Auth 1.4+
AI Chat UI: AI SDK UI (@ai-sdk/react) 1.0+ com ai 6.0+
Database: PostgreSQL 16 + Drizzle
Payments: Stripe
Testing: Playwright + Vitest
```

**Quando usar:**
- Aplicação web com UI rica
- Necessita autenticação e pagamentos
- Escalabilidade até 100k usuários
- Time TypeScript/JavaScript

**Alternativas:**
- **Remix** (se preferir nested routing)
- **SvelteKit** (se preferir Svelte)
- **Prisma** (ORM alternativo, mais features mas mais pesado)

### 2. API Backend (Sem Frontend)

**Stack Recomendada:**
```
Framework: FastAPI 0.129+
Runtime: Python 3.12+
Database: PostgreSQL 16 + SQLAlchemy 2.0
Testing: pytest
```

**Quando usar:**
- API REST/GraphQL pura
- Microserviço
- Backend para mobile app
- Processamento de dados

**Alternativas:**
- **NestJS** (se time prefere TypeScript)
- **Go + Gin** (se performance extrema é crítica)
- **Rust + Axum** (se segurança/performance é crítica)

### 3. Agent-Based Application (AI/LLM)

**Stack Recomendada:**
```
Agent: Python 3.12 + FastAPI 0.129 + LangGraph 1.0
Frontend: Next.js 16 + Tailwind v4
Chat UI: AI SDK UI (@ai-sdk/react) 1.0+ com ai 6.0+
Database: PostgreSQL 16 (para checkpointing)
Checkpointer: langgraph-checkpoint-postgres
```

**Quando usar:**
- Aplicação com agentes AI
- Workflows complexos com LLMs
- Necessita persistência de estado
- Reasoning multi-step

**Alternativas:**
- **LangChain** (se não precisa de graph/state management)
- **CrewAI** (se foco em multi-agent collaboration)
- **AutoGen** (se foco em conversational agents)

### 4. Landing Page / Marketing Site

**Stack Recomendada:**
```
Framework: Next.js 16 (Static Export)
Styling: Tailwind v4
Deployment: Vercel / Cloudflare Pages
CMS: Contentful / Sanity (opcional)
```

**Quando usar:**
- Site estático/marketing
- Performance é crítica
- SEO é prioridade
- Baixa complexidade

**Alternativas:**
- **Astro** (se quer menos JavaScript)
- **Hugo** (se quer geração estática pura)

## 🔍 Critérios de Decisão

### Performance
- **Crítica**: Go, Rust, Bun
- **Alta**: FastAPI, Next.js 16 (Turbopack)
- **Boa**: Node.js, Python

### Developer Experience (DX)
- **Excelente**: Next.js, FastAPI, Drizzle, Better Auth
- **Boa**: NestJS, Prisma
- **Moderada**: Go, Rust

### Type Safety
- **Total**: TypeScript + Drizzle, Rust
- **Forte**: Python + Pydantic, Go
- **Moderada**: JavaScript

### Escalabilidade
- **Horizontal**: Stateless APIs (FastAPI, Next.js API)
- **Vertical**: PostgreSQL, Redis
- **Distribuída**: Microservices, Event-driven

### Maturidade
- **Muito Madura**: PostgreSQL, React, Python
- **Madura**: Next.js, FastAPI, Tailwind
- **Emergente**: Bun, LangGraph 1.0, Tailwind v4

### Comunidade
- **Enorme**: React, Next.js, PostgreSQL
- **Grande**: FastAPI, Tailwind, Drizzle
- **Crescente**: Bun, LangGraph, Better Auth

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

## 🔄 Matriz de Compatibilidade

### Frontend Stack

| Next.js | Bun | Tailwind | Better Auth | Drizzle | AI SDK UI |
|---------|-----|----------|-------------|---------|-----------|
| 16.0.10+ | 1.3.9+ | 4.0+ | 1.4.18+ | 0.45.1+ | 1.0+ (SDK 6.0+) |
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Notas:**
- Next.js 16 funciona perfeitamente com Bun 1.3+
- Tailwind v4 requer configuração específica (CSS-first)
- Better Auth integra nativamente com Next.js
- Drizzle funciona com qualquer runtime (Node, Bun, Deno)
- AI SDK UI (`@ai-sdk/react` 1.0+) requer `ai` 6.0+; hooks `useChat`, `useCompletion`, `useObject` para chat streaming

### Backend Stack

| FastAPI | Python | LangGraph | PostgreSQL | SQLAlchemy |
|---------|--------|-----------|------------|------------|
| 0.129.0+ | 3.12+ | 1.0+ | 16+ | 2.0+ |
| ✅ | ✅ | ✅ | ✅ | ✅ |

**Notas:**
- FastAPI 0.129+ requer Python 3.10+, recomendado 3.12+
- LangGraph 1.0 é estável e production-ready
- PostgreSQL 16 tem melhorias significativas de performance
- SQLAlchemy 2.0 tem async support nativo

## 🚀 Quando Considerar Alternativas

### Trocar Next.js por:
- **Remix**: Se preferir nested routing e server-first
- **SvelteKit**: Se time prefere Svelte a React
- **Astro**: Se quer menos JavaScript no cliente
- **Nuxt**: Se time prefere Vue

### Trocar FastAPI por:
- **NestJS**: Se time prefere TypeScript
- **Go + Gin**: Se performance é crítica (>100k RPS)
- **Rust + Axum**: Se segurança/performance extrema
- **Django**: Se precisa admin panel robusto

### Trocar PostgreSQL por:
- **MySQL**: Se time tem expertise
- **MongoDB**: Se dados são muito não-estruturados
- **SQLite**: Se projeto é pequeno/local
- **Supabase**: Se quer backend-as-a-service

### Trocar LangGraph por:
- **LangChain**: Se não precisa de state management
- **CrewAI**: Se foco é multi-agent
- **Custom**: Se workflow é muito simples

## 📝 Template de Decisão

Ao escolher tecnologia, documente:

```markdown
## Decisão: [Tecnologia]

**Contexto:**
- Tipo de projeto: [SaaS/API/Agent/etc]
- Requisitos: [Performance/DX/Escalabilidade]
- Time: [Expertise atual]

**Opções Consideradas:**
1. [Opção 1] - Prós/Contras
2. [Opção 2] - Prós/Contras
3. [Opção 3] - Prós/Contras

**Decisão:**
Escolhemos [Tecnologia X] versão [Y]

**Justificativa:**
- [Motivo 1]
- [Motivo 2]
- [Motivo 3]

**Trade-offs Aceitos:**
- [Trade-off 1]
- [Trade-off 2]

**Revisão:**
Revisar em [data] ou quando [condição]
```

## Resources

- `resources/stack-reference.md` - Referência completa de tecnologias

## Example Interactions

- "Qual stack usar para SaaS com agentes AI?"
- "Next.js 16 é compatível com Bun 1.3?"
- "Devo usar Prisma ou Drizzle?"
- "Qual versão estável do LangGraph?"
- "FastAPI ou NestJS para API backend?"
- "Migrar de Tailwind v3 para v4?"
- "PostgreSQL 16 ou MySQL 8 para novo projeto?"
- "Como integrar AI SDK UI com useChat no Next.js?"

## Behavioral Traits

- Sempre recomenda versões **estáveis** sobre bleeding edge
- Prioriza **Developer Experience** sem sacrificar performance
- Considera **maturidade** e **comunidade** da tecnologia
- Documenta **trade-offs** claramente
- Valida **compatibilidade** entre tecnologias
- Sugere **alternativas** quando apropriado
- Mantém decisões **atualizadas** com ecosystem

## Key Principles

1. **Estabilidade > Novidade**: Preferir versões estáveis
2. **DX > Complexidade**: Escolher ferramentas com boa DX
3. **Type Safety**: Priorizar type safety quando possível
4. **Compatibilidade**: Garantir que stack funciona junta
5. **Comunidade**: Considerar tamanho e atividade da comunidade
6. **Manutenção**: Avaliar suporte de longo prazo
7. **Performance**: Balancear performance com produtividade

