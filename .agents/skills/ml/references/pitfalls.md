# Machine Learning — Pitfalls

Conteúdo referencial de pitfalls para ml.

## Pitfalls

- **Leakage temporal**: Usar informação que não existiria no momento da predição invalida a validação
- **Métrica desalinhada**: Otimizar métrica técnica que não reflete custo real gera modelo inútil
- **Baseline ausente**: Sem baseline, não há evidência de ganho
- **Split incorreto**: Split aleatório pode inflar resultado em séries temporais, usuários repetidos ou grupos correlacionados
- **Deploy sem monitoramento**: Modelo em produção degrada silenciosamente sem drift e qualidade monitorados
