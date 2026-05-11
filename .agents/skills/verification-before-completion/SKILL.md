---
name: verification-before-completion
description: "Use antes de concluir tarefas significativas para revisar objetivo, diff, testes/checks executados e riscos residuais; nao exige validacao formal para tarefas triviais."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "workflow"
  complexity: 3
  status: active
  tags:
    - verification
    - checklist
    - review
    - handoff
---

# SKILL: Verification Before Completion

## Objetivo

Fechar tarefas com evidencia, nao apenas declaracao de que algo foi feito. Esta skill transforma a regra global de validar antes de concluir em um checklist operacional leve.

## Use this skill when

- A tarefa alterou codigo, contratos, arquitetura, skills, workflows ou configuracao relevante.
- Houve bugfix, feature, refactor ou mudanca multi-arquivo.
- Nem todos os testes puderam ser executados e o risco precisa ser declarado.

## Do not use this skill when

- A resposta for apenas explicativa.
- A tarefa for consulta simples sem alteracao.
- A mudanca for trivial e ja tiver verificacao obvia no proprio output.

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Objetivo comparado com o pedido
- Diff revisado
- Validacoes executadas
- Arquivos principais alterados informados
- Comandos executados informados
- Riscos residuais declarados

## Procedure

### 1. Compare com o pedido

- Releia o objetivo do usuário
- Confirme se a mudança ficou dentro do escopo
- Identifique qualquer pedido que não foi atendido
- Liste itens pendentes se houver escopo não coberto

### 2. Revise o diff

- Verifique arquivos alterados
- Procure alterações acidentais, escopo expandido e duplicação
- Confirme que não houve edição em memória/contexto quando o repo for boilerplate e o usuário pedir para evitar
- Revise imports removidos que ficaram unused após suas mudanças
- Verifique se suas mudanças criaram órfãos (variáveis, funções, imports)

### 3. Execute validações

- Rode testes/checks relacionados quando existirem
- Para docs/skills, rode buscas mecânicas por termos proibidos, links obsoletos ou duplicações
- Se uma validação não puder rodar, diga por que
- Execute comandos de build/lint quando aplicável
- Verifique se há erros de sintaxe ou runtime

### 4. Prepare o fechamento

- Informe arquivos principais alterados
- Informe comandos executados
- Declare riscos residuais
- Se houver commit/stage/push, confirme hash ou status
- Liste próximos passos se houver trabalho pendente
- Indique se a tarefa está completa ou requer ação adicional

## Verification

- Objetivo, diff e validações foram conferidos
- Riscos residuais estão claros
- O usuário consegue saber o estado final sem ver logs do terminal

> **Skill log**
> - [2026-04-25] Criada para fechamento verificável de tarefas significativas sem impor overhead a consultas simples
> - [2026-05-11] Stage 6 (Batch 8) adicionou seção Output contracts faltante
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/` com arquivos divididos por especialidade.

## References

Conteúdo referencial detalhado e pitfalls estão disponíveis em:
- `references/pitfalls.md` - Pitfalls
