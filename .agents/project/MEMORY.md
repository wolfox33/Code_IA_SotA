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

## Bugs Conhecidos / Débitos Técnicos


## Lições Aprendidas

