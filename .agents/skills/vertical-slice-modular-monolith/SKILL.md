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

## Objetivo

Criar aplicações que escalam até **50k-100k usuários** sem reescrita, permitem **alta velocidade de desenvolvimento**, mantêm **baixo acoplamento** entre módulos, facilitam **manutenção e evolução**, evitam **overengineering** e abstrações prematuras, possibilitam **migração futura** para microservices (se necessário).

## Use this skill when

- Iniciando um SaaS/app web sem arquitetura de módulos definida
- Planejando boundaries entre features, domínios, services e dados
- Refatorando monólito em camadas para módulos/coortes de features
- Revisando acoplamento entre módulos ou criando padrões arquiteturais do projeto
- Projetando multi-tenant, multi-módulo ou crescimento gradual sem microservices

## Do not use this skill when

- A tarefa é uma correção local sem mudança estrutural
- Sistema já é microservices bem estabelecido
- Projeto é script simples, ferramenta CLI ou app com poucos módulos
- Time/projeto já tem arquitetura consolidada e funcional
- A necessidade comprovada é separação física de serviços, não monólito modular

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Estrutura de projeto com core/, features/, lib/, app/
- Features organizadas como vertical slices independentes
- Regras de isolamento entre features (sem acesso direto a DB de outras)
- Comunicação entre features via services, nunca repositórios diretos
- Frontend (Next.js) com route.ts como thin wrappers delegando para features/*/service/
- ADRs para decisões arquiteturais importantes

## Procedure

### 1. Criar estrutura base

```typescript
src/
 ├─ core/           # Infraestrutura compartilhada
 ├─ features/       # Vertical slices (domínios)
 ├─ lib/            # Bibliotecas e utilitários compartilhados
 └─ app/            # Configuração da aplicação
```

### 2. Definir core/ (apenas infraestrutura)

```typescript
core/
 ├─ db.ts           # Conexão e configuração do banco
 ├─ db/schema.ts    # Schema do banco (Drizzle/Prisma)
 ├─ auth.ts         # Sistema de autenticação
 ├─ config.ts       # Configurações globais
 └─ stripe.ts       # Cliente Stripe
```

### 3. Criar features como vertical slices

```typescript
features/chat/
 ├─ api/            # Endpoints HTTP
 ├─ service/        # Lógica de negócio
 ├─ repo/           # Acesso a dados
 ├─ types.ts        # TypeScript types
 └─ components/     # UI (se houver)
```

### 4. Estabelecer regras de isolamento

Feature NÃO acessa DB de outra diretamente:

```typescript
// ❌ Errado
import { creditsRepo } from '@/features/credits/repo/credits-repo'
const balance = await creditsRepo.getBalance(userId)

// ✅ Certo
import { debitCredits } from '@/features/credits/service/debit'
const result = await debitCredits(userId, amount)
```

### 5. Implementar comunicação entre features via service

```typescript
// features/credits/service/debit.ts
export async function debitCredits(userId: string, amount: number) {
  const balance = await creditsRepo.getBalance(userId)
  if (balance < amount) throw new Error('Insufficient credits')
  return await creditsRepo.debit(userId, amount)
}
```

### 6. Configurar Next.js App Router com thin wrappers

```typescript
// app/api/chat/send/route.ts (thin wrapper)
import { sendMessage } from '@/features/chat/service/send-message'

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const result = await sendMessage({ userId: session.user.id, ...await req.json() })
  return NextResponse.json(result)
}
```

### 7. Validar arquitetura contra anti-patterns

- ❌ Evitar: controllers/, services/, repositories/ globais
- ❌ Evitar: pasta utils/ gigante
- ❌ Evitar: microservices prematuros
- ❌ Evitar: god objects em core/

## Verification

- Estrutura segue core/, features/, lib/, app/
- Features são vertical slices independentes
- Features não acessam DB de outras diretamente
- Comunicação entre features é via services públicos
- Lógica de negócio está em features/*/service/
- Route.ts são thin wrappers que delegam para services
- Não há god objects ou camadas vazias

> **Skill log**
> - [2026-05-11] Skill criada com arquitetura de vertical slice + modular monolith.
> - [2026-05-11] Stage 6 (Batch 6) adicionou seções operacionais faltantes e removeu emoji de heading Objetivo.
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/` com arquivos divididos por especialidade.

## References

Conteúdo referencial detalhado, princípios, estrutura e boas práticas estão disponíveis em:
- `references/principles.md` - Princípios fundamentais (Modular Monolith, Vertical Slice, Simplicidade)
- `references/structure.md` - Estrutura obrigatória do projeto (core/, features/, lib/, app/)
- `references/isolation.md` - Regras de isolamento entre features
- `references/integration.md` - Integração com Next.js, serviços externos e agentes AI
- `references/best-practices.md` - Boas práticas obrigatórias e anti-patterns proibidos
