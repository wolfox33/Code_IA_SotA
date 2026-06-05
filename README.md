# Agent Harness

Harness reutilizavel para tornar repositorios agent-ready com baixo custo de contexto, regras claras e capacidades carregadas sob demanda.

## Objetivo

- Manter `AGENTS.md` como entrypoint leve e sempre ativo.
- Separar politica global, contexto do projeto, skills, workflows e subagents.
- Favorecer descoberta progressiva: ler pouco primeiro, aprofundar apenas quando necessario.
- Permitir manutencao evolutiva sob demanda, sem automacao implicita ou refactors espontaneos.

## Estrutura

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
    ├── subagents/
    │   └── <subagent-name>.md
    └── workflows/
        └── <workflow-name>.md
```

## Responsabilidades

- `AGENTS.md`: politica global, loop padrao, roteamento de capacidades e referencias rapidas.
- `.agents/project/context.md`: cache vivo de fatos estruturais do projeto; vazio nao bloqueia trabalho.
- `.agents/project/context-design.md`: contexto de design system apenas para tarefas de UI/frontend.
- `.agents/project/MEMORY.md`: fatos emergentes, decisoes duraveis, workarounds e licoes do projeto consumidor.
- `.agents/skills/*/SKILL.md`: capacidades operacionais especializadas.
- `.agents/skills/*/references/`: conhecimento denso ou raro carregado apenas quando necessario.
- `.agents/workflows/`: processos sequenciais reutilizaveis.
- `.agents/subagents/`: perfis excepcionais para revisao independente, risco operacional, paralelismo util ou handoff claro.

## Modelo De Uso

1. Leia `AGENTS.md`.
2. Consulte `.agents/project/context.md` antes de assumir stack, comandos ou convenções.
3. Se `context.md` estiver vazio, trate como contexto ausente e derive fatos do repo.
4. Carregue skills/workflows apenas quando o gatilho for claro.
5. Carregue `references/` somente quando o detalhe for necessario.
6. Atualize `context.md` apenas com fatos estruturais verificados ou decisoes aprovadas.
7. Atualize `MEMORY.md` apenas com fatos duraveis que ajudam futuras sessoes do projeto.

## Skills

Uma skill deve ser procedimento operacional reutilizavel, nao tutorial longo nem prompt generico.

Uma boa skill contem:

- frontmatter parse-safe com `name` e `description`;
- objetivo claro;
- `Use this skill when`;
- `Do not use this skill when`;
- output contracts;
- procedure acionavel;
- verification;
- references opcionais para material denso.

Use `skill-creator` para criar ou modificar skills e `skill-reviewer` para diagnosticar readiness, escopo ou overlap de uma ou mais skills.

## Workflows

Workflows coordenam sequencias de trabalho. Eles nao substituem skills nem definem politica global.

Use workflows quando houver:

- fases claras;
- gates de aprovacao;
- clarificacao de escopo;
- artefatos encadeados;
- manutencao do harness.

Principais workflows:

- `spec-first-development.md`: transforma demanda vaga em escopo, criterios e contratos.
- `product-development.md`: conduz Discovery, PRD, Architecture, Roadmap e OpenSpec.
- `harness-maintenance.md`: coordena manutencao segura do harness.

## Subagents

Subagents nao fazem parte do caminho padrao. Use apenas quando houver ganho real de delegacao.

No harness atual, eles ficam reservados para:

- `reviewer`: revisao independente, seguranca, performance ou debugging complexo.
- `devops`: infra, CI/CD, deploy, rollback ou diagnostico operacional.

## Manutencao Evolutiva Sob Demanda

O harness evolui quando o usuario pede manutencao, ou quando uma tarefa revela problema estrutural relevante.

Fluxo recomendado:

1. Definir escopo da manutencao.
2. Diagnosticar antes de editar.
3. Separar achados locais de problemas estruturais.
4. Planejar mudancas pequenas e rastreaveis.
5. Executar apenas mudancas aprovadas.
6. Validar diff, referencias e riscos residuais.

Rotas:

- `skill-creator`: criar/modificar skills.
- `skill-reviewer`: revisar skills isoladas ou comparar overlap.
- `harness-repair`: diagnosticar drift estrutural, bloat, boundaries e governanca.
- `harness-maintenance.md`: orquestrar manutencao multi-artefato.

## Politica De Contexto

`context.md` e `MEMORY.md` sao templates no harness base.

Em um projeto real:

- `context.md` cresce com fatos estaveis verificados no repo ou decisoes aprovadas.
- `MEMORY.md` cresce com descobertas, decisoes e workarounds duraveis.
- Nenhum dos dois deve duplicar OpenSpec, PRD, roadmap ou documentacao longa.

## Fora Do Escopo

- Auto-refatoracao sem pedido ou aprovacao.
- Mirrors obrigatorios para ferramentas especificas.
- CLI ou CI obrigatorios para validar o harness.
- Metricas obrigatorias de densidade/lifecycle.
- Documentacao de produto consumidor dentro do harness base.
