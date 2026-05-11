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

## Caracteres problemáticos em valores YAML

Nunca use os seguintes caracteres em valores YAML sem aspas:

- `:` (dois pontos) - pode ser interpretado como separador de chave-valor
- `#` (hashtag) - pode ser interpretado como comentário
- `[` e `]` - podem ser interpretados como lista
- `{` e `}` - podem ser interpretados como objeto
- `&` e `*` - podem ser interpretados como anchors e aliases
- `!` - pode ser interpretado como tag YAML
- `>` e `|` - podem ser interpretados como multiline strings
- `%` - pode ser interpretado como diretiva YAML
- Emojis e caracteres Unicode especiais - podem causar problemas de parsing
- Markdown dentro de valores (links, negrito, itálico, etc.) - não use no frontmatter

Sempre use aspas duplas em valores que contenham esses caracteres.
