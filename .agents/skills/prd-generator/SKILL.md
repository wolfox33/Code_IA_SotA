---
name: prd-generator
description: "Use quando `DISCOVERY.md` estiver aprovado e for necessario gerar ou revisar `PRD.md`; esta skill transforma tese de produto em escopo, fluxos, requisitos e metricas sem escolher tecnologia."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "product"
  complexity: 3
  status: active
  tags:
    - prd
    - product
    - scope
    - requirements
---

# SKILL: PRD Generator

## Objetivo

Transformar um discovery aprovado em `PRD.md` claro, enxuto e orientado a produto, mantendo fora dele decisoes de stack, infra e implementacao tecnica.

## Use this skill when

- `DISCOVERY.md` esta `Approved`.
- O proximo passo e definir o que sera construido.
- Existe risco de misturar produto com arquitetura durante a escrita do PRD.

## Do not use this skill when

- O discovery ainda esta incompleto ou contestado.
- A tarefa e escolher stack, banco ou deploy.
- O trabalho ja esta no nivel de OpenSpec para uma feature especifica.

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- `PRD.md` novo ou revisado
- Escopo V1 e fora de escopo claros
- Requisitos funcionais e nao funcionais objetivos
- Fluxos, regras de negocio e metricas de sucesso definidos

## Procedure

### 1. Usar o discovery como entrada canonica

- Leia apenas o `DISCOVERY.md Approved`.
- Extraia problema, usuario, proposta de valor, restricoes e riscos que afetam produto.
- Ignore opinioes que nao tenham sido validadas na aprovacao.

### 2. Estruturar o PRD

- Defina visao do produto e segmentos de usuario.
- Descreva fluxos principais e jobs-to-be-done.
- Traduza a proposta em requisitos funcionais concretos.

### 3. Delimitar o escopo

- Declare o que entra na V1.
- Declare explicitamente o que fica fora de escopo.
- Corte detalhes que pertencem a arquitetura ou backlog futuro.

### 4. Fechar com qualidade de produto

- Adicione requisitos nao funcionais relevantes ao usuario e ao negocio.
- Liste regras de negocio que mudam comportamento ou cobranca.
- Defina metricas de sucesso que permitam avaliar a V1.

### 5. Verificar pureza do documento

- Remova stack, framework, banco, infra e detalhes de deploy.
- Garanta que o PRD responda "o que construir", nao "como construir".
- Marque como `Draft` ate revisao humana; so use `Approved` quando validado.

## Pitfalls

- Nao transformar PRD em backlog.
- Nao esconder regra de negocio dentro de fluxo narrativo.
- Nao misturar requisito com decisao tecnica.

## Verification

- `PRD.md` pode ser lido sem conhecer stack.
- O documento define produto, escopo e sucesso com clareza.
- A entrada usada foi um discovery aprovado.

> **Skill log**
> - [2026-06-01] Criada para gerar PRD a partir de discovery aprovado sem contaminar o documento com arquitetura.
