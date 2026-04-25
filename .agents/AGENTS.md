# .agents Compatibility Policy

Este arquivo existe apenas como ponte de compatibilidade para ferramentas que procuram instrucoes dentro de `.agents/`.

A politica global canonica do harness fica em `../AGENTS.md`.

## Regras

- Nao duplique aqui as regras globais do projeto.
- Leia e siga `../AGENTS.md` como fonte principal.
- Use os modulos deste diretorio sob demanda:
  - `skills/` para capacidades especializadas.
  - `subagents/` para personas por fase.
  - `workflows/` para processos reutilizaveis.
  - `project/context.md` para contexto especifico do projeto.
- Se houver conflito entre este arquivo e `../AGENTS.md`, prevalece `../AGENTS.md`.
