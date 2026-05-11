# Skill Creator — Frontmatter

Conteúdo referencial de frontmatter parse-safe para skill-creator.

## Frontmatter parse-safe

Use YAML simples:

- `SKILL.md` começa com frontmatter delimitado por `---`
- `name` é obrigatório e usa kebab-case
- `description` é obrigatória, entre aspas, e explica gatilho + função
- `metadata` deve conter apenas dados úteis para discovery e manutenção
- listas YAML usam indentação consistente
- markdown, blocos de código e instruções longas ficam no corpo, não no frontmatter
- estruturas YAML complexas só entram se melhorarem discovery ou manutenção
