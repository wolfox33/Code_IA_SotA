# LangGraph Agent Patterns — Specialist Implementation

Conteúdo referencial de exemplos de implementação de especialistas.

## Exemplo de Especialista como Nó Simples

```python
from langchain.tools import tool
from langgraph.graph import MessagesState


@tool
def search_knowledge_base(query: str) -> str:
    """Search approved internal knowledge for the given query."""
    return retrieve_answer(query)


def research_agent(state: MessagesState) -> dict:
    """Specialist node that searches knowledge base."""
    # Call tool directly or use a simple LLM call
    result = search_knowledge_base.invoke({"query": "search query from state"})
    return {"messages": [result]}
```

## Exemplo de Especialista como Subgrafo

Se o especialista tiver roteamento, revisão humana ou fluxo multi-step, modele como outro `StateGraph` e chame como subgrafo.

```python
from langgraph.graph import StateGraph, MessagesState, START, END

# Create subgraph for specialist
specialist_builder = StateGraph(MessagesState)
specialist_builder.add_node("search", search_node)
specialist_builder.add_node("analyze", analyze_node)
specialist_builder.add_edge(START, "search")
specialist_builder.add_edge("search", "analyze")
specialist_builder.add_edge("analyze", END)
specialist_graph = specialist_builder.compile()

# Add as node in main graph
main_builder.add_node("specialist", specialist_graph)
```

Use especialistas como nós simples para workers básicos. Se precisar de roteamento ou fluxo complexo, use subgrafos.
