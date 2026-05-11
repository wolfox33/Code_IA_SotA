# Tech Stack Decision — Decision Guide

Conteúdo referencial de guia de decisão por tipo de projeto e critérios para tech-stack-decision.

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
