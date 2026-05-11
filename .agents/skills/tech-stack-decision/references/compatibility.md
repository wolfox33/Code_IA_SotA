# Tech Stack Decision — Compatibility

Conteúdo referencial de matriz de compatibilidade e alternativas para tech-stack-decision.

## 🔄 Matriz de Compatibilidade

### Frontend Stack

| Next.js | Bun | Tailwind | Better Auth | Drizzle | AI SDK UI |
|---------|-----|----------|-------------|---------|-----------|
| 16.0.10+ | 1.3.9+ | 4.0+ | 1.4.18+ | 0.45.1+ | 1.0+ (SDK 6.0+) |
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Notas:**
- Next.js 16 funciona perfeitamente com Bun 1.3+
- Tailwind v4 requer configuração específica (CSS-first)
- Better Auth integra nativamente com Next.js
- Drizzle funciona com qualquer runtime (Node, Bun, Deno)
- AI SDK UI (`@ai-sdk/react` 1.0+) requer `ai` 6.0+; hooks `useChat`, `useCompletion`, `useObject` para chat streaming

### Backend Stack

| FastAPI | Python | LangGraph | PostgreSQL | SQLAlchemy |
|---------|--------|-----------|------------|------------|
| 0.129.0+ | 3.12+ | 1.0+ | 16+ | 2.0+ |
| ✅ | ✅ | ✅ | ✅ | ✅ |

**Notas:**
- FastAPI 0.129+ requer Python 3.10+, recomendado 3.12+
- LangGraph 1.0 é estável e production-ready
- PostgreSQL 16 tem melhorias significativas de performance
- SQLAlchemy 2.0 tem async support nativo

## 🚀 Quando Considerar Alternativas

### Trocar Next.js por:
- **Remix**: Se preferir nested routing e server-first
- **SvelteKit**: Se time prefere Svelte a React
- **Astro**: Se quer menos JavaScript no cliente
- **Nuxt**: Se time prefere Vue

### Trocar FastAPI por:
- **NestJS**: Se time prefere TypeScript
- **Go + Gin**: Se performance é crítica (>100k RPS)
- **Rust + Axum**: Se segurança/performance extrema
- **Django**: Se precisa admin panel robusto

### Trocar PostgreSQL por:
- **MySQL**: Se time tem expertise
- **MongoDB**: Se dados são muito não-estruturados
- **SQLite**: Se projeto é pequeno/local
- **Supabase**: Se quer backend-as-a-service

### Trocar LangGraph por:
- **LangChain**: Se não precisa de state management
- **CrewAI**: Se foco é multi-agent
- **Custom**: Se workflow é muito simples

## 📝 Template de Decisão

Ao escolher tecnologia, documente:

```markdown
## Decisão: [Tecnologia]

**Contexto:**
- Tipo de projeto: [SaaS/API/Agent/etc]
- Requisitos: [Performance/DX/Escalabilidade]
- Time: [Expertise atual]

**Opções Consideradas:**
1. [Opção 1] - Prós/Contras
2. [Opção 2] - Prós/Contras
3. [Opção 3] - Prós/Contras

**Decisão:**
Escolhemos [Tecnologia X] versão [Y]

**Justificativa:**
- [Motivo 1]
- [Motivo 2]
- [Motivo 3]

**Trade-offs Aceitos:**
- [Trade-off 1]
- [Trade-off 2]

**Revisão:**
Revisar em [data] ou quando [condição]
```

## Example Interactions

- "Qual stack usar para SaaS com agentes AI?"
- "Next.js 16 é compatível com Bun 1.3?"
- "Devo usar Prisma ou Drizzle?"
- "Qual versão estável do LangGraph?"
- "FastAPI ou NestJS para API backend?"
- "Migrar de Tailwind v3 para v4?"
- "PostgreSQL 16 ou MySQL 8 para novo projeto?"
- "Como integrar AI SDK UI com useChat no Next.js?"

## Behavioral Traits

- Sempre recomenda versões **estáveis** sobre bleeding edge
- Prioriza **Developer Experience** sem sacrificar performance
- Considera **maturidade** e **comunidade** da tecnologia
- Documenta **trade-offs** claramente
- Valida **compatibilidade** entre tecnologias
- Sugere **alternativas** quando apropriado
- Mantém decisões **atualizadas** com ecosystem

## Key Principles

1. **Estabilidade > Novidade**: Preferir versões estáveis
2. **DX > Complexidade**: Escolher ferramentas com boa DX
3. **Type Safety**: Priorizar type safety quando possível
4. **Compatibilidade**: Garantir que stack funciona junta
5. **Comunidade**: Considerar tamanho e atividade da comunidade
6. **Manutenção**: Avaliar suporte de longo prazo
7. **Performance**: Balancear performance com produtividade
