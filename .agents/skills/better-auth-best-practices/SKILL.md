---
name: better-auth-best-practices
description: "Use quando a tarefa implementar, configurar ou corrigir Better Auth diretamente: adapters, sessões, cookies, OAuth, email/password, plugins, hooks ou integração TypeScript com banco/framework."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "development"
  complexity: 4
  tags:
    - auth
    - better-auth
    - typescript
    - security
    - oauth
    - session
---

# Better Auth Best Practices

Guia de integração e best practices para Better Auth - framework de autenticação TypeScript-first, framework-agnostic.

## Objetivo

Fornecer setup correto de Better Auth com best practices de configuração e segurança.

## Use this skill when

- Implementando Better Auth em um projeto TypeScript
- Configurando adapters, schema, migrations ou integração com Drizzle/Prisma
- Corrigindo sessão, cookies, trusted origins, CSRF ou callbacks do Better Auth
- Adicionando OAuth providers, email/password, magic links, 2FA/MFA ou passkeys
- Integrando hooks/client APIs do Better Auth em frontend ou backend
- Revisando segurança de configuração do Better Auth antes de deploy

## Do not use this skill when

- A tarefa só menciona usuário, sessão ou permissões sem tocar Better Auth
- Projeto já usa outra solução de auth (NextAuth, Clerk, Supabase Auth, etc.) e não haverá migração
- A mudança é autorização de domínio/RBAC sem alterar autenticação
- Não há TypeScript, adapter ou integração Better Auth envolvida
- A tarefa é apenas UI de login sem contrato de auth

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Better Auth configurado com adapter correto
- Environment variables definidas
- Schema aplicado via CLI
- Providers (OAuth, email/password) configurados
- Session management configurado
- Plugins adicionados e schema atualizado
- Client integration com type safety

## Procedure

### 1. Instalar e configurar Better Auth

```bash
npm install better-auth
```

### 2. Configurar environment variables

```bash
BETTER_AUTH_SECRET="<32+ chars>"  # openssl rand -base64 32
BETTER_AUTH_URL="https://example.com"
```

### 3. Escolher adapter e configurar

```typescript
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from './db'

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg' }),
  emailAndPassword: { enabled: true },
})
```

### 4. Aplicar schema via CLI

```bash
npx @better-auth/cli@latest migrate
```

### 5. Configurar providers

```typescript
socialProviders: {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  },
}
```

### 6. Configurar session

```typescript
session: {
  expiresIn: 60 * 60 * 24 * 7,
  cookieCache: { enabled: true, maxAge: 5 * 60 },
}
```

### 7. Adicionar plugins

```typescript
import { twoFactor } from 'better-auth/plugins/two-factor'
plugins: [twoFactor()]
```

### 8. Re-executar CLI após plugins

```bash
npx @better-auth/cli@latest migrate
```

### 9. Configurar client com type safety

```typescript
import { createAuthClient } from 'better-auth/react'
import type { auth } from './auth'

export const authClient = createAuthClient<typeof auth>({
  baseURL: process.env.NEXT_PUBLIC_APP_URL!,
})
```

## Verification

- Better Auth está instalado e configurado
- Environment variables estão definidas
- Adapter correto está configurado
- Schema foi aplicado via CLI
- Providers estão configurados
- Session management está configurado
- Plugins foram adicionados e schema atualizado
- Client integration tem type safety

> **Skill log**
> - [2026-05-11] Skill criada com padrões de Better Auth.
> - [2026-05-11] Stage 6 (Batch 7) adicionou seções operacionais faltantes e removeu emoji de heading Objetivo.
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/better-auth-best-practices.md` para aumentar densidade.

## References

Conteúdo referencial detalhado, exemplos de configuração e gotchas estão disponíveis em:
- `references/configuration.md` - Core configuration, adapters, session, user config, email flows, security
- `references/plugins.md` - Plugins, hooks, client integration, type safety
- `references/gotchas.md` - Common gotchas, troubleshooting, resources
