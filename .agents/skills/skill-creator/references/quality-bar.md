# Skill Creator — Quality Bar

Conteúdo referencial de quality bar para skill-creator.

## Quality bar

Uma boa skill deve ter:

- **Razão clara para existir**: resolve um tipo de tarefa recorrente e reconhecível
- **Escopo estreito**: não tenta cobrir múltiplos domínios sem boundary operacional
- **Ativação concreta**: `description` e "Use this skill when" deixam claro quando carregar a skill
- **Não uso explícito**: evita carregamento em tarefas parecidas, mas fora do escopo
- **Frontmatter parse-safe**: metadados simples, válidos e úteis para discovery
- **Procedimento operacional**: passos executáveis, não filosofia genérica
- **Contrato de saída**: define o que deve ser entregue em cada cenário
- **Verificação objetiva**: permite revisar se a skill ficou correta
- **Baixo bloat**: move conhecimento denso para `references/` só quando necessário
