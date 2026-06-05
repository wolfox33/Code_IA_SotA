# AI SDK UI — Setup

Conteúdo referencial de setup inicial para chat-application-engineering.

## 📦 Stack

```bash
bun add ai @ai-sdk/react @ai-sdk/openai
# ou para Anthropic:
bun add ai @ai-sdk/react @ai-sdk/anthropic
```

| Pacote | Versão | Propósito |
|--------|--------|-----------|
| `ai` | `6.0+` | Core SDK (streamText, convertToModelMessages, UIMessage) |
| `@ai-sdk/react` | `1.0+` | React hooks (useChat, useCompletion, useObject) |
| `@ai-sdk/openai` | `1.0+` | Provider OpenAI/compatíveis |
| `@ai-sdk/anthropic` | `1.0+` | Provider Anthropic |

## Safety

- **SEMPRE** autenticar no Route Handler antes de chamar `streamText`
- **SEMPRE** validar messages no server com `validateUIMessages` quando usar tools/metadata
- **NUNCA** confiar em dados do client (userId, conversationId) — extrair do session
- **SEMPRE** verificar ownership da conversa antes de processar
- **VERIFICAR** créditos antes de iniciar streaming
- **DEBITAR** créditos somente após streaming completo com sucesso
- **USAR** `consumeStream()` para garantir persistência mesmo com disconnect
- **NUNCA** expor error.message interno ao client — usar mensagens genéricas
- **IMPLEMENTAR** rate limiting em endpoints de chat
- **SANITIZAR** output de AI antes de renderizar (especialmente com dangerouslySetInnerHTML)
- **VALIDAR** input do usuário com Zod antes de processar
