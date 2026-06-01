---
name: roadmap-generator
description: "Use quando `ARCHITECTURE.md` estiver aprovado e for necessario gerar `ROADMAP.md`; esta skill converte a arquitetura em fases de execucao, dependencias e ordem de entrega sem virar backlog infinito."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "planning"
  complexity: 3
  status: active
  tags:
    - roadmap
    - planning
    - phases
    - sequencing
---

# SKILL: Roadmap Generator

## Objetivo

Organizar a implementacao em fases de execucao claras, com dependencias e prioridades suficientes para orientar construcao real sem criar um roadmap corporativo vazio.

## Use this skill when

- `ARCHITECTURE.md` esta `Approved`.
- E preciso decidir ordem de entrega.
- A equipe precisa enxergar fundacao, produto core e readiness sem espalhar tarefas em backlog infinito.

## Do not use this skill when

- A arquitetura ainda nao foi fechada.
- A tarefa e decompor uma unica feature em tasks OpenSpec.
- O usuario quer apenas lista de ideias futuras.

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- `ROADMAP.md` novo ou revisado
- Fases com objetivos claros
- Dependencias e ordem de entrega explicitas
- Indicacao de fase atual e proximas entregas quando aplicavel

## Procedure

### 1. Ler a arquitetura aprovada

- Identifique fundacao obrigatoria, dominio core, billing e readiness operacional.
- Liste dependencias tecnicas que afetam ordem de execucao.
- Ignore temas sem impacto no caminho critico.

### 2. Agrupar em fases

- Monte fases pequenas e nomeadas por objetivo.
- Comece por fundacao, siga para produto core e depois readiness incremental.
- Mantenha cada fase coesa e orientada a entrega real.
- Use nomes que comuniquem resultado, nao departamento.
- Garanta que cada fase possa ser explicada em poucas linhas.

### 3. Cortar o excesso

- Nao transforme o roadmap em backlog detalhado.
- Remova features especulativas ou distantes.
- Deixe itens futuros apenas quando ajudarem a explicar a sequencia.
- Una itens pequenos quando eles nao fizerem sentido isolados.
- Remova fases criadas so para parecer planejamento completo.

### 4. Fechar a ordem de execucao

- Mostre o que depende de que.
- Aponte a fase atual se o projeto ja estiver em andamento.
- Destaque proximas entregas sem listar tarefas miudas.
- Verifique se auth, dados, billing e operacao entram antes de depender deles.
- Ajuste a ordem quando uma integracao externa bloquear fluxos core.

### 5. Revisar a legibilidade

- Leia o roadmap do inicio ao fim como plano de execucao, nao como wish list.
- Confirme que uma pessoa nova entende qual fase vem agora e por que.
- Marque como `Draft` ate aprovacao humana.

## Pitfalls

- Nao confundir fase com milestone de marketing.
- Nao colocar tudo em "Phase 1".
- Nao repetir texto de arquitetura sem traduzir para ordem de execucao.

## Verification

- `ROADMAP.md` explica em que ordem construir.
- O documento nao virou backlog infinito nem cronograma corporativo.
- As fases respeitam dependencias tecnicas reais.

> **Skill log**
> - [2026-06-01] Criada para converter arquitetura aprovada em roadmap de execucao enxuto.
