---
name: harness-repair
description: "Diagnosticar problemas estruturais do harness .agents/. Use quando o usuário pedir análise de arquitetura do harness, detecção de drift, overlap entre skills/workflows/subagents, context bloat ou plano de reparo sem modificar arquivos automaticamente."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "workflow"
  complexity: 5
  status: active
  tags:
    - harness
    - repair
    - architecture
---

# Harness Repair

Skill para diagnosticar problemas estruturais do harness `.agents/` e produzir planos de reparo seguros, sem modificar arquivos automaticamente.

## Objetivo

Detectar drift, overlap, context bloat e problemas estruturais do harness, produzindo diagnóstico e plano de reparo seguro antes de qualquer mutação.

## Use this skill when

- Usuário pedir análise estrutural do harness `.agents/`.
- Usuário quiser detectar drift arquitetural, context bloat ou responsabilidades duplicadas.
- Precisar avaliar boundaries entre `AGENTS.md`, skills, workflows, subagents, references e scripts.
- Precisar transformar múltiplos achados de skill review em um plano de reparo coordenado.
- Precisar priorizar reparos antes de criar scripts, workflows ou refactors multi-arquivo.

## Do not use this skill when

- Usuário pedir revisão de uma única skill sem impacto estrutural amplo.
- Usuário pedir criação ou melhoria direta de uma skill específica.
- Usuário pedir execução de um workflow já definido.
- A tarefa exigir validação determinística por script ainda não existente.
- A intenção for modificar arquivos imediatamente sem etapa de diagnóstico e plano.

## Diagnostic dimensions

Revise o harness nestas dimensões:

- **Topology**: pastas e artefatos existem nos lugares esperados.
- **Boundaries**: responsabilidades estão no artefato correto.
- **Duplication**: políticas, procedimentos ou responsabilidades aparecem em múltiplos lugares.
- **Context bloat**: arquivos carregáveis estão maiores ou mais densos do que precisam.
- **Routing clarity**: descriptions e boundaries reduzem acionamento ambíguo.
- **Progressive disclosure**: conteúdo opcional fica em `references/` quando necessário.
- **AGENTS.md entrypoint health**: o arquivo raiz continua leve, roteador e sem procedimentos especializados embutidos.
- **Validation readiness**: há regras estáveis o bastante para virar script futuro.
- **Repair safety**: correções podem ser feitas em etapas pequenas e reversíveis.

## Severity and priority

Classifique achados por severidade:

- **Blocker**: quebra discovery, parsing ou uso seguro do harness.
- **High**: cria duplicação grande, roteamento errado ou caminho de manutenção inseguro.
- **Medium**: aumenta custo de contexto, ambiguidade ou carga de manutenção.
- **Low**: melhoria local de clareza, nome ou organização.

Classifique prioridades:

- **P0**: corrigir antes de avançar.
- **P1**: corrigir no ciclo atual de manutenção.
- **P2**: manter em backlog.

## Output contracts

### Harness repair report

Entregue quando:

- escopo analisado estiver explícito
- achados estiverem agrupados por dimensão
- severidade e prioridade estiverem atribuídas
- evidências apontarem para arquivos ou responsabilidades concretas
- reparos forem propostos em etapas pequenas

### Boundary diagnosis

Entregue quando:

- artefatos envolvidos estiverem listados
- responsabilidades atuais estiverem descritas
- responsabilidades corretas forem propostas
- riscos de migração estiverem identificados

### Migration plan

Entregue quando:

- ordem de execução estiver clara
- cada etapa tiver critério de sucesso
- mudanças reversíveis forem preferidas
- validação pós-migração estiver definida

### Priority fix list

Entregue quando:

- achados estiverem priorizados em P0/P1/P2
- P0/P1 tiverem ação recomendada
- P2 estiver claramente diferido

## Procedure

### 1. Definir escopo do diagnóstico

- Identifique quais artefatos devem ser analisados
- Se o pedido for amplo, proponha um escopo inicial menor antes de ler tudo
- Evite carregar arquivos desnecessários
- Declare o que ficou fora da análise

