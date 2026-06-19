# Market Representation Research Pipeline

## Purpose

Este documento define o pipeline padrão de pesquisa quantitativa orientado a representação de mercado.

O objetivo é aprender representações causais do mercado antes de investigar forecasting, state discovery ou estratégias de execução.

O pipeline substitui abordagens centradas exclusivamente em indicadores técnicos ou modelos de regime como ponto de partida da pesquisa.

---

# Core Principle

Antes de perguntar:

```text
O mercado vai subir?
```

Pergunte:

```text
Como o mercado deve ser representado?
```

Representações são tratadas como objeto primário de pesquisa.

Forecasting, state discovery e estratégia são consumidores da representação.

---

# Layer 1 — Observation

Objetivo:

Definir quais observações do mercado serão utilizadas.

Pipeline atual:

```text
OHLCV
```

Observações futuras podem incluir:

```text
Funding
Open Interest
Order Book
Trades
```

mas não fazem parte do baseline atual.

---

# Layer 2 — Causal Transformations

Objetivo:

Remover dependência de escala sem introduzir indicadores técnicos.

Preferência atual:

```text
Log Returns
High/Open
Low/Open
Close/Open
Volume Change
```

Princípios:

* Transformações causais
* Sem lookahead
* Sem normalização global
* Sem uso obrigatório de indicadores técnicos

Indicadores devem ser tratados como baseline e não como representação principal.

---

# Layer 3 — Representation Learning

Objetivo:

Aprender uma representação latente do mercado.

Representações testadas e validadas:

## Statistical

* ~~PCA~~ — descartado: nunca superou AE (melhor 51.7%)
* Factor Analysis — sozinho fraco (52.2%), mas combina bem com AE

## Reconstruction-based

* Denoising Autoencoder — baseline (54.4%)
* ~~VAE~~ — descartado: KL divergence prejudica (50.1%)
* ~~Sparse AE~~ — descartado: sem ganho (53.5%)
* ~~BatchNorm AE~~ — descartado: sem ganho (51.7%)
* ~~SELU/SWISH/ELU~~ — descartado: todos piores que relu
* ~~Deeper/Wider~~ — descartado: overfit sem ganho

## Best: AE + FA Combination

* AE(8) + FA(8) = 16 dims -> 55.03% / 0.574 AUC
* Supera AE alone em +0.6% accuracy / +3.6% AUC
* Pipeline atual: representation_learning.py

## Contrastive / Predictive

* ~~CPC~~ — descartado: baseline não supera AE
* ~~TS2Vec~~ — descartado: divergiu em todas as abordagens
* ~~TNC~~ — descartado: 48-52% / 0.48-0.51 AUC

## JEPA-inspired

* ~~Predictive Embedding Learning~~ — descartado: 51.1% / 0.500
* ~~Latent Future Prediction~~ — descartado (h=1,3,5): todos 51.1% / 0.500

Foundation Models não fazem parte da direção principal de pesquisa.

---

# Layer 4 — Representation Validation

Toda representação deve ser validada antes de entrar em forecasting ou state discovery.

## Linear Probe (55.03% / 0.574 AUC)

LogisticRegression treinada nos 16 dims (AE+FA). Melhor que raw features (+3.8% / +5.8%).

## Separability

Silhouette Score (binary labels): 0.0025 — fraco para clustering, mas esperado para binary classification. Embeddings não formam clusters naturais, mas um hiperplano linear consegue separar classes.

## Temporal Stability

Rolling cosine similarity (window=20 timesteps = 10 dias):
- Mean: 0.6648, Std: 0.1658
- Class 0: 0.6652, Class 1: 0.6643
- Moderado: embeddings mudam ao longo do tempo, mas preservam informação preditiva

## Causality

Verificações em representation_learning.py:
- No lookahead: PASS
- No repaint: PASS
- Edge effects: PASS (diff=0.598)

Representações estáveis o suficiente para Layer 5.

---

# Layer 5 — Forecasting vs State Discovery

A pesquisa segue dois ramos paralelos.

