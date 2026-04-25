# Agent Skills Registry

Este recurso define o conceito de "skills" internas do agente. Essas skills sao modulos Python do runtime do agente. Elas nao sao as skills do harness local `.agents/skills`.

## Objetivo

Permitir que o orquestrador descubra capacidades plugaveis e decida quais prompts, tools e especialistas ficam disponiveis para uma execucao.

Uma skill interna deve declarar:

- Nome estavel.
- Descricao curta para roteamento.
- Fragmento de prompt opcional.
- Tools expostas.
- Permissoes exigidas.
- Dependencias externas.
- Escopo de uso, como tenant, dominio ou tipo de tarefa.

## Contrato recomendado

```python
from dataclasses import dataclass, field
from typing import Sequence

from langchain_core.tools import BaseTool


@dataclass(frozen=True)
class AgentSkill:
    name: str
    description: str
    prompt_fragment: str = ""
    tools: Sequence[BaseTool] = field(default_factory=tuple)
    required_permissions: frozenset[str] = frozenset()
    dependencies: frozenset[str] = frozenset()
    allowed_domains: frozenset[str] = frozenset()
```

Cada modulo de skill exporta `register_skill()`.

```python
from langchain.tools import tool
from pydantic import BaseModel, Field


class DocumentSearchInput(BaseModel):
    query: str = Field(min_length=3, max_length=300)
    limit: int = Field(default=5, ge=1, le=10)


@tool(args_schema=DocumentSearchInput)
def search_documents(query: str, limit: int = 5) -> str:
    """Search approved indexed documents for the current tenant."""
    return search_index(query=query, limit=limit)


def register_skill() -> AgentSkill:
    return AgentSkill(
        name="document_research",
        description="Search approved documents and cite supporting evidence.",
        prompt_fragment=(
            "When answering from internal documents, cite the document ids returned "
            "by the search tool."
        ),
        tools=(search_documents,),
        required_permissions=frozenset({"documents:read"}),
        dependencies=frozenset({"document_index"}),
        allowed_domains=frozenset({"research", "support"}),
    )
```

## Registry

O registry carrega skills conhecidas e filtra por contexto antes de entregar tools ou prompts ao agente.

```python
from dataclasses import dataclass


@dataclass(frozen=True)
class SkillContext:
    permissions: frozenset[str]
    domain: str
    enabled_dependencies: frozenset[str]


class SkillRegistry:
    def __init__(self, skills: list[AgentSkill]):
        self._skills = {skill.name: skill for skill in skills}

    def available(self, context: SkillContext) -> list[AgentSkill]:
        return [
            skill
            for skill in self._skills.values()
            if skill.required_permissions.issubset(context.permissions)
            and skill.dependencies.issubset(context.enabled_dependencies)
            and (
                not skill.allowed_domains
                or context.domain in skill.allowed_domains
            )
        ]

    def tools_for(self, context: SkillContext):
        tools = []
        for skill in self.available(context):
            tools.extend(skill.tools)
        return tools

    def prompt_for(self, context: SkillContext) -> str:
        return "\n".join(
            skill.prompt_fragment
            for skill in self.available(context)
            if skill.prompt_fragment
        )
```

## Uso no orquestrador

Use o registry no no de orquestracao ou em middleware para restringir tools e prompt antes da chamada ao modelo.

```python
from langchain.agents.middleware import ModelRequest, dynamic_prompt


@dynamic_prompt
def skill_prompt(request: ModelRequest) -> str:
    skill_context = request.runtime.context.skill_context
    prompt_fragment = skill_registry.prompt_for(skill_context)
    return "\n".join(
        part
        for part in [
            "You are a specialist agent. Use only allowed tools.",
            prompt_fragment,
        ]
        if part
    )
```

```python
from langchain.agents.middleware import AgentMiddleware


class SkillToolMiddleware(AgentMiddleware):
    def wrap_model_call(self, request, handler):
        skill_context = request.runtime.context.skill_context
        tools = skill_registry.tools_for(skill_context)
        return handler(request.override(tools=tools))
```

## Design rules

- Skills declaram capacidades; elas nao executam side effects no import.
- Tools de uma skill validam input na borda com Pydantic.
- Permissoes ficam fora do prompt e sao checadas por codigo.
- Uma skill nao deve depender implicitamente de outra; declare dependencias.
- O orquestrador decide quais skills entram em uma execucao.
- O nome da skill e API publica: altere com cuidado.

## Verification

- Cada skill tem `register_skill()`.
- O registry consegue listar tools e prompt por contexto.
- Uma skill sem permissao exigida nao fica disponivel.
- Imports de skill nao abrem conexoes, nao leem segredos e nao executam tarefas longas.
