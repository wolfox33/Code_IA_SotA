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

Guia completo de integração e best practices para Better Auth - framework de autenticação TypeScript-first, framework-agnostic.

## Objetivo

Fornecer:
- **Setup correto** de Better Auth
- **Best practices** de configuração
- **Padrões de segurança**
- **Integração** com database e frameworks
- **Soluções** para gotchas comuns

## Use this skill when

- Implementando Better Auth em um projeto TypeScript.
- Configurando adapters, schema, migrations ou integração com Drizzle/Prisma.
- Corrigindo sessão, cookies, trusted origins, CSRF ou callbacks do Better Auth.
- Adicionando OAuth providers, email/password, magic links, 2FA/MFA ou passkeys.
- Integrando hooks/client APIs do Better Auth em frontend ou backend.
- Revisando segurança de configuração do Better Auth antes de deploy.

## Do not use this skill when

- A tarefa só menciona usuário, sessão ou permissões sem tocar Better Auth.
- Projeto já usa outra solução de auth (NextAuth, Clerk, Supabase Auth, etc.) e não haverá migração.
- A mudança é autorização de domínio/RBAC sem alterar autenticação.
- Não há TypeScript, adapter ou integração Better Auth envolvida.
- A tarefa é apenas UI de login sem contrato de auth.

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

## Instructions

1. **Setup inicial**: Instalar Better Auth e configurar env vars
2. **Configurar database**: Escolher adapter e rodar migrations
3. **Definir providers**: Email/password, OAuth, magic links, etc.
4. **Configurar session**: Cookie cache, storage, expiração
5. **Adicionar plugins**: 2FA, organizations, passkeys conforme necessário
6. **Implementar client**: React/Vue/Svelte hooks
7. **Testar fluxos**: Sign up, sign in, password reset, etc.

Use os exemplos e checklists deste arquivo como referência principal.

## Safety

- **Nunca** desabilitar CSRF check em produção
- **Sempre** usar HTTPS em produção (`useSecureCookies: true`)
- **Validar** trusted origins
- **Implementar** rate limiting
- **Usar** secrets fortes (min 32 chars)
- **Revisar** security options antes de deploy

## 📚 Quick Reference

### Environment Variables

```bash
# Obrigatórias
BETTER_AUTH_SECRET="<32+ chars>"  # openssl rand -base64 32
BETTER_AUTH_URL="https://example.com"

# Opcionais (se usar OAuth)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
```

**Importante**: Só defina `baseURL`/`secret` no config se env vars NÃO estiverem definidas.

### File Location

CLI procura `auth.ts` em:
- `./`
- `./lib`
- `./utils`
- `./src`

Para nosso projeto, use `--config ./src/core/auth.ts`.

### CLI Commands

```bash
# Aplicar schema (adapter built-in)
npx @better-auth/cli@latest migrate

# Gerar schema para Prisma/Drizzle
npx @better-auth/cli@latest generate

# Adicionar MCP para AI tools
npx @better-auth/cli mcp --cursor
```

**⚠️ Re-executar após adicionar/mudar plugins!**

## 🔧 Core Configuration

### Minimal Setup

```typescript
// core/auth.ts
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from './db'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // 'pg' | 'mysql' | 'sqlite'
  }),
  emailAndPassword: {
    enabled: true,
  },
})
```

### Full Configuration Example

```typescript
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { twoFactor } from 'better-auth/plugins/two-factor'
import { organization } from 'better-auth/plugins/organization'
import { db } from '@/core/db'

export const auth = betterAuth({
  // App config
  appName: 'My SaaS',
  basePath: '/api/auth', // default
  
  // Database
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  
  // Auth methods
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      // Send email with reset link
      await sendEmail({
        to: user.email,
        subject: 'Reset your password',
        html: `Click here: ${url}`,
      })
    },
  },
  
  // OAuth providers
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  
  // Email verification
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: 'Verify your email',
        html: `Click here: ${url}`,
      })
    },
    sendOnSignUp: true,
  },
  
  // Session config
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  
  // User config
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: false,
      },
    },
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
    },
  },
  
  // Security
  advanced: {
    useSecureCookies: process.env.NODE_ENV === 'production',
    crossSubDomainCookies: {
      enabled: false,
    },
  },
  
  // Rate limiting
  rateLimit: {
    enabled: true,
    window: 60, // 1 minute
    max: 10, // 10 requests
    storage: 'database',
  },
  
  // Plugins
  plugins: [
    twoFactor(),
    organization(),
  ],
  
  // Trusted origins
  trustedOrigins: ['https://example.com'],
})
```

