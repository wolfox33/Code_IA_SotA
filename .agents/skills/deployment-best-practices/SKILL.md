---
name: deployment-best-practices
description: "Best practices para deployment de aplicações de chat incluindo Vercel deployment, environment variables, database migrations, monitoring, error tracking, CI/CD, secrets management e production checklist."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "development"
  complexity: 5
  status: active
  tags:
    - deployment
    - vercel
    - cicd
    - monitoring
    - production
    - devops
---

# Deployment Best Practices

Guia completo de deployment para aplicações de chat Next.js.

## Objetivo

Fornecer:
- **Vercel deployment** setup
- **Environment variables** management
- **Database migrations** strategy
- **Monitoring & logging** (Sentry, Vercel Analytics)
- **CI/CD pipelines** (GitHub Actions)
- **Secrets management** (Vercel, 1Password)
- **Production checklist**

## Use this skill when

- Deploying to production
- Setting up CI/CD
- Configuring monitoring
- Managing secrets
- Running migrations
- Troubleshooting production issues

## Do not use this skill when

- A aplicação não usar Next.js
- A tarefa for apenas configurar ambiente local
- O deployment for para plataforma diferente de Vercel
- A tarefa for apenas código sem infraestrutura

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Vercel deployment configurado
- Environment variables setadas em produção
- Database migrations planejadas e executadas
- CI/CD pipeline configurado
- Monitoring (Sentry, Vercel Analytics) ativo
- Health check endpoint implementado
- Production checklist completado

## Procedure

### 1. Configurar Vercel CLI

Instale e autentique conforme `references/vercel.md`.

- Instale Vercel CLI globalmente com `npm i -g vercel`
- Execute `vercel login` para autenticar na conta Vercel
- Verifique se o projeto está vinculado corretamente ao workspace
- Confirme que as credenciais estão configuradas corretamente

### 2. Deploy inicial

Deploy para preview e produção conforme `references/vercel.md`.

- Execute `vercel` para deploy inicial em ambiente de preview
- Verifique o URL de preview gerado
- Execute `vercel --prod` para deploy em produção
- Confirme que o deployment foi bem-sucedido verificando o URL de produção
- Teste endpoints críticos em ambos os ambientes

### 3. Configurar environment variables

Sete variáveis no dashboard ou CLI conforme `references/vercel.md`.

- Liste todas as variáveis de ambiente necessárias (DATABASE_URL, API keys, secrets)
- Use `vercel env add <VAR_NAME>` para adicionar variáveis via CLI
- Ou configure via dashboard Vercel para cada ambiente (development, preview, production)
- Use valores diferentes para cada ambiente quando necessário (ex: API keys de teste vs produção)
- Valide que as variáveis estão acessíveis no runtime da aplicação

### 4. Configurar database migrations

Crie script de migrations conforme `references/migrations.md`.

- Crie arquivo `scripts/migrate.ts` com setup de Drizzle e postgres
- Configure migrations folder em `./drizzle`
- Adicione script no `package.json` para facilitar execução
- Execute migrations localmente para validar antes de produção
- Execute migrations em produção após deploy inicial

### 5. Configurar CI/CD com GitHub Actions

Crie workflow conforme `references/cicd.md`.

- Crie arquivo `.github/workflows/deploy.yml` com workflow de deploy
- Configure secrets no GitHub: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID
- Configure trigger para push na branch main
- Adicione steps: checkout, setup node, install deps, run tests, deploy
- Valide que o pipeline executa corretamente ao fazer push

### 6. Configurar error tracking

Configure Sentry conforme `references/monitoring.md`.

- Crie projeto Sentry para a aplicação
- Configure DSN como environment variable NEXT_PUBLIC_SENTRY_DSN
- Instale `@sentry/nextjs` e configure no projeto
- Adicione função `logError` para capturar exceções
- Valide que erros estão sendo capturados no dashboard Sentry

### 7. Implementar health check

Crie endpoint público conforme `references/monitoring.md`.

- Crie endpoint `/api/health` com verificação de conexão com banco
- Retorne apenas status sem detalhes sensíveis de infraestrutura
- Crie endpoint `/api/health/detailed` protegido para admin com detalhes completos
- Configure autenticação no endpoint detalhado usando auth
- Valide que health check retorna healthy quando o sistema está operacional

### 8. Completar production checklist

Verifique itens conforme `references/production-checklist.md`.

- Revise checklist completo item por item
- Valide que todas as variáveis de ambiente estão configuradas
- Confirme que HTTPS está habilitado (automático no Vercel)
- Verifique que rate limiting está ativo em endpoints públicos
- Confirme que database indexes foram criados
- Valide que backups estão configurados
- Confirme que monitoramento está ativo (Sentry, Vercel Analytics)
- Execute testes finais de E2E em produção

## Verification

- Vercel deployment está ativo
- Environment variables estão setadas
- Migrations rodaram com sucesso
- CI/CD pipeline funciona
- Sentry está capturando erros
- Health check retorna healthy
- Production checklist está completo

> **Skill log**
> - [2026-05-11] Skill criada com best practices de deployment para aplicações de chat.
> - [2026-05-11] Stage 6 (Batch 5) adicionou seções operacionais faltantes e removeu emoji de heading Objetivo.
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/` com arquivos divididos por especialidade.

## References

Conteúdo referencial detalhado, Vercel deployment, migrations, CI/CD, monitoring e production checklist estão disponíveis em:
- `references/vercel.md` - Vercel deployment e environment variables
- `references/migrations.md` - Database migrations
- `references/cicd.md` - CI/CD com GitHub Actions
- `references/monitoring.md` - Error tracking (Sentry) e health check
- `references/production-checklist.md` - Production checklist detalhado
