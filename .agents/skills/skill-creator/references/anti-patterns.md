# Skill Creator — Anti-patterns

Conteúdo referencial de anti-patterns e pitfalls para skill-creator.

## Anti-patterns

- **Skill catch-all**: cobre responsabilidades demais
- **Descrição vaga**: não deixa claro quando carregar
- **Não uso ausente**: aumenta under/over-triggering
- **Política global duplicada**: repete regras que pertencem ao `AGENTS.md`
- **Exemplos excessivos no corpo**: deveria ir para `references/`
- **Dependência de contexto oculto**: instruções só funcionam com conhecimento não declarado
- **Verificação fraca**: não permite saber se a skill ficou correta
- **Scripts prematuros**: automação criada antes do processo estabilizar
- **Recursos sem necessidade**: pastas opcionais criadas sem uso real

## Pitfalls

- **Overfitting**: Não faça a skill funcionar apenas para os exemplos de teste. Ela deve ser geral
- **MUST/NEVER excessivo**: Prefira explicar o raciocínio em vez de ser super-rígido
- **Descrição fraca**: Seja específico e "pushy" na description para evitar under-triggering
- **SKILL.md muito longo**: Se passar de 500 linhas, considere mover conteúdo para `references/`
- **Skill monolítica**: Se a skill precisar auditar, reparar, executar e governar tudo, divida responsabilidades
- **Futuro virando obrigação**: Ideias de roadmap não devem entrar como regra atual sem necessidade
