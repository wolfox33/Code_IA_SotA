# Skill Reviewer — Anti-patterns

Conteúdo referencial de anti-patterns para skill-reviewer.

## Anti-patterns

- **Revisão sem evidência**: Opinião sem trecho ou impacto concreto.
- **Reescrita desnecessária**: Recomendar refatoração total quando correção pequena basta.
- **Severidade inflada**: Marcar estilo como blocker enfraquece a revisão.
- **Misturar reparo com diagnóstico**: Editar antes de o usuário aprovar correções.
- **Ignorar boundaries**: Recomendar que uma skill assuma função de workflow, subagent ou `AGENTS.md`.
- **Checklist genérico**: Produzir relatório que não ajuda a priorizar ação.
- **Ignorar caracteres problemáticos no frontmatter**: Não marcar como blocker o uso de caracteres YAML problemáticos sem aspas.

## Caracteres problemáticos em valores YAML (Blocker)

Marque como **Blocker** qualquer uso dos seguintes caracteres em valores YAML sem aspas:

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
