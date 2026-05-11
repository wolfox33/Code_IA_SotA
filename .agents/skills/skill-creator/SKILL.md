---
name: skill-creator
description: "Criar, modificar e melhorar skills do harness .agents/. Use quando o usuário pedir uma nova skill, otimizar uma skill existente, padronizar SKILL.md, definir contratos de saída ou iterar uma skill com feedback."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "workflow"
  complexity: 5
  tags:
    - skills
    - creation
    - iteration
---

# Skill Creator

Skill para criar, modificar e manter skills do harness `.agents/` com estrutura parse-safe, escopo estreito e critérios verificáveis.

## Use this skill when

- Usuário pedir para criar uma nova skill em `.agents/skills/`
- Usuário quiser modificar, melhorar, padronizar ou simplificar uma skill existente
- Precisar definir ou revisar o contrato de saída de uma skill
- Precisar transformar feedback de uso em melhoria reutilizável da skill
- Usuário mencionar "skill", "criar skill", "melhorar skill", "otimizar skill" ou `SKILL.md`

## Do not use this skill when

- Tarefa for apenas aplicar uma skill existente sem criar ou modificar skills
- Tarefa envolver workflow, subagent, script ou regra global sem impacto em `SKILL.md`
- Usuário pedir auditoria ampla do harness inteiro
- Usuário pedir execução de código sem envolver skills
- A mudança pertencer claramente ao `AGENTS.md`, a um workflow ou a um subagent

## Quality bar

Uma boa skill deve ter:

- **Razão clara para existir**: resolve um tipo de tarefa recorrente e reconhecível.
- **Escopo estreito**: não tenta cobrir múltiplos domínios sem boundary operacional.
- **Ativação concreta**: `description` e "Use this skill when" deixam claro quando carregar a skill.
- **Não uso explícito**: evita carregamento em tarefas parecidas, mas fora do escopo.
- **Frontmatter parse-safe**: metadados simples, válidos e úteis para discovery.
- **Procedimento operacional**: passos executáveis, não filosofia genérica.
- **Contrato de saída**: define o que deve ser entregue em cada cenário.
- **Verificação objetiva**: permite revisar se a skill ficou correta.
- **Baixo bloat**: move conhecimento denso para `references/` só quando necessário.

## Output contracts

### Nova skill criada

Entregue quando:

- pasta `.agents/skills/<skill-name>/` existir
- `SKILL.md` tiver frontmatter válido
- `name` estiver em kebab-case
- `description` explicar quando usar e o que a skill faz
- corpo incluir objetivo, uso, não uso, procedimento, pitfalls e verificação

### Skill existente modificada

Entregue quando:

- mudança responder diretamente ao pedido ou feedback
- frontmatter continuar válido
- escopo original for preservado ou ajustado explicitamente
- orientações antigas úteis forem preservadas
- `Skill log` for preservado

### Plano de melhoria produzido

Entregue quando:

- problemas da skill estiverem listados
- melhorias forem priorizadas
- mudanças fora de escopo estiverem separadas
- critérios de aceite forem claros

### Diagnóstico de skill produzido

Entregue quando:

- activation, escopo, frontmatter, procedimento, modularidade e verificação forem avaliados
- anti-patterns encontrados forem nomeados
- correções sugeridas forem pequenas e rastreáveis

## Procedure

### 1. Entender a intenção antes de editar

Primeiro entenda o que o usuário quer:

- **O que a skill deve fazer?**
- **Quando deve ser acionada?**
- **Quando não deve ser acionada?**
- **Qual o formato de saída esperado?**
- **A skill cria, modifica, diagnostica ou orienta?**
- **Precisa de testes?** Skills com outputs verificáveis (transformações de arquivo, extração de dados, geração de código) beneficiam de testes. Skills com outputs subjetivos (estilo de escrita, design) geralmente não precisam.

Se o usuário já tem um rascunho ou workflow na conversa, extraia os passos, ferramentas usadas, correções feitas e formatos de entrada/saída observados.

### 2. Entrevistar e pesquisar (se necessário)

Pergunte sobre casos de borda, formatos de entrada/saída, arquivos de exemplo, critérios de sucesso e dependências. Não escreva testes até ter isso definido.

Se útil, pesquise documentação ou skills similares. Use pesquisa externa apenas quando a skill depender de biblioteca, ferramenta ou formato que precisa de documentação atualizada.

### 3. Decidir onde o conteúdo pertence

Antes de escrever, separe responsabilidades:

- **`AGENTS.md`**: política global sempre ativa.
- **`SKILL.md`**: instruções operacionais da skill.
- **`references/`**: conhecimento denso, exemplos longos ou material opcional.
- **`scripts/`**: validações ou transformações determinísticas e reutilizáveis.
- **`assets/`**: templates, imagens ou arquivos estáticos usados pela skill.
- **Workflows**: orquestração de múltiplos passos ou múltiplos artefatos.
- **Subagents**: delegação por papel especializado, não instrução simples.

Não duplique política global dentro da skill. Referencie o boundary e mantenha a skill focada no trabalho operacional.

### 4. Escrever frontmatter parse-safe

Use YAML simples:

- `SKILL.md` começa com frontmatter delimitado por `---`
- `name` é obrigatório e usa kebab-case
- `description` é obrigatória, entre aspas, e explica gatilho + função
- `metadata` deve conter apenas dados úteis para discovery e manutenção
- listas YAML usam indentação consistente
- markdown, blocos de código e instruções longas ficam no corpo, não no frontmatter
- estruturas YAML complexas só entram se melhorarem discovery ou manutenção

