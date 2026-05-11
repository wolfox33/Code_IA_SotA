---
name: quant
description: "Use quando a tarefa envolver pesquisa quantitativa, sinais, estratégias, backtests, risco, validação estatística ou análise de performance financeira sem foco principal em deploy de modelo preditivo."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "technical"
  complexity: 4
  tags:
    - quant
    - backtesting
    - statistics
---

# SKILL: Quant

## Objetivo

Orientar workflows quantitativos com foco em hipótese clara, validação estatística, robustez fora da amostra, controle de vieses e comunicação honesta de risco.

## Use this skill when

- A tarefa envolver pesquisa de sinais, fatores, estratégias ou regras quantitativas.
- Precisar desenhar, revisar ou validar backtests.
- Precisar avaliar risco, drawdown, turnover, custos, exposição ou robustez.
- Precisar comparar estratégias com métricas financeiras e estatísticas.
- Precisar investigar hipótese quantitativa antes de decidir por `ml`.

## Do not use this skill when

- A tarefa exigir treino, validação ou deploy de modelo preditivo como núcleo principal; use `ml`.
- A tarefa for apenas EDA, qualidade de dados ou análise descritiva sem estratégia/backtest; use `data-science`.
- A tarefa for recomendação financeira operacional ou decisão de investimento real.
- A tarefa ignorar custos, liquidez, viés temporal ou restrições de execução.
- A tarefa envolver LLM, agentes ou prompt engineering sem pesquisa quantitativa.

## Output contracts

### Plano de pesquisa quantitativa

Entregue quando:

- hipótese, universo, período e frequência estiverem definidos
- dados necessários e premissas estiverem listados
- métrica de sucesso e baseline estiverem explícitos
- riscos de viés estiverem identificados

### Desenho de backtest

Entregue quando:

- regras de entrada, saída, rebalanceamento e sizing estiverem definidas
- custos, slippage, liquidez e calendário estiverem considerados
- prevenção de look-ahead e survivorship bias estiver descrita
- split in-sample/out-of-sample estiver justificado

### Validação de estratégia

Entregue quando:

- performance for comparada contra benchmark ou baseline
- risco, drawdown, turnover e exposição forem reportados
- robustez por período, ativo, regime ou parâmetro for avaliada
- limitações e condições de falha estiverem documentadas

### Relatório de risco

Entregue quando:

- principais fontes de risco estiverem listadas
- sensibilidade a custos, liquidez e concentração for avaliada
- cenários adversos ou stress tests forem considerados
- recomendação for proporcional à evidência

## Procedure

### 1. Formular hipótese testável

- Defina tese, mecanismo esperado e variável observável.
- Escolha universo, período, frequência e benchmark.
- Defina métrica primária antes de olhar resultados.
- Separe pesquisa exploratória de validação confirmatória.

### 2. Preparar dados sem viés temporal

- Garanta que cada decisão use apenas informação disponível no momento.
- Considere survivorship bias, corporate actions, calendário e sincronização.
- Inclua custos, slippage e restrições realistas quando houver execução simulada.
- Registre filtros, exclusões e fontes de dados.

### 3. Desenhar backtest reproduzível

- Especifique regras de sinal, entrada, saída, rebalanceamento e sizing.
- Compare contra baseline simples ou benchmark relevante.
- Separe in-sample, validation e out-of-sample quando aplicável.
- Controle múltiplos testes e evite overfitting de parâmetros.

### 4. Avaliar performance e risco

- Reporte retorno, volatilidade, drawdown, turnover, exposição e custos.
- Analise estabilidade por subperíodo, regime, ativo e parâmetro.
- Verifique sensibilidade a premissas e cenários adversos.
- Documente limitações antes de recomendar continuidade.

### 5. Decidir handoff ou próximos testes

- Encaminhe para `ml` se a estratégia depender de treino/validação/deploy de modelo preditivo.
- Encaminhe para `data-science` se a próxima etapa for apenas EDA ou qualidade de dados.
- Proponha próximos testes apenas quando reduzirem incerteza material.

## Pitfalls

- **Look-ahead bias**: Usar dados futuros invalida o backtest.
- **Survivorship bias**: Ignorar ativos removidos infla resultados.
- **Overfitting de estratégia**: Ajustar parâmetros até funcionar no passado reduz generalização.
- **Custos ignorados**: Estratégia lucrativa sem custos pode falhar na execução real.
- **Métrica única**: Retorno isolado sem risco, drawdown e turnover é insuficiente.

## Verification

- Hipótese, universo, período e benchmark estão explícitos.
- Regras de backtest são reproduzíveis.
- Look-ahead, survivorship bias, custos e liquidez foram considerados.
- Performance foi comparada contra baseline ou benchmark.
- Robustez fora da amostra e sensibilidade foram avaliadas.
- Limitações, riscos e próximos passos estão documentados.
- Handoff para `ml` ou `data-science` está claro quando aplicável.

> **Skill log**
> - [2026-05-11] Skill expandida de placeholder para orientação operacional de pesquisa quantitativa e delimitada contra `ml` e `data-science`.
