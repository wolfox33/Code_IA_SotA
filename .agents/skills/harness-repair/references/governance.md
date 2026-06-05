# Harness Governance

Políticas de governança evolutiva do harness `.agents/` para manter saúde estrutural ao longo do tempo.

Este arquivo é carregado apenas quando a skill `harness-repair` é acionada para diagnóstico ou reparo do harness.

---

## AGENTS.md Entry Point Standard

O `AGENTS.md` deve funcionar como entrypoint leve do harness: política global, fluxo padrão, roteamento de capacidades e mapa de contexto. Ele não deve tentar conter o harness inteiro.

### Orçamento

- **Ideal**: 120-220 linhas.
- **Máximo excepcional**: 300 linhas, apenas com justificativa clara.
- Se passar do ideal, procurar primeiro por conteúdo operacional que deveria estar em skills, workflows, subagents ou `.agents/project/`.

### Deve permanecer no AGENTS.md

- Objetivo, papel e estilo global do agente.
- Princípios de engenharia sempre ativos.
- Loop padrão de execução.
- Roteamento curto para skills, workflows e subagents.
- Estratégia de contexto e leitura progressiva.
- Regras de mudança cirúrgica.
- Non-negotiables de segurança, escopo e qualidade.
- Referências rápidas para `.agents/`.

### Não deve permanecer no AGENTS.md

- Procedimentos longos de skills ou workflows.
- Governança completa do harness.
- Detalhes de subagents por fase.
- Specs, contratos, roadmap ou decisões de produto.
- Tutoriais, exemplos extensos ou documentação de ferramenta.
- Regras condicionais raras que só importam para uma classe específica de tarefa.
- Checklists detalhados que pertencem a `verification-before-completion` ou workflows.

### Diretrizes de Divisão

- Política global central permanece no `AGENTS.md`.
- Detalhes operacionais específicos vivem em skills/workflows.
- Conhecimento denso ou raro vive em `references/`.
- Contexto específico do projeto vive em `.agents/project/context.md`.
- Decisões duráveis e workarounds vivem em `.agents/project/MEMORY.md`.
- Quando o `AGENTS.md` crescer, mover conteúdo para o artefato responsável em vez de aumentar o orçamento.

---

## Granularidade de Referência

Arquivos em `references/` devem seguir regras de granularidade para evitar monolitos ocultos.

### Regras

- **1 tópico por arquivo**: cada arquivo deve abordar um único tema
- **Tamanho máximo**: 50-100 linhas por arquivo de referência
- **Exceções**: permitidas com justificativa explícita quando tópico for complexo
- **Naming**: nomes descritivos que indiquem claramente o conteúdo

### Exemplos Aceitáveis

- `dimensions.md` - diagnostic dimensions
- `output-contracts.md` - output contracts específicos
- `anti-patterns.md` - lista de anti-patterns

### Exemplos a Evitar

- `everything.md` - arquivo monolítico com múltiplos tópicos
- `misc.md` - conteúdo miscelâneo sem tema claro

---

## Hierarquia de Override

Semântica de precedência quando políticas conflitam entre camadas do harness.

### Ordem de Precedência (maior para menor)

1. **AGENTS.md** - política global, sempre prevalece
2. **Skill** - políticas específicas da skill
3. **Workflow** - políticas de orquestração
4. **Subagent** - políticas de delegação por papel

### Regras de Resolução

- Conflito entre camadas: camada superior prevalece
- Políticas globais do `AGENTS.md` não podem ser sobrescritas
- Skills podem adicionar detalhes operacionais, não contradizer política global
- Workflows coordenam, não definem política transversal
- Subagents seguem políticas das camadas superiores

### Exemplos

- `AGENTS.md` define "não expor segredos" → skill não pode adicionar exceção
- Skill define processo específico de TDD → workflow deve seguir, não redefinir
- Workflow define ordem de etapas → subagent não pode alterar

---

## Ciclo de Vida Expandido

Estados de ciclo de vida para skills, workflows e subagents.

### Estados

- **active** - artefato estável, pronto para uso em produção
- **experimental** - artefato em desenvolvimento, pode mudar, não recomendado para uso crítico
- **deprecated** - artefato obsoleto, não deve ser usado novo, mantido por compatibilidade
- **archived** - artefato removido de uso, mantido apenas para histórico

### Transições

- experimental → active: após validação e estabilização
- active → deprecated: quando substituído por versão melhor
- deprecated → archived: após período de transição
- experimental → archived: se abandonado

### Frontmatter Metadata

Skills devem incluir estado no frontmatter:

```yaml
---
name: skill-name
description: "..."
metadata:
  status: active | experimental | deprecated | archived
  version: "1.0.0"
---
```

---

## Workflow Operacional de Manutenção

O workflow `harness-maintenance.md` é o ponto de entrada para manutenção do harness.

### Roteamento

- **skill-creator**: criar/modificar skills
- **skill-reviewer**: revisar skills isoladas
- **harness-repair**: diagnóstico estrutural multi-artefato

### Processo

1. Definir escopo
2. Escolher rota
3. Diagnosticar antes de editar
4. Planejar reparo
5. Executar mudanças aprovadas
6. Validar e registrar

---

## Métricas de Observabilidade

Métricas básicas para monitorar saúde do harness.

### Métricas Atuais

- **Frequência de ativação**: quantas vezes cada skill/workflow é carregada
- **Sobreposição de skills**: skills competindo pelos mesmos gatilhos
- **Tamanho de arquivos**: tracking de arquivos que crescem além de limites

### Coleta

- Manual durante revisões do harness
- CLI commands para verificações pontuais
- Registrado em `.agents/project/MEMORY.md` quando relevante

---

## Comandos CLI para Verificações

Comandos para validar governança do harness.

### Verificações Disponíveis

```bash
# Verificar orçamento do AGENTS.md
npx @custom-stack/harness-cli check-agents-budget

# Verificar granularidade de referência
npx @custom-stack/harness-cli check-reference-granularity

# Verificar hierarquia de override
npx @custom-stack/harness-cli check-override-hierarchy

# Verificar ciclo de vida
npx @custom-stack/harness-cli check-lifecycle-status

# Verificação completa de governança
npx @custom-stack/harness-cli check-governance
```

---

## Anti-patterns de Governança

### A Evitar

- **Política global em skill**: regras transversais devem ficar no `AGENTS.md`
- **Monolitos de referência**: arquivos `references/` com múltiplos tópicos
- **Override implícito**: conflitos sem precedência clara
- **Estado omitido**: skills sem status de ciclo de vida no frontmatter
- **Governança duplicada**: mesmas regras em múltiplos lugares

### Quando Detectar

- Durante diagnóstico com `harness-repair`
- Durante revisão com `skill-reviewer`
- Durante manutenção com `harness-maintenance`

---

## Referências

- PRD Stage 24: Governança Evolutiva do Harness
- AGENTS.md: política global do harness
- harness-maintenance.md: workflow de manutenção
