# .agents (Canonical)

Estrutura canônica universal para uso com ferramentas agenticas.

## Estrutura
- `agents.md`: regras e comportamento global
- `skills/`: skills canônicas (`<skill-name>/SKILL.md`)
- `subagents/`: agentes especializados
- `workflows/`: workflows reutilizáveis
- `project/context.md`: contexto específico do projeto

## Política
- Fonte de verdade: `.agents/`
- Este repositório não mantém mais estruturas legadas.
- Para o Windsurf, a descoberta oficial de Skills/Rules/Workflows continua em `.windsurf/`.
- O script `tools/setup-links.ps1` materializa `.windsurf/` a partir de `.agents/`.
