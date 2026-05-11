---
name: skill-reviewer
description: "Revisar skills existentes do harness .agents/. Use quando o usuário pedir diagnóstico, auditoria, checklist de qualidade, priorização de melhorias ou validação de uma ou mais skills sem modificar automaticamente os arquivos."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "workflow"
  complexity: 4
  status: active
  tags:
    - skills
    - review
    - quality
---

# Skill Reviewer

Skill para revisar skills existentes do harness `.agents/` usando o padrão canônico definido por `skill-creator`.

## Objetivo

Avaliar uma ou mais skills quanto a parse safety, ativação, boundaries, contratos de saída, procedimento, modularidade e prontidão para uso, mantendo diagnóstico separado de reparo.

## Use this skill when

- Usuário pedir revisão, diagnóstico, auditoria ou checklist de uma skill existente
- Usuário quiser saber se uma skill está parse-safe, clara, operacional e bem delimitada
- Precisar comparar duas ou mais skills para detectar overlap ou responsabilidades duplicadas
- Precisar gerar plano de melhoria antes de editar uma skill
- Precisar validar se uma skill está pronta para uso ou precisa de ajustes

## Do not use this skill when

- Usuário pedir para criar uma skill nova do zero
- Usuário pedir para modificar uma skill diretamente sem etapa de diagnóstico
- A tarefa for auditoria ampla do harness inteiro, incluindo `AGENTS.md`, workflows e subagents
- A tarefa exigir scripts determinísticos de validação
- A tarefa for apenas aplicar uma skill existente em um problema de produto
- A tarefa envolver diagnóstico multi-artefato ou reparo estrutural do harness; use `harness-repair`

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Relatório de revisão com achados classificados por severidade
- Evidências apontando para trechos concretos da skill
- Recomendações pequenas e rastreáveis
- Status final (Ready, Ready with notes, Not ready)
- Diagnóstico separado de reparo

## Procedure

### 1. Ler o alvo antes de revisar

- Leia o `SKILL.md` completo da skill alvo
- Se houver `references/`, `scripts/` ou `assets/`, leia apenas o que for necessário para entender o contrato da skill
- Identifique se o pedido é revisão, comparação, plano de melhoria ou readiness check

### 2. Verificar frontmatter e parse safety

- Confirme que o arquivo começa e termina frontmatter com `---`
- Confirme `name` em kebab-case
- Confirme `description` entre aspas com gatilho e função
- Verifique se `metadata` é simples, útil e não contém markdown
- Marque como **Blocker** qualquer problema que possa quebrar parsing ou discovery

### 3. Revisar ativação e escopo

- Verifique se `Use this skill when` tem situações concretas
- Verifique se `Do not use this skill when` evita over-triggering
- Compare mentalmente com skills vizinhas quando houver risco claro de overlap
- Marque como **High** duplicação de responsabilidade ou ativação ambígua que possa acionar a skill errada

### 4. Revisar operacionalidade

- Avalie se o procedimento orienta ação, não apenas conceito
- Verifique se outputs esperados estão explícitos quando a skill produz entregáveis
- Verifique se pitfalls cobrem riscos reais do domínio
- Verifique se a seção `Verification` permite confirmar conclusão

### 5. Revisar modularidade e bloat

- Identifique conteúdo que deveria estar em `AGENTS.md`, workflow, subagent, `references/` ou `scripts/`
- Diferencie problema real de preferência estética
- Evite recomendar arquivos extras se a skill principal continua clara e curta

### 6. Produzir relatório

Produza relatório seguindo o template em `references/report-template.md`. Omitir seções de severidade vazias quando isso tornar o relatório mais claro.

### 7. Separar diagnóstico de reparo

- Não edite a skill revisada durante a revisão, a menos que o usuário peça explicitamente
- Se o usuário pedir correção, proponha ou execute apenas as mudanças diretamente ligadas aos achados
- Não transforme a revisão de uma skill em auditoria global do harness

## Verification

- Skill alvo foi lida antes do relatório
- Frontmatter e parse safety foram avaliados
- Activation e non-use foram avaliados
- Scope e overlap foram avaliados quando relevante
- Output contracts e procedure foram avaliados
- Modularity, pitfalls e verification foram avaliados
- Achados têm severidade, evidência, impacto e recomendação
- Diagnóstico foi separado de reparo

> **Skill log**
> - [2026-05-11] Skill criada como Stage 2 do PRD de manutenção do harness, baseada no padrão canônico de `skill-creator`.
> - [2026-05-11] Stage 6 adicionou objetivo explícito para alinhar a validação estrutural do harness.
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/` com arquivos divididos por especialidade.

## References

Conteúdo referencial detalhado, dimensions, output contracts e anti-patterns estão disponíveis em:
- `references/dimensions.md` - Review dimensions e severity levels
- `references/output-contracts.md` - Output contracts (single skill, multi-skill, improvement plan, readiness check)
- `references/anti-patterns.md` - Anti-patterns
- `references/report-template.md` - Template de relatório de revisão
