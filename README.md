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
    │       └── SKILL.md
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
- **`.agents/skills/`**: capacidades técnicas carregadas sob demanda.
- **`.agents/subagents/`**: personas por fase, como discovery, planning, implementation, review e deployment.
- **`.agents/workflows/`**: processos sequenciais reutilizáveis.

## Modelo de descoberta

O harness assume que agentes modernos conseguem descobrir a estrutura por leitura do repositório:

1. Ler `AGENTS.md` na raiz como política global.
2. Usar `.agents/project/` para contexto específico quando relevante.
3. Avaliar `name` e `description` de skills antes de carregar conteúdo completo.
4. Carregar subagents e workflows apenas quando a tarefa justificar ou quando o usuário pedir.

Não há requisito de gerar `.windsurf/`, `.claude/`, `.opencode/` ou outros mirrors de compatibilidade.

## Skills

Uma skill vive em `.agents/skills/<skill-name>/SKILL.md`.

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

## Procedure

Passos para executar a skill com sucesso.

## Pitfalls

- Armadilha conhecida e como evitar.

## Verification

Como confirmar que a skill foi aplicada corretamente.
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

## Princípios de manutenção

- Simplicidade vence complexidade.
- `AGENTS.md` na raiz é a fonte global canônica.
- `.agents/` é a fonte modular canônica.
- O harness deve ser generalista, não acoplado a um projeto específico.
- Informações específicas de projeto ficam em `.agents/project/`.
- Skills devem ser parse-safe e descobertas por `name` + `description`.
- Evite duplicar regras entre arquivos.
- Remova documentação obsoleta quando uma decisão estrutural mudar.

## Validação recomendada

Ao alterar skills, valide pelo menos:

- Todo `SKILL.md` começa e fecha frontmatter corretamente.
- `name` bate com o nome da pasta.
- `description` está entre aspas.
- Não há `compatible_with` em frontmatter.
- Não há separadores `---` no corpo.
- Não há caracteres de controle no frontmatter.

## CI Integration

O repositório usa GitHub Actions para validar automaticamente a estrutura do harness em PRs e pushes para main.

### Workflow

O workflow `.github/workflows/validate-harness.yml`:

- Roda em pull_request para main
- Roda em push para main
- Executa `npm run validate:harness` em `code-ia-sota-cli/`
- Falha o build se houver erros de validação (frontmatter, metadata, placeholders)
- Permite warnings (seções operacionais faltantes em skills antigas)

### Bypassar CI

Para bypassar CI em emergências:

- Use `[skip ci]` ou `[ci skip]` no commit message
- Force push com `--no-verify` (não recomendado para mudanças estruturais)

## Fora do escopo atual

- Mirrors obrigatórios para plataformas específicas.
- Scripts de materialização de compatibilidade.
- Regras específicas de um produto SaaS ou app consumidor.
