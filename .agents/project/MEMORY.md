# Project Memory

> Arquivo mantido pelo agente. Registre fatos emergentes da execução do projeto.
> Não duplique o que está em `context.md` (estrutural) ou na OpenSpec (contratos/escopo).
> **Limite: ~2.000 caracteres.** Quando cheio, consolide ou remova entradas obsoletas antes de adicionar novas.
> Formato obrigatório: `- [YYYY-MM-DD] entrada curta e objetiva`

## Workarounds & Descobertas

- [2026-05-11] Benchmark de densidade identificou bloat em skills com conteúdo referencial no corpo; `references/` deve receber guias longos, exemplos e detalhes de ferramenta.

## Decisões Tomadas

- [2026-05-05] Criada `backend-resilience-by-design` para aplicar resiliência backend durante implementação e validação.
- [2026-05-11] Manutenção do harness separada em `skill-creator` (criação/modificação), `skill-reviewer` (diagnóstico) e `harness-repair` (diagnóstico estrutural multi-artefato); `harness-maintenance.md` orquestra essas rotas.
- [2026-05-11] CLI de validação do harness bloqueia erros de frontmatter/metadata e alerta sobre seções operacionais, densidade baixa e lifecycle; GitHub Actions roda validação com warnings não bloqueantes por padrão.
- [2026-05-11] Comandos de densidade/refatoração adicionados ao CLI: `benchmark:density`, `density:snapshot`, `density:trends`, `density:alerts`, `suggest:refactor`, `density:fix`, `refactor:auto` e `refactor:bulk`.
- [2026-05-11] Skills antigas foram normalizadas para seções operacionais (`Use`, `Do not use`, `Output contracts`, `Procedure`, `Verification`) e warnings de validação chegaram a zero.
- [2026-06-01] Instalador `code-ia-sota` passou a suportar seleção de integrações por ferramenta (`--tools` / seletor interativo) e shims leves para Claude, Cursor e Devin sem sobrescrever arquivos não gerenciados.
- [2026-06-01] Adicionado workflow `.agents/workflows/product-development.md` e skills `discovery-grill`, `prd-generator`, `architecture-generator`, `roadmap-generator` e `openspec-bridge` para orquestrar desenvolvimento de produto com OpenSpec.
- [2026-06-04] Padrão de criação/revisão de skills atualizado: skill deve ser procedimento operacional reutilizável, abstrata no método e concreta em invariantes/output; detalhes de framework devem ficar em `references/`.
- [2026-06-04] Workflow de produto e `openspec-bridge` foram alinhados ao OPSX; OpenSpec agora deve ser inicializado com `openspec init` e usado via comandos `/opsx:*` reais em vez de fluxo clonado manualmente.
- [2026-06-05] `openspec-generator` foi renomeada para `openspec-bridge`; a skill deve atuar como ponte para comandos/artefatos oficiais do OpenSpec, nao como gerador ou fonte canonica paralela.
- [2026-06-04] Workflow de produto reforcado para manter humano no loop do discovery; `discovery-grill` agora funciona como ciclo iterativo de refinamento antes de qualquer `DISCOVERY.md Approved`.

## Bugs Conhecidos / Débitos Técnicos

## Lições Aprendidas