## 🗄️ Database Configuration

### Direct Connections

```typescript
// PostgreSQL
import pg from 'pg'
const pool = new pg.Pool({ connectionString: DATABASE_URL })

export const auth = betterAuth({
  database: pool,
})
```

```typescript
// MySQL
import mysql from 'mysql2/promise'
const pool = mysql.createPool(DATABASE_URL)

export const auth = betterAuth({
  database: pool,
})
```

```typescript
// SQLite (better-sqlite3)
import Database from 'better-sqlite3'
const db = new Database('auth.db')

export const auth = betterAuth({
  database: db,
})
```

```typescript
// Bun SQLite
import { Database } from 'bun:sqlite'
const db = new Database('auth.db')

export const auth = betterAuth({
  database: db,
})
```

### ORM Adapters

```typescript
// Drizzle
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from './db'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // 'pg' | 'mysql' | 'sqlite'
  }),
})
```

```typescript
// Prisma
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from './db'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
  }),
})
```

```typescript
// MongoDB
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { client } from './db'

export const auth = betterAuth({
  database: mongodbAdapter(client.db('mydb')),
})
```

### ⚠️ Critical: Model vs Table Names

Better Auth usa **nomes de models do ORM**, NÃO nomes de tabelas do DB.

```typescript
// ❌ ERRADO
user: {
  modelName: 'users', // Nome da tabela
}

// ✅ CERTO
user: {
  modelName: 'user', // Nome do model Prisma/Drizzle
}
```

Se Prisma model é `User` mapeando para tabela `users`:
```prisma
model User {
  @@map("users")
}
```

Use `modelName: "user"` (referência do Prisma), não `"users"`.

## 🍪 Session Management

### Storage Priority

1. Se `secondaryStorage` definido → sessions vão lá (NÃO no DB)
2. Set `session.storeSessionInDatabase: true` para persistir no DB também
3. Sem database + `cookieCache` → modo totalmente stateless

```typescript
// Stateless (sem DB)
export const auth = betterAuth({
  database: undefined,
  session: {
    cookieCache: {
      enabled: true,
    },
  },
})
```

```typescript
// Com secondary storage (Redis)
import { createClient } from 'redis'

const redis = createClient()
await redis.connect()

export const auth = betterAuth({
  database: pool,
  secondaryStorage: {
    get: async (key) => await redis.get(key),
    set: async (key, value, ttl) => await redis.setEx(key, ttl, value),
    delete: async (key) => await redis.del(key),
  },
  session: {
    storeSessionInDatabase: true, // Também persistir no DB
  },
})
```

### Cookie Cache Strategies

```typescript
session: {
  cookieCache: {
    enabled: true,
    strategy: 'compact', // 'compact' | 'jwt' | 'jwe'
    maxAge: 5 * 60, // 5 minutes
    version: 1, // Incrementar para invalidar todas as sessions
  },
}
```

- **`compact`** (default): Base64url + HMAC. Menor tamanho.
- **`jwt`**: Standard JWT. Legível mas assinado.
- **`jwe`**: Encrypted. Máxima segurança.

### Session Options

```typescript
session: {
  expiresIn: 60 * 60 * 24 * 7, // 7 dias (default)
  updateAge: 60 * 60 * 24, // Refresh interval (1 dia)
  cookieCache: {
    maxAge: 5 * 60, // Cache duration (5 min)
    version: 1, // Mudar para invalidar todas
  },
}
```

## 👤 User & Account Configuration

### User Config

```typescript
user: {
  modelName: 'user', // ORM model name
  
  // Column mapping (se nomes diferentes)
  fields: {
    email: 'emailAddress',
    name: 'fullName',
  },
  
  // Additional fields
  additionalFields: {
    role: {
      type: 'string',
      required: false,
      defaultValue: 'user',
    },
    plan: {
      type: 'string',
      required: false,
    },
  },
  
  // Features
  changeEmail: {
    enabled: true, // Disabled by default
  },
  deleteUser: {
    enabled: true, // Disabled by default
  },
}
```

**Campos obrigatórios para registro**: `email` e `name`.

### Account Config

```typescript
account: {
  modelName: 'account',
  
  accountLinking: {
    enabled: true, // Link OAuth accounts
  },
  
  storeAccountCookie: true, // Para stateless OAuth
}
```

## 📧 Email Flows

