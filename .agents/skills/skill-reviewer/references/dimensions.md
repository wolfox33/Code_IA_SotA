# Skill Reviewer — Dimensions

Conteúdo referencial de review dimensions e severity levels para skill-reviewer.

## Review dimensions

Revise cada skill nestas dimensões:

- **Frontmatter**: delimitadores `---`, `name`, `description`, metadata útil e YAML simples.
- **Activation**: `description` e casos de uso indicam quando carregar a skill.
- **Non-use**: a skill evita acionamento em tarefas parecidas, mas fora de escopo.
- **Scope**: responsabilidade é estreita, operacional e não duplica outras skills.
- **Output contracts**: entregas esperadas são explícitas quando aplicável.
- **Invariants**: limites, riscos e regras críticas de execução estão explícitos quando a skill envolve decisões, outputs verificáveis ou alto impacto.
- **Procedure**: passos são executáveis, ordenados e rastreáveis, sem virar tutorial de framework.
- **Modularity**: conteúdo pertence ao artefato correto (`SKILL.md`, `references/`, `scripts/`, workflow, subagent ou `AGENTS.md`).
- **Pitfalls**: riscos e anti-patterns relevantes estão nomeados.
- **Verification**: há checklist objetivo para confirmar uso correto.
- **Context efficiency**: não há bloat, exemplos excessivos ou política global duplicada.

## Severity levels

Classifique cada achado:

- **Blocker**: quebra parsing, discovery ou uso seguro da skill.
- **High**: causa ativação errada, responsabilidade duplicada ou orientação insegura.
- **Medium**: reduz manutenção, clareza ou verificabilidade.
- **Low**: problema local de redação, estilo ou detalhe menor.
