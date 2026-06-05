---
name: langgraph-agent-patterns
description: "Use quando a tarefa implementar runtime Python com LangGraph: StateGraph, especialistas, tool calling, middleware, checkpointing, streaming do grafo, memória ou boundary FastAPI do agente."
metadata:
  model: inherit
  version: "2.1.0"
  author: "Custom Stack"
  category: "backend"
  complexity: 7
  status: active
  tags:
    - langgraph
    - python
    - agents
    - orchestration
    - tools
    - middleware
    - checkpointing
---

# LangGraph Agent Patterns

Skill para projetar e implementar runtimes de agentes em Python com LangGraph atual. O foco é o backend do agente: orquestração, especialistas, ferramentas, middlewares, persistência e contrato de execução. Interface web, componentes de chat e detalhes de frontend ficam fora desta skill.

## Objetivo

Produzir agentes production-ready com:

- `StateGraph` explícito como camada primária de orquestração
- Agentes especialistas como nós/workers, implementados como funções Python ou subgrafos
- Tool calling com schemas claros, permissão explícita e tratamento de erro
- Middlewares LangChain v1 para prompt dinâmico, model routing, tool error handling, PII, moderação e human-in-the-loop
- Skills internas do agente como módulos Python plugáveis, independentes das skills do harness local
- Checkpointing PostgreSQL para estado de execução e store/memória separado para memória de longo prazo
- Boundary FastAPI fino, apenas chamando o runtime do agente e injetando contexto

## Use this skill when

- Implementar ou refatorar um grafo LangGraph em Python
- Criar fluxo `orchestrator + specialist agents`
- Adicionar tools, schemas, permissões ou tool error handling a agentes
- Definir middlewares de agente para segurança, roteamento, prompts ou human-in-the-loop
- Projetar registry de skills internas Python para o runtime do agente
- Configurar checkpointing, streaming ou memória de agentes LangGraph
- Expor o runtime por FastAPI sem acoplar a frontend

## Do not use this skill when

- A tarefa for UI, componentes de chat, rotas de frontend ou experiência visual
- O projeto usar apenas uma chamada simples de LLM sem estado, tools ou orquestração
- A tarefa for editar skills do harness `.agents/skills`; aqui "skills" significa capacidades Python internas do agente
- A necessidade principal for cobrança, créditos ou produto SaaS
- A tarefa for integração com AI SDK, Next.js ou React sem runtime LangGraph Python

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Runtime Python com StateGraph como orquestrador principal
- Agentes especialistas implementados como nós ou subgrafos
- Tools com schemas, docstrings e tratamento de erro
- Middlewares para comportamento transversal
- Skills internas do agente como módulos Python
- Checkpointing PostgreSQL configurado
- Boundary FastAPI fino expondo o runtime

## Procedure

### 1. Defina o limite do runtime

Modele o agente como um pacote Python isolado:

```text
agent_runtime/
  app/
    api.py
    graph.py
    context.py
    models.py
    middleware.py
    persistence.py
    tools/
      registry.py
    skills/
      base.py
      registry.py
```

O frontend fala com FastAPI. FastAPI valida entrada, autentica, cria contexto e chama o grafo; não decide fluxo, não monta prompts complexos e não executa tools diretamente.

### 2. Use `StateGraph` como orquestrador principal

Use `StateGraph` quando houver roteamento, múltiplos especialistas, revisão, memória, retries ou síntese. Use `MessagesState` para fluxos conversacionais simples e `TypedDict` quando o grafo precisar de campos explícitos.

Prefira retornos pequenos de estado. Não grave objetos inteiros de usuário, conexões, clientes ou payloads grandes no checkpoint; grave ids e resumos.

Exemplos completos em `references/stategraph-orchestrator.md`.

### 3. Crie especialistas como nós ou subgrafos

Implemente especialistas como funções Python que retornam atualizações de estado. Se o especialista tiver roteamento, revisão humana ou fluxo multi-step, modele como outro `StateGraph` e chame como subgrafo.

Exemplos completos em `references/create-agent-specialist.md`.

### 4. Implemente tool calling com schemas e permissões

Ferramentas devem ter nome claro, docstring objetiva, argumentos tipados e regra de permissão fora do prompt.

Para graphs manuais, use `ToolNode` e `tools_condition` quando o fluxo for o loop clássico LLM -> tools -> LLM.

Exemplos completos em `references/tool-calling.md`.

### 5. Use middlewares para comportamento transversal

Middlewares são a forma correta de aplicar políticas transversais sem espalhar lógica nos nós:

- `dynamic_prompt`: prompt por papel, tenant, plano, idioma ou modo
- `wrap_model_call`: seleção dinâmica de modelo, tools ou parâmetros
- `wrap_tool_call`: validação de permissão, logging, PII filtering
- `handle_tool_errors`: tratamento de erro robusto com retry
- `human_in_the_loop`: aprovação humana para ações sensíveis
- `moderation`: filtering de conteúdo sensível

Exemplos completos em `references/middleware.md`.

### 6. Configure checkpointing e streaming

Use checkpointing PostgreSQL para estado de execução e store/memória separado para memória de longo prazo. Configure streaming do grafo para respostas em tempo real.

Exemplos completos em `references/checkpointing-streaming.md`.

### 7. Implemente boundary FastAPI fino

Crie endpoint FastAPI que valida entrada, autentica, cria contexto e chama o grafo. Não decida fluxo, não monte prompts complexos e não execute tools diretamente.

```python
from fastapi import FastAPI, Depends
from app.graph import graph
from app.context import create_context

app = FastAPI()

@app.post("/agent")
async def agent_endpoint(request: AgentRequest, user = Depends(get_current_user)):
    context = create_context(user, request)
    result = await graph.ainvoke({"messages": request.messages}, config={"configurable": context})
    return result
```

## Verification

- Runtime Python usa StateGraph como orquestrador principal
- Agentes especialistas são implementados como nós ou subgrafos
- Tools têm schemas, docstrings e tratamento de erro
- Middlewares aplicam políticas transversais sem espalhar lógica
- Skills internas são módulos Python plugáveis
- Checkpointing PostgreSQL está configurado
- Boundary FastAPI é fino e não decide fluxo
- Exemplos de código estão em `references/`

> **Skill log**
> - [2026-05-11] Skill criada com padrões de LangGraph para agentes Python.
> - [2026-06-04] Refatorada: exemplos de código movidos para references/ para reduzir densidade de 393 para ~250 linhas.
> - [2026-06-04] Corrigida: versão LangGraph 1.2.4, removidas referências incorretas a create_react_agent (API não existe em LangGraph), especialistas implementados como nós ou subgrafos.

## References

Conteúdo referencial detalhado, exemplos de implementação e patterns estão disponíveis em:
- `references/stategraph-orchestrator.md` - Exemplo completo de StateGraph com orquestrador
- `references/create-agent-specialist.md` - Exemplo de especialista como nó ou subgrafo
- `references/tool-calling.md` - Exemplos de tool calling com schemas e ToolNode
- `references/middleware.md` - Exemplos de middlewares para comportamento transversal
- `references/checkpointing-streaming.md` - Exemplos de checkpointing PostgreSQL e streaming
- `resources/agent-skills-registry.md` - Registry de skills internas do agente
- `resources/checkpointing-guide.md` - Guia detalhado de checkpointing
- `resources/streaming-patterns.md` - Patterns de streaming do grafo
