---
name: vps-docker-deploy
description: "Use ao configurar deploy em VPS única com Next.js frontend, FastAPI com LangGraph backend, PostgreSQL e Nginx orquestrados via Docker Compose; consulta o padrão de referência para regras detalhadas de segurança, estrutura e processo."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "infrastructure"
  complexity: 4
  status: active
  tags:
    - vps
    - docker
    - compose
    - nextjs
    - fastapi
    - postgresql
    - nginx
    - deploy
---

# SKILL: VPS Docker Deploy

## Objetivo

Padronizar deploy em VPS única com Next.js, FastAPI (LangGraph), PostgreSQL e Nginx orquestrados via Docker Compose, seguindo o padrão de referência para regras detalhadas.

## Use this skill when

- Configurar deploy em VPS única com Next.js + FastAPI + PostgreSQL + Nginx
- Criar SaaS novo com arquitetura padrão
- Criar sistema com agentes LangGraph
- Criar sistema de trading backend + frontend
- Criar MVP com banco relacional

## Do not use this skill when

- Usar Kubernetes ou orquestração complexa
- Deploy em múltiplas VPS ou clusters
- Configurar apenas infraestrutura sem aplicação específica
- Usar runtime diferente de Docker Compose

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- VPS configurada com Docker + Docker Compose
- Estrutura de arquivos seguindo o padrão obrigatório
- docker-compose.yml usando network interna
- Nginx fazendo reverse proxy para frontend e backend
- PostgreSQL não exposto publicamente
- SSL configurado
- Firewall ativo

## Procedure

### 1. Consultar o padrão de referência

Leia `references/vps-docker-deploy-pattern.md` para obter:

- Estrutura de arquivos obrigatória
- Regras de docker-compose.yml
- Configurações de segurança obrigatórias
- Processo padrão de deploy
- Padrões para backend (FastAPI/LangGraph), frontend (Next.js) e Nginx

### 2. Aplicar o padrão ao projeto

Siga o processo padrão de deploy descrito na referência:

1. Criar VPS (Ubuntu LTS)
   - Escolha provider (DigitalOcean, Linode, Hetzner, etc.)
   - Configure SSH keys para acesso seguro
   - Atualize sistema: `apt update && apt upgrade -y`

2. Instalar Docker + Docker Compose
   - Instale Docker via script oficial: `curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh`
   - Instale Docker Compose: `apt install docker-compose-plugin`
   - Adicione usuário ao grupo docker: `usermod -aG docker $USER`
   - Valide instalação: `docker --version` e `docker compose version`

3. Clonar projeto
   - Clone repositório na VPS: `git clone <repo-url> && cd <repo-name>`
   - Configure git para deploy automático se necessário
   - Configure hooks de deploy se necessário

4. Configurar .env seguindo as regras de segurança
   - Use .env para todas as variáveis sensíveis
   - Nunca commitar .env no repositório
   - Configure DATABASE_URL, API keys, secrets
   - Use valores diferentes para dev e prod

5. docker compose up -d --build
   - Execute build inicial: `docker compose up -d --build`
   - Verifique logs: `docker compose logs -f`
   - Confirme que todos os serviços estão rodando: `docker compose ps`

6. Configurar SSL (Certbot ou Caddy)
   - Use Certbot com Nginx para HTTPS automático
   - Configure renovação automática de certificados
   - Valide que HTTPS está funcionando

7. Ativar firewall (ufw) liberando apenas 22, 80, 443
   - Configure ufw: `ufw allow 22 && ufw allow 80 && ufw allow 443`
   - Ative firewall: `ufw enable`
   - Valide regras: `ufw status`

### 3. Validar configurações

Confirme que:

- PostgreSQL NÃO está exposto em porta pública
- Backend NÃO está exposto diretamente
- Apenas Nginx expõe 80/443
- Variáveis sensíveis estão via .env
- Firewall está configurado corretamente
- SSL está funcionando em todas as rotas
- Logs estão sendo gerados corretamente
- Containers reiniciam automaticamente em caso de falha

## Verification

- VPS está configurada com Docker + Docker Compose
- Estrutura de arquivos segue o padrão obrigatório
- docker-compose.yml usa network interna
- Nginx faz reverse proxy para frontend e backend
- PostgreSQL não está exposto publicamente
- SSL está configurado
- Firewall está ativo

> **Skill log**
> - [2026-05-11] Skill criada como padrão de infraestrutura para VPS única
> - [2026-05-11] Stage 6 (Batch 2) moveu conteúdo referencial para references/ e adicionou procedure executável para reduzir bloat
> - [2026-05-11] Stage 6 (Batch 8) adicionou seção Output contracts faltante
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/` com arquivos divididos por especialidade.
> - [2026-06-04] Refatorada: adicionados comandos essenciais ao Procedure para torná-lo auto-suficiente.

## References

Conteúdo referencial detalhado, padrão de deploy e pitfalls estão disponíveis em:
- `references/vps-docker-deploy-pattern.md` - Padrão de referência completo
- `references/pitfalls.md` - Pitfalls
