---
name: data-science
description: "Use quando a tarefa envolver análise exploratória, qualidade de dados, experimentação reprodutível, definição de hipóteses ou comunicação de achados sem treino/deploy de modelo preditivo."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "technical"
  complexity: 3
  status: active
  tags:
    - data-science
    - eda
    - experimentation
---

# SKILL: Data Science

## Objetivo

Orientar análise de dados com foco em qualidade, exploração objetiva, hipóteses testáveis, reprodutibilidade e comunicação clara de incertezas.

## Use this skill when

- A tarefa envolver EDA, perfilamento, qualidade, cobertura ou consistência de dados.
- Precisar investigar hipóteses, padrões, segmentos ou anomalias sem treinar modelo.
- Precisar desenhar experimento analítico, métrica descritiva ou análise comparativa.
- Precisar documentar achados, limitações, incertezas e próximos passos.
- Precisar preparar entendimento dos dados antes de decidir se há caso para `ml` ou `quant`.

## Do not use this skill when

- A tarefa exigir treino, validação, comparação ou deploy de modelo preditivo; use `ml`.
- A tarefa for backtest financeiro, pesquisa de sinais, construção de estratégia ou análise de risco quantitativo; use `quant`.
- A tarefa for engenharia de dados operacional sem análise, hipótese ou interpretação.
- A tarefa for apenas visualização estética sem pergunta analítica.
- A tarefa envolver LLM, agentes ou prompt engineering sem análise tabular/experimental.

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Plano de análise com pergunta analítica e dados necessários
- Auditoria de qualidade de dados com cobertura e missingness
- Relatório exploratório com achados e limitações
- Desenho experimental com hipótese e critério de decisão

## Procedure

### 1. Definir a pergunta analítica

- Identifique objetivo, decisão esperada e público do resultado.
- Defina unidade de análise, período, população e granularidade.
- Separe pergunta descritiva, diagnóstica, causal ou preditiva.
- Encaminhe para `ml` se a resposta exigir modelo preditivo treinado.

### 2. Auditar dados antes de interpretar

- Verifique schema, tipos, cobertura, missingness, duplicatas e chaves.
- Compare disponibilidade real dos dados com a pergunta analítica.
- Identifique vieses de coleta, filtros implícitos e mudanças de definição.
- Registre limitações antes de produzir conclusões.

### 3. Explorar com hipóteses rastreáveis

- Comece por estatísticas simples e cortes relevantes.
- Compare segmentos, períodos e distribuições com baseline explícito.
- Evite transformar correlação exploratória em causalidade.
- Documente hipóteses descartadas e evidências insuficientes.

### 4. Comunicar achados com incerteza

- Priorize achados acionáveis e ligados à decisão.
- Separe fato observado, interpretação e recomendação.
- Declare incertezas, vieses e limitações.
- Sugira próximos passos proporcionais à evidência.

### 5. Preparar handoff quando necessário

- Encaminhe para `ml` se houver target, predição, validação e deploy
- Encaminhe para `quant` se houver estratégia, sinal, backtest ou risco financeiro
- Defina quais dados, métricas e hipóteses devem seguir para a próxima etapa

## Verification

- Pergunta analítica, unidade e período estão explícitos
- Qualidade e cobertura dos dados foram avaliadas antes das conclusões
- Achados estão ligados a evidências e limitações
- Hipóteses, métricas e cortes estão rastreáveis
- Próximos passos diferenciam análise, `ml` e `quant`
- Não houve treino/deploy de modelo dentro desta skill

> **Skill log**
> - [2026-05-11] Skill expandida de placeholder para orientação operacional de análise de dados e delimitada contra `ml` e `quant`.
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/` com arquivos divididos por especialidade.

## References

Conteúdo referencial detalhado, output contracts e pitfalls estão disponíveis em:
- `references/output-contracts.md` - Output contracts detalhados
- `references/pitfalls.md` - Pitfalls