```typescript
// Email verification
emailVerification: {
  sendVerificationEmail: async ({ user, url, token }) => {
    await sendEmail({
      to: user.email,
      subject: 'Verify your email',
      html: `
        <p>Hi ${user.name},</p>
        <p>Click here to verify: <a href="${url}">${url}</a></p>
        <p>Or use code: ${token}</p>
      `,
    })
  },
  sendOnSignUp: true, // Auto-send on registration
  sendOnSignIn: false, // Auto-send on login
  autoSignInAfterVerification: true,
}

// Password reset
emailAndPassword: {
  sendResetPassword: async ({ user, url, token }) => {
    await sendEmail({
      to: user.email,
      subject: 'Reset your password',
      html: `
        <p>Hi ${user.name},</p>
        <p>Click here to reset: <a href="${url}">${url}</a></p>
        <p>Or use code: ${token}</p>
      `,
    })
  },
}
```

## 🔐 Security Configuration

```typescript
advanced: {
  // Force HTTPS cookies (SEMPRE true em produção)
  useSecureCookies: process.env.NODE_ENV === 'production',
  
  // ⚠️ NUNCA desabilitar em produção
  disableCSRFCheck: false,
  disableOriginCheck: false,
  
  // Cross-subdomain cookies
  crossSubDomainCookies: {
    enabled: false, // true para compartilhar entre subdomains
  },
  
  // Custom IP headers (para proxies)
  ipAddress: {
    ipAddressHeaders: ['x-forwarded-for', 'x-real-ip'],
  },
  
  // Custom ID generation
  database: {
    generateId: 'uuid', // 'uuid' | 'serial' | false | custom function
  },
}

// Rate limiting
rateLimit: {
  enabled: true,
  window: 60, // seconds
  max: 10, // requests per window
  storage: 'database', // 'memory' | 'database' | 'secondary-storage'
}

// Trusted origins
trustedOrigins: [
  'https://example.com',
  'https://app.example.com',
]
```

## 🔌 Plugins

### Import Correto (Tree-shaking)

```typescript
// ✅ CERTO - Import específico
import { twoFactor } from 'better-auth/plugins/two-factor'
import { organization } from 'better-auth/plugins/organization'
import { passkey } from 'better-auth/plugins/passkey'

// ❌ ERRADO - Import genérico
import { twoFactor } from 'better-auth/plugins'
```

### Plugins Populares

```typescript
import { twoFactor } from 'better-auth/plugins/two-factor'
import { organization } from 'better-auth/plugins/organization'
import { passkey } from 'better-auth/plugins/passkey'
import { magicLink } from 'better-auth/plugins/magic-link'
import { emailOtp } from 'better-auth/plugins/email-otp'
import { username } from 'better-auth/plugins/username'
import { phoneNumber } from 'better-auth/plugins/phone-number'
import { admin } from 'better-auth/plugins/admin'
import { multiSession } from 'better-auth/plugins/multi-session'

export const auth = betterAuth({
  plugins: [
    twoFactor(),
    organization(),
    passkey(),
  ],
})
```

**⚠️ Lembrar**: Re-executar CLI após adicionar plugins!

```bash
npx @better-auth/cli@latest migrate
```

## 🪝 Hooks

### Endpoint Hooks

```typescript
import { createAuthMiddleware } from 'better-auth'

export const auth = betterAuth({
  hooks: {
    before: [
      {
        matcher: (ctx) => ctx.path === '/sign-in/email',
        handler: async (ctx) => {
          // ⚠️ NUNCA logar ctx.body (contém password!)
          console.log('Sign in attempt:', ctx.body?.email)
        },
      },
    ],
    after: [
      {
        matcher: (ctx) => ctx.path === '/sign-up/email',
        handler: async (ctx) => {
          const user = ctx.context.returned
          // ⚠️ Logar apenas dados não-sensíveis (nunca password/token)
          console.log('User created:', user.id, user.email)
          
          // Adicionar a newsletter, etc.
          await addToNewsletter(user.email)
        },
      },
    ],
  },
})
```

### Database Hooks

```typescript
databaseHooks: {
  user: {
    create: {
      before: async (user) => {
        // Adicionar valores default
        return {
          ...user,
          role: user.role || 'user',
        }
      },
      after: async (user) => {
        // Ações pós-criação
        await sendWelcomeEmail(user.email)
      },
    },
  },
  session: {
    create: {
      after: async (session) => {
        console.log('Session created:', session.id)
      },
    },
  },
}
```

### Hook Context

