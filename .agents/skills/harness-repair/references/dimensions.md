# Harness Repair — Dimensions

Conteúdo referencial de diagnostic dimensions e severity/priority para harness-repair.

## Diagnostic dimensions

Revise o harness nestas dimensões:

- **Topology**: pastas e artefatos existem nos lugares esperados
- **Boundaries**: responsabilidades estão no artefato correto
- **Duplication**: políticas, procedimentos ou responsabilidades aparecem em múltiplos lugares
- **Context bloat**: arquivos carregáveis estão maiores ou mais densos do que precisam
- **Routing clarity**: descriptions e boundaries reduzem acionamento ambíguo
- **Progressive disclosure**: conteúdo opcional fica em `references/` quando necessário
- **Validation readiness**: há regras estáveis o bastante para virar script futuro
- **Repair safety**: correções podem ser feitas em etapas pequenas e reversíveis

## Severity and priority

Classifique achados por severidade:

- **Blocker**: quebra discovery, parsing ou uso seguro do harness
- **High**: cria duplicação grande, roteamento errado ou caminho de manutenção inseguro
- **Medium**: aumenta custo de contexto, ambiguidade ou carga de manutenção
- **Low**: melhoria local de clareza, nome ou organização

Classifique prioridades:

- **P0**: corrigir antes de avançar
- **P1**: corrigir no ciclo atual de manutenção
- **P2**: manter em backlog
