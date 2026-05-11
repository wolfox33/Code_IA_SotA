---
name: test-driven-development
description: "Use para implementar bugfixes reproduziveis, regras de negocio e logica nova com disciplina RED-GREEN-REFACTOR; nao substitui skills tecnicas de teste, apenas define a ordem segura de trabalho."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "testing"
  complexity: 5
  status: active
  tags:
    - testing
    - tdd
    - bugfix
    - regression
    - quality
---

# SKILL: Test-Driven Development

## Objetivo

Garantir que mudancas de comportamento sejam guiadas por teste que falha primeiro, implementacao minima e refatoracao com a suite verde. Esta skill define disciplina de execucao; skills como `testing-patterns-chat` continuam sendo a referencia tecnica para frameworks, mocks e tipos de teste.

## Use this skill when

- Corrigir bug reproduzivel.
- Implementar regra de negocio nova.
- Alterar comportamento de API, service, dominio, parser, validacao ou fluxo critico.
- Prevenir regressao em codigo que ja falhou antes.
- Trabalhar em logica com edge cases relevantes.

## Do not use this skill when

- A mudanca for apenas documentacao.
- A tarefa for configuracao simples sem comportamento testavel.
- O trabalho for spike/prototipo descartavel.
- A alteracao for refactor mecanico sem mudanca de comportamento.
- O ajuste visual for trivial e melhor validado por screenshot/manual QA.

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Teste que falhou antes do fix ou excecao explicita
- Implementacao minima que fez o teste passar
- Testes relacionados executados
- Skill tecnica de teste adequada usada quando o framework exigiu detalhe especifico

## Procedure

### 1. Reproduza ou especifique o comportamento

- Para bugfix, reproduza a falha antes de escrever o fix.
- Para feature, defina o criterio observavel que comprova o comportamento.
- Escolha o menor nivel de teste que captura o risco: unitario, integracao ou E2E.
- Documente o comportamento esperado com exemplos concretos
- Identifique edge cases relevantes que devem ser cobertos

### 2. RED

- Escreva um teste que falhe pelo motivo esperado.
- Rode o teste focado.
- Verifique que a falha prova o comportamento ausente, nao erro de setup.
- Confirme que o teste falha com a mensagem de erro correta
- Se o teste não falhar, revise se o comportamento já existe ou se o teste está incorreto

### 3. GREEN

- Implemente a menor mudanca correta.
- Nao refatore codigo adjacente enquanto o teste esta vermelho.
- Rode o teste focado ate passar.
- Se o teste continuar falhando, investigue a causa raiz antes de prosseguir
- Confirme que a implementacao é mínima e não inclui funcionalidades extras

### 4. REFACTOR

- Refatore apenas se reduzir complexidade real ou duplicacao criada pela mudanca.
- Rode novamente o teste focado e, quando aplicavel, a suite relacionada.
- Mantenha a suite verde durante o refactoring
- Se o refactoring quebrar o teste, reverta e refatore em passos menores
- Valide que o refactoring não alterou o comportamento implementado

### 5. Handoff

- Reporte o teste criado/alterado.
- Reporte comandos executados
- Se TDD não foi aplicável, explique a exceção objetiva
- Liste testes relacionados que foram executados
- Indique se há regressões conhecidas ou riscos residuais

## Verification

- Existe um teste que falhou antes do fix ou uma exceção explícita
- A implementação mínima fez o teste passar
- Testes relacionados foram executados
- A skill técnica de teste adequada foi usada quando o framework exigiu detalhe específico

> **Skill log**
> - [2026-04-25] Criada como disciplina contextual de TDD sem substituir skills técnicas de teste existentes
> - [2026-05-11] Stage 6 (Batch 8) adicionou seção Output contracts faltante
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/` com arquivos divididos por especialidade.

## References

Conteúdo referencial detalhado e pitfalls estão disponíveis em:
- `references/pitfalls.md` - Pitfalls
