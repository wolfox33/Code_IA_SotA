---
name: systematic-debugging
description: Use para bugs, testes falhando, regressao ou comportamento inesperado; exige reproducao, rastreamento de causa raiz e validacao de hipotese antes de corrigir.
metadata:
  model: inherit
  version: 1.0.0
  author: Custom Stack
  category: testing
  complexity: 5
  tags: [debugging, root-cause, regression, tests]
  compatible_with: [windsurf, opencode, antigravity]
---

# SKILL: Systematic Debugging

## Objetivo

Evitar correcoes por chute. Antes de alterar codigo, reproduza o problema, entenda o caminho de execucao e valide uma hipotese de causa raiz.

## Use this skill when

- Um teste falhar.
- Um bug for reportado.
- Houver regressao apos mudanca recente.
- O comportamento observado divergir da spec.
- A causa nao for imediatamente comprovada pelo erro.

## Do not use this skill when

- A falha for erro obvio de sintaxe apontado por build/linter.
- A tarefa for mudanca planejada, nao debugging.
- A correcao for mecanica e a causa ja estiver demonstrada.

## Procedure

### 1. Capture o sintoma

- Leia erro, stack trace, logs e contexto completo.
- Reproduza com o menor comando ou caso possivel.
- Registre o resultado esperado versus observado.

### 2. Localize o limite da falha

- Identifique ultima mudanca relevante quando houver historico.
- Rastreie fluxo de dados ate o ponto onde o valor ou estado fica incorreto.
- Compare com caminho semelhante que funciona.

### 3. Forme uma hipotese unica

- Declare a causa suspeita em uma frase.
- Defina uma observacao que provaria ou derrubaria a hipotese.
- Nao implemente fix enquanto a hipotese nao estiver testada.

### 4. Teste a hipotese

- Use teste focado, log temporario, inspeção ou comando minimo.
- Se a hipotese falhar, descarte e volte ao rastreamento.
- Se confirmar, remova instrumentacao temporaria antes de finalizar.

### 5. Corrija e previna regressao

- Corrija a causa raiz, nao apenas o sintoma.
- Adicione ou ajuste teste quando o risco justificar.
- Rode validacao focada e relacionada.

## Pitfalls

- Nao mudar varias coisas ao mesmo tempo.
- Nao mascarar erro com fallback silencioso.
- Nao ignorar stack trace ou mensagem original.
- Nao assumir que bug esta no arquivo mais recente sem rastrear fluxo.

## Verification

- Problema foi reproduzido ou a impossibilidade foi documentada.
- Causa raiz foi declarada.
- Hipotese foi validada antes do fix.
- Teste/comando demonstra que o bug nao ocorre mais.

---

> **Skill log**
> - [2026-04-25] Criada para disciplinar investigacao de bugs e falhas sem impor overhead a mudancas simples.
