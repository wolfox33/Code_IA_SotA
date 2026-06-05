---
name: discovery-grill
description: "Use quando houver `DISCOVERY.md` em elaboracao ou revisao; esta skill pressiona premissas, reduz escopo e expõe riscos antes de aprovar o discovery."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "product"
  complexity: 3
  status: active
  tags:
    - discovery
    - product
    - risk
    - scope
---

# SKILL: Discovery Grill

## Objetivo

Fortalecer `DISCOVERY.md` antes da aprovacao. A skill questiona valor, monetizacao, riscos e excesso de escopo para evitar construir produto bonito em cima de tese fraca, mantendo o humano no loop de decisao.

## Use this skill when

- Existe `DISCOVERY.md` em `Draft`.
- O discovery parece promissor, mas ainda tem premissas pouco testadas.
- O usuario quer saber se a ideia esta clara o bastante para virar PRD.

## Do not use this skill when

- O trabalho ja esta em PRD, arquitetura ou implementacao.
- A tarefa e apenas formatar ou resumir discovery sem critica.
- Nao existe discovery minimamente preenchido para tensionar.

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Lista objetiva de riscos e inconsistencias
- Perguntas criticas ainda sem resposta
- Sugestoes de corte, adiamento ou simplificacao
- Recomendacao clara para o humano: aprovar, iterar ou abandonar
- Proximo ciclo de refinamento necessario quando houver bloqueios

## Procedure

### 1. Ler o discovery atual

- Leia `DISCOVERY.md` inteiro.
- Identifique problema, usuario, valor, monetizacao, riscos e hipoteses.
- Marque lacunas que impedem avaliacao honesta.
- Separe o que esta claro do que ainda depende de decisao humana.

### 2. Pressionar a tese do produto

- Pergunte quem paga, por que paga e qual dor concreta esta sendo resolvida.
- Verifique se existe diferenciacao suficiente ou risco obvio de comoditizacao.
- Separe desejo do fundador de evidencia minima do mercado.

### 3. Pressionar escopo e prioridade

- Identifique o menor MVP que ainda valida a tese central.
- Liste o que pode ser removido, adiado ou deixado fora da V1.
- Aponte features que parecem conforto, nao necessidade.

### 4. Pressionar riscos

- Destaque maior risco comercial, maior risco tecnico e maior risco operacional.
- Verifique premissas ocultas sobre aquisicao, onboarding, retencao ou custo.
- Diferencie risco real de simples incerteza aceitavel.

### 5. Fechar com recomendacao

- Diga se o documento parece pronto para apreciacao humana.
- Se nao puder, liste as perguntas bloqueantes em ordem de impacto.
- Sugira o proximo passo minimo para destravar a fase.
- Peça que o humano revise o discovery refinado antes de qualquer `Approved`.

### 6. Rodar o loop de refinamento

- Atualize `DISCOVERY.md` com as respostas, cortes e esclarecimentos obtidos.
- Reaplique o grill se ainda restarem premissas importantes sem resposta.
- Pare o loop apenas quando os bloqueios restantes forem aceitaveis e o humano puder decidir conscientemente.

## Pitfalls

- Nao virar brainstorming infinito.
- Nao substituir a decisao humana por um "Approved" automatico.
- Nao discutir stack ou arquitetura cedo demais.
- Nao pedir pesquisa excessiva quando um corte de escopo resolveria.

## Verification

- A critica ficou focada em negocio, usuario, valor e risco.
- O resultado deixa claro ao humano se deve aprovar, iterar ou matar a ideia.
- A skill operou como loop de refinamento, nao como parecer unico e terminal.
- A skill nao invadiu PRD, arquitetura ou roadmap.

> **Skill log**
> - [2026-06-01] Criada para reforcar a aprovacao de discovery em workflow de desenvolvimento de produto com OpenSpec.
> - [2026-06-04] Atualizada para exigir checkpoint humano e loop iterativo de refinamento antes de `DISCOVERY.md Approved`.
