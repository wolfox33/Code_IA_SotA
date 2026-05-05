---
name: vps-docker-deploy
description: "Padroniza deploy em VPS única com Next.js frontend, FastAPI com LangGraph backend, PostgreSQL e Nginx, orquestrados via Docker Compose."
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

# SKILL: VPS Docker Deploy (Next.js + FastAPI + PostgreSQL + Nginx)

## 🎯 Objetivo

Padronizar deploy em VPS única usando:

- Frontend: Next.js
- Backend: FastAPI (LangGraph)
- Banco: PostgreSQL
- Reverse Proxy: Nginx
- Orquestração: Docker Compose

Arquitetura simples, escalável e production-ready.


# 🏗 Arquitetura

Internet
    ↓
Nginx (80/443)
    ↓
Docker Network (bridge)
    ├── frontend (Next.js)
    ├── backend (FastAPI + LangGraph)
    └── db (PostgreSQL)


# 📂 Estrutura obrigatória

project/
│
├── docker-compose.yml
├── .env
│
├── frontend/
│   └── Dockerfile
│
├── backend/
│   ├── Dockerfile
│   └── requirements.txt
│
└── nginx/
    └── nginx.conf


# 🐳 docker-compose.yml padrão

Regras:
- Sempre usar network interna
- Nunca expor PostgreSQL externamente
- Variáveis via .env
- Sempre usar volumes persistentes

Serviços mínimos:
- db
- backend
- frontend
- nginx


# 🔐 Segurança obrigatória

- PostgreSQL NÃO exposto em porta pública
- Backend NÃO exposto diretamente
- Apenas Nginx expõe 80/443
- Usar HTTPS (Certbot ou Caddy)
- Variáveis sensíveis via .env
- Firewall (ufw) liberando apenas 22, 80, 443


# 🚀 Backend (FastAPI + LangGraph)

Regras:
- Rodar com uvicorn
- Workers >= número de CPUs - 1
- Timeout ajustado no Nginx
- Nunca usar reload em produção
- Logs estruturados

Comando padrão:
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 2


# ⚛ Frontend (Next.js)

Regras:
- Build de produção
- Nunca usar dev server
- NODE_ENV=production
- Proxy sempre via Nginx


# 🌐 Nginx obrigatório

Responsável por:
- Reverse proxy
- HTTPS
- Rate limiting (se necessário)
- Compressão gzip
- Cache estático

Regras:
- / → frontend
- /api → backend
- Timeouts configurados
- client_max_body_size ajustado


# 📈 Escalabilidade futura

Quando crescer:

1. Aumentar workers do FastAPI
2. Adicionar Redis (cache ou fila)
3. Separar banco para VPS dedicada
4. Adicionar CDN no frontend
5. Migrar para load balancer se necessário

NÃO usar Kubernetes antes de:
- Ter problema real de scaling
- > 1 VPS ativa


# 🧠 Para projetos com LangGraph

Regras adicionais:
- Separar lógica de agentes da camada HTTP
- Evitar estado em memória
- Usar banco ou Redis para estado persistente
- Evitar operações bloqueantes
- Usar async corretamente


# 🔥 Processo padrão de deploy

1. Criar VPS (Ubuntu LTS)
2. Instalar Docker + Docker Compose
3. Clonar projeto
4. Configurar .env
5. docker compose up -d --build
6. Configurar SSL
7. Ativar firewall


# ❌ Proibido

- Rodar tudo em uma única imagem
- Expor banco publicamente
- Usar docker run manual
- Misturar ambiente dev com prod
- Commitar .env


# 🧩 Padrão para múltiplos projetos

Cada projeto:
- Container isolado
- Network isolada
- Subdomínio próprio
- Banco separado


# 🧠 Filosofia

- Simples > Complexo
- VPS única até doer
- Escalar vertical antes de horizontal
- Sem Kubernetes cedo demais
- Infra deve ser previsível


# 📌 Quando usar esse skill

Sempre que:
- Criar SaaS novo
- Criar sistema com agentes LangGraph
- Criar sistema de trading backend + frontend
- Criar MVP com banco relacional


END SKILL
