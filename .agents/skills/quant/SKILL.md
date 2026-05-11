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

Ao aplicar esta skill, entregue ou registre:

- Plano de pesquisa quantitativa com hipótese, universo, período e métrica
- Desenho de backtest reproduzível com regras e premissas
- Validação de estratégia com performance e risco
- Relatório de risco com fontes de risco e recomendações

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

- Encaminhe para `ml` se a estratégia depender de treino/validação/deploy de modelo preditivo
- Encaminhe para `data-science` se a próxima etapa for apenas EDA ou qualidade de dados
- Proponha próximos testes apenas quando reduzirem incerteza material

## Verification

- Hipótese, universo, período e benchmark estão explícitos
- Regras de backtest são reproduzíveis
- Look-ahead, survivorship bias, custos e liquidez foram considerados
- Performance foi comparada contra baseline ou benchmark
- Robustez fora da amostra e sensibilidade foram avaliadas
- Limitações, riscos e próximos passos estão documentados
- Handoff para `ml` ou `data-science` está claro quando aplicável

> **Skill log**
> - [2026-05-11] Skill expandida de placeholder para orientação operacional de pesquisa quantitativa e delimitada contra `ml` e `data-science`.
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/` com arquivos divididos por especialidade.

## References

Conteúdo referencial detalhado, output contracts e pitfalls estão disponíveis em:
- `references/output-contracts.md` - Output contracts detalhados
- `references/pitfalls.md` - Pitfalls
