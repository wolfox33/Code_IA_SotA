---
name: openspec-bridge
description: "Use quando o harness precisar decidir, inicializar ou encaminhar trabalho para OpenSpec sem reimplementar seus comandos, estrutura ou artefatos; atua como ponte entre ROADMAP/contexto local e o fluxo oficial OpenSpec."
metadata:
  model: inherit
  version: "1.1.0"
  author: "Custom Stack"
  category: "spec"
  complexity: 4
  status: active
  tags:
    - openspec
    - bridge
    - proposal
    - design
    - tasks
---

# SKILL: OpenSpec Bridge

## Objetivo

Encaminhar entregas relevantes do roadmap ou contexto local para o fluxo oficial OpenSpec, mantendo OpenSpec como fonte canonica e evitando specs paralelas ou artefatos manuais concorrentes.

## Invariantes

- Esta skill nao substitui OpenSpec, seus comandos, artefatos ou skills geradas por `openspec init`.
- Quando OpenSpec estiver ativo, use comandos, skills e artefatos oficiais como fonte canonica.
- Nao crie estrutura OpenSpec manualmente se a ferramenta oficial puder inicializar ou atualizar os artefatos.
- Nao use esta skill para justificar burocracia de spec em tarefas triviais.

## Use this skill when

- O projeto usa OpenSpec para governar mudancas.
- `ROADMAP.md` indica uma entrega ou fase pronta para virar mudanca formal.
- Uma mudanca altera comportamento, contrato ou fluxo importante e precisa entrar no fluxo OpenSpec.
- O harness precisa decidir se deve inicializar OpenSpec, chamar `/opsx:*` ou evitar uma spec paralela.

## Do not use this skill when

- A tarefa e trivial e nao configura mudanca relevante.
- O roadmap ainda nao existe ou nao foi aprovado.
- OpenSpec nao esta ativo no projeto e o usuario nao pediu para avalia-lo.
- O usuario quer implementacao imediata de escopo claro e pequeno.
- A intencao for criar artefatos OpenSpec manualmente no lugar dos comandos ou skills oficiais.
- A skill seria usada como fonte de verdade sobre sintaxe, schema ou estrutura interna do OpenSpec.

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Status do OpenSpec no repositorio: ativo, ausente ou precisa inicializar.
- Caminho oficial escolhido: `openspec init`, `/opsx:explore`, `/opsx:propose`, `/opsx:apply`, `/opsx:sync`, `/opsx:archive` ou variante disponivel no projeto.
- Mudanca OpenSpec relacionada a um item de roadmap ou contexto aprovado.
- Escopo da mudanca sem spec paralela competindo com OpenSpec.
- Proximo passo humano claro: revisar, aprovar, aplicar, sincronizar ou arquivar.

## Procedure

### 1. Verificar estado do OpenSpec

- Leia `.agents/project/context.md` e confirme se OpenSpec esta declarado como ativo.
- Verifique se o repositorio possui configuracao ou artefatos OpenSpec existentes.
- Se OpenSpec nao estiver ativo, nao force esta skill; volte ao workflow spec-first ou peca decisao explicita.

### 2. Encaminhar para a ferramenta oficial

- Se o repositorio ainda nao foi inicializado para OpenSpec e a decisao de usa-lo estiver aprovada, rode `openspec init`.
- Considere criar ou revisar `openspec/config.yaml` apenas quando a ferramenta ou o projeto exigir contexto e regras de artefato.
- Trate skills geradas pelo `openspec init` como interface principal para o agente.
- Use comandos `/opsx:*` reais disponiveis no ambiente em vez de clonar o processo manualmente.

### 3. Escolher a mudanca certa

- Leia `ROADMAP.md` quando existir e identifique o item relevante.
- Confirme dependencias e artefatos aprovados que servem de base.
- Defina ou valide um `change-id` curto e descritivo pelo fluxo oficial.
- Corte expansoes de escopo que nao vieram do roadmap, PRD, arquitetura ou decisao explicita.

### 4. Escolher o comando OPSX adequado

- Use `/opsx:explore` para investigar, clarificar requisitos ou comparar abordagens.
- Use `/opsx:propose` quando a entrega ja estiver clara e precisar virar artefatos de planejamento.
- Use `/opsx:apply` para implementar dentro do fluxo OpenSpec.
- Use `/opsx:sync` quando houver delta specs para sincronizar com a base principal.
- Use `/opsx:archive` ao concluir a mudanca.
- Se o projeto usa profile expandido, use variantes como `/opsx:new`, `/opsx:continue`, `/opsx:ff` ou `/opsx:verify` apenas quando agregarem controle real.

### 5. Verificar alinhamento

- Confira consistencia com `DISCOVERY.md`, `PRD.md`, `ARCHITECTURE.md` e `ROADMAP.md` aprovados quando existirem.
- Diferencie criterio de aceite de detalhe de implementacao.
- Garanta que a spec responda o suficiente para evitar improviso no codigo.
- Mantenha cada task pequena o bastante para validacao objetiva.
- Deixe claro se o trabalho deve revisar, aprovar, aplicar, sincronizar ou arquivar.

## Pitfalls

- Criar pasta `openspec/` ou `openspec/changes/` manualmente antes de usar a ferramenta oficial.
- Tratar esta skill como documentacao de OpenSpec.
- Duplicar uma spec OpenSpec em `.agents/specs/`, `spec-questions.md` ou documentos paralelos.
- Usar OpenSpec para substituir PRD, arquitetura ou roadmap.
- Descrever OPSX como fluxo linear fixo quando a ferramenta trata o modelo como acoes iterativas.

## Verification

- OpenSpec permaneceu como fonte canonica quando ativo.
- `openspec init` foi usado quando a inicializacao era necessaria e aprovada.
- Comandos ou skills oficiais foram preferidos a artefatos manuais.
- Nao foi criada spec paralela competindo com OpenSpec.
- A mudanca ficou alinhada ao roadmap ou contexto aprovado.
- O proximo passo ficou claro e acionavel.

> **Skill log**
> - [2026-06-01] Criada como `openspec-generator` para ligar roadmap aprovado ao fluxo de mudancas OpenSpec antes da implementacao.
> - [2026-06-04] Atualizada para o workflow OPSX: inicializacao com `openspec init`, uso de comandos `/opsx:*` reais e abandono da descricao linear antiga.
> - [2026-06-05] Renomeada para `openspec-bridge` e reposicionada como ponte para OpenSpec, nao como gerador ou substituto da ferramenta oficial.
