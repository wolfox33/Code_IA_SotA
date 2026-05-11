---
name: backend-resilience-by-design
description: "Use durante implementação e revisão de backend quando a tarefa envolver APIs, serviços, banco, integrações externas, fluxos críticos ou validação antes de concluir; aplica resiliência desde o design e valida idempotência, transações, race conditions, timeouts, retries seguros, circuit breakers, rate limiting, caching, paginação, observabilidade, health checks, degradação graciosa e segurança operacional."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "engineering"
  complexity: 4
  status: active
  tags:
    - backend
    - resilience
    - sre
    - reliability
    - observability
---

# SKILL: Backend Resilience by Design

## Objetivo

Aplicar resiliência backend durante o desenvolvimento, não apenas como checklist final. Use esta skill para projetar, implementar e validar mudanças que precisam sobreviver a falhas reais: requisições duplicadas, concorrência, APIs externas lentas ou indisponíveis, abuso de tráfego, datasets grandes, falhas parciais e falta de visibilidade operacional.

## Use this skill when

- Implementar ou revisar APIs, serviços backend, jobs, workers, webhooks ou integrações externas.
- Alterar fluxos críticos como checkout, pagamentos, billing, créditos, pedidos, autenticação, geração de recursos ou processamento assíncrono.
- Houver risco de duplicidade, race condition, inconsistência de dados, retry inseguro ou falha parcial.
- Adicionar endpoints públicos ou operações caras que possam sofrer abuso, bots, brute force ou picos de carga.
- Trabalhar com listagens, consultas grandes, cache, paginação ou limites de payload.
- Preparar a conclusão de uma mudança backend e validar se ela é segura, operável e resiliente.

## Do not use this skill when

- A tarefa for puramente visual, textual ou de frontend sem contrato backend ou impacto operacional.
- A mudança for uma edição mecânica sem alteração de comportamento, dados, tráfego, integração ou erro.
- A tarefa exigir apenas checklist de deploy, secrets, rollback, backups e ambiente; nesse caso prefira uma skill de production readiness se existir.
- A tarefa for exclusivamente segurança de dependências, pentest ou compliance, sem implementação backend concreta.

## Procedure

### 1. Classificar o risco da mudança

Antes de implementar, identifique quais riscos existem no fluxo:

- **Consistência**: duplicidade, transação incompleta, rollback, race condition, constraint ausente.
- **Dependência externa**: timeout, lentidão, indisponibilidade, resposta duplicada, falha parcial.
- **Abuso e carga**: endpoint público, brute force, bot, payload grande, operação cara.
- **Performance**: consulta sem limite, paginação ausente, N+1, cache necessário, índice necessário.
- **Operabilidade**: logs insuficientes, erro silencioso, ausência de correlation id, health check fraco.

Aplique apenas controles proporcionais ao risco real. Não introduza infraestrutura pesada quando validação simples, constraint ou limite explícito resolverem.

### 2. Implementar com resiliência desde o design

Durante a implementação, proteja as invariantes antes de otimizar detalhes.

Para mutações críticas:

- Defina se a operação precisa ser idempotente.
- Use chave de idempotência quando repetição puder causar cobrança, duplicidade, criação repetida ou efeito externo repetido.
- Use transação para mudanças que precisam ocorrer juntas ou não ocorrer.
- Coloque constraints no banco para regras de unicidade e integridade que não podem depender apenas de validação em código.
- Considere lock otimista, lock pessimista ou update condicional quando houver concorrência real.
- Planeje o estado intermediário quando houver chamada externa dentro ou ao redor do fluxo.

Para chamadas externas:

- Configure timeout explícito.
- Só use retry se a operação for idempotente ou comprovadamente segura.
- Use backoff e limite máximo de tentativas.
- Considere circuit breaker ou degradação graciosa quando a dependência puder causar cascata de falha.
- Retorne erro claro sem esconder a causa operacional.

Para endpoints públicos ou caros:

- Valide entrada na borda do sistema.
- Defina limite de payload, paginação e tamanho máximo de batch.
- Aplique rate limit em login, cadastro, password reset, webhooks, endpoints de IA, scraping targets e operações caras.
- Evite revelar detalhes sensíveis em mensagens de erro.

Para dados grandes:

- Use paginação em toda listagem.
- Prefira cursor pagination quando offset puder degradar ou causar inconsistência com dados mutáveis.
- Defina limite máximo de página ou batch.
- Verifique índices compatíveis com filtros e ordenação.
- Use cache apenas quando houver benefício claro, TTL definido e estratégia de invalidação ou tolerância a stale data.

Para observabilidade:

- Registre erros relevantes com contexto suficiente para diagnóstico.
- Inclua request id, operation id, job id, idempotency key ou correlation id quando disponível.
- Diferencie falha interna de falha de dependência externa.
- Redija tokens, cookies, senhas, chaves, documentos e payloads sensíveis dos logs.
- Exponha health checks proporcionais às dependências críticas do sistema.

