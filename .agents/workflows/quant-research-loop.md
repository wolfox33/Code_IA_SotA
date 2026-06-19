---
description: Workflow enxuto de pesquisa quantitativa para testar hipóteses rapidamente, evitar vazamento temporal e registrar decisões sem expandir escopo automaticamente.
---

# Quant Research Loop

> **Mindset:** Este workflow é a parte técnica/operacional. Para o mindset de pesquisa (escolha de problemas, gosto, velocidade, honestidade, jogo longo), use a skill `research-mindset`.

Use este workflow quando for iniciar um novo ciclo de pesquisa de sinal ou estratégia.

O objetivo não é provar produção em todo ciclo. O objetivo é responder rápido:

> Esta hipótese tem sinal causal suficiente para continuar?

Se não tiver, arquive. Se tiver, confirme com uma validação curta. Promoção para `src/` só acontece com pedido explícito do usuário.

Não use para bugs, refatoração, análise descritiva ou revisão de código existente.

## Princípios

- Testar pouco antes de testar muito.
- Um ciclo começa com hipótese, não com modelo.
- OHLCV já foi amplamente explorado; não reabrir sem hipótese nova clara.
- Evitar matrizes grandes por padrão.
- Registrar decisão mesmo quando o resultado for negativo.
- Nunca promover para `src/` sem confirmação explícita.

## Defaults

Use estes defaults salvo se a hipótese justificar outra escolha:

| Item | Default |
|---|---|
| Símbolo | `ETHUSDT` |
| Timeframe | `12h` |
| Horizonte | `h=1` |
| Modelo | `LogisticRegression` ou baseline linear equivalente |
| Split | Walk-forward/temporal, sem shuffle |
| Métricas | Sortino net, Calmar, DSR, Sharpe net (legacy), AUC/IC, Dir Up/Dn, drawdown |

Expansões permitidas somente após smoke positivo:

| Expansão | Quando usar |
|---|---|
| `BTCUSDT` | Confirmar que não é só ETH |
| `h=3` | Hipótese tem mecanismo de alguns candles |
| Custos 2x | Candidato ainda parece tradeável |
| Neutralização | Hipótese é feature incremental sobre baseline existente |
| XGBoost/LightGBM raso | Probe linear foi fraco mas coerente, ou a hipótese exige interação/regime |

Não testar por padrão: SOL, múltiplos horizontes, RandomForest, DSR, regimes, permutation test pesado, ablation top-k, web research, staging ou proposal para `src/`.

## Fase 0: Check Rápido de Memória

**Objetivo:** Evitar repetir direção já arquivada.

1. Leia o topo de `.agents/project/MEMORY.md`.
2. Procure entradas diretamente relacionadas ao domínio da hipótese.
3. Se houver experimento anterior relevante, leia apenas o `results/report.md` correspondente.

**Gate:** Existe gap real não coberto?

- **SIM:** siga para Fase 1.
- **NÃO:** pare e diga que a direção já foi arquivada.

## Fase 1: Hipótese e Fonte

**Objetivo:** Definir uma hipótese causal testável e confirmar que os dados existem.

Formato obrigatório:

> Se **[feature/cenário]**, então **[direção/efeito esperado]**, porque **[mecanismo econômico ou comportamental]**.

Exemplos:

- Bom: “Se funding extremo fica positivo enquanto preço perde momentum, então retorno futuro cai porque longs alavancados ficam vulneráveis a unwind.”
- Ruim: “Vou testar se um modelo acha padrão.”

Checklist mínimo:

- Mecanismo plausível.
- Dados disponíveis ou obteníveis sem trabalho grande.
- Frequência compatível com o horizonte.
- Viés conhecido identificado, se houver.

### Previsão antes de Execução (Sugerido)

Antes de rodar, registre sua expectativa:

- Qual AUC/Sortino/Calmar/DSR você espera? (registre o número)
- Qual direção econômica você prevê? (positiva, negativa, neutra)
- O que faria você abandonar esta hipótese? (condição de falsificação)

> A previsão + correção, repetida algumas centenas de vezes, é como todo bom modelo é treinado — inclusive o que está na sua cabeça.

**Gate:** Hipótese tem mecanismo e dados?

- **SIM:** siga para Fase 2.
- **NÃO:** refine ou descarte sem criar experimento.

## Fase 2: Smoke Test Causal

**Objetivo:** Testar barato se existe sinal mínimo.

