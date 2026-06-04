# Archive — Stages 23 & 24

> Arquivo de rastreabilidade. Detalhes operacionais preservados nos artefatos listados abaixo.

---

## Stage 23: Skill Lifecycle Management

**Entregue**: 2026-05 — todas as tasks concluídas.

- CLI `skill:lifecycle` no `code-ia-sota-cli` (ver `bin/code-ia-sota.js`, `package.json`)
- Frontmatter `status` (`active | experimental | deprecated | archived`) em todas as skills
- Metadata fields (`owner`, `created`, `updated`) documentados
- Relatório de lifecycle via `npm run skill:lifecycle`
- Documentação no `README.md` (seção "Lifecycle management")

---

## Stage 24: Governança Evolutiva do Harness

**Entregue**: 2026-05 — implementação concluída, validação manual.

- Governança completa em `.agents/skills/harness-repair/references/governance.md`
- Orçamento `AGENTS.md`: 300-500 linhas (atual: ~152 linhas)
- Granularidade de referência: 1 tópico por arquivo, 50-100 linhas máx
- Hierarquia de override: `AGENTS.md > skill > workflow > subagent`
- Ciclo de vida expandido com estado `experimental`
- Workflow de manutenção: `.agents/workflows/harness-maintenance.md`
- Comandos CLI de governança documentados em `governance.md`

---

*PRDs e TASKs originais (PRD.md, PRD-v2.md, TASK.md, TASK-v2.md) removidos após consolidação.*
