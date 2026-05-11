# Deployment Best Practices — Migrations

Conteúdo referencial de database migrations para deployment-best-practices.

## Database Migrations

```typescript
// scripts/migrate.ts
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

async function runMigrations() {
  const sql = postgres(process.env.DATABASE_URL!, { max: 1 })
  const db = drizzle(sql)

  console.log('Running migrations...')
  await migrate(db, { migrationsFolder: './drizzle' })
  console.log('Migrations complete')

  await sql.end()
}

runMigrations()
```
