# LangGraph Agent Patterns — StateGraph Orchestrator

Conteúdo referencial de exemplos de StateGraph como orquestrador principal.

## Exemplo de StateGraph com Orquestrador

```python
from typing import Literal

from langchain.chat_models import init_chat_model
from langchain.messages import SystemMessage
from langgraph.graph import END, START, MessagesState, StateGraph

router_model = init_chat_model("openai:gpt-4o-mini", temperature=0)


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

Prefira retornos pequenos de estado. Não grave objetos inteiros de usuário, conexões, clientes ou payloads grandes no checkpoint; grave ids e resumos.
