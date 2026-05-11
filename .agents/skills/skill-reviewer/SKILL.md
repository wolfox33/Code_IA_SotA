---
name: skill-reviewer
description: "Revisar skills existentes do harness .agents/. Use quando o usuário pedir diagnóstico, auditoria, checklist de qualidade, priorização de melhorias ou validação de uma ou mais skills sem modificar automaticamente os arquivos."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "workflow"
  complexity: 4
  tags:
    - skills
    - review
    - quality
---

# Skill Reviewer

Skill para revisar skills existentes do harness `.agents/` usando o padrão canônico definido por `skill-creator`.

## Use this skill when

- Usuário pedir revisão, diagnóstico, auditoria ou checklist de uma skill existente.
- Usuário quiser saber se uma skill está parse-safe, clara, operacional e bem delimitada.
- Precisar comparar duas ou mais skills para detectar overlap ou responsabilidades duplicadas.
- Precisar gerar plano de melhoria antes de editar uma skill.
- Precisar validar se uma skill está pronta para uso ou precisa de ajustes.

## Do not use this skill when

- Usuário pedir para criar uma skill nova do zero.
- Usuário pedir para modificar uma skill diretamente sem etapa de diagnóstico.
- A tarefa for auditoria ampla do harness inteiro, incluindo `AGENTS.md`, workflows e subagents.
- A tarefa exigir scripts determinísticos de validação.
- A tarefa for apenas aplicar uma skill existente em um problema de produto.

## Review dimensions

Revise cada skill nestas dimensões:

- **Frontmatter**: delimitadores `---`, `name`, `description`, metadata útil e YAML simples.
- **Activation**: `description` e casos de uso indicam quando carregar a skill.
- **Non-use**: a skill evita acionamento em tarefas parecidas, mas fora de escopo.
- **Scope**: responsabilidade é estreita, operacional e não duplica outras skills.
- **Output contracts**: entregas esperadas são explícitas quando aplicável.
- **Procedure**: passos são executáveis, ordenados e rastreáveis.
- **Modularity**: conteúdo pertence ao artefato correto (`SKILL.md`, `references/`, `scripts/`, workflow, subagent ou `AGENTS.md`).
- **Pitfalls**: riscos e anti-patterns relevantes estão nomeados.
- **Verification**: há checklist objetivo para confirmar uso correto.
- **Context efficiency**: não há bloat, exemplos excessivos ou política global duplicada.

## Severity levels

Classifique cada achado:

- **Blocker**: quebra parsing, discovery ou uso seguro da skill.
- **High**: causa ativação errada, responsabilidade duplicada ou orientação insegura.
- **Medium**: reduz manutenção, clareza ou verificabilidade.
- **Low**: problema local de redação, estilo ou detalhe menor.

## Output contracts

### Single skill review

Entregue quando:

- skill alvo foi lida antes da análise
- escopo revisado está explícito
- achados estão classificados por severidade
- evidências apontam para trechos concretos da skill
- recomendações são pequenas e rastreáveis
- status final está claro

### Multi-skill comparison

Entregue quando:

- skills comparadas estão listadas
- overlaps de responsabilidade estão identificados
- diferenças de ativação estão claras
- recomendações preservam boundaries entre skills

### Improvement plan

Entregue quando:

- problemas estão priorizados
- mudanças fora de escopo estão separadas
- ordem de execução está clara
- critérios de aceite estão definidos

### Readiness check

Entregue quando:

- resultado for `Ready`, `Ready with notes` ou `Not ready`
- blockers e highs estiverem explicitamente listados
- próximos passos estiverem claros

## Procedure

### 1. Ler o alvo antes de revisar

- Leia o `SKILL.md` completo da skill alvo.
- Se houver `references/`, `scripts/` ou `assets/`, leia apenas o que for necessário para entender o contrato da skill.
- Identifique se o pedido é revisão, comparação, plano de melhoria ou readiness check.

### 2. Verificar frontmatter e parse safety

- Confirme que o arquivo começa e termina frontmatter com `---`.
- Confirme `name` em kebab-case.
- Confirme `description` entre aspas com gatilho e função.
- Verifique se `metadata` é simples, útil e não contém markdown.
- Marque como **Blocker** qualquer problema que possa quebrar parsing ou discovery.

### 3. Revisar ativação e escopo

- Verifique se `Use this skill when` tem situações concretas.
- Verifique se `Do not use this skill when` evita over-triggering.
- Compare mentalmente com skills vizinhas quando houver risco claro de overlap.
- Marque como **High** duplicação de responsabilidade ou ativação ambígua que possa acionar a skill errada.

### 4. Revisar operacionalidade

- Avalie se o procedimento orienta ação, não apenas conceito.
- Verifique se outputs esperados estão explícitos quando a skill produz entregáveis.
- Verifique se pitfalls cobrem riscos reais do domínio.
- Verifique se a seção `Verification` permite confirmar conclusão.

### 5. Revisar modularidade e bloat

- Identifique conteúdo que deveria estar em `AGENTS.md`, workflow, subagent, `references/` ou `scripts/`.
- Diferencie problema real de preferência estética.
- Evite recomendar arquivos extras se a skill principal continua clara e curta.

### 6. Produzir relatório

Use este formato:

```markdown
# Skill Review: <skill-name>

## Verdict

Ready | Ready with notes | Not ready

## Scope reviewed

- [arquivo(s) revisado(s)]

## Findings

### Blocker

- **[título]**: evidência + impacto + recomendação

### High

- **[título]**: evidência + impacto + recomendação

### Medium

- **[título]**: evidência + impacto + recomendação

### Low

- **[título]**: evidência + impacto + recomendação

## Recommended changes

1. [mudança pequena e rastreável]
2. [mudança pequena e rastreável]

## Out of scope

- [pontos percebidos mas não pertencentes à revisão]

## Final readiness

- [status final e condição para avançar]
```

Omitir seções de severidade vazias quando isso tornar o relatório mais claro.

### 7. Separar diagnóstico de reparo

- Não edite a skill revisada durante a revisão, a menos que o usuário peça explicitamente.
- Se o usuário pedir correção, proponha ou execute apenas as mudanças diretamente ligadas aos achados.
- Não transforme a revisão de uma skill em auditoria global do harness.

## Anti-patterns

- **Revisão sem evidência**: Opinião sem trecho ou impacto concreto.
- **Reescrita desnecessária**: Recomendar refatoração total quando correção pequena basta.
- **Severidade inflada**: Marcar estilo como blocker enfraquece a revisão.
- **Misturar reparo com diagnóstico**: Editar antes de o usuário aprovar correções.
- **Ignorar boundaries**: Recomendar que uma skill assuma função de workflow, subagent ou `AGENTS.md`.
- **Checklist genérico**: Produzir relatório que não ajuda a priorizar ação.

## Verification

- Skill alvo foi lida antes do relatório.
- Frontmatter e parse safety foram avaliados.
- Activation e non-use foram avaliados.
- Scope e overlap foram avaliados quando relevante.
- Output contracts e procedure foram avaliados.
- Modularity, pitfalls e verification foram avaliados.
- Achados têm severidade, evidência, impacto e recomendação.
- Diagnóstico foi separado de reparo.

> **Skill log**
> - [2026-05-11] Skill criada como Stage 2 do PRD de manutenção do harness, baseada no padrão canônico de `skill-creator`.