## Branch A — Direct Forecasting

```text
Embedding
↓
MLP
↓
Return Direction
```

Objetivo:

Avaliar a utilidade direta da representação.

---

## Branch B — State Discovery

```text
Embedding
↓
State Discovery
↓
MLP
```

Objetivo:

Avaliar se estados adicionam informação útil.

State discovery é tratado como hipótese e não como requisito estrutural.

---

# Layer 6 — State Discovery Research

Abordagens testadas em AE+FA embeddings (16 dims):

## Decomposition-based (sklearn)

* **DictionaryLearning(n=5, batch)** — 56.6-57.1% / 0.578 (+1.5-2.0% / +0.35-0.38%) — **MELHOR STATE DISCOVERY**
* ~~DictionaryLearning(n=3,4,6,7,8,10)~~ — descartado: não consistentemente melhor
* ~~MiniBatchDictionaryLearning~~ — descartado: todos configs piores que baseline
* ~~SparsePCA(n=3,5)~~ — descartado: marginal
* ~~ICA(n=3,5)~~ — descartado: todos piores que baseline

## Discrete Regimes

* ~~KMeans~~ — descartado: todos k (3,5,7,10) piores que baseline
* ~~GMM~~ — descartado: n=5 = 55.67% / 0.562 (accuracy igual, AUC pior)
* ~~HMM~~ — descartado: todos n_states (3,5,7) piores que baseline
* ~~HDBSCAN~~ — descartado: 0 clusters (tudo noise) em todos configs (mcs=20,50,100)
* ~~SpectralCoclustering~~ — descartado: todos n (3,5,7) piores que baseline
* ~~SpectralBiclustering~~ — descartado: todos n (3,5,7) piores que baseline

## Change Point Detection

* **CUSUM(t=0.5)** — 55.67% / 0.576 (+0.64% / +0.18%) — melhor que baseline, mas ganho marginal
* ~~CUSUM(t=1.0,1.5,2.0)~~ — descartado: todos piores
* **BOCPD** — testado extensivamente:
  - Hazard 0.01-0.5: h=0.3 dá 56.18% / 0.570 (+1.15% / -0.43%) — accuracy melhor mas AUC cai
  - Priors (kappa, alpha): marginal (+0.13% / +0.02-0.05%)
  - Obs dimensions: dim=5 marginal (+0.13% / +0.05%)
  - Run length feature: marginal
  - Rolling stats: marginal
  - **Nenhuma config supera CUSUM em ambos metrics**

## Resultado

State discovery agrega valor via **DictionaryLearning(n=5)**: +2.04% accuracy / +0.38% AUC.

**Pipeline atual:** AE+FA (16 dims) + DictLearn states → 57.07% / 0.578

**Decisão:** Usar DictLearn(n=5) como state features no downstream.

Nenhuma abordagem possui prioridade a priori.

Todas devem justificar sua existência por desempenho downstream.

---

# Layer 7 — Downstream Model

Baseline atual:

```text
LogisticRegression → MLP → RandomForest → GradientBoosting
```

Resultado (AE+FA+DictLearn, 21 dims):

| Model | Accuracy | AUC-ROC |
|---|---|---|
| **LogisticRegression** | **56.56%** | **0.5779** |
| MLP | 52.10% | 0.5325 |
| GradientBoosting | 51.21% | 0.5278 |
| RandomForest | 49.43% | 0.5126 |

**Conclusão:** LogisticRegression é o melhor. Modelos complexos overfittam (3924 samples).

Objetivo:

Isolar o impacto da representação.

Trocas de modelo devem ocorrer apenas após validação da representação.

---

# Layer 8 — Prediction Target

Target padrão:

```text
Return(t+1) > 0
```

Classificação binária de direção (12h forward return).

## Research Results

Pipeline: AE(8) + FA(8) + DictLearn(5) = 21 dims → LogisticRegression

### Horizons (binary direction)

