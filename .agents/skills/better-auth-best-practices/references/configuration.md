# Better Auth Configuration

Conteúdo referencial de configuração para Better Auth.

## Instructions

1. **Setup inicial**: Instalar Better Auth e configurar env vars
2. **Configurar database**: Escolher adapter e rodar migrations
3. **Definir providers**: Email/password, OAuth, magic links, etc.
4. **Configurar session**: Cookie cache, storage, expiração
5. **Adicionar plugins**: 2FA, organizations, passkeys conforme necessário
6. **Implementar client**: React/Vue/Svelte hooks
7. **Testar fluxos**: Sign up, sign in, password reset, etc.

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
