# Machine Learning — Output Contracts

Conteúdo referencial de output contracts para ml.

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