| Horizon | Accuracy | AUC |
|---|---|---|
| **h=1** | **54.59%** | **0.5715** |
| h=2 | 49.43% | 0.4965 |
| h=4 | 48.91% | 0.4811 |
| h=8 | 48.01% | 0.4940 |
| h=16 | 49.28% | 0.5085 |

**Conclusão:** h=1 é o melhor. Horizontes maiores degradam performance.

### Regression (predict return magnitude)

| Horizon | Dir Acc | R2 |
|---|---|---|
| h=1 | 51.79% | -0.010 |
| h=2 | 48.40% | -0.020 |
| h=4 | 46.35% | -0.019 |
| h=8 | 46.85% | -0.022 |

**Conclusão:** Regression é inútil — R2 negativo em todos horizontes.

### Multi-class

| Config | Accuracy |
|---|---|
| 3-class (thresh=0.5%) | 37.37% |
| 3-class (thresh=1%) | 46.81% |
| **3-class (thresh=2%)** | **70.79%** |
| 5-class (quintiles) | 22.96% |

**Conclusão:** 3-class com threshold 2% tem accuracy alta (70.8%), mas é trivial — apenas classifica moves within ±2% como "flat".

### Volatility-Adjusted

| Window | Accuracy | AUC |
|---|---|---|
| vol_w=10 | 53.83% | 0.5711 |
| vol_w=20 | 54.72% | 0.5699 |
| vol_w=50 | 54.08% | 0.5688 |

**Conclusão:** Marginalmente pior que baseline.

### Asymmetric Thresholds

| Up | Down | Accuracy | AUC | Coverage |
|---|---|---|---|---|
| 0.5% | -0.5% | 53.78% | 0.5555 | 75.2% |
| 1% | -1% | 53.40% | 0.5445 | 56.2% |
| 2% | -2% | 53.95% | 0.5249 | 33.5% |
| **1%** | **-0.5%** | **57.75%** | **0.5436** | **66.0%** |
| 0.5% | -1% | 55.91% | 0.5473 | 65.3% |

**Conclusão:** Asymmetric up>1%, dn<-0.5% dá 57.75% accuracy, mas AUC cai (0.5436 vs 0.5715).

### Trend (multi-bar)

| Horizon | Accuracy | AUC |
|---|---|---|
| trend_2h | 50.06% | 0.5011 |
| trend_4h | 48.78% | 0.4706 |
| trend_8h | 49.16% | 0.5087 |

**Conclusão:** Trend targets não adicionam valor.

### Absolute Move (Volatility Proxy)

| Threshold | Accuracy | AUC |
|---|---|---|
| >0.5% | 72.58% | 0.5949 |
| >1% | 57.02% | 0.5722 |
| >2% | 71.17% | 0.5998 |
| **>3%** | **82.65%** | **0.6214** |

**Conclusão:** Predicting volatility (absolute move) é muito mais fácil que predicting direction. Accuracy sobe com threshold maior, mas isso é esperado — poucos eventos de alta volatilidade.

## Decision

**Manter target binário h=1** (Return(t+1) > 0).

Razões:
1. h=1 é o melhor horizonte para direction prediction
2. Regression é inútil (R2 negativo)
3. Multi-class não agrega informação útil (trivial)
4. Asymmetric thresholds melhoram accuracy mas reduzem AUC
5. Absolute move prevê volatilidade, não direção
6. Trend targets não adicionam valor

Target atual é o mais robusto para direction prediction.

---

# Research Philosophy

Evitar:

```text
RSI tuning
MACD tuning
Parameter optimization
Indicator proliferation
HMM-centric pipelines
```

Priorizar:

```text
Representation Learning
Latent Structure Discovery
Causal Validation
Out-of-Sample Robustness
```

---

# Mandatory Checks

Toda pesquisa deve responder explicitamente:

1. Existe lookahead?
2. Existe repaint?
3. Existem efeitos de borda?
4. A representação é estável?
5. A representação melhora forecasting?
6. A representação melhora state discovery?
7. O ganho sobrevive fora da amostra?

Resultados que falham nesses critérios não devem ser promovidos para produção.
