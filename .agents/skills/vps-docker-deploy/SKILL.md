---
name: vps-docker-deploy
description: "Use ao configurar deploy em VPS única com Next.js frontend, FastAPI com LangGraph backend, PostgreSQL e Nginx orquestrados via Docker Compose; consulta o padrão de referência para regras detalhadas de segurança, estrutura e processo."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "infrastructure"
  complexity: 4
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
2. Instalar Docker + Docker Compose
3. Clonar projeto
4. Configurar .env seguindo as regras de segurança
5. docker compose up -d --build
6. Configurar SSL (Certbot ou Caddy)
7. Ativar firewall (ufw) liberando apenas 22, 80, 443

### 3. Validar configurações

Confirme que:

- PostgreSQL NÃO está exposto em porta pública
- Backend NÃO está exposto diretamente
- Apenas Nginx expõe 80/443
- Variáveis sensíveis estão via .env
- Firewall está configurado corretamente

## Pitfalls

- Não expor banco publicamente
- Não usar docker run manual
- Não misturar ambiente dev com prod
- Não commitar .env
- Não usar Kubernetes antes de ter problema real de scaling

## Verification

- VPS está configurada com Docker + Docker Compose
- Estrutura de arquivos segue o padrão obrigatório
- docker-compose.yml usa network interna
- Nginx faz reverse proxy para frontend e backend
- PostgreSQL não está exposto publicamente
- SSL está configurado
- Firewall está ativo

> **Skill log**
> - [2026-05-11] Skill criada como padrão de infraestrutura para VPS única.
> - [2026-05-11] Stage 6 (Batch 2) moveu conteúdo referencial para references/ e adicionou procedure executável para reduzir bloat.
