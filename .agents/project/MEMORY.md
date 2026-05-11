# Project Memory

> Arquivo mantido pelo agente. Registre fatos emergentes da execução do projeto.
> Não duplique o que está em `context.md` (estrutural) ou na OpenSpec (contratos/escopo).
> **Limite: ~2.000 caracteres.** Quando cheio, consolide ou remova entradas obsoletas antes de adicionar novas.
> Formato obrigatório: `- [YYYY-MM-DD] entrada curta e objetiva`

## Workarounds & Descobertas


## Decisões Tomadas

- [2026-05-05] Criada a skill `backend-resilience-by-design` para aplicar resiliência backend durante implementação e validação antes de concluir.
- [2026-05-11] PRD de manutenção do harness foi reduzido para Stage 1 focado em `skill-creator`; specs separadas não são necessárias nesta fase, e etapas futuras ficam diferidas.
- [2026-05-11] Stage 2 criou `skill-reviewer` como skill de diagnóstico/revisão de skills; reparos continuam separados e exigem pedido explícito.
- [2026-05-11] Stage 3 criou `harness-repair` como skill de diagnóstico estrutural do harness; separa diagnóstico, plano e reparo, sem mutação automática.
- [2026-05-11] Após teste de `harness-repair`, `data-science` e `quant` foram expandidas de placeholders para skills operacionais alinhadas a `ml`; o workflow de plataformas foi mantido fora do reparo.
- [2026-05-11] Stage 4 criou `.agents/workflows/harness-maintenance.md` para orquestrar manutenção do harness, roteando `skill-creator`, `skill-reviewer` e `harness-repair` sem duplicar seus procedimentos.
- [2026-05-11] Stage 5 adicionou validação no CLI: erros de frontmatter/metadata bloqueiam; lacunas operacionais em skills antigas viram warnings.
- [2026-05-11] Stage 6 primeiro lote refatorou `harness-repair`, `skill-reviewer` e `backend-resilience-by-design` para remover warnings evitáveis sem alterar escopo.
- [2026-05-11] Stage 7 benchmark de contexto identificou `vps-docker-deploy` como candidato primário a bloat (0% densidade, conteúdo como referência); skills estruturais têm densidade moderada justificada por contratos detalhados.
- [2026-05-11] Stage 8 adicionou GitHub Actions workflow para validar harness automaticamente em PRs e pushes; workflow falha em erros de validação mas permite warnings de maturidade.
- [2026-05-11] Stage 6 (Batch 2) refatorou `vps-docker-deploy` movendo conteúdo referencial para `references/` e adicionando procedure executável, melhorando densidade de 0% para ~50% sem perder conhecimento de padrão de infraestrutura.
- [2026-05-11] Stage 6 (Batch 3) avaliou `harness-repair` e `skill-reviewer` baseado no benchmark; output contracts já são concisos e essenciais para o papel diagnóstico, não justificando refatoração; densidade moderada (44.9% e 41.9%) é aceitável para skills estruturais.
- [2026-05-11] Stage 6 (Batch 4) adicionou seções operacionais faltantes em `api-design-chat` e `database-schema-design-chat` (Use/Do not use, Output contracts, Procedure, Verification), reduzindo warnings de validação de 60 para 58; removeu emojis de headings para validador reconhecer seções.

## Bugs Conhecidos / Débitos Técnicos


## Lições Aprendidas

