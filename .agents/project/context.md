# Project Context

> **Cache vivo do projeto. Campos não preenchidos = contexto ainda ausente. Não bloqueie a tarefa só por este arquivo estar vazio.**
> Regras globais de engenharia vivem em `AGENTS.md`. Este arquivo contém apenas o que é específico deste projeto.
> Não duplique aqui o que já está na OpenSpec — aponte para ela.
> Atualize apenas com fatos estáveis verificados no repo ou decisões aprovadas.

## Spec

- **OpenSpec**: <!-- caminho do arquivo ou 'não utilizado' -->
- **Status**: <!-- greenfield / active / maintenance -->

## Project

- **Name**:
- **Description**: <!-- só se não houver OpenSpec -->

## Stack

- **Frontend**:
- **Backend**:
- **Database**:
- **Auth**:
- **Infra**:
- **Runtime**:

## Repository

- **Structure**:
- **Package manager**:
- **Test**:
- **Env vars**: `.env.local` (nunca commitar) — template em `.env.example`

## Active Skills

<!-- liste as relevantes para este projeto, ex: vps-docker-deploy, better-auth-best-practices -->

## Architecture Decisions

> Decisões transversais não óbvias pelo código e não cobertas pela OpenSpec.

## Known Constraints

> Limitações que o agente deve respeitar. Se já estão na OpenSpec, aponte para lá — não duplique.

## Engineering Conventions

### General
- preferir funções puras quando possível e isolar efeitos colaterais
- usar nomes explícitos e sem ambiguidade
- manter arquivos coesos e focados em uma responsabilidade
- evitar abstração prematura

### Backend / API
- validar entradas na borda do sistema
- retornar erros com contexto e semântica adequada
- não concentrar lógica de negócio em controllers ou handlers rasos

### Frontend
- preferir componentes pequenos e composáveis
- usar estado local antes de introduzir estado global
- acessibilidade é requisito, não detalhe opcional

### Testing
- testar fluxos críticos e lógica de negócio
- ao corrigir bug, validar a causa raiz e, quando fizer sentido, adicionar cobertura para evitar regressão
