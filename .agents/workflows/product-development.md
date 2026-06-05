---
description: Workflow simples de desenvolvimento de produto para conduzir Discovery, PRD, Architecture, Roadmap e mudancas OpenSpec antes da implementacao.
---

# Product Development

Use este workflow quando o objetivo for tirar um produto do discovery ate um plano implementavel sem inflar o processo. Nao use para tarefas pequenas, bugfixes isolados ou execucao direta de uma feature ja especificada.

## Objetivo

Orquestrar a sequencia minima de artefatos que ajuda humanos e agentes a tomar decisoes corretas cedo, mantendo OpenSpec como mecanismo real de mudanca e evitando documentos redundantes.

## Principios

- Preferir simplicidade a processo extra.
- Cada documento responde uma pergunta unica.
- O humano e a autoridade final em toda aprovacao.
- Apenas documentos `Approved` viram fonte da verdade.
- OpenSpec gerencia mudancas; nao substitui discovery, PRD, arquitetura ou roadmap.
- Features podem ser pequenas, mas a base tecnica deve nascer production-shaped.

## Artefatos

- `DISCOVERY.md`: responde se vale a pena construir.
- `PRD.md`: responde o que sera construido.
- `ARCHITECTURE.md`: responde como sera construido.
- `ROADMAP.md`: responde em que ordem sera construido.
- `openspec/changes/*`: registra mudancas relevantes antes da implementacao.
- `openspec/config.yaml`: opcional, mas recomendado para contexto e regras do projeto.

## Regras de status

- Cada documento principal usa apenas `Status: Draft` ou `Status: Approved`.
- `Draft` pode ser refinado e questionado.
- `Approved` representa decisao validada e vira entrada da fase seguinte.

## Procedure

### 1. Descobrir

- Trabalhe sempre no mesmo `DISCOVERY.md`; nao crie `v2` ou snapshots paralelos.
- Registre problema, usuario, proposta de valor, monetizacao, concorrencia, riscos, hipoteses e decisoes abertas.
- Antes de qualquer aprovacao, execute a skill `discovery-grill` para pressionar premissas, expor lacunas e reduzir escopo desnecessario.
- Trate `discovery-grill` como loop de refinamento: criticar, atualizar `DISCOVERY.md`, devolver ao humano e repetir se ainda houver bloqueios materiais.
- Nao marque `DISCOVERY.md` como `Approved` sem revisao e decisao explicita do humano.
- Nao avance enquanto perguntas comerciais ou de risco continuarem bloqueantes.

### 2. Estruturar o produto

- Quando `DISCOVERY.md` estiver `Approved`, use `prd-generator`.
- Garanta que `PRD.md` descreva visao, usuarios, fluxos, requisitos funcionais e nao funcionais, regras de negocio, escopo V1, fora de escopo e metricas.
- Nao permita stack, framework, banco ou infra dentro do PRD.
- Aprove o PRD antes de discutir implementacao tecnica.

### 3. Definir a arquitetura

- Quando `PRD.md` estiver `Approved`, use `architecture-generator`.
- Defina stack, banco, auth, billing, deploy, integracoes, observabilidade, riscos tecnicos e decisoes estruturais.
- A arquitetura deve respeitar o baseline de producao: auth real, banco real, migrations, env vars, billing real em modo de teste se necessario, deploy reproduzivel, logging, tratamento de erros e testes criticos.
- Nao aceite fundacao descartavel so porque o escopo inicial e pequeno.
- Ao aprovar `ARCHITECTURE.md`, sincronize em `.agents/project/context.md` apenas fatos estruturais estaveis: stack, runtime, banco, auth, infra, package manager, comandos e constraints.
- Nao duplique PRD, roadmap ou OpenSpec no contexto; aponte para eles quando forem fonte canonica.

### 4. Planejar a execucao

- Quando `ARCHITECTURE.md` estiver `Approved`, use `roadmap-generator`.
- Organize o trabalho em fases de execucao, nao em backlog infinito.
- Mostre dependencias, ordem de entrega, fase atual e proximas entregas.
- Mantenha o roadmap curto e orientado a construcao.

### 5. Abrir mudancas OpenSpec

- Quando o roadmap apontar uma entrega relevante, use `openspec-bridge`.
- Antes de usar OpenSpec pela primeira vez no repositorio, rode `openspec init`.
- Use os comandos OPSX da propria ferramenta em vez de reproduzir o fluxo manualmente no repositorio.
- No profile `core`, use `/opsx:explore` para clarificar e `/opsx:propose` como caminho padrao para abrir a mudanca.
- Use `/opsx:apply` durante implementacao, `/opsx:sync` quando houver delta specs e `/opsx:archive` ao concluir.
- Se o projeto optar pelo profile expandido, configure com `openspec config profile` e aplique com `openspec update` antes de usar `/opsx:new`, `/opsx:continue`, `/opsx:ff`, `/opsx:verify` ou `/opsx:bulk-archive`.
- Nenhuma feature significativa deve pular direto para codigo sem passar por OpenSpec.
- Arquive a mudanca no fluxo OpenSpec apos implementacao e validacao.

### 6. Implementar

- So implemente depois que a mudanca relevante estiver descrita e aprovada no nivel adequado.
- A implementacao segue os artefatos aprovados; se surgir mudanca relevante, volte ao OpenSpec em vez de improvisar no codigo.

## Handoff entre fases

- `DISCOVERY.md Approved` habilita `PRD.md`.
- `PRD.md Approved` habilita `ARCHITECTURE.md`.
- `ARCHITECTURE.md Approved` habilita `ROADMAP.md`.
- Itens relevantes de `ROADMAP.md` habilitam `openspec/changes/*`.
- Mudanca OPSX suficientemente definida habilita implementacao; os artefatos podem continuar evoluindo durante `/opsx:apply`.

## Verification

- O workflow coordena fases, nao substitui skills especializadas.
- Cada fase tem um artefato unico e uma pergunta clara.
- Discovery nao foi tratado como passagem rapida; houve loop com `discovery-grill` e checkpoint humano antes da aprovacao.
- Apenas documentos `Approved` foram usados como base definitiva.
- `.agents/project/context.md` foi sincronizado quando decisoes estruturais estaveis foram aprovadas.
- OpenSpec foi inicializado com `openspec init` quando necessario e usado via comandos OPSX reais.
- Nenhum documento extra foi criado sem necessidade real.
