---
name: langgraph-agent-patterns
description: "Use quando a tarefa implementar runtime Python com LangGraph: StateGraph, especialistas, tool calling, middleware, checkpointing, streaming do grafo, memória ou boundary FastAPI do agente."
metadata:
  model: inherit
  version: "2.0.0"
  author: "Custom Stack"
  category: "backend"
  complexity: 7
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

Skill para projetar e implementar runtimes de agentes em Python com LangGraph atual. O foco e o backend do agente: orquestracao, especialistas, ferramentas, middlewares, persistencia e contrato de execucao. Interface web, componentes de chat e detalhes de frontend ficam fora desta skill.

## Objetivo

Produzir agentes production-ready com:

- `StateGraph` explicito como camada primaria de orquestracao.
- Agentes especialistas como nos/workers, normalmente criados com `create_agent` quando isso reduzir codigo.
- Tool calling com schemas claros, permissao explicita e tratamento de erro.
- Middlewares LangChain v1 para prompt dinamico, model routing, tool error handling, PII, moderacao e human-in-the-loop.
- Skills internas do agente como modulos Python plugaveis, independentes das skills do harness local.
- Checkpointing PostgreSQL para estado de execucao e store/memoria separado para memoria de longo prazo.
- Boundary FastAPI fino, apenas chamando o runtime do agente e injetando contexto.

## Use this skill when

- Implementar ou refatorar um grafo LangGraph em Python.
- Criar fluxo `orchestrator + specialist agents`.
- Adicionar tools, schemas, permissões ou tool error handling a agentes.
- Definir middlewares de agente para segurança, roteamento, prompts ou human-in-the-loop.
- Projetar registry de skills internas Python para o runtime do agente.
- Configurar checkpointing, streaming ou memória de agentes LangGraph.
- Expor o runtime por FastAPI sem acoplar a frontend.

## Do not use this skill when

- A tarefa for UI, componentes de chat, rotas de frontend ou experiencia visual.
- O projeto usar apenas uma chamada simples de LLM sem estado, tools ou orquestracao.
- A tarefa for editar skills do harness `.agents/skills`; aqui "skills" significa capacidades Python internas do agente.
- A necessidade principal for cobranca, creditos ou produto SaaS.
- A tarefa for integração com AI SDK, Next.js ou React sem runtime LangGraph Python.

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

O frontend fala com FastAPI. FastAPI valida entrada, autentica, cria contexto e chama o grafo; nao decide fluxo, nao monta prompts complexos e nao executa tools diretamente.

### 2. Use `StateGraph` como orquestrador principal

Use `StateGraph` quando houver roteamento, multiplos especialistas, revisao, memoria, retries ou sintese. Use `MessagesState` para fluxos conversacionais simples e `TypedDict` quando o grafo precisar de campos explicitos.

```python
from typing import Literal

from langchain.chat_models import init_chat_model
from langchain.messages import SystemMessage
from langgraph.graph import END, START, MessagesState, StateGraph

router_model = init_chat_model("openai:gpt-5.4-mini", temperature=0)


class OrchestratorState(MessagesState):
    route: str


def orchestrator(state: OrchestratorState) -> dict:
    decision = router_model.invoke(
        [
            SystemMessage(
                "Route the request to one specialist: research, coding, or final."
            ),
            *state["messages"],
        ]
    )
    content = str(decision.content).lower()
    if "code" in content:
        route = "coding_agent"
    elif "research" in content:
        route = "research_agent"
    else:
        route = "synthesizer"
    return {"route": route}


def route_next(
    state: OrchestratorState,
) -> Literal["research_agent", "coding_agent", "synthesizer"]:
    return state["route"]


builder = StateGraph(OrchestratorState)
builder.add_node("orchestrator", orchestrator)
builder.add_node("research_agent", research_agent)
builder.add_node("coding_agent", coding_agent)
builder.add_node("synthesizer", synthesizer)
builder.add_edge(START, "orchestrator")
builder.add_conditional_edges(
    "orchestrator",
    route_next,
    {
        "research_agent": "research_agent",
        "coding_agent": "coding_agent",
        "synthesizer": "synthesizer",
    },
)
builder.add_edge("research_agent", "synthesizer")
builder.add_edge("coding_agent", "synthesizer")
builder.add_edge("synthesizer", END)

graph = builder.compile()
```

