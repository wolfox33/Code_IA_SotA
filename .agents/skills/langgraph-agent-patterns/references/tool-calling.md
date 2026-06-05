# LangGraph Agent Patterns — Tool Calling

Conteúdo referencial de exemplos de tool calling com schemas e permissões.

## Exemplo de Tool com Schema

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

## Exemplo de Graph Manual com ToolNode

Para graphs manuais, use `ToolNode` e `tools_condition` quando o fluxo for o loop clássico LLM -> tools -> LLM.

```python
from langchain.chat_models import init_chat_model
from langgraph.graph import END, START, MessagesState, StateGraph
from langgraph.prebuilt import ToolNode, tools_condition

tools = [search_documents]
model = init_chat_model("openai:gpt-4o-mini").bind_tools(tools)


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
