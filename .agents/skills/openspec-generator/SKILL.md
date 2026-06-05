---
name: openspec-generator
description: "Use quando itens relevantes do `ROADMAP.md` precisarem virar mudancas formais em OpenSpec; esta skill inicializa a ferramenta quando necessario e orienta o uso de `openspec init` e comandos `/opsx:*` reais antes da implementacao."
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

Transformar entregas relevantes do roadmap em mudancas OpenSpec reais, usando o workflow OPSX da propria ferramenta para guiar implementacao sem pular direto para codigo.

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

- OpenSpec inicializado no repositorio com `openspec init` quando necessario
- Mudanca criada ou atualizada em `openspec/changes/<change-id>/`
- Uso do comando OPSX adequado para o contexto (`/opsx:explore`, `/opsx:propose`, `/opsx:apply`, `/opsx:sync`, `/opsx:archive` ou variantes expandidas)
- Escopo da mudanca alinhado ao roadmap e aos documentos aprovados
- Criticos de implementacao e validacao explicitados

## Procedure

### 1. Inicializar a ferramenta real

- Verifique se OpenSpec ja esta instalado e configurado no repositorio.
- Se o repositorio ainda nao foi inicializado para OpenSpec, rode `openspec init`.
- Considere criar ou revisar `openspec/config.yaml`, porque a documentacao nova recomenda esse arquivo para contexto e regras de artefato.
- Trate as skills geradas pelo `openspec init` como a interface principal para o agente, nao como algo a ser reimplementado manualmente.

### 2. Escolher a mudanca certa

- Leia `ROADMAP.md` e identifique o item relevante.
- Confirme dependencias e artefatos aprovados que servem de base.
- Defina um `change-id` curto e descritivo.

### 3. Escolher o comando OPSX correto

- Use `/opsx:explore` para investigar, clarificar requisitos ou comparar abordagens.
- Use `/opsx:propose` como caminho padrao rapido quando a entrega ja estiver clara e voce quiser gerar os artefatos de planejamento.
- Se o time optou pelo profile expandido, use `/opsx:new`, `/opsx:continue` ou `/opsx:ff` conforme o nivel de controle desejado.
- Nao force o profile expandido se o `core` ja cobre a necessidade.

### 4. Construir os artefatos com a ferramenta

- Gere ou refine proposal, specs, design e tasks por meio dos comandos OPSX aplicaveis.
- Relacione a mudanca explicitamente com a fase ou item do roadmap.
- Deixe claro o comportamento novo, alterado e fora de escopo.
- Registre casos de erro ou restricoes relevantes.
- Diferencie criterio de aceite de detalhe de implementacao.
- Garanta que a spec responda o suficiente para evitar improviso no codigo.
- Mantenha cada task pequena o bastante para validacao objetiva.

### 5. Implementar no fluxo OPSX

- Use `/opsx:apply` para implementar enquanto atualiza artefatos se o aprendizado exigir.
- Use `/opsx:sync` quando houver delta specs para sincronizar com a base principal.
- Use `/opsx:archive` ao concluir a mudanca.
- Se estiver no fluxo expandido, use `/opsx:verify` antes de arquivar quando isso agregar sinal real.

### 6. Verificar alinhamento

- Confira consistencia com `DISCOVERY.md`, `PRD.md`, `ARCHITECTURE.md` e `ROADMAP.md` aprovados.
- Remova expansoes de escopo que nao vieram do roadmap.
- Corte qualquer requisito que deveria voltar para PRD ou arquitetura.
- Cheque se o tamanho da mudanca ainda cabe em um unico ciclo de implementacao.
- Deixe claro o proximo passo humano: revisar, aprovar, aplicar ou arquivar.

## Pitfalls

- Nao criar mudanca gigante demais para uma unica entrega.
- Nao pular `openspec init` e depois improvisar uma pasta `openspec/` manualmente.
- Nao pular specs quando a mudanca altera comportamento.
- Nao usar OpenSpec para substituir PRD ou arquitetura.
- Nao descrever OPSX como fluxo linear fixo; a documentacao nova trata o modelo como acoes iterativas.

## Verification

- A mudanca OpenSpec esta alinhada ao roadmap.
- `openspec init` foi usado quando necessario.
- Os comandos OPSX reais foram usados no lugar de um clone manual do processo.
- Os artefatos cobrem a entrega sem burocracia extra.
- A implementacao pode comecar sem depender de improviso estrutural.

> **Skill log**
> - [2026-06-01] Criada para ligar roadmap aprovado ao fluxo de mudancas OpenSpec antes da implementacao.
> - [2026-06-04] Atualizada para o workflow OPSX: inicializacao com `openspec init`, uso de comandos `/opsx:*` reais e abandono da descricao linear antiga.
