---
name: test-driven-development
description: Use para implementar bugfixes reproduziveis, regras de negocio e logica nova com disciplina RED-GREEN-REFACTOR; nao substitui skills tecnicas de teste, apenas define a ordem segura de trabalho.
metadata:
  model: inherit
  version: 1.0.0
  author: Custom Stack
  category: testing
  complexity: 5
  tags: [testing, tdd, bugfix, regression, quality]
  compatible_with: [windsurf, opencode, antigravity]
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

## Procedure

### 1. Reproduza ou especifique o comportamento

- Para bugfix, reproduza a falha antes de escrever o fix.
- Para feature, defina o criterio observavel que comprova o comportamento.
- Escolha o menor nivel de teste que captura o risco: unitario, integracao ou E2E.

### 2. RED

- Escreva um teste que falhe pelo motivo esperado.
- Rode o teste focado.
- Verifique que a falha prova o comportamento ausente, nao erro de setup.

### 3. GREEN

- Implemente a menor mudanca correta.
- Nao refatore codigo adjacente enquanto o teste esta vermelho.
- Rode o teste focado ate passar.

### 4. REFACTOR

- Refatore apenas se reduzir complexidade real ou duplicacao criada pela mudanca.
- Rode novamente o teste focado e, quando aplicavel, a suite relacionada.

### 5. Handoff

- Reporte o teste criado/alterado.
- Reporte comandos executados.
- Se TDD nao foi aplicavel, explique a excecao objetiva.

## Pitfalls

- Nao escrever teste depois e chamar de TDD.
- Nao usar teste amplo quando um teste unitario captura o mesmo comportamento.
- Nao manter teste fragil que depende de tempo, ordem externa ou rede sem mock/controlador.
- Nao deixar o teste falhar por causa errada.

## Verification

- Existe um teste que falhou antes do fix ou uma excecao explicita.
- A implementacao minima fez o teste passar.
- Testes relacionados foram executados.
- A skill tecnica de teste adequada foi usada quando o framework exigiu detalhe especifico.

---

> **Skill log**
> - [2026-04-25] Criada como disciplina contextual de TDD sem substituir skills tecnicas de teste existentes.
