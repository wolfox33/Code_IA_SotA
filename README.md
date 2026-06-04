# Agent Harness

Harness canônico para organizar regras globais, contexto progressivo, skills, subagents e workflows em repositórios agent-ready.

## Objetivo

- Definir uma estrutura simples e previsível para desenvolvimento assistido por IA.
- Separar política global, contexto de projeto, capacidades técnicas e processos reutilizáveis.
- Reduzir custo de contexto com carregamento progressivo.
- Manter o harness descobrível por leitura do repositório, sem mirrors obrigatórios por plataforma.

## Estrutura canônica

```text
.
├── AGENTS.md
├── README.md
└── .agents/
    ├── USER.md
    ├── project/
    │   ├── context.md
    │   ├── context-design.md
    │   └── MEMORY.md
    ├── skills/
    │   └── <skill-name>/
    │       ├── SKILL.md
    │       └── references/
    │           └── <reference-file>.md
    ├── subagents/
    │   └── <subagent-name>.md
    └── workflows/
        └── <workflow-name>.md
```

## Responsabilidades por arquivo

- **`AGENTS.md`**: política global always-on do repositório. Não usa frontmatter.
- **`README.md`**: documentação do harness e guia de manutenção.
- **`.agents/USER.md`**: preferências cross-projeto do usuário, quando versionadas no harness.
- **`.agents/project/context.md`**: stack, arquitetura, constraints e convenções específicas do projeto.
- **`.agents/project/context-design.md`**: contexto de design system apenas para tarefas de UI/frontend.
- **`.agents/project/MEMORY.md`**: fatos emergentes, decisões e workarounds relevantes da sessão/projeto.
- **`.agents/skills/<skill-name>/SKILL.md`**: arquivo principal da skill com frontmatter parse-safe, objetivo, uso, não uso, output contracts e procedure executável.
- **`.agents/skills/<skill-name>/references/`**: conteúdo referencial denso (templates, guias detalhados, anti-patterns, checklists) movido para arquivos especializados por tópico.
- **`.agents/subagents/`**: personas por fase, como discovery, planning, implementation, review e deployment.
- **`.agents/workflows/`**: processos sequenciais reutilizáveis.

## Modelo de descoberta

O harness assume que agentes modernos conseguem descobrir a estrutura por leitura do repositório:

1. Ler `AGENTS.md` na raiz como política global.
2. Usar `.agents/project/` para contexto específico quando relevante.
3. Avaliar `name` e `description` de skills antes de carregar conteúdo completo.
4. Carregar conteúdo completo de `SKILL.md` apenas quando a skill for realmente necessária.
5. Carregar `references/` apenas quando conteúdo detalhado for necessário para a tarefa.
6. Carregar subagents e workflows apenas quando a tarefa justificar ou quando o usuário pedir.

Não há requisito de gerar `.devin/`, `.claude/`, `.opencode/` ou outros mirrors de compatibilidade.

## Skills

Uma skill vive em `.agents/skills/<skill-name>/SKILL.md`.

### Lifecycle management

Skills podem ter estados de lifecycle para rastrear manutenção e depreciação:

- **active**: skill em uso e manutenção ativa (padrão)
- **experimental**: skill em desenvolvimento, pode mudar, não recomendado para uso crítico
- **deprecated**: skill obsoleta, não deve ser usada em novos projetos
- **archived**: skill descontinuada, mantida apenas para referência

Metadata opcional em frontmatter:

```yaml
metadata:
  status: active  # ou experimental, deprecated, archived
  owner: "author-name"
  created: "2026-05-11"
  updated: "2026-05-11"
```

Para gerar relatório de lifecycle:

```bash
npm run skill:lifecycle
```

O relatório mostra distribuição de status e lista skills por estado.

### Densidade procedural

O CLI de validação calcula a densidade procedural como a proporção de linhas da seção Procedure em relação ao total do arquivo. O threshold padrão é 30%.

- Skills com densidade < 30% geram warnings
- Para aumentar densidade: expandir a seção Procedure com passos executáveis detalhados
- Conteúdo referencial denso (templates, guias detalhados, anti-patterns, checklists) deve ser movido para `references/`
- Cada arquivo em `references/` deve ser especializado por tópico (ex: pitfalls.md, output-contracts.md)

### Quando usar references/

Mova conteúdo para `references/` quando:

- Seções com links externos, listas longas (>5 itens) ou conteúdo denso sem code blocks
- Templates ou guias detalhados que não são parte do fluxo executável
- Anti-patterns e pitfalls que são referência, não parte do procedure
- Checklists ou padrões que são consultados, não executados sequencialmente

Mantenha em `SKILL.md`:

- Frontmatter parse-safe
- Objetivo, Use/Do not use
- Output contracts (resumo executável)
- Procedure (passos executáveis detalhados)
- Verification
- References (links para arquivos em references/)

### Contrato parse-safe

- O arquivo começa na primeira linha com `---`.
- O frontmatter fecha com outro `---` antes do corpo Markdown.
- `name` é kebab-case e igual ao nome da pasta.
- `description` sempre fica entre aspas duplas.
- `version`, `author` e `category` ficam entre aspas quando existirem.
- `tags` usa lista YAML multilinha.
- Não use `compatible_with`.
- Não use emoji, Markdown ou links dentro do frontmatter.
- Não deixe `: ` em valores YAML sem aspas.
- Evite separadores `---` no corpo da skill; use headings Markdown.