### Antes de rodar: Encolher e Validar

**Versão Descartável:** Rode a versão mínima da ideia primeiro. Deixe a maioria morrer jovem. Se a ideia não sobrevive em sua forma mais simples, não sobreviverá complicada.

**Overfitar um Batch:** Antes de treinar em escala, overfitar um único batch. Trinta segundos e metade dos bugs desaparecem. (Karpathy) Encolha tudo até ficar barato, acerte, depois gaste o compute.

**Baseline até Doer:** Ajuste seus baselines antes de declarar vitória. O cemitério de ML está cheio de ganhos que evaporaram contra um baseline bem tunado. Um reviewer é a pior pessoa possível para aprender isso.

Escopo padrão:

1. `ETHUSDT`, `12h`, `h=1`.
2. Modelo linear simples.
3. Uma transformação principal da hipótese.
4. Comparação com Buy & Hold.
5. Resultado em `experiments/<nome>/results/report.md`.

Métricas mínimas (combo Sortino + Calmar + DSR desde 2026-06-18):

- Sortino net (primária — não penaliza upside).
- Calmar (gate de risco — retorno / max drawdown).
- DSR (gate de seleção — P(Sharpe ser real | N tentativas)).
- Sharpe net (legacy — referência para comparabilidade).
- Buy & Hold Sharpe.
- AUC ou IC, quando aplicável.
- Direcional Up/Dn.
- Drawdown.
- Exposição ou `%Long`, quando houver sinal discreto.

### Checklist Anti-Vazamento

Este checklist é obrigatório em todo smoke test:

- Feature na linha `t` não usa `t+1` ou qualquer dado futuro.
- Rolling/expanding usa apenas passado.
- `scaler`, neutralização e modelo são ajustados somente no treino.
- Target final preserva `NaN`; não converter `NaN` em classe negativa.
- Split temporal não usa shuffle.
- Evitar `np.gradient` central em features de trading; se usar, justificar causalidade.
- Custos são aplicados antes de declarar Sortino/Sharpe como tradeável.

**Gate de feature discovery:**

- AUC `>= 0.55` (0.53 é ruído em 495 features; 0.55 é ~2 sigma).
- Sortino gross `> 0.20` (se não tem sinal bruto, custos vão matar).
- Melhora informacional contra baseline em AUC/IC, quando houver baseline.
- Nenhum problema de causalidade encontrado.

Este gate mantém a feature viva como candidata informacional, não como estratégia pronta. AUC `0.55-0.58` pode ser relevante se for estável e combinável; AUC `>= 0.60` é extraordinário e deve ser tratado como achado forte, mas com auditoria anti-vazamento rigorosa.

**Gate de estratégia (combo Sortino + Calmar + DSR desde 2026-06-18):**

- Sortino net `> 0.30` (primária — não penaliza upside).
- Calmar `> 0.50` (retorno / max drawdown — gate de risco real).
- DSR `> 0.95` (P(Sharpe ser real dado N tentativas) — gate de seleção).
- Sortino net `> max(Buy & Hold, 0.30)` (deve superar BH E ser tradeável).
- Custos aplicados.
- Drawdown `< 40%` (crypto permite DD maiores; adaptável por tipo de sinal).
- Consistência: `>= 50%` folds positivos (edge deve ser estável, não sorte de 1 fold).
- Significância estatística: Sortino net significativamente `> 0` (p < 0.05).
- Sharpe net (legacy) reportado para comparabilidade mas não decide promoção.

**Decisão (automática via gates):**

- **🟢 CANDIDATO:** Todos os gates passaram. Considerar validação adicional antes de promoção.
- **🟡 KEEP_FEATURE:** Sinal informacional presente mas não atinge todos os gates de estratégia.
- **🔴 ARQUIVAR:** Nenhum gate passado. Não rodar variações infinitas.

> **Nota:** Os gates são aplicados automaticamente pelo `experiment_runner`. A decisão não é manual — é computada a partir dos thresholds configurados no TOML.

Permitido iterar uma vez antes de arquivar se houver motivo claro, por exemplo escala errada (`raw` vs `diff`) ou horizonte obviamente incompatível. Máximo: uma transformação ou um horizonte extra.

### Análise de Cauda e Falhas

Quando o resultado é negativo ou fraco, não pare na métrica agregada. Analise:

