# LangGraph Python Streaming

Streaming aqui significa streaming do runtime backend do agente. A skill nao define UI nem cliente web. FastAPI pode repassar eventos, mas o contrato principal e `graph.stream` ou `graph.astream`.

## Modos

- `stream_mode="values"`: emite o estado completo apos cada super-step. Bom para debug e auditoria.
- `stream_mode="updates"`: emite apenas atualizacoes por node. Bom para progresso de workflow.
- `stream_mode="messages"`: emite tokens/mensagens do modelo com metadata. Bom para resposta incremental.

## Stream sincrono

```python
config = {"configurable": {"thread_id": "conversation-123"}}

for chunk in graph.stream(
    {"messages": [{"role": "user", "content": "Summarize the plan"}]},
    config,
    stream_mode="updates",
):
    print(chunk)
```

## Stream async

Use em FastAPI ou workers async.

```python
async for chunk in graph.astream(
    {"messages": [{"role": "user", "content": "Summarize the plan"}]},
    {"configurable": {"thread_id": "conversation-123"}},
    stream_mode="updates",
):
    handle_progress(chunk)
```

## Token streaming

Quando usar `stream_mode="messages"`, trate o retorno como par `(message_chunk, metadata)`.

```python
async for message_chunk, metadata in graph.astream(
    {"messages": [{"role": "user", "content": "Write a short answer"}]},
    {"configurable": {"thread_id": "conversation-123"}},
    stream_mode="messages",
):
    if message_chunk.content:
        yield {
            "type": "token",
            "content": message_chunk.content,
            "node": metadata.get("langgraph_node"),
        }
```

## Progress events

Para workflows de orquestracao, prefira `updates` para sinalizar qual especialista rodou e o que foi produzido.

```python
async def run_with_progress(input_message: str, thread_id: str):
    async for update in graph.astream(
        {"messages": [{"role": "user", "content": input_message}]},
        {"configurable": {"thread_id": thread_id}},
        stream_mode="updates",
    ):
        yield {"type": "update", "payload": update}
```

## FastAPI boundary

FastAPI pode traduzir o stream do grafo para o protocolo escolhido pela aplicacao. Mantenha a rota fina: validar input, montar contexto, chamar o grafo e serializar eventos.

```python
import json

from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

router = APIRouter()


class StreamRequest(BaseModel):
    thread_id: str = Field(min_length=1, max_length=120)
    message: str = Field(min_length=1, max_length=20_000)


@router.post("/agent/stream")
async def stream_agent(payload: StreamRequest):
    async def events():
        async for message_chunk, metadata in graph.astream(
            {"messages": [{"role": "user", "content": payload.message}]},
            {"configurable": {"thread_id": payload.thread_id}},
            stream_mode="messages",
            context={"model_name": "openai:gpt-5.4-mini"},
        ):
            if message_chunk.content:
                data = {
                    "type": "token",
                    "content": message_chunk.content,
                    "node": metadata.get("langgraph_node"),
                }
                yield f"data: {json.dumps(data)}\n\n"
        yield 'data: {"type":"done"}\n\n'

    return StreamingResponse(events(), media_type="text/event-stream")
```

Esse exemplo e apenas boundary backend. Nao inclua cliente, componentes visuais ou estado de UI nesta skill.

## Error handling

Erros de tool devem ser tratados por middleware de tool quando possivel, para manter o loop do agente consistente.

```python
from langchain.agents.middleware import wrap_tool_call
from langchain.messages import ToolMessage


@wrap_tool_call
def handle_tool_errors(request, handler):
    try:
        return handler(request)
    except TimeoutError:
        return ToolMessage(
            content="Tool timed out. Try a narrower request.",
            tool_call_id=request.tool_call["id"],
        )
```

Erros de infraestrutura no stream devem gerar evento de erro e encerrar a conexao.

```python
async def safe_events():
    try:
        async for update in graph.astream(input_payload, config, stream_mode="updates"):
            yield {"type": "update", "payload": update}
    except Exception as exc:
        yield {"type": "error", "message": type(exc).__name__}
```

## Verification

- `values` e usado para estado completo/debug.
- `updates` e usado para progresso por node.
- `messages` e usado para tokens/mensagens incrementais.
- FastAPI nao contem regra de orquestracao.
- O stream sempre envia encerramento ou erro controlado.