Prefira retornos pequenos de estado. Nao grave objetos inteiros de usuario, conexoes, clientes ou payloads grandes no checkpoint; grave ids e resumos.

### 3. Crie especialistas com `create_agent` quando bastar

Dentro de um no especialista, `create_agent` e adequado para um agente simples com tools e middleware. O orquestrador continua sendo `StateGraph`.

```python
from langchain.agents import create_agent
from langchain.tools import tool


@tool
def search_knowledge_base(query: str) -> str:
    """Search approved internal knowledge for the given query."""
    return retrieve_answer(query)


research_agent_app = create_agent(
    model="anthropic:claude-sonnet-4-6",
    tools=[search_knowledge_base],
    system_prompt="You are a research specialist. Use only approved tools.",
    middleware=[handle_tool_errors],
)


def research_agent(state: MessagesState) -> dict:
    result = research_agent_app.invoke({"messages": state["messages"]})
    return {"messages": [result["messages"][-1]]}
```

Use `create_agent` para workers simples. Se o especialista tambem tiver roteamento, revisao humana ou fluxo multi-step, modele esse especialista como outro `StateGraph` e chame como subgrafo.

### 4. Implemente tool calling com schemas e permissoes

Ferramentas devem ter nome claro, docstring objetiva, argumentos tipados e regra de permissao fora do prompt.

```python
from langchain.tools import tool
from pydantic import BaseModel, Field


class SearchInput(BaseModel):
    query: str = Field(min_length=3, max_length=300)
    max_results: int = Field(default=5, ge=1, le=10)


@tool(args_schema=SearchInput)
def search_documents(query: str, max_results: int = 5) -> str:
    """Search indexed documents available to the current tenant."""
    return document_search(query=query, limit=max_results)
```

Para graphs manuais, use `ToolNode` e `tools_condition` quando o fluxo for o loop classico LLM -> tools -> LLM.

```python
from langchain.chat_models import init_chat_model
from langgraph.graph import END, START, MessagesState, StateGraph
from langgraph.prebuilt import ToolNode, tools_condition

tools = [search_documents]
model = init_chat_model("openai:gpt-5.4-mini").bind_tools(tools)


def call_model(state: MessagesState) -> dict:
    response = model.invoke(state["messages"])
    return {"messages": [response]}


builder = StateGraph(MessagesState)
builder.add_node("model", call_model)
builder.add_node("tools", ToolNode(tools))
builder.add_edge(START, "model")
builder.add_conditional_edges("model", tools_condition, {"tools": "tools", END: END})
builder.add_edge("tools", "model")
agent = builder.compile()
```

### 5. Use middlewares para comportamento transversal

Middlewares sao a forma correta de aplicar politicas transversais sem espalhar logica nos nos:

- `dynamic_prompt`: prompt por papel, tenant, plano, idioma ou modo.
- `wrap_model_call`: selecao dinamica de modelo, tools ou parametros.
- `wrap_tool_call`: tratamento de erro, auditoria ou bloqueios de tools.
- `AgentMiddleware`: casos mais complexos que precisam de estado, contexto e override.
- Middlewares prontos: PII, summarization, human-in-the-loop e moderacao quando o risco justificar.

```python
from langchain.agents.middleware import wrap_tool_call
from langchain.messages import ToolMessage


@wrap_tool_call
def handle_tool_errors(request, handler):
    try:
        return handler(request)
    except Exception as exc:
        return ToolMessage(
            content=f"Tool failed: {type(exc).__name__}. Check arguments and retry.",
            tool_call_id=request.tool_call["id"],
        )
```

```python
from typing import Callable

from langchain.agents.middleware import AgentMiddleware, ModelRequest
from langchain.agents.middleware.types import ModelResponse
from langchain.chat_models import init_chat_model


class ModelRoutingMiddleware(AgentMiddleware):
    def wrap_model_call(
        self,
        request: ModelRequest,
        handler: Callable[[ModelRequest], ModelResponse],
    ) -> ModelResponse:
        model = init_chat_model(request.runtime.context.model_name)
        return handler(request.override(model=model))
```

### 6. Defina skills internas do agente como modulos Python

Skills internas sao capacidades do runtime do agente, nao arquivos do harness local. Elas devem ser registraveis, testaveis e convertiveis em prompt, tools ou agentes especialistas.

