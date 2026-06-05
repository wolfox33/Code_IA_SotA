# LangGraph Agent Patterns — Checkpointing e Streaming

Conteúdo referencial de exemplos de checkpointing PostgreSQL e streaming do grafo.

## Checkpointing PostgreSQL

```python
from langgraph.checkpoint.postgres import PostgresSaver
from sqlalchemy import create_engine

# Configurar checkpointing PostgreSQL
engine = create_engine("postgresql://user:password@localhost/db")
checkpointer = PostgresSaver.from_conn_string(engine)

# Compilar grafo com checkpointing
graph = builder.compile(checkpointer=checkpointer)
```

## Streaming do Grafo

```python
from langgraph.graph import StateGraph

# Stream eventos do grafo
async for event in graph.astream({"messages": [user_message]}):
    if event["event"] == "on_chat_model_stream":
        print(event["data"]["chunk"].content)
```

## Memória de Longo Prazo

Use store/memória separado para memória de longo prazo, não o checkpointing:

```python
from langgraph.store.postgres import PostgresStore

store = PostgresStore.from_conn_string(engine)
```