### 3. Validar antes de concluir

Antes de considerar a tarefa concluída, rode uma validação proporcional ao risco:

- **Duplicidade**: o que acontece se a mesma requisição chegar duas vezes?
- **Concorrência**: o que acontece se duas requisições alterarem o mesmo recurso ao mesmo tempo?
- **Falha externa**: o que acontece se a API externa falhar, atrasar ou responder parcialmente?
- **Carga**: o que acontece com muitos registros, página grande, payload grande ou pico de tráfego?
- **Abuso**: o endpoint pode ser usado para brute force, spam, custo excessivo ou enumeração?
- **Observabilidade**: se falhar em produção, os logs e métricas permitem localizar a causa sem expor segredo?
- **Rollback**: a mudança deixa dados em estado recuperável se algo falhar no meio?

Quando a validação expuser risco real, corrija a causa raiz ou registre explicitamente a limitação se ela depender de decisão de produto, infraestrutura ou escopo.

### 4. Testar os cenários críticos

Adicione ou rode testes quando a mudança criar ou alterar lógica crítica.

Priorize testes para:

- Requisição duplicada ou chave de idempotência repetida.
- Concorrência ou update condicional.
- Rollback de transação.
- Timeout, erro ou resposta inválida de dependência externa.
- Rate limit, limite de payload, paginação e limite máximo.
- Cache hit, cache miss e invalidação quando aplicável.

Se não houver estrutura de teste disponível, valide manualmente o comportamento mais arriscado e informe a lacuna.

## Decision Heuristics

- **Idempotência**: necessária quando repetir a operação causa efeito colateral novo ou cobrança/entrega duplicada.
- **Transação**: necessária quando múltiplas escritas precisam preservar uma única invariante.
- **Constraint**: necessária quando a regra precisa sobreviver a concorrência e múltiplas instâncias da aplicação.
- **Retry**: seguro apenas quando a operação é idempotente ou quando o provedor garante deduplicação.
- **Circuit breaker**: útil quando uma dependência lenta pode consumir workers, conexões ou orçamento de latência.
- **Rate limit**: necessário em endpoints públicos sensíveis, caros ou com risco de abuso.
- **Cache**: útil para leitura repetida ou cara; perigoso quando invalidação e stale data não foram considerados.
- **Cursor pagination**: preferível para datasets grandes, ordenação estável e listas que mudam durante navegação.
- **Observabilidade**: obrigatória em fluxos críticos, integrações externas e operações assíncronas.

## Red Flags

- Retry em operação não idempotente.
- Chamada externa sem timeout.
- Webhook processado sem deduplicação.
- Pagamento, crédito ou pedido sem chave de idempotência.
- Unicidade validada apenas em código, sem constraint no banco.
- `SELECT *` ou listagem sem limite em endpoint público.
- Cache sem TTL ou sem estratégia clara de invalidação.
- Catch silencioso que esconde falha relevante.
- Logs contendo token, cookie, senha, chave de API ou dados sensíveis.
- Endpoint de login, cadastro, password reset ou IA sem rate limit.
- Erro genérico que impede diagnóstico ou erro detalhado que vaza informação sensível.

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Riscos reais identificados no fluxo.
- Invariantes que precisam ser protegidas.
- Controles aplicados durante a implementação.
- Validação executada antes de concluir.
- Testes adicionados ou lacunas de teste justificadas.
- Riscos residuais que dependem de escopo, infraestrutura ou decisão do usuário.

## Pitfalls

- Não transformar toda mudança backend em arquitetura complexa. Aplique o menor controle correto para o risco identificado.
- Não usar retry para mascarar inconsistência. Primeiro garanta idempotência e timeout.
- Não colocar chamada externa longa dentro de transação sem avaliar lock, latência e falha parcial.
- Não depender apenas de validação em código para regras que o banco deve garantir sob concorrência.
- Não adicionar cache para corrigir query ruim sem antes entender índice, limite e padrão de leitura.
- Não registrar payloads completos de produção em nome de observabilidade.

## Verification

- A skill está em `.agents/skills/backend-resilience-by-design/SKILL.md`.
- O frontmatter possui `name`, `description` e `metadata` parseáveis.
- A description deixa claro que a skill serve tanto para implementação quanto validação.
- O procedimento cobre consistência, dependências externas, abuso, performance e observabilidade.
- A validação final força revisão de duplicidade, concorrência, falha externa, carga, abuso e logs.


> **Skill log**
> - [2026-05-05] Skill criada para aplicar resiliência backend durante desenvolvimento e também servir como validador antes da conclusão.
> - [2026-05-11] Stage 6 alinhou o heading de saída ao contrato canônico `Output contracts`.
