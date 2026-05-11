# Vertical Slice + Modular Monolith — Best Practices

Conteúdo referencial de boas práticas e anti-patterns para vertical-slice-modular-monolith.

## ✅ Boas Práticas Obrigatórias

1. **Simplicidade > Arquitetura Complexa**
   - Se parecer overengineering → está errado

2. **Criar Abstrações Só Quando Necessário**
   - Nunca antecipar abstrações
   - Regra dos 3: abstrair quando usado 3+ vezes

3. **Código Legível > Código "Enterprise"**
   - Preferir clareza a padrões complexos

4. **Evitar Camadas Vazias**
   - Não criar controllers inúteis
   - Não criar interfaces desnecessárias
   - Não criar classes abstratas sem motivo

5. **Testes Próximos ao Código**
   ```
   features/chat/
     service/
       send-message.ts
       send-message.test.ts  ← Teste ao lado
   ```

## 🚫 Anti-Patterns Proibidos

### ❌ Arquitetura em Camadas Tradicional
```
controllers/
services/
repositories/
models/
```

### ❌ Pasta `utils/` Gigante
```
utils/
  helpers/
    global.ts
    everything.ts
```

### ❌ Microservices Prematuros
- Separar serviços cedo demais
- Antes de 50k usuários
- Sem necessidade comprovada

### ❌ Hexagonal/Clean Architecture Pesada
**Só usar quando:**
- Múltiplos devs (5+)
- Domínio extremamente complexo
- Necessidade de trocar implementações frequentemente

**Para SaaS típico → overkill.**

## 📈 Escalabilidade Esperada

**Essa arquitetura suporta:**
- ✅ Até **50k–100k usuários**
- ✅ Múltiplas features (10-50+)
- ✅ Múltiplos agentes AI
- ✅ Crescimento contínuo
- ✅ Sem necessidade de reescrever

**Quando migrar para microservices:**
- Sistema com 100k+ usuários ativos
- Múltiplos times independentes (3+)
- Alto volume extremo comprovado
- Domínios completamente independentes

**Antes disso: manter simples e modular.**

## 🏁 Regra Final

**Todo novo projeto deve começar com:**
> **Modular Monolith + Vertical Slice**

**Se em algum momento:**
- Sistema ficar grande demais
- Múltiplos times independentes
- Alto volume extremo

**Aí sim avaliar:**
- Extração de serviços específicos
- Migração gradual (Strangler Pattern)

**Antes disso:**
> **Manter simples e modular.**

## Example Interactions

- "Criar nova feature de notificações seguindo vertical slice"
- "Refatorar módulo de pagamentos para modular monolith"
- "Revisar arquitetura do projeto para identificar acoplamento"
- "Estabelecer comunicação entre features auth e users"
- "Migrar pasta utils/ para estrutura modular"
- "Criar ADR para decisão de usar monólito vs microservices"
