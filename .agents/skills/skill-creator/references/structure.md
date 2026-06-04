# Skill Creator — Structure

Conteúdo referencial de estrutura recomendada para skill-creator.

## Estrutura recomendada

Use esta estrutura como baseline. Se uma skill simples não precisar de uma seção dedicada de invariantes, incorpore os invariantes no procedimento ou na verificação sem criar texto vazio.

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

Resultado operacional que esta skill deve produzir e por que ela existe.

## Use this skill when

- [situação concreta que justifica carregar esta skill]
- [outra situação]

## Do not use this skill when

- [caso que parece similar mas não é — evita carregamento desnecessário]

## Invariants

- [regra que não pode ser violada durante a execução]
- [limite de escopo, segurança, qualidade, custo de contexto ou output]

## Output contracts

- [artefato, decisão, plano, diagnóstico ou mudança esperada]
- [formato ou status final quando aplicável]

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

Critérios objetivos para confirmar que a skill foi aplicada corretamente.


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

- Use `references/` para detalhes de framework, exemplos longos, tabelas, guias ou conhecimento raramente necessário
- Use `scripts/` quando a mesma validação ou transformação for repetida e puder ser determinística
- Use `assets/` quando a skill depender de arquivos estáticos reutilizáveis

## Nível de abstração

Uma skill deve ser abstrata no método e concreta nos invariantes e na saída:

- Evite instruções vagas como "analise os dados e encontre padrões".
- Evite tutorial de ferramenta como "use biblioteca X e chame função Y".
- Prefira procedimentos com limites verificáveis, critérios de sucesso e links para `references/` quando houver implementação específica.
