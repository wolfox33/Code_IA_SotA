# Vertical Slice + Modular Monolith — Isolation Rules

Conteúdo referencial de regras de isolamento para vertical-slice-modular-monolith.

## 🔒 Regras de Isolamento

### Regra 1: Feature NÃO Acessa DB de Outra Diretamente

**❌ Errado:**
```typescript
// features/chat/service/send-message.ts
import { creditsRepo } from '@/features/credits/repo/credits-repo'

// Acessando repositório de outra feature diretamente
const balance = await creditsRepo.getBalance(userId)
```

**✅ Certo:**
```typescript
// features/chat/service/send-message.ts
import { debitCredits } from '@/features/credits/service/debit'

// Chamando service público de outra feature
const result = await debitCredits(userId, amount)
```

### Regra 2: Comunicação Entre Features Via Service

**Sempre via função de serviço:**
```typescript
// features/credits/service/debit.ts
export async function debitCredits(userId: string, amount: number) {
  // Lógica interna da feature
  const balance = await creditsRepo.getBalance(userId)
  if (balance < amount) throw new Error('Insufficient credits')
  
  return await creditsRepo.debit(userId, amount)
}
```

**Nunca acessar repo direto de outra feature.**

### Regra 3: Nada de Pasta `utils/` Global Gigante

**Se util pertence a uma feature:**
```
features/chat/utils/
  format-message.ts
```

**Se é global (usado por 3+ features):**
```
lib/
  date-utils.ts
  string-utils.ts
```

### Regra 4: Código Próximo de Quem Usa

**Princípio da proximidade:**
- Tudo deve estar próximo da feature que utiliza
- Evitar helpers globais desnecessários
- Evitar abstrações prematuras
- Evitar camadas vazias
