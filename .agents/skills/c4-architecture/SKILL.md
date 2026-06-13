---
name: c4-architecture
description: "Use quando for preciso representar visualmente a arquitetura de um projeto em diagramas C4 (Context, Container, Component, Deployment, Dynamic) em Mermaid, como vista derivada do ARCHITECTURE.md; mantem a representacao visual sincronizada com as decisoes tecnicas sem virar fonte da verdade paralela."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "architecture"
  complexity: 3
  status: active
  tags:
    - c4
    - architecture
    - diagram
    - mermaid
    - visualization
---

# SKILL: C4 Architecture

## Objetivo

Produzir a representacao visual da arquitetura em diagramas C4 (Mermaid) como **vista derivada** das decisoes ja registradas no `ARCHITECTURE.md`, garantindo que prosa e diagrama digam exatamente a mesma coisa e que o harness siga uma estrutura definida sem desviar.

## Use this skill when

- O `ARCHITECTURE.md` precisa de uma vista visual (Context, Container, Deployment).
- Uma mudanca OpenSpec arquiteturalmente significativa altera elementos ou relacoes do sistema.
- Uma feature ou fluxo critico precisa de diagrama Component ou Dynamic no nivel da mudanca.
- E preciso comunicar a arquitetura para audiencias distintas (produto, dev, operacao).

## Do not use this skill when

- Nao existe `ARCHITECTURE.md` aprovado nem decisao tecnica para representar; gere a arquitetura primeiro com `architecture-generator`.
- A tarefa e decidir stack, banco ou infra (isso e `architecture-generator`, nao esta skill).
- A mudanca nao e arquiteturalmente significativa (nao altera nenhum elemento ou relacao C4).
- O pedido seria um diagrama de classes nivel Code; este harness para no nivel Component.

## Invariants

- O `ARCHITECTURE.md` e a fonte da verdade; o C4 e vista derivada dele.
- Nunca edite o C4 isoladamente. Toda mudanca estrutural entra pelo `ARCHITECTURE.md` e o C4 e regenerado a partir dele.
- O piso de detalhe mantido a mao e o nivel Component. Nao crie nivel Code (classe a classe).
- Distribuicao fixa: Context, Container e Deployment vivem embutidos no `ARCHITECTURE.md`; Component e Dynamic sao gerados por feature ou fluxo no nivel da mudanca OpenSpec.
- Todo elemento tem nome, tipo, tecnologia (quando aplicavel) e descricao. Setas unidirecionais com verbo de acao.
- Maximo de cerca de 20 elementos por diagrama; acima disso, divida por boundary ou dominio.

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Diagramas C4 em Mermaid validos sintaticamente, com titulo em cada um.
- Context, Container e Deployment embutidos como secoes do `ARCHITECTURE.md`.
- Component e Dynamic, quando gerados, anexados a mudanca OpenSpec da feature ou fluxo correspondente.
- Consistencia explicita entre cada elemento do diagrama e a decisao correspondente no `ARCHITECTURE.md`.

## Procedure

### 1. Ler a fonte da verdade

- Leia o `ARCHITECTURE.md` e, quando existir, a mudanca OpenSpec em andamento.
- Extraia sistemas, atores externos, containers, bancos, filas, boundaries de modulo e topologia de deploy.
- Nao invente elementos que nao tenham respaldo em decisao registrada.

### 2. Escolher os niveis necessarios

- Context e Container sao a base; gere sempre que houver arquitetura.
- Deployment quando houver topologia de producao definida.
- Component apenas para containers complexos ou quando a feature precisar expor relacoes internas.
- Dynamic apenas para fluxos criticos numerados.
- Consulte `references/c4-syntax.md` para a sintaxe Mermaid completa.

### 3. Gerar os diagramas

- Use a sintaxe e os elementos corretos por nivel (ver `references/c4-syntax.md`).
- Aplique os padroes de microservices, event-driven e deployment de `references/advanced-patterns.md` quando relevante.
- Evite os anti-patterns documentados em `references/common-mistakes.md`.
- Mapeie cada elemento e relacao para a decisao correspondente no `ARCHITECTURE.md`.

### 4. Distribuir e sincronizar

- Embuta Context, Container e Deployment no `ARCHITECTURE.md`.
- Anexe Component e Dynamic ao artefato da mudanca OpenSpec da feature ou fluxo.
- Se a fonte mudou, regenere o diagrama afetado; nunca edite o C4 fora desse caminho.

### 5. Verificar consistencia

- Confirme que nenhum elemento do diagrama contradiz o `ARCHITECTURE.md` e vice-versa.
- Confirme que nenhum nivel Code foi introduzido.
- Confirme que a distribuicao por arquivo foi respeitada.

## Pitfalls

- Confundir container (unidade deployavel) com component (elemento interno nao deployavel).
- Modelar biblioteca compartilhada ou broker de mensagens como um unico container.
- Mostrar internals de sistemas externos em vez de trata-los como caixa-preta.
- Setas bidirecionais ou sem rotulo, e rotulos genericos como "usa".
- Tratar o C4 como fonte da verdade ou edita-lo sem passar pelo `ARCHITECTURE.md`.
- Materializar todos os niveis no doc raiz, inflando o `ARCHITECTURE.md`.

## Verification

- Diagramas Context, Container e Deployment presentes no `ARCHITECTURE.md` quando ha arquitetura.
- Component e Dynamic gerados apenas quando agregam valor, junto da mudanca correspondente.
- Sintaxe Mermaid C4 valida e cada elemento rastreavel a uma decisao do `ARCHITECTURE.md`.
- Nenhum nivel Code; piso no Component.
- Caminho unico de atualizacao respeitado: fonte e o `ARCHITECTURE.md`, C4 e derivado.

## Attribution

A base de conhecimento em `references/` (sintaxe, anti-patterns e padroes avancados) foi adaptada de `softaworks/agent-toolkit` (skill `c4-architecture`), reescrita para o formato e o modelo de integracao deste harness.

> **Skill log**
> - [2026-06-13] Criada como vista visual derivada do ARCHITECTURE.md, integrada ao fluxo OpenSpec, com piso no nivel Component.
