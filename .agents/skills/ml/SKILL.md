---
name: ml
description: "Use quando a tarefa envolver modelagem de machine learning: definição de target, preparação de dados, treino, validação, análise de drift ou deploy seguro de modelos."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "technical"
  complexity: 4
  status: active
  tags:
    - machine-learning
    - modeling
    - validation
---

# SKILL: Machine Learning

## Objetivo

Orientar workflows de machine learning com foco em definição correta do problema, validação confiável, rastreabilidade e deploy seguro.

## Use this skill when

- A tarefa envolver classificação, regressão, ranking, previsão temporal ou segmentação.
- Precisar definir target, features, métricas ou baseline.
- Precisar treinar, comparar ou validar modelos.
- Precisar avaliar leakage, drift, generalização ou robustez.
- Precisar planejar deploy, monitoramento ou rollback de modelo.

## Do not use this skill when

- A tarefa for apenas análise exploratória sem modelagem ou decisão de ML.
- A tarefa for engenharia de dados sem treino, validação ou consumo de modelo.
- A tarefa for estatística/quant/backtest financeiro sem componente explícito de ML.
- A tarefa for integração de LLM, agentes ou prompt engineering sem modelo preditivo supervisionado ou não supervisionado.
- A tarefa híbrida puder ser resolvida por `data-science` ou `quant` sem treino, validação ou deploy de modelo preditivo.

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Plano de modelagem com target, métricas e baseline
- Experimento de treino com split rastreável
- Validação de modelo com performance fora da amostra
- Plano de deploy seguro com monitoramento e rollback

## Procedure

### 1. Definir o problema

- Identifique objetivo de negócio ou pesquisa.
- Defina target, unidade de predição, horizonte temporal e frequência de atualização.
- Escolha métricas alinhadas ao custo real de erro.
- Defina um baseline simples antes de modelos complexos.

### 2. Preparar dados com segurança

- Valide disponibilidade dos dados no momento da predição.
- Separe treino, validação e teste respeitando tempo, grupos ou estratificação.
- Evite leakage por agregações futuras, duplicatas ou features pós-evento.
- Registre transformações, filtros e critérios de exclusão.

### 3. Treinar com rastreabilidade

- Versione dados, features, código, configuração e seed.
- Compare modelos contra baseline e entre si com a mesma métrica.
- Prefira o modelo mais simples que atinja o objetivo.
- Registre hiperparâmetros e decisões relevantes.

### 4. Validar generalização

- Avalie performance fora da amostra.
- Analise erros por segmento, classe, período ou faixa de score.
- Verifique overfitting, calibração, estabilidade e drift.
- Documente limitações e casos em que o modelo não deve ser usado.

### 5. Planejar deploy e monitoramento

- Defina rollout gradual quando houver risco operacional.
- Monitore dados de entrada, distribuição de scores, qualidade, latência e drift.
- Defina thresholds de alerta e critérios de rollback
- Planeje reavaliação ou retreino com cadência explícita

## Verification

- Target, unidade de predição e horizonte estão explícitos
- Métricas estão justificadas
- Baseline foi definido
- Split evita leakage e respeita a estrutura dos dados
- Experimentos são rastreáveis
- Resultados foram validados fora da amostra
- Erros e limitações foram analisados
- Plano de deploy inclui monitoramento, fallback e critérios de rollback

> **Skill log**
> - [2026-05-11] Skill expandida de placeholder para orientação operacional de machine learning e revisada com `skill-reviewer`.
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/` com arquivos divididos por especialidade.

## References

Conteúdo referencial detalhado, output contracts e pitfalls estão disponíveis em:
- `references/output-contracts.md` - Output contracts detalhados
- `references/pitfalls.md` - Pitfalls
