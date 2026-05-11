# Vertical Slice + Modular Monolith — Structure

Conteúdo referencial de estrutura de projeto para vertical-slice-modular-monolith.

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
