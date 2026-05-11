# Better Auth Plugins & Hooks

Conteúdo referencial de plugins, hooks e client integration para Better Auth.

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
