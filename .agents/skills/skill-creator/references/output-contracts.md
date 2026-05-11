# Skill Creator — Output Contracts

Conteúdo referencial de output contracts para skill-creator.

## Output contracts

### Nova skill criada

Entregue quando:

- pasta `.agents/skills/<skill-name>/` existir
- `SKILL.md` tiver frontmatter válido
- `name` estiver em kebab-case
- `description` explicar quando usar e o que a skill faz
- corpo incluir objetivo, uso, não uso, procedimento, pitfalls e verificação

### Skill existente modificada

Entregue quando:

- mudança responder diretamente ao pedido ou feedback
- frontmatter continuar válido
- escopo original for preservado ou ajustado explicitamente
- orientações antigas úteis forem preservadas
- `Skill log` for preservado

### Plano de melhoria produzido

Entregue quando:

- problemas da skill estiverem listados
- melhorias forem priorizadas
- mudanças fora de escopo estiverem separadas
- critérios de aceite forem claros

### Diagnóstico de skill produzido

Entregue quando:

- activation, escopo, frontmatter, procedimento, modularidade e verificação forem avaliados
- anti-patterns encontrados forem nomeados
- correções sugeridas forem pequenas e rastreáveis
- diagnóstico formal, auditoria ou readiness check de skill for encaminhado para `skill-reviewer`
