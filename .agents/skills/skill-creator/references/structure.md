# Skill Creator — Structure

Conteúdo referencial de estrutura recomendada para skill-creator.

## Estrutura recomendada

```markdown
<frontmatter-start: three hyphens>
name: skill-name
description: "Use quando a tarefa exigir X; esta skill orienta Y sem Z."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "workflow"
  complexity: 3
  tags:
    - example
    - skill
<frontmatter-end: three hyphens>

# SKILL: [Título da Skill]

## Objetivo

O que esta skill resolve e por que existe.

## Use this skill when

- [situação concreta que justifica carregar esta skill]
- [outra situação]

## Do not use this skill when

- [caso que parece similar mas não é — evita carregamento desnecessário]

## Procedure

Passos para executar a skill com sucesso.

### 1. [Passo]

...

### 2. [Passo]

...

## Pitfalls

- [armadilha conhecida e como evitar]
- [variação descoberta durante uso real]

## Verification

Como confirmar que a skill foi aplicada corretamente.


> **Skill log** — atualize esta seção sempre que descobrir algo novo durante o uso.
> Não remova entradas antigas; adicione a data.

<!-- ex:
- [2026-04-13] Descoberto que X não funciona com Y — usar Z no lugar
- [2026-04-13] Passo 2 pode ser omitido quando condição W
-->
```

## Estrutura de pasta

Crie a pasta da skill em `.agents/skills/<skill-name>/`:

```
skill-name/
├── SKILL.md (obrigatório)
└── Recursos opcionais
    ├── scripts/    - Código executável para tarefas determinísticas
    ├── references/ - Docs carregados conforme necessário
    └── assets/     - Arquivos usados na saída (templates, etc.)
```

Crie recursos opcionais apenas quando houver necessidade clara:

- Use `references/` para exemplos longos, tabelas, guias ou conhecimento raramente necessário
- Use `scripts/` quando a mesma validação ou transformação for repetida e puder ser determinística
- Use `assets/` quando a skill depender de arquivos estáticos reutilizáveis
