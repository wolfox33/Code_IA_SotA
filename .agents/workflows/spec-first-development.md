---
description: Workflow roteador para transformar demanda vaga em spec, usando OpenSpec como fonte canonica quando ativo.
---

# Spec-First Development

Use este workflow quando a tarefa for significativa, ambigua, multi-step, alterar contratos ou criar comportamento novo. Nao use para mudancas triviais, docs simples ou correcoes mecanicas com escopo evidente.

## Objetivo

Converter uma intencao inicial em escopo, criterios e contratos claros antes de planejar ou implementar, sem criar uma spec paralela quando OpenSpec estiver ativo.

## Fonte canonica

1. Leia `.agents/project/context.md`.
2. Se `OpenSpec` estiver configurado, trate OpenSpec como fonte canonica.
3. Se OpenSpec estiver ativo e a demanda precisar virar mudanca formal, use `.agents/skills/openspec-bridge/SKILL.md` para encaminhar aos comandos oficiais.
4. Se OpenSpec estiver ativo e houver ambiguidade, use `/opsx:explore` ou registre gaps no fluxo OpenSpec existente.
5. Se OpenSpec nao estiver ativo, use `spec-questions.md`, issue, README ou `.agents/specs/` como fallback, conforme existir no projeto.
6. Se o usuario ja iniciou pelo OpenSpec, nao crie outra spec fora dele.

## Processo

### 1. Grounding

- Leia o contexto minimo: `AGENTS.md`, `.agents/project/context.md` e artefatos de spec existentes.
- Identifique modulo, contrato afetado, stack e comandos de validacao disponiveis.
- Liste apenas ambiguidades que nao podem ser resolvidas por leitura do repo.

### 2. Clarificacao

- Pergunte uma decisao material por vez.
- Ofereca opcoes concretas quando houver trade-off.
- Bloqueie apenas as partes realmente ambiguas; nao paralise trabalho claro.
- Nao exija spec perfeita para avancar; busque o minimo que permite planejar e implementar com seguranca.

### 3. Spec minima

Produza ou atualize a spec com:

- objetivo;
- in/out of scope;
- non-goals explicitos quando isso reduzir ambiguidade;
- comportamento esperado;
- interfaces/contratos afetados;
- criterios de aceite;
- casos de erro relevantes;
- comandos de validacao esperados.

### 4. Handoff

- Quando a spec estiver clara, encaminhe para planejamento usando as skills ou workflows adequados ao escopo.
- Se ainda houver gap bloqueante, registre a pergunta no canal adequado e pare a implementacao afetada.

## Verification

- OpenSpec foi usado quando ativo.
- Nao existe spec duplicada competindo com OpenSpec.
- Tarefas pequenas nao foram forçadas a spec formal.
- Ambiguidades restantes estao registradas como perguntas objetivas.
