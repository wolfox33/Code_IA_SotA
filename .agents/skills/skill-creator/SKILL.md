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

## Objetivo

Criar, modificar e melhorar skills do harness `.agents/` com estrutura parse-safe, escopo estreito e critérios verificáveis.

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

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Nova skill criada em `.agents/skills/<skill-name>/`
- Skill existente modificada com mudança direta ao pedido
- Plano de melhoria produzido quando aplicável
- Diagnóstico de skill produzido quando aplicável

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

- **`AGENTS.md`**: política global sempre ativa
- **`SKILL.md`**: instruções operacionais da skill
- **`references/`**: conhecimento denso, exemplos longos ou material opcional
- **`scripts/`**: validações ou transformações determinísticas e reutilizáveis
- **`assets/`**: templates, imagens ou arquivos estáticos usados pela skill
- **Workflows**: orquestração de múltiplos passos ou múltiplos artefatos
- **Subagents**: delegação por papel especializado, não instrução simples

Não duplique política global dentro da skill. Referencie o boundary e mantenha a skill focada no trabalho operacional.

### 4. Escrever frontmatter parse-safe

Use YAML simples seguindo as diretrizes em `references/frontmatter.md`.

### 5. Escrever o corpo do SKILL.md

Baseado na entrevista, preencha:

- **name**: Identificador da skill (kebab-case)
- **description**: String entre aspas com quando acionar + o que faz. Seja específico e inclua contextos de uso. Seja um pouco "pushy" para evitar under-triggering
- **metadata**: Preencha apenas metadados úteis para discovery e manutenção do harness
- **Corpo da skill**: Instruções em markdown

Use a estrutura recomendada em `references/structure.md`.

### 6. Aplicar padrões de escrita

- Use forma imperativa nas instruções
- Explique o **porquê** em vez de usar MUST/NEVER em caps lock
- Seja geral e não super-específico para exemplos
- Mantenha SKILL.md sob 500 linhas se possível
- Para arquivos de referência grandes (>300 linhas), inclua índice
- Evite transformar exemplo local em regra global
- Prefira checklists verificáveis a prosa educacional

### 7. Criar estrutura da skill

Crie a pasta da skill em `.agents/skills/<skill-name>/` seguindo a estrutura em `references/structure.md`.

Crie recursos opcionais apenas quando houver necessidade clara:

- Use `references/` para exemplos longos, tabelas, guias ou conhecimento raramente necessário
- Use `scripts/` quando a mesma validação ou transformação for repetida e puder ser determinística
- Use `assets/` quando a skill depender de arquivos estáticos reutilizáveis

### 8. Detectar anti-patterns

Antes de concluir, procure anti-patterns listados em `references/anti-patterns.md`.

### 9. Testar (se aplicável)

Se a skill tiver outputs objetivamente verificáveis:

- Crie 2-3 casos de teste realistas
- Execute a skill com cada caso
- Verifique se os outputs estão corretos
- Peça feedback do usuário

Se a skill tiver outputs subjetivos, pule testes formais e peça feedback direto do usuário.

### 10. Iterar baseado em feedback

Após testar e receber feedback:

- **Generalize do feedback**: Não faça mudanças overfitted apenas para os exemplos de teste. Pense em como aplicar a lição de forma geral
- **Mantenha o prompt lean**: Remova partes que não estão agregando valor
- **Explique o porquê**: Transmita o entendimento do "porquê" nas instruções
- **Procure trabalho repetido**: Se todos os casos de teste resultaram em scripts similares, considere incluir esse script em `scripts/`

Repita até:

- Usuário estar satisfeito
- Feedback ser todo positivo
- Não estar fazendo progresso significativo

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
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/` com arquivos divididos por especialidade.

## References

Conteúdo referencial detalhado, quality bar, output contracts, frontmatter, estrutura e anti-patterns estão disponíveis em:
- `references/quality-bar.md` - Quality bar
- `references/output-contracts.md` - Output contracts detalhados
- `references/frontmatter.md` - Frontmatter parse-safe
- `references/structure.md` - Estrutura recomendada e templates
- `references/anti-patterns.md` - Anti-patterns e pitfalls
