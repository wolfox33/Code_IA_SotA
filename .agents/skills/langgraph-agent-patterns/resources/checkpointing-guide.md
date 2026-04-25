# LangGraph Python Checkpointing

Checkpointing salva o estado de execucao do grafo por thread. Use para continuar conversas, retomar fluxos interrompidos, auditar passos e suportar human-in-the-loop. Nao use checkpoint como memoria longa indiscriminada.

## Dependencias

```bash
pip install -U langgraph langchain langgraph-checkpoint-postgres psycopg
```

Instale tambem os pacotes dos providers de modelo usados pelo projeto, por exemplo `langchain-openai` ou `langchain-anthropic`.

## PostgreSQL checkpointer

Use PostgreSQL em producao. Execute `setup()` em migration/startup controlado antes de usar as tabelas pela primeira vez.

```python
from langgraph.checkpoint.postgres import PostgresSaver
from langgraph.graph import START, MessagesState, StateGraph


DB_URI = "postgresql://user:pass@localhost:5432/app?sslmode=disable"


def call_model(state: MessagesState) -> dict:
    response = model.invoke(state["messages"])
    return {"messages": [response]}


builder = StateGraph(MessagesState)
builder.add_node("call_model", call_model)
builder.add_edge(START, "call_model")

with PostgresSaver.from_conn_string(DB_URI) as checkpointer:
    # Execute uma vez antes do primeiro uso:
    # checkpointer.setup()
    graph = builder.compile(checkpointer=checkpointer)

    config = {"configurable": {"thread_id": "conversation-123"}}
    graph.invoke(
        {"messages": [{"role": "user", "content": "Remember my name is Ana"}]},
        config,
    )
```

## Async checkpointer

Use a variante async quando o runtime for async, como FastAPI com `ainvoke` ou `astream`.

```python
from langgraph.checkpoint.postgres.aio import AsyncPostgresSaver


async with AsyncPostgresSaver.from_conn_string(DB_URI) as checkpointer:
    # await checkpointer.setup()
    graph = builder.compile(checkpointer=checkpointer)

    result = await graph.ainvoke(
        {"messages": [{"role": "user", "content": "Continue"}]},
        {"configurable": {"thread_id": "conversation-123"}},
    )
```

## Thread ids

`thread_id` e a chave de continuidade. Use ids estaveis e nao sensiveis.

```python
config = {
    "configurable": {
        "thread_id": f"conversation:{conversation_id}",
    }
}
```

Regras:

- Uma conversa ou workflow duravel deve reutilizar o mesmo `thread_id`.
- Nao use apenas `user_id` se o usuario puder ter multiplas conversas.
- Nao inclua segredo, email ou dado pessoal direto no `thread_id`.
- Para testes, use prefixos como `test:` e limpe o banco depois.

## Checkpoint versus store

Use checkpointer para estado de execucao da thread:

- mensagens atuais;
- rota escolhida;
- pendencias human-in-the-loop;
- resultados intermediarios pequenos.

Use store/memoria para fatos reutilizaveis entre threads:

- preferencias do usuario;
- memorias aprovadas;
- dados recuperaveis por namespace;
- contexto de longo prazo.

```python
from dataclasses import dataclass

from langgraph.runtime import Runtime


@dataclass
class Context:
    user_id: str


def call_model(state: MessagesState, runtime: Runtime[Context]) -> dict:
    namespace = ("memories", runtime.context.user_id)
    memories = runtime.store.search(namespace, query=str(state["messages"][-1].content))
    memory_text = "\n".join(item.value["data"] for item in memories)
    response = model.invoke(
        [{"role": "system", "content": f"Known user facts:\n{memory_text}"}]
        + state["messages"]
    )
    return {"messages": [response]}
```

Compile com `store=` apenas quando houver uma estrategia clara de memoria.

## Human-in-the-loop

Interrupcoes exigem checkpointer, porque a execucao precisa ser retomada depois.

```python
from langgraph.types import Command, interrupt


def review_tool_call(state: dict) -> dict:
    decision = interrupt(
        {
            "action": "review_tool_call",
            "tool_call": state["pending_tool_call"],
        }
    )
    return {"review_decision": decision}


graph.invoke(
    Command(resume={"type": "approve"}),
    {"configurable": {"thread_id": "conversation-123"}},
)
```

## Operational guidance

- Chame `setup()` de forma idempotente em ambiente controlado, nao a cada request.
- Monitore tamanho de checkpoints e taxa de crescimento.
- Nao consulte tabelas internas do checkpointer como contrato de produto.
- Se precisar analytics, grave eventos proprios fora das tabelas internas do checkpointer.
- Para retencao, prefira politica de dados do produto e backups consistentes.
- Em testes unitarios, `InMemorySaver` pode ser suficiente; em integracao, teste PostgreSQL.

## Verification

- O grafo e compilado com `checkpointer=checkpointer`.
- Invocacoes duraveis passam `configurable.thread_id`.
- O mesmo `thread_id` recupera contexto anterior.
- Interrupcoes sao retomadas com `Command(resume=...)`.
- Memoria longa usa store separado, nao historico infinito no checkpoint.
