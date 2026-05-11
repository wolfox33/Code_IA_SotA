# Better Auth Common Gotchas

Conteúdo referencial de problemas comuns e troubleshooting para Better Auth.

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
