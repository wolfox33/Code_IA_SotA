---
name: verification-before-completion
description: "Use antes de concluir tarefas significativas para revisar objetivo, diff, testes/checks executados e riscos residuais; nao exige validacao formal para tarefas triviais."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "workflow"
  complexity: 3
  tags:
    - verification
    - checklist
    - review
    - handoff
---

# SKILL: Verification Before Completion

## Objetivo

Fechar tarefas com evidencia, nao apenas declaracao de que algo foi feito. Esta skill transforma a regra global de validar antes de concluir em um checklist operacional leve.

## Use this skill when

- A tarefa alterou codigo, contratos, arquitetura, skills, workflows ou configuracao relevante.
- Houve bugfix, feature, refactor ou mudanca multi-arquivo.
- Nem todos os testes puderam ser executados e o risco precisa ser declarado.

## Do not use this skill when

- A resposta for apenas explicativa.
- A tarefa for consulta simples sem alteracao.
- A mudanca for trivial e ja tiver verificacao obvia no proprio output.

## Procedure

### 1. Compare com o pedido

- Releia o objetivo do usuario.
- Confirme se a mudanca ficou dentro do escopo.
- Identifique qualquer pedido que nao foi atendido.

### 2. Revise o diff

- Verifique arquivos alterados.
- Procure alteracoes acidentais, escopo expandido e duplicacao.
- Confirme que nao houve edicao em memoria/contexto quando o repo for boilerplate e o usuario pedir para evitar.

### 3. Execute validacoes

- Rode testes/checks relacionados quando existirem.
- Para docs/skills, rode buscas mecanicas por termos proibidos, links obsoletos ou duplicacoes.
- Se uma validacao nao puder rodar, diga por que.

### 4. Prepare o fechamento

- Informe arquivos principais alterados.
- Informe comandos executados.
- Declare riscos residuais.
- Se houver commit/stage/push, confirme hash ou status.

## Pitfalls

- Nao listar comandos que nao foram executados.
- Nao esconder teste que falhou.
- Nao finalizar com working tree sujo sem avisar, quando a tarefa pedia commit.
- Nao transformar checklist em texto longo quando a tarefa e simples.

## Verification

- Objetivo, diff e validacoes foram conferidos.
- Riscos residuais estao claros.
- O usuario consegue saber o estado final sem ver logs do terminal.


> **Skill log**
> - [2026-04-25] Criada para fechamento verificavel de tarefas significativas sem impor overhead a consultas simples.