- **Casos de falha:** Pegue cem falhas, leia todas, organize em pilhas, ataque a maior pilha. (Andrew Ng)
- **Cauda estranha:** A cauda da distribuição de retornos/erros contém mais informação que o centróide.
- **Transcrições de comportamento estranho:** Uma única transcrição de comportamento genuinamente estranho te ensina mais que o próximo decimal de acurácia.
- **Dados crus:** A maioria dos bugs de ML mora nos dados, e eles falham silenciosamente. Nada crasha. Você simplesmente ganha um modelo medíocre e uma teoria errada sobre o motivo.

> Uma curva de loss descendente não é análise, é consolo.

### Escalada Não Linear Opcional

XGBoost/LightGBM pode ser usado como confirmação opcional, mas não como default.

Use apenas se uma destas condições for verdadeira:

- O probe linear foi fraco mas coerente: AUC `> 0.52`, Sortino net positivo, ou direção econômica consistente.
- A hipótese explicitamente depende de interação, threshold ou regime.

Regras:

- Use modelo raso e regularizado.
- Não fazer tuning amplo.
- Se LR falha completamente e XGBoost passa, classifique como candidato frágil.
- Edge que só existe em XGBoost exige confirmação extra antes de promoção: validação temporal, custo, e pelo menos `BTCUSDT` ou outro período.
- Use importance/permutation simples para verificar se o resultado não depende de uma feature vazada ou espúria.

## Fase 3: Confirmação Curta

**Objetivo:** Confirmar que o smoke não foi acidente sem virar validação pesada.

Escolha no máximo duas confirmações, conforme o caso:

| Confirmação | Usar quando |
|---|---|
| `BTCUSDT` | Verificar generalização mínima |
| `h=3` | Mecanismo pode operar em mais de um candle |
| Custos 2x | Sinal parece tradeável no custo base |
| Neutralização simples | A hipótese é feature incremental sobre baseline existente |
| XGBoost/LightGBM raso | Confirmar interação não linear já sugerida pelo smoke |

Não rodar todas por padrão.

**Gate de confirmação:**

- Para `KEEP_FEATURE`: AUC/IC segue coerente ou melhora baseline em pelo menos uma confirmação.
- Para `STRATEGY_CANDIDATE`: pelo menos uma confirmação mantém Sortino net `> 0.10` e não colapsa contra Buy & Hold.
- Nenhum novo problema de causalidade aparece.

**Decisão:**

- **KEEP_FEATURE:** registrar como feature candidata para ensemble/combinação futura, não como estratégia.
- **STRATEGY_CANDIDATE:** perguntar ao usuário se quer aprofundar/promover.
- **Falhou:** arquivar.

## Promoção Para `src/`

Promoção não faz parte automática deste workflow.

Só promova se o usuário pedir explicitamente. Antes de promover, aí sim rode validação proporcional:

- Multi-symbol mínimo.
- Custos realistas.
- OOS temporal independente, se disponível.
- Revisão anti-vazamento completa.
- Comparação com baseline informacional relevante.

Se aprovado, registre em `.agents/project/staging.md` antes de alterar `src/`.

## Artefatos de Saída

Cada ciclo deve produzir:

```text
experiments/<nome>/
  run.py
  results/report.md
```

O `report.md` deve conter:

- Hipótese.
- Setup.
- Expectativa (previsão antes de rodar: AUC/Sortino/Calmar/DSR/direção esperada).
- Checklist anti-vazamento resumido.
- Resultados.
- Crença Atualizada (o que mudou na sua convicção após o resultado; o que aprendeu com falhas/cauda).
- Decisão: arquivar, iterar, `KEEP_FEATURE`, `STRATEGY_CANDIDATE`, ou pedir promoção.

Opcional e recomendado: `research-log.md` — log completo com entradas datadas de hipótese/setup/expectativa/resultado/crença atualizada. Reler as entradas do mês passado é humilhante de um jeito que nenhum reviewer consegue igualar.

Atualize `.agents/project/MEMORY.md` apenas com fatos duráveis:

- Experimento arquivado por resultado claro.
- Candidato real.
- Bug metodológico relevante.
- Decisão do usuário sobre promoção/rejeição.

## Handoff Para Outras Skills

| Contexto | Skill |
|---|---|
| Bug, vazamento, resultado suspeito | `systematic-debugging` |
| Dúvida de métrica, backtest ou viés | `quant` |
| Antes de fechar mudança multi-arquivo | `verification-before-completion` |