Disponível em `ctx.context`:
- `session` - Current session
- `secret` - Auth secret
- `authCookies` - Cookie utilities
- `password.hash()` / `password.verify()` - Password utilities
- `adapter` - Database adapter
- `generateId()` - ID generator
- `tables` - Table names
- `baseURL` - Base URL

## 💻 Client Integration

### React

```typescript
// core/auth-client.ts
import { createAuthClient } from 'better-auth/react'
import { twoFactorClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL!,
  plugins: [twoFactorClient()],
})

export const {
  signUp,
  signIn,
  signOut,
  useSession,
  getSession,
} = authClient
```

```tsx
// components/LoginForm.tsx
'use client'

import { signIn } from '@/core/auth-client'
import { useState } from 'react'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { data, error } = await signIn.email({
      email,
      password,
    })
    
    if (error) {
      console.error('Sign in failed:', error.message)
      return
    }
    
    // ✅ Redirect em vez de logar dados de sessão
    window.location.href = '/dashboard'
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Sign In</button>
    </form>
  )
}
```

```tsx
// components/UserProfile.tsx
'use client'

import { useSession } from '@/core/auth-client'

export function UserProfile() {
  const { data: session, isPending } = useSession()

  if (isPending) return <div>Loading...</div>
  if (!session) return <div>Not logged in</div>

  return (
    <div>
      <p>Email: {session.user.email}</p>
      <p>Name: {session.user.name}</p>
    </div>
  )
}
```

### OAuth Sign In

```tsx
import { signIn } from '@/core/auth-client'

// Google
await signIn.social({
  provider: 'google',
  callbackURL: '/dashboard',
})

// GitHub
await signIn.social({
  provider: 'github',
  callbackURL: '/dashboard',
})
```

## 🎯 Type Safety

### Inferir Tipos do Server

```typescript
// core/auth.ts
export const auth = betterAuth({ /* ... */ })

// Inferir tipos
export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user
```

### Client com Tipos do Server

```typescript
// core/auth-client.ts
import { createAuthClient } from 'better-auth/react'
import type { auth } from './auth' // Server auth

export const authClient = createAuthClient<typeof auth>({
  baseURL: process.env.NEXT_PUBLIC_APP_URL!,
})
```

## ⚠️ Common Gotchas

### 1. Model vs Table Name
**Problema**: Config usa nome do ORM model, NÃO nome da tabela DB.

```typescript
// ❌ ERRADO
user: { modelName: 'users' } // Nome da tabela

// ✅ CERTO
user: { modelName: 'user' } // Nome do model
```

### 2. Plugin Schema
**Problema**: Schema não atualizado após adicionar plugins.

**Solução**: Re-executar CLI:
```bash
npx @better-auth/cli@latest migrate
```

### 3. Secondary Storage
**Problema**: Sessions não aparecem no DB.

**Causa**: `secondaryStorage` definido → sessions vão lá por default.

**Solução**: Set `session.storeSessionInDatabase: true` para também persistir no DB.

### 4. Cookie Cache
**Problema**: Custom session fields não aparecem.

**Causa**: Cookie cache NÃO inclui custom fields, sempre re-fetched.

**Solução**: Aceitar ou desabilitar cookie cache.

### 5. Stateless Mode
**Problema**: Logout não funciona sem DB.

**Causa**: Sem DB = session só no cookie, logout apenas expira cache.

**Solução**: Usar DB ou aceitar limitação.

### 6. Change Email Flow
**Problema**: Email vai para endereço errado.

**Causa**: Better Auth envia para email ATUAL primeiro, depois novo.

**Solução**: Entender o fluxo: atual → confirma → novo → verifica.

## 📚 Resources

- [Docs](https://better-auth.com/docs) - Documentação oficial
- [Options Reference](https://better-auth.com/docs/reference/options) - Todas as opções
- [LLMs.txt](https://better-auth.com/llms.txt) - Referência para LLMs
- [GitHub](https://github.com/better-auth/better-auth) - Repositório
- [Init Options Source](https://github.com/better-auth/better-auth/blob/main/packages/core/src/types/init-options.ts) - Tipos completos

## Example Interactions

- "Configurar Better Auth com Drizzle e PostgreSQL"
- "Adicionar Google OAuth ao Better Auth"
- "Implementar 2FA com Better Auth"
- "Debugar sessions não persistindo no database"
- "Configurar email verification flow"
- "Migrar de NextAuth para Better Auth"
- "Setup Better Auth em modo stateless"

