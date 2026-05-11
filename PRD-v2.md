# PRD — Stage 24: Governança Evolutiva do Harness

## Projeto

Evolução do harness `Code_IA_SotA` através da Stage 24: adicionar mecanismos de governança evolutiva para evitar inchaço do AGENTS.md, monolitos de referência e habilitar manutenção sistemática do harness através da operacionalização do skill-reviewer e harness-repair.

Este PRD assume que as Stages 1-23 estão completas.

---

# 1. Decisão sobre Specs

Specs separadas não são necessárias para esta stage.

Esta stage adiciona mecanismos de governança evolutiva. O trabalho pode ser rastreado diretamente em `TASK-v2.md`.

---

# 2. Visão

Adicionar mecanismos de governança evolutiva para evitar inchaço do AGENTS.md, monolitos de referência e habilitar manutenção sistemática do harness através de skill-reviewer e harness-repair operacionalizados.

A Stage 24 deve estabelecer:
- Governança em `.agents/skills/harness-repair/references/governance.md` (carregado apenas pela skill)
- Orçamento e diretrizes de divisão do AGENTS.md
- Regras de granularidade de referência
- Semântica de hierarquia de override
- Ciclo de vida expandido com estado experimental
- Workflow operacional de manutenção do harness

---

# 3. Declaração do Problema

O harness atual carece de mecanismos de governança evolutiva:

- AGENTS.md pode crescer sem limites, tornando-se obfuscado
- Pastas references/ podem se tornar monolitos ocultos
- skill-reviewer e harness-repair existem mas não estão operacionalizados
- Não há hierarquia clara de override entre AGENTS.md, skills, workflows
- Ciclo de vida carece de estado experimental para novas skills
- Não há métricas de observabilidade para ativação, sobreposição, eficiência de contexto

Sem governança evolutiva:
- Harness degrada ao longo do tempo através de inchaço de contexto
- Não há forma sistemática de detectar drift e sobreposição
- Resolução de conflitos entre camadas de política é obscura
- Difícil rastrear saúde de skills e padrões de uso

---

# 4. Objetivo

Adicionar mecanismos de governança evolutiva para manter a saúde do harness ao longo do tempo.

O objetivo é fornecer ferramentas sistemáticas para:
- Prevenir inchaço do AGENTS.md
- Prevenir monolitos de referência
- Operacionalizar manutenção do harness
- Definir hierarquia clara de override
- Expandir gerenciamento de ciclo de vida
- Adicionar métricas básicas de observabilidade

---

# 5. Escopo

## Dentro do Escopo

- Governança em `.agents/skills/harness-repair/references/governance.md` (carregado apenas pela skill)
- Orçamento do AGENTS.md (300-500 linhas máx) e diretrizes de divisão
- Regras de granularidade de referência (1 tópico por arquivo, tamanho máx)
- Definição de hierarquia de override (AGENTS.md > skill > workflow > subagent)
- Ciclo de vida expandido com estado experimental
- Workflow operacional de manutenção do harness
- Métricas básicas de observabilidade (frequência de ativação, sobreposição de skills)

## Fora do Escopo

- Deleção automatizada de skills
- Dashboards complexos de analytics de uso
- Workflows automatizados de arquivamento
- Observabilidade avançada (uso de tokens, eficiência de contexto)
- Rastreamento de dependências entre skills

---

# 6. Padrão de Implementação Requerido

- Governança em `.agents/skills/harness-repair/references/governance.md` (carregado apenas pela skill)
- Orçamento do AGENTS.md: 300-500 linhas máximo
- Granularidade de referência: 1 tópico por arquivo, máx 50-100 linhas
- Hierarquia de override documentada em governance.md e referenciada no AGENTS.md
- Estados de ciclo de vida: active, experimental, deprecated, archived
- Workflow de manutenção do harness operacionalizado
- Comandos CLI para verificações de governança

---

# 7. Restrições de Design

- Governança em `.agents/skills/harness-repair/references/governance.md` (carregado apenas quando skill for acionada)
- Decisões manuais de governança (sem deleção automatizada)
- Preservar skills e estrutura existentes
- Compatível com harness atual
- Validação e verificações baseadas em CLI
- Processo de manutenção orientado por workflows

---

# 8. Critérios de Aceite

A Stage 24 está completa quando:

- Governança criada em `.agents/skills/harness-repair/references/governance.md`
- Orçamento do AGENTS.md definido e documentado
- Regras de granularidade de referência definidas e aplicadas
- Hierarquia de override documentada em governance.md e referenciada no AGENTS.md
- Ciclo de vida expandido com estado experimental
- Workflow de manutenção do harness operacionalizado
- Comandos CLI para verificações de governança existem
- Documentação atualizada

---

# 9. Riscos

## R1 — Complexidade de Divisão do AGENTS.md

Risco: Dividir o AGENTS.md pode criar fragmentação ou limites obscuros.

Mitigação: Diretrizes claras de divisão; preservar política central no AGENTS.md; mover detalhes operacionais para skills/workflows.

## R2 — Overhead de Granularidade de Referência

Risco: Muitos arquivos de referência pequenos podem aumentar complexidade.

Mitigação: Balancear granularidade com usabilidade; definir limites claros de tópicos; permitir exceções com justificativa.

## R3 — Confusão de Hierarquia de Override

Risco: Hierarquia de override pode ser mal entendida ou mal aplicada.

Mitigação: Documentação clara com exemplos; verificações de validação; materiais de treinamento.

---

# 10. Plano de Execução

A execução é rastreada em `TASK-v2.md`.

Sequência de alto nível:

1. Criar governança em `.agents/skills/harness-repair/references/governance.md`
2. Definir orçamento e diretrizes de divisão do AGENTS.md
3. Definir regras de granularidade de referência
4. Documentar hierarquia de override em governance.md e referenciar no AGENTS.md
5. Expandir ciclo de vida com estado experimental
6. Operacionalizar workflow de manutenção do harness
7. Adicionar comandos CLI para verificações de governança
8. Atualizar documentação
9. Validar mecanismos de governança

---

# 11. Roadmap Futuro

Futuras stages podem construir sobre esta fundação:

- Observabilidade avançada (uso de tokens, eficiência de contexto)
- Detecção automatizada de drift
- Rastreamento de dependências entre skills
- Workflows automatizados de arquivamento
- Dashboards de analytics de uso

Cada stage futura deve receber sua própria atualização de PRD ou plano de tarefa separado antes da implementação.
