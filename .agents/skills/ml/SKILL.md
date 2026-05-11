---
name: ml
description: "Use quando a tarefa envolver modelagem de machine learning: definição de target, preparação de dados, treino, validação, análise de drift ou deploy seguro de modelos."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "technical"
  complexity: 4
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

### Plano de modelagem

Entregue quando:

- target, unidade de predição e horizonte estiverem definidos
- métricas primária e secundárias estiverem justificadas
- baseline estiver definido
- riscos de leakage e viés estiverem listados

### Experimento de treino

Entregue quando:

- split estiver justificado
- features e transformações estiverem rastreáveis
- hiperparâmetros e seed estiverem registrados
- resultados forem comparados contra baseline

### Validação de modelo

Entregue quando:

- performance for reportada em dados fora da amostra
- erros relevantes forem analisados por segmento
- sinais de overfitting, leakage e drift forem avaliados
- limitações conhecidas forem documentadas

### Plano de deploy seguro

Entregue quando:

- estratégia de rollout estiver definida
- monitoramento de qualidade e drift estiver previsto
- fallback ou rollback estiver definido
- critérios de promoção ou bloqueio estiverem claros

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
- Defina thresholds de alerta e critérios de rollback.
- Planeje reavaliação ou retreino com cadência explícita.

## Pitfalls

- **Leakage temporal**: Usar informação que não existiria no momento da predição invalida a validação.
- **Métrica desalinhada**: Otimizar métrica técnica que não reflete custo real gera modelo inútil.
- **Baseline ausente**: Sem baseline, não há evidência de ganho.
- **Split incorreto**: Split aleatório pode inflar resultado em séries temporais, usuários repetidos ou grupos correlacionados.
- **Deploy sem monitoramento**: Modelo em produção degrada silenciosamente sem drift e qualidade monitorados.

## Verification

- Target, unidade de predição e horizonte estão explícitos.
- Métricas estão justificadas.
- Baseline foi definido.
- Split evita leakage e respeita a estrutura dos dados.
- Experimentos são rastreáveis.
- Resultados foram validados fora da amostra.
- Erros e limitações foram analisados.
- Plano de deploy inclui monitoramento, fallback e critérios de rollback.

> **Skill log**
> - [2026-05-11] Skill expandida de placeholder para orientação operacional de machine learning e revisada com `skill-reviewer`.
