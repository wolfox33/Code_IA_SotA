# Vertical Slice + Modular Monolith — Principles

Conteúdo referencial de princípios fundamentais para vertical-slice-modular-monolith.

## Instructions

1. **Entender domínio**: Identificar bounded contexts e features principais
2. **Estruturar projeto**: Criar estrutura base (core/, features/, lib/, app/)
3. **Definir features**: Cada feature como vertical slice independente
4. **Estabelecer regras**: Comunicação entre features via services, nunca repos diretos
5. **Implementar isolamento**: Cada feature com sua própria lógica, dados e UI
6. **Validar arquitetura**: Revisar contra princípios e anti-patterns

## Safety

- **Evitar acoplamento**: Features não devem acessar repositórios de outras features diretamente
- **Prevenir god objects**: Manter core/ apenas com infraestrutura, sem lógica de negócio
- **Documentar decisões**: Usar ADRs para decisões arquiteturais importantes
- **Validar isolamento**: Garantir que features podem ser testadas independentemente

## 🧠 Princípios Fundamentais

### 1. Modular Monolith por Padrão

**Todo projeto começa como monólito modular:**
- ✅ Um único deploy
- ✅ Um único banco de dados
- ✅ Código organizado em módulos isolados
- ❌ Sem microservices no início

**Microservices só quando:**
- Múltiplos times independentes
- Volume massivo comprovado (>100k usuários ativos)
- Necessidade clara de separação física
- Domínios completamente independentes

**Antes disso → monólito modular.**

### 2. Vertical Slice como Estrutura Base

**Toda funcionalidade é uma slice independente:**
- Cada feature contém: lógica + dados + endpoints + UI
- Organização por **feature**, não por camada técnica
- Evitar separação artificial (controllers/, services/, repositories/)

**❌ Evitar:**
```
controllers/
services/
utils/
repositories/
```

**✅ Preferir:**
```
features/
  auth/
  billing/
  users/
```

### 3. Simplicidade > Complexidade

- Se parecer overengineering → **está errado**
- Criar abstrações **só quando necessário**
- Código legível > código "enterprise"
- Evitar camadas vazias e interfaces desnecessárias
