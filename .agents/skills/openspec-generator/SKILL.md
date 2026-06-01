---
name: openspec-generator
description: "Use quando itens relevantes do `ROADMAP.md` precisarem virar mudancas formais em `openspec/changes/*`; esta skill transforma entregas planejadas em proposal, design, tasks e specs antes da implementacao."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "spec"
  complexity: 4
  status: active
  tags:
    - openspec
    - proposal
    - design
    - tasks
---

# SKILL: OpenSpec Generator

## Objetivo

Transformar entregas relevantes do roadmap em mudancas OpenSpec completas o bastante para guiar implementacao sem pular direto para codigo.

## Use this skill when

- `ROADMAP.md` ja indica uma entrega ou fase pronta para detalhamento.
- A mudanca e relevante o bastante para alterar comportamento, contrato ou fluxo importante.
- O projeto usa OpenSpec para governar mudancas.

## Do not use this skill when

- A tarefa e trivial e nao configura mudanca relevante.
- O roadmap ainda nao existe ou nao foi aprovado.
- O usuario quer implementacao imediata sem etapa de especificacao.

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Mudanca criada ou atualizada em `openspec/changes/<change-id>/`
- `proposal`, `design`, `tasks` e `specs` necessarios para a mudanca
- Escopo da mudanca alinhado ao roadmap e aos documentos aprovados
- Criticos de implementacao e validacao explicitados

## Procedure

### 1. Escolher a mudanca certa

- Leia `ROADMAP.md` e identifique o item relevante.
- Confirme dependencias e artefatos aprovados que servem de base.
- Defina um `change-id` curto e descritivo.

### 2. Traduzir o item para OpenSpec

- Escreva a proposta com contexto, problema e resultado esperado.
- Escreva design apenas no nivel necessario para a mudanca.
- Liste tasks executaveis em ordem logica.
- Relacione a mudanca explicitamente com a fase ou item do roadmap.
- Mantenha cada task pequena o bastante para validacao objetiva.

### 3. Especificar comportamento

- Adicione ou atualize specs afetadas.
- Deixe claro o comportamento novo, alterado e fora de escopo.
- Registre casos de erro ou restricoes relevantes.
- Diferencie criterio de aceite de detalhe de implementacao.
- Garanta que a spec responda o suficiente para evitar improviso no codigo.

### 4. Verificar alinhamento

- Confira consistencia com `DISCOVERY.md`, `PRD.md`, `ARCHITECTURE.md` e `ROADMAP.md` aprovados.
- Remova expansoes de escopo que nao vieram do roadmap.
- So avance para implementacao quando a mudanca estiver pronta para review/aprovacao.
- Corte qualquer requisito que deveria voltar para PRD ou arquitetura.
- Cheque se o tamanho da mudanca ainda cabe em um unico ciclo de implementacao.

### 5. Fechar o pacote de mudanca

- Revise nomes, links internos e estrutura de arquivos da mudanca.
- Confirme que proposal, design, tasks e specs contam a mesma historia.
- Deixe claro o proximo passo humano: revisar, aprovar ou detalhar mais.

## Pitfalls

- Nao criar mudanca gigante demais para uma unica entrega.
- Nao pular specs quando a mudanca altera comportamento.
- Nao usar OpenSpec para substituir PRD ou arquitetura.

## Verification

- A mudanca OpenSpec esta alinhada ao roadmap.
- Proposal, design, tasks e specs cobrem a entrega sem burocracia extra.
- A implementacao pode comecar sem depender de improviso estrutural.

> **Skill log**
> - [2026-06-01] Criada para ligar roadmap aprovado ao fluxo de mudancas OpenSpec antes da implementacao.
