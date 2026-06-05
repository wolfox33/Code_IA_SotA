# LangGraph Agent Patterns — Middleware

Conteúdo referencial de exemplos de middlewares para comportamento transversal.

## Middlewares Disponíveis

Middlewares são a forma correta de aplicar políticas transversais sem espalhar lógica nos nós:

- `dynamic_prompt`: prompt por papel, tenant, plano, idioma ou modo
- `wrap_model_call`: seleção dinâmica de modelo, tools ou parâmetros
- `wrap_tool_call`: validação de permissão, logging, PII filtering
- `handle_tool_errors`: tratamento de erro robusto com retry
- `human_in_the_loop`: aprovação humana para ações sensíveis
- `moderation`: filtering de conteúdo sensível

## Exemplo de Middleware de Permissão

```python
from langchain.middleware import wrap_tool_call

@wrap_tool_call
def check_permission(tool_call, context):
    if tool_call.name == "delete_data" and not context["user"].is_admin:
        raise PermissionError("Only admins can delete data")
    return tool_call
```

## Exemplo de Middleware de Logging

```python
from langchain.middleware import wrap_model_call

@wrap_model_call
def log_model_call(model_call, context):
    logger.info(f"Model call: {model_call.model} by user {context['user'].id}")
    return model_call
```
