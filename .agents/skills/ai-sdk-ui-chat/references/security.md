# AI SDK UI — Security & Gotchas

Conteúdo referencial de segurança e common gotchas para ai-sdk-ui-chat.

## 🔒 Security Checklist

- [ ] Auth check em todo Route Handler (`auth.api.getSession`)
- [ ] Ownership check em toda conversa (`WHERE userId = session.user.id`)
- [ ] Input validation com Zod no server
- [ ] `validateUIMessages` para mensagens com tools/metadata
- [ ] Rate limiting por userId
- [ ] Créditos verificados antes do streaming
- [ ] Créditos debitados após streaming completo (não antes)
- [ ] `consumeStream()` para garantir persistência com disconnect
- [ ] Error messages genéricos no `onError` (nunca expor internals)
- [ ] `credentials: 'include'` no transport para enviar cookies
- [ ] `maxDuration` configurado para prevenir timeouts
- [ ] Nunca confiar em userId/chatId do body — usar session

## ⚠️ Common Gotchas

### 1. useChat mudou significativamente na v6

**Problema**: Patterns antigos (`handleSubmit`, `input` do hook, `content` do message) são obsoletos.

**v6+**:
- Usar `sendMessage({ text })` em vez de `handleSubmit`
- Gerenciar `input` state manualmente com `useState`
- Usar `message.parts` em vez de `message.content`
- Usar `DefaultChatTransport` para configurar endpoint

### 2. Mensagens não persistem após disconnect

**Problema**: Client fecha aba durante streaming → mensagem perdida.

**Solução**: `result.consumeStream()` (sem await) antes de retornar response.

### 3. Créditos debitados mas streaming falha

**Problema**: Debitar antes do streaming → usuário perde crédito sem resposta.

**Solução**: Debitar no `onFinish` callback que só executa após sucesso.

### 4. IDOR em conversas

**Problema**: Client envia `chatId` arbitrário → acessa conversa de outro usuário.

**Solução**: SEMPRE verificar `WHERE conversationId = chatId AND userId = session.user.id`.

### 5. Error messages vazando informações

**Problema**: `error.message` do server contém stack traces, connection strings, etc.

**Solução**: Usar `onError` em `toUIMessageStreamResponse` para retornar mensagem genérica.

## 🎯 Alinhamento com Arquitetura

### Vertical Slice Structure

```
src/features/chat/
├── api/                           # NÃO usar — usar app/api/ como thin wrapper
├── service/
│   ├── handle-chat-stream.ts      # Core: auth → validate → stream → persist
│   ├── create-conversation.ts     # Criar nova conversa
│   ├── load-conversation.ts       # Carregar conversa com ownership check
│   ├── load-messages.ts           # Carregar mensagens do DB
│   ├── save-messages.ts           # Persistir mensagens
│   └── get-model.ts              # Factory para model por template
├── repo/
│   ├── conversations.ts           # Data access conversas
│   └── messages.ts               # Data access mensagens
├── components/
│   ├── ChatInterface.tsx          # useChat principal
│   ├── ChatWithTools.tsx          # useChat com tools
│   ├── MessageList.tsx           # Lista de mensagens
│   └── MessagePart.tsx           # Renderizar parts (text, reasoning, tool)
└── types/
    └── index.ts                   # ChatMetadata, ChatUIMessage
```

### Integração com Outras Features

```typescript
// billing → credits check
import { hasCredits, debitCredits } from '@/features/credits/service/debit-credits'

// auth → session
import { auth } from '@/core/auth'

// db → persistence
import { db } from '@/core/db'
import { conversations, messages } from '@/core/db/schema'
```

## 🔗 Links Úteis

- [AI SDK Docs](https://ai-sdk.dev/docs)
- [AI SDK UI Overview](https://ai-sdk.dev/docs/ai-sdk-ui/overview)
- [useChat Reference](https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat)
- [Chatbot Tool Usage](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-tool-usage)
- [Message Persistence](https://ai-sdk.dev/docs/ai-sdk-ui/storing-messages)
- [Stream Protocol](https://ai-sdk.dev/docs/ai-sdk-ui/stream-protocol)
- [GitHub](https://github.com/vercel/ai)

## Example Interactions

- "Criar interface de chat com useChat e streaming"
- "Adicionar tool calling ao chat"
- "Implementar persistência de mensagens com Drizzle"
- "Configurar useChat com autenticação Better Auth"
- "Exibir reasoning tokens do DeepSeek no chat"
- "Otimizar chat enviando apenas última mensagem"
- "Implementar retry e error handling no chat"