### 2. Ler apenas os artefatos necessários

- Leia `AGENTS.md` apenas quando política global ou boundary global estiverem em questão
- Leia skills quando houver suspeita de overlap, bloat ou routing ambíguo
- Leia workflows quando houver orquestração multi-etapa em discussão
- Leia subagents quando houver delegação por papel em discussão
- Leia references/scripts apenas quando eles forem citados ou parecerem mal posicionados

### 2.1. Diretrizes específicas para AGENTS.md

O `AGENTS.md` é o arquivo raiz de política global com impacto transversal. Ao analisá-lo:

- **Apenas leia** quando houver suspeita de problema em política global, boundaries ou diretrizes de carregamento
- **Não proponha mudanças** no `AGENTS.md` sem aprovação explícita do usuário
- **Se detectar problema** (ex: política duplicada, boundary incorreto, diretriz obsoleta), documente no relatório com severidade apropriada
- **Se o usuário aprovar mudança** no `AGENTS.md`, execute apenas a edição aprovada e rastreável
- **Sempre valide** que mudanças no `AGENTS.md` não quebram discovery, parsing ou uso seguro do harness

### 3. Mapear responsabilidades

- Liste cada artefato analisado e sua responsabilidade aparente
- Identifique responsabilidades duplicadas ou órfãs
- Separe problema local de skill de problema estrutural do harness
- Use `skill-reviewer` como baseline para problemas de uma skill isolada
- Use `skill-creator` quando o plano aprovado exigir criação ou modificação de skills

### 4. Detectar problemas estruturais

Procure:

- política global duplicada fora de `AGENTS.md`
- `AGENTS.md` funcionando como manual longo em vez de entrypoint leve
- procedimentos de skills, workflows ou subagents embutidos no `AGENTS.md`
- skill com responsabilidade de workflow
- skill com papel de subagent
- workflow com política global excessiva
- references usadas para esconder escopo confuso
- scripts propostos antes das regras estabilizarem
- múltiplas skills competindo pelo mesmo gatilho
- conteúdo denso carregado sempre sem necessidade

### 5. Priorizar reparos

- Classifique severidade e prioridade
- Priorize reparos que reduzem risco ou desbloqueiam manutenção futura
- Evite recomendações cosméticas em P0/P1
- Agrupe mudanças relacionadas sem criar refactor grande demais

### 6. Produzir relatório

Produza relatório seguindo o template em `references/report-template.md`. Omitir categorias vazias quando isso melhorar a clareza.

### 7. Separar diagnóstico, plano e reparo

- Não modifique arquivos durante o diagnóstico, a menos que o usuário peça explicitamente
- Se o usuário pedir reparo, execute apenas etapas aprovadas e rastreáveis
- Depois de cada reparo, valide o critério da etapa antes de avançar
- Não transforme a skill em workflow de manutenção completo

## Verification

- Escopo analisado está explícito
- Artefatos lidos foram necessários para o diagnóstico
- Boundaries entre `AGENTS.md`, skills, workflows, subagents, references e scripts foram considerados
- Achados têm severidade, prioridade, evidência, impacto e recomendação
- Plano de reparo usa etapas pequenas com critérios de verificação
- Diagnóstico, planejamento e mutação estão separados
- Futuras etapas como scripts ou workflows foram diferidas quando não eram necessárias

> **Skill log**
> - [2026-05-11] Skill criada como Stage 3 do PRD de manutenção do harness, após `skill-creator` e `skill-reviewer`.
> - [2026-05-11] Stage 6 adicionou objetivo explícito para alinhar a validação estrutural do harness.
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/` com arquivos divididos por especialidade.

## References

Conteúdo referencial detalhado, dimensions, output contracts e anti-patterns estão disponíveis em:
- `references/dimensions.md` - Diagnostic dimensions e severity/priority
- `references/output-contracts.md` - Output contracts (report, boundary diagnosis, migration plan, priority fix list)
- `references/anti-patterns.md` - Anti-patterns
- `references/report-template.md` - Template de relatório de reparo
- `references/governance.md` - Políticas de governança evolutiva do harness
