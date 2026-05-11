# Harness Repair — Report Template

Conteúdo referencial de template de relatório para harness-repair.

## Report Template

Use este formato:

```markdown
# Harness Repair Report

## Scope reviewed

- [artefatos analisados]

## Summary verdict

Healthy | Needs targeted repair | Needs staged repair | Blocked

## Findings

### Topology

- **[severity/Px] [título]**: evidência + impacto + recomendação

### Boundaries

- **[severity/Px] [título]**: evidência + impacto + recomendação

### Duplication

- **[severity/Px] [título]**: evidência + impacto + recomendação

### Context bloat

- **[severity/Px] [título]**: evidência + impacto + recomendação

### Validation readiness

- **[severity/Px] [título]**: evidência + impacto + recomendação

## Recommended repair plan

1. [etapa pequena] → verificar: [critério]
2. [etapa pequena] → verificar: [critério]
3. [etapa pequena] → verificar: [critério]

## Out of scope

- [pontos percebidos mas não analisados]

## Final readiness

- [estado atual e condição para avançar]
```

Omitir categorias vazias quando isso melhorar a clareza.
