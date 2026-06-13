---
name: architecture-generator
description: "Use quando `PRD.md` estiver aprovado e for necessario produzir `ARCHITECTURE.md`; esta skill define a implementacao tecnica e o baseline de producao sem reabrir escopo de produto."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "architecture"
  complexity: 4
  status: active
  tags:
    - architecture
    - production
    - stack
    - infrastructure
---

# SKILL: Architecture Generator

## Objetivo

Transformar `PRD.md Approved` em `ARCHITECTURE.md` com decisoes tecnicas suficientes para implementacao consistente, evitando MVP descartavel e garantindo fundacao production-shaped.

## Use this skill when

- `PRD.md` esta `Approved`.
- A equipe precisa definir stack, banco, auth, billing, deploy e observabilidade.
- Existe risco de subestimar a base tecnica por causa de um escopo inicial pequeno.

## Do not use this skill when

- O PRD ainda esta em disputa.
- A tarefa e apenas discutir valor de produto ou priorizacao.
- Ja existe arquitetura aprovada e o trabalho atual e so uma mudanca pequena em OpenSpec.

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- `ARCHITECTURE.md` novo ou revisado
- Decisoes de stack e infraestrutura com justificativa suficiente
- Baseline de producao coberto
- Riscos tecnicos e integracoes relevantes mapeados
- Vista visual C4 (Context, Container, Deployment) embutida no `ARCHITECTURE.md` via skill `c4-architecture`, coerente com as decisoes

## Procedure

### 1. Ler o PRD aprovado

- Extraia fluxos principais, requisitos nao funcionais e regras de negocio.
- Identifique impactos em auth, dados, billing, integracoes e operacao.
- Nao reabra discussoes de escopo de produto sem motivo estrutural forte.

### 2. Definir a fundacao tecnica

- Escolha stack, runtime, banco e modelo de deploy.
- Defina estrategia de auth, persistencia, migrations e env vars.
- Defina billing real, ainda que em modo de teste no inicio.

### 3. Fechar baseline de producao

- Inclua logging minimo, tratamento de erros e observabilidade inicial.
- Garanta deploy reproduzivel e operacao fora do ambiente local.
- Planeje testes para fluxos criticos.

### 4. Mapear riscos e trade-offs

- Registre integracoes externas e pontos de falha.
- Destaque riscos tecnicos de escala, consistencia, seguranca ou custo.
- Escolha a menor arquitetura que atenda o produto sem fragilidade estrutural.

### 5. Gerar a vista visual C4

- Use a skill `c4-architecture` para embutir Context, Container e Deployment no `ARCHITECTURE.md`.
- O C4 e vista derivada: cada elemento do diagrama deve rastrear para uma decisao desta arquitetura.
- Nao edite o C4 isoladamente; ele nasce e e atualizado a partir das decisoes deste documento.
- Deixe Component e Dynamic para o nivel da mudanca OpenSpec, nao no doc raiz.

### 6. Verificar consistencia

- Confirme que a arquitetura responde "como construir".
- Confirme que prosa e diagramas C4 dizem a mesma coisa, sem contradicao.
- Remova backlog disfarcado e detalhes de faseamento; isso pertence ao roadmap.
- Marque como `Draft` ate aprovacao humana.

## Pitfalls

- Nao aceitar fake auth, fake database ou fake billing como base permanente.
- Nao superdimensionar a arquitetura sem necessidade real.
- Nao confundir decisao tecnica com ordem de entrega.

## Verification

- `ARCHITECTURE.md` cobre stack, infra, dados, auth, billing e operacao.
- O baseline de producao esta explicito.
- O documento nao virou roadmap nem PRD tecnico.

> **Skill log**
> - [2026-06-01] Criada para gerar arquitetura production-shaped a partir de PRD aprovado.