```python
from dataclasses import dataclass, field
from typing import Sequence

from langchain_core.tools import BaseTool


@dataclass(frozen=True)
class AgentSkill:
    name: str
    description: str
    prompt_fragment: str
    tools: Sequence[BaseTool] = field(default_factory=tuple)
    required_permissions: frozenset[str] = frozenset()
    dependencies: frozenset[str] = frozenset()


def register_skill() -> AgentSkill:
    return AgentSkill(
        name="document_research",
        description="Research approved documents and cite retrieved evidence.",
        prompt_fragment="Use document tools when the answer depends on internal docs.",
        tools=(search_documents,),
        required_permissions=frozenset({"documents:read"}),
    )
```

O registry filtra skills por tenant, usuario, permissoes e tipo de tarefa antes de expor tools ou prompt ao agente. Consulte `resources/agent-skills-registry.md`.

### 7. Configure persistencia e memoria separadamente

Use checkpointer para continuidade de execucao por `thread_id`. Use store/memoria para fatos reutilizaveis entre threads. Em producao, prefira PostgreSQL.

```python
from langgraph.checkpoint.postgres import PostgresSaver

DB_URI = "postgresql://user:pass@localhost:5432/app?sslmode=disable"

with PostgresSaver.from_conn_string(DB_URI) as checkpointer:
    # Execute uma vez em migration/startup controlado:
    # checkpointer.setup()
    graph = builder.compile(checkpointer=checkpointer)
```

Consulte `resources/checkpointing-guide.md`.

### 8. Exponha por FastAPI como boundary fino

FastAPI deve validar request, autenticar, montar `context`, escolher `thread_id` e chamar `graph.invoke`, `graph.stream`, `graph.ainvoke` ou `graph.astream`.

```python
from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter()


class AgentRequest(BaseModel):
    thread_id: str = Field(min_length=1, max_length=120)
    message: str = Field(min_length=1, max_length=20_000)


@router.post("/agent/invoke")
async def invoke_agent(payload: AgentRequest):
    result = await graph.ainvoke(
        {"messages": [{"role": "user", "content": payload.message}]},
        {"configurable": {"thread_id": payload.thread_id}},
        context={"model_name": "openai:gpt-5.4-mini"},
    )
    return {"message": result["messages"][-1].content}
```

Consulte `resources/streaming-patterns.md` para streaming no nivel do runtime.

## Pitfalls

- Nao misture esta skill com as skills locais do harness `.agents/skills`; elas sao instrucoes para o agente de desenvolvimento, nao capacidades do runtime Python.
- Nao coloque regra de negocio ou roteamento complexo em FastAPI. O grafo deve conter a logica do agente.
- Nao use `create_agent` como substituto do orquestrador quando houver multiplos especialistas e estado compartilhado.
- Nao exponha todas as tools para todos os agentes. Tools devem passar por registry, permissoes e escopo.
- Nao persista payloads grandes ou dados sensiveis no checkpoint sem necessidade.
- Nao modele memoria longa como historico infinito de mensagens; use store dedicado e resumos.

## Verification

- A implementacao usa Python e LangGraph atual.
- O orquestrador principal e `StateGraph`.
- `create_agent` aparece apenas como implementacao de agente especialista ou caso simples.
- Tools possuem schemas, docstrings e tratamento de erro.
- Middlewares estao documentados como extensao transversal.
- Skills sao capacidades Python internas do agente e nao skills do harness local.
- FastAPI aparece apenas como boundary backend.
- Nao ha exemplos de frontend, cobranca ou SDK de UI.

## Resources

- `resources/agent-skills-registry.md`
- `resources/checkpointing-guide.md`
- `resources/streaming-patterns.md`

## Official Docs

- [LangGraph Python overview](https://docs.langchain.com/oss/python/langgraph/overview)
- [Workflows and agents](https://docs.langchain.com/oss/python/langgraph/workflows-agents)
- [LangGraph quickstart](https://docs.langchain.com/oss/python/langgraph/quickstart)
- [Memory and checkpointing](https://docs.langchain.com/oss/python/langgraph/add-memory)
- [LangChain agents and middleware](https://docs.langchain.com/oss/python/langchain/agents)


> **Skill log**
> - [2026-04-25] Reescrita para Python/LangGraph atual, com foco em orquestrador StateGraph, agentes especialistas, tools, middlewares, skills internas do agente e boundary FastAPI sem frontend.