### Template recomendado

```markdown
<frontmatter-start: three hyphens>
name: skill-name
description: "Use quando a tarefa exigir X; esta skill orienta Y sem Z."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "workflow"
  complexity: 3
  tags:
    - example
    - skill
<frontmatter-end: three hyphens>

# SKILL: Skill Name

## Objetivo

O que esta skill resolve e por que existe.

## Use this skill when

- Situação concreta que justifica carregar esta skill.

## Do not use this skill when

- Caso parecido que não deve acionar esta skill.

## Output contracts

O que deve ser entregue ao aplicar esta skill.

## Procedure

Passos para executar a skill com sucesso.

## Verification

Como confirmar que a skill foi aplicada corretamente.

## References

Links para arquivos em `references/` com conteúdo referencial detalhado (opcional).
```

## Subagents

Subagents são personas especializadas por fase. Eles vivem em `.agents/subagents/` e devem ser curtos, operacionais e específicos.

Use subagents para separar responsabilidades como:

- **Discovery**: entendimento de requisitos e ambiguidades.
- **Planning**: arquitetura, contratos e decomposição.
- **Implementation**: construção dentro de escopo definido.
- **Review**: QA, segurança, performance e consistência.
- **Deployment**: infra, CI/CD, deploy e operação.

## Workflows

Workflows vivem em `.agents/workflows/` e descrevem sequência operacional. Eles devem ser usados para processos repetíveis, não para política global nem conhecimento técnico detalhado.

- Política global fica em `AGENTS.md`.
- Conhecimento técnico fica em `skills/`.
- Processo passo a passo fica em `workflows/`.

## Governança do Harness

Políticas de governança evolutiva para manter saúde estrutural do harness ao longo do tempo.

### Localização

Governança completa em `.agents/skills/harness-repair/references/governance.md` - carregado apenas durante manutenção/revisão do harness.

### Políticas principais

- **Orçamento do AGENTS.md**: máximo 300-500 linhas para manter política global concisa
- **Granularidade de referência**: 1 tópico por arquivo, máximo 50-100 linhas
- **Hierarquia de override**: AGENTS.md > skill > workflow > subagent
- **Ciclo de vida**: active, experimental, deprecated, archived
- **Workflow de manutenção**: harness-maintenance.md coordenada skill-creator, skill-reviewer, harness-repair

### Quando usar governança

A governança é carregada automaticamente quando:
- Skill `harness-repair` é acionada para diagnóstico estrutural
- Workflow `harness-maintenance` é usado para manutenção do harness
- Usuário pede revisão de arquitetura do harness

Usuários comuns não carregam governança no contexto padrão.

## Princípios de manutenção

- Simplicidade vence complexidade.
- `AGENTS.md` na raiz é a fonte global canônica (orçamento: 300-500 linhas).
- `.agents/` é a fonte modular canônica.
- O harness deve ser generalista, não acoplado a um projeto específico.
- Informações específicas de projeto ficam em `.agents/project/`.
- Skills devem ser parse-safe e descobertas por `name` + `description`.
- Conteúdo referencial denso deve ser movido para `references/` para manter densidade procedural > 30%.
- Evite duplicar regras entre arquivos.
- Remova documentação obsoleta quando uma decisão estrutural mudar.
- Valide densidade procedural com `npm run validate:harness` após mudanças em skills.

## Validação recomendada

Ao alterar skills, valide pelo menos:

- Todo `SKILL.md` começa e fecha frontmatter corretamente.
- `name` bate com o nome da pasta.
- `description` está entre aspas.
- Não há `compatible_with` em frontmatter.
- Não há separadores `---` no corpo.
- Não há caracteres de controle no frontmatter.
- Densidade procedural >= 30% (use `npm run validate:harness`).

### CLI de validação

O projeto usa o CLI `code-ia-sota-cli` para validação automática do harness:

- `npm run validate:harness` - valida todas as skills e workflows
- `npm run benchmark:density` - mostra densidade de todas as skills
- `npm run suggest:refactor` - sugere refatoração para skills com baixa densidade

O CLI valida frontmatter, metadata, seções obrigatórias e densidade procedural.

## CI Integration

O repositório usa GitHub Actions para validar automaticamente a estrutura do harness em PRs e pushes para main.

### Workflow

O workflow `.github/workflows/validate-harness.yml`:

- Roda em pull_request para main
- Roda em push para main
- Executa `npm run validate:harness` em `code-ia-sota-cli/`
- Falha o build se houver erros de validação (frontmatter, metadata, placeholders)
- Falha o build se houver warnings de densidade procedural (< 30%)

### Bypassar CI

Para bypassar CI em emergências:

- Use `[skip ci]` ou `[ci skip]` no commit message
- Force push com `--no-verify` (não recomendado para mudanças estruturais)

## Fora do escopo atual

- Mirrors obrigatórios para plataformas específicas.
- Scripts de materialização de compatibilidade.
- Regras específicas de um produto SaaS ou app consumidor.
