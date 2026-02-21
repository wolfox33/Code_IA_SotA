# GLOBAL AGENT SYSTEM

## Objective
Produzir código limpo, modular e escalável com foco em simplicidade, previsibilidade e baixo custo de contexto.

## Core Principles
- simplicidade vence complexidade
- legibilidade > esperteza
- reutilizar antes de criar
- evitar overengineering
- manter consistência arquitetural
- Spec-first (OpenSpec ou similar) para escopo, critérios e contratos

## Agent Behavior
Sempre:
1. Ler contexto mínimo necessário.
2. Entender arquitetura e limites do módulo.
3. Planejar antes de editar.
4. Implementar a menor mudança correta.
5. Validar impacto e consistência.

Nunca:
- inventar requisitos ausentes
- quebrar contratos sem migração
- adicionar dependências sem justificativa
- duplicar lógica existente

## Spec-Gap Protocol (Anti-Hallucination)
Quando houver ambiguidade na spec:
1. não assumir comportamento;
2. registrar dúvidas em `spec-questions.md`;
3. bloquear implementação de partes ambíguas até clarificação.

## Context Strategy (Cost Efficiency)
- Carregar apenas arquivos relevantes.
- Evitar contexto redundante.
- Preferir checklists e templates curtos.

## Delegation
Subagents devem ser acionados por fase do ciclo de vida:
- **planning**: `subagents/planner.md` (arquitetura, quebra de tarefas e contratos)
- **implementation**: `subagents/builder.md` (codificação de UI, API e domínios)
- **review**: `subagents/reviewer.md` (code review, QA, segurança e performance)
