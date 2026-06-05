---
name: chat-application-engineering
description: "Use quando a tarefa implementar, alterar ou revisar aplicações de chat: UI de mensagens, Vercel AI SDK UI, APIs, schema, streaming/realtime, persistência, testes ou performance de fluxos conversacionais."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "development"
  complexity: 6
  status: active
  tags:
    - chat
    - ai-sdk
    - api
    - realtime
    - database
    - testing
    - performance
---

# Chat Application Engineering

Skill de engenharia end-to-end para aplicações de chat. Use como ponto de entrada único para decidir quais dimensões do fluxo conversacional precisam de atenção sem carregar várias skills sobrepostas.

## Objetivo

Implementar ou revisar chat com contratos coerentes entre interface, API, transporte realtime, persistência, testes e performance, preservando segurança, ordenação de mensagens, validação e experiência de uso.

## Use this skill when

- Criar ou alterar UI de chat, lista de mensagens, input, loading states ou optimistic updates.
- Implementar chat com Vercel AI SDK UI (`@ai-sdk/react`, `useChat`, `UIMessage`, tool calling no client).
- Criar ou revisar APIs de chat, route handlers, validação, autenticação, rate limiting ou error handling.
- Definir schema de conversas, mensagens, templates, indexes, migrations ou persistência.
- Implementar SSE, WebSockets, streaming incremental, retry, timeout, reconciliação ou ordenação.
- Adicionar testes unitários, integração, E2E, mocks de LLM ou testes de streaming.
- Investigar performance de chat: queries lentas, N+1, bundle, virtualização, cache ou métricas.

## Do not use this skill when

- A tarefa menciona LLM, prompt ou agente, mas não altera fluxo conversacional.
- A mudança é apenas auth, billing, créditos, deploy ou banco sem impacto em chat.
- A tarefa é análise de dados, ML, quant ou backend genérico fora de mensagens/conversas.
- O problema é apenas escolher stack ou arquitetura de produto antes de haver escopo de chat.
- A otimização é prematura e não há sintoma, medição ou risco concreto.

## Output contracts

Ao aplicar esta skill, entregue ou registre apenas os itens relevantes ao escopo:

- UI/hook de chat com estados de envio, erro, loading, retry e cancelamento quando aplicável.
- API/route handler com autenticação, validação, ownership, rate limiting e erros consistentes.
- Schema ou migration de chat com foreign keys, indexes e integridade de dados.
- Transporte realtime ou streaming com persistência após sucesso e ordenação garantida.
- Integração AI SDK UI segura quando `@ai-sdk/react` for usado.
- Testes proporcionais ao risco: unit, integration, E2E, streaming, concorrência ou mocks.
- Evidência de performance quando a tarefa envolver otimização.

## Procedure

### 1. Delimitar o recorte

- Identifique quais camadas a tarefa toca: UI, API, schema, realtime, AI SDK UI, testes, performance.
- Leia a spec, OpenSpec ou contexto do projeto antes de alterar contratos.
- Se o contexto estiver vazio, derive fatos apenas do repo e registre decisões estáveis quando necessário.
- Não implemente camadas que não estejam ligadas ao pedido.

### 2. Preservar contratos e segurança

- Valide input na borda da API.
- Autentique usuário e verifique ownership de conversa antes de ler ou escrever mensagens.
- Use rate limiting em endpoints públicos, caros ou de streaming.
- Retorne mensagens de erro seguras no client e detalhes suficientes em logs internos.
- Não debite créditos, grave mensagens finais ou confirme estado durável antes do sucesso do fluxo.

### 3. Projetar dados e APIs juntos

- Modele conversas, mensagens e templates conforme o domínio real, não como schema genérico obrigatório.
- Garanta foreign keys, constraints e indexes para queries comuns por usuário, conversa e data.
- Planeje migrations antes de mudar schema existente.
- Evite N+1 em listagens de conversas/mensagens.

### 4. Implementar realtime e UI

- Use SSE para streaming unidirecional; use WebSockets apenas quando bidirecionalidade real for necessária.
- Em UI React, implemente loading states, retry, cancelamento e rollback de optimistic updates.
- Se usar Vercel AI SDK UI, configure `useChat`/transport, `UIMessage`, validação e persistência no formato esperado.
- Persistir mensagens após streaming bem-sucedido; reconciliar mensagens temporárias com IDs definitivos.
- Ordenar mensagens por critério estável e tratar duplicação/retry.

### 5. Testar comportamento crítico

- Teste services e regras de persistência com unit tests quando a lógica for isolável.
- Teste API + banco com integration tests reais quando houver contrato ou migration.
- Teste fluxos críticos de chat com E2E quando a UI ou streaming forem alterados.
- Mocke LLMs e serviços externos; não torne testes dependentes de provedores reais.
- Cubra concorrência quando houver créditos, reservas, retries ou múltiplos envios simultâneos.

### 6. Otimizar com medição

- Meça antes de otimizar.
- Priorize indexes, query shape, cache e virtualização quando houver evidência.
- Reduza bundle apenas quando componentes pesados afetarem o fluxo de chat.
- Adicione métricas quando o problema precisar ser observado em produção.

## References

- `references/ai-sdk-ui/` - Vercel AI SDK UI, `useChat`, transport, tool calling e segurança.
- `references/api/` - APIs de chat, autenticação, validação e rate limiting.
- `references/schema/` - Schema PostgreSQL/Drizzle, relationships, indexes e migrations.
- `references/realtime/` - SSE, WebSockets, streaming, optimistic updates, retry e recursos longos.
- `references/testing/` - Unit, integration, E2E, mocks, streaming e concorrência.
- `references/performance/` - Caching, queries, code splitting, virtualização e monitoring.

## Verification

- Escopo ficou restrito às camadas de chat realmente afetadas.
- Contratos de API, schema e UI estão consistentes entre si.
- Auth, ownership, validação e erros relevantes foram tratados.
- Streaming/realtime preserva persistência, ordenação, retry e estados de UI quando aplicável.
- AI SDK UI foi usado apenas quando o projeto realmente usa `@ai-sdk/react`.
- Testes/checks foram adicionados ou justificados conforme risco.
- Otimizações foram guiadas por medição ou sintoma concreto.

> **Skill log**
> - [2026-06-05] Criada para consolidar as antigas skills especializadas de chat em um ponto de entrada único para engenharia de chat.