### 5. Escrever o corpo do SKILL.md

Baseado na entrevista, preencha:

- **name**: Identificador da skill (kebab-case)
- **description**: String entre aspas com quando acionar + o que faz. Seja específico e inclua contextos de uso. Seja um pouco "pushy" para evitar under-triggering
- **metadata**: Preencha apenas metadados úteis para discovery e manutenção do harness
- **Corpo da skill**: Instruções em markdown

Estrutura recomendada:

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

# SKILL: [Título da Skill]

## Objetivo

O que esta skill resolve e por que existe.

## Use this skill when

- [situação concreta que justifica carregar esta skill]
- [outra situação]

## Do not use this skill when

- [caso que parece similar mas não é — evita carregamento desnecessário]

## Procedure

Passos para executar a skill com sucesso.

### 1. [Passo]

...

### 2. [Passo]

...

## Pitfalls

- [armadilha conhecida e como evitar]
- [variação descoberta durante uso real]

## Verification

Como confirmar que a skill foi aplicada corretamente.


> **Skill log** — atualize esta seção sempre que descobrir algo novo durante o uso.
> Não remova entradas antigas; adicione a data.

<!-- ex:
- [2026-04-13] Descoberto que X não funciona com Y — usar Z no lugar
- [2026-04-13] Passo 2 pode ser omitido quando condição W
-->
```

### 6. Aplicar padrões de escrita

- Use forma imperativa nas instruções
- Explique o **porquê** em vez de usar MUST/NEVER em caps lock
- Seja geral e não super-específico para exemplos
- Mantenha SKILL.md sob 500 linhas se possível
- Para arquivos de referência grandes (>300 linhas), inclua índice
- Evite transformar exemplo local em regra global
- Prefira checklists verificáveis a prosa educacional

### 7. Criar estrutura da skill

Crie a pasta da skill em `.agents/skills/<skill-name>/`:

```
skill-name/
├── SKILL.md (obrigatório)
└── Recursos opcionais
    ├── scripts/    - Código executável para tarefas determinísticas
    ├── references/ - Docs carregados conforme necessário
    └── assets/     - Arquivos usados na saída (templates, etc.)
```

Crie recursos opcionais apenas quando houver necessidade clara:

- Use `references/` para exemplos longos, tabelas, guias ou conhecimento raramente necessário.
- Use `scripts/` quando a mesma validação ou transformação for repetida e puder ser determinística.
- Use `assets/` quando a skill depender de arquivos estáticos reutilizáveis.

### 8. Detectar anti-patterns

Antes de concluir, procure:

- **Skill catch-all**: cobre responsabilidades demais.
- **Descrição vaga**: não deixa claro quando carregar.
- **Não uso ausente**: aumenta under/over-triggering.
- **Política global duplicada**: repete regras que pertencem ao `AGENTS.md`.
- **Exemplos excessivos no corpo**: deveria ir para `references/`.
- **Dependência de contexto oculto**: instruções só funcionam com conhecimento não declarado.
- **Verificação fraca**: não permite saber se a skill ficou correta.
- **Scripts prematuros**: automação criada antes do processo estabilizar.
- **Recursos sem necessidade**: pastas opcionais criadas sem uso real.

### 9. Testar (se aplicável)

Se a skill tiver outputs objetivamente verificáveis:

- Crie 2-3 casos de teste realistas
- Execute a skill com cada caso
- Verifique se os outputs estão corretos
- Peça feedback do usuário

Se a skill tiver outputs subjetivos, pule testes formais e peça feedback direto do usuário.

### 10. Iterar baseado em feedback

Após testar e receber feedback:

- **Generalize do feedback**: Não faça mudanças overfitted apenas para os exemplos de teste. Pense em como aplicar a lição de forma geral.
- **Mantenha o prompt lean**: Remova partes que não estão agregando valor.
- **Explique o porquê**: Transmita o entendimento do "porquê" nas instruções.
- **Procure trabalho repetido**: Se todos os casos de teste resultaram em scripts similares, considere incluir esse script em `scripts/`.

Repita até:
- Usuário estar satisfeito
- Feedback ser todo positivo
- Não estar fazendo progresso significativo

## Pitfalls

- **Overfitting**: Não faça a skill funcionar apenas para os exemplos de teste. Ela deve ser geral.
- **MUST/NEVER excessivo**: Prefira explicar o raciocínio em vez de ser super-rígido.
- **Descrição fraca**: Seja específico e "pushy" na description para evitar under-triggering.
- **SKILL.md muito longo**: Se passar de 500 linhas, considere mover conteúdo para `references/`.
- **Skill monolítica**: Se a skill precisar auditar, reparar, executar e governar tudo, divida responsabilidades.
- **Futuro virando obrigação**: Ideias de roadmap não devem entrar como regra atual sem necessidade.

## Verification

- Skill está em `.agents/skills/<skill-name>/SKILL.md`
- Frontmatter começa e termina com `---`
- Frontmatter tem `name` em kebab-case
- Frontmatter tem `description` entre aspas
- `description` explica quando usar + o que faz
- "Use this skill when" e "Do not use this skill when" estão claros
- Procedimento é operacional e rastreável
- Contrato de saída está explícito ou a ausência dele foi justificada
- Conteúdo pertence ao artefato correto (`SKILL.md`, `references/`, `scripts/`, `assets/`, workflow, subagent ou `AGENTS.md`)
- Anti-patterns relevantes foram verificados
- Se aplicável, testes foram executados e passaram


> **Skill log**
> - [2026-04-24] Skill criada baseada em skill-creator original, simplificada para harness .agents/

