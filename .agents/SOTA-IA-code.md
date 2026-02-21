# State of the Art (SOTA) - Desenvolvimento Assistido por IA

Este guia descreve os fundamentos do desenvolvimento de software assistido por Inteligência Artificial (AI-Assisted Development), detalhando como as ferramentas modernas (Windsurf, Cursor, OpenCode, Claude Code, GitHub Copilot) leem, entendem e agem sobre o seu projeto. 

O objetivo é que você entenda a anatomia desse ecossistema para criar repositórios "Agent-Ready" — onde a IA trabalha de forma previsível, segura e barata (em consumo de tokens).

---

## 1. O Ponto de Partida: Como a IA "Lê" o Projeto

Quando você abre um projeto em uma IDE com IA ou executa um agente CLI, a IA não tem um conhecimento inato sobre as regras de negócio da sua empresa. Ela precisa de contexto.

O estado da arte exige que o contexto seja **Progressivo** (carregado apenas quando necessário) e **Estruturado**. Para isso, as ferramentas buscam arquivos padrão na raiz do repositório.

### O Arquivo Canônico: `agents.md` (ou `.agents/agents.md`)
O `agents.md` atua como a "Constituição" do seu repositório. Assim que a sessão da IA é iniciada, ela procura por esse arquivo (ou equivalentes legados como `.cursorrules` ou `CLAUDE.md`). **Nota importante:** Este arquivo **não utiliza Frontmatter**. Como ele é de carregamento obrigatório e contínuo (Always On), a IA não precisa tomar uma decisão de roteamento para lê-lo; ele é injetado diretamente no System Prompt.

**Por que ele existe?**
Para definir as regras globais inegociáveis. Se a IA não souber que o projeto usa uma arquitetura específica ou exige a escrita de testes antes do código, ela vai "alucinar" o padrão comum da internet.

**Como funciona o Discovery (Descoberta):**
1. O agente procura na raiz do workspace atual.
2. Se não encontrar, ele sobe nas pastas até a raiz do `.git`.
3. Se não encontrar, ele busca nas configurações globais do usuário (`~/.config/opencode`, `~/.codex`, etc.).

---

## 2. A Hierarquia do Contexto (Top-Down)

Para evitar que a IA consuma todos os tokens disponíveis apenas lendo regras (o que custa dinheiro e degrada a performance), dividimos o contexto em camadas:

### Nível 1: Global Rules (`agents.md`)
- **O que é:** Regras universais de comportamento.
- **O que colocar aqui:** "Sempre priorize legibilidade sobre esperteza", "Nunca assuma requisitos ausentes", "Siga o protocolo de Spec-Gap em caso de dúvida".
- **Carregamento:** Sempre ativo (Always On). Não requer Frontmatter.

### Nível 2: Project Context (`project/context.md`)
- **O que é:** O DNA específico do projeto atual.
- **O que colocar aqui:** Stack tecnológica (React, Node, PostgreSQL), arquitetura adotada (Vertical Slice), SLOs de negócio.
- **Carregamento:** Injetado manualmente ou incluído nas instruções de inicialização de tarefas.

### Nível 3: Subagentes (Personas)
- **O que é:** Perfis especializados. A IA assume um papel específico dependendo da fase do desenvolvimento.
- **Exemplos:**
  - `planner.md`: Lê especificações e define arquitetura.
  - `builder.md`: Foca em implementar código limpo sem alterar a UX aprovada.
  - `reviewer.md`: Foca em encontrar gargalos, regressões e debugging de root-cause.
- **Como a IA escolhe?** Através de Roteamento Dinâmico (veja o item 3).

---

## 3. Roteamento Dinâmico (O "Cérebro" da IA)

No passado, você precisava dizer "Aja como um Arquiteto". Hoje, as ferramentas usam **Tool Calling** e metadados para saber quando usar qual contexto.

**Como funciona:**
1. A IA lê a sua requisição inicial ("Construa a tela de login").
2. O sistema avalia as opções disponíveis (Subagentes, Skills).
3. A IA invoca um *Subagente* (`builder.md`) que possui as diretrizes de codificação.
4. Se o `builder` precisar de conhecimento específico de frontend, ele chama uma *Skill* de Frontend.

Isso garante que o agente use as regras de banco de dados *apenas* quando estiver mexendo com dados.

---

## 4. O Coração do Ecossistema: Skills

As **Skills** (habilidades) são o avanço mais importante no SOTA atual. Elas seguem especificações abertas (como a da *AgentSkills.io*) e permitem encapsular conhecimento técnico.

### A Estrutura de uma Skill
Uma Skill vive dentro da pasta `.agents/skills/<nome-da-skill>/` e deve conter um arquivo obrigatório: `SKILL.md`.

**Anatomia do `SKILL.md`:**
```markdown
---
name: stripe-integration
description: Padrões de implementação e webhook handling para Stripe.
---
# Conteúdo da Skill...
```

**Por que as Skills são revolucionárias?**
- **Progressive Disclosure:** A IA só lê os metadados (o `name` e a `description`). O corpo extenso da skill (o código do `SKILL.md`, scripts auxiliares na subpasta `resources/`) só é lido *se e quando* a IA decidir que a tarefa precisa do Stripe.
- **Isolamento:** Evita conflitos de contexto (ex: regras de teste de frontend interferindo em testes de backend).

---

## 5. Workflows (A Esteira de Montagem)

Enquanto as Skills ensinam *como* fazer (ex: "Como usar o Stripe"), os **Workflows** ensinam *o que* fazer em sequência (ex: "Como lançar uma nova release").

**Como funcionam:**
- Ficam em `.windsurf/workflows` ou `.agents/workflows/`.
- São arquivos Markdown com listas numeradas.
- O agente pode executa-los passo a passo, inclusive rodando comandos de terminal em passos marcados (ex: com a anotação `// turbo`).

**Diferença Prática:**
- **Skill:** "Use Drizzle ORM assim..."
- **Workflow:** "1. Crie a branch. 2. Rode o linter. 3. Gere a migration. 4. Faça o push."

---

## 6. Rules (As Heranças do Passado, Ainda Úteis)

Embora o sistema de Skills e Subagentes resolva a maioria dos problemas, as antigas **Rules** (`.cursorrules`, `.windsurf/rules/`) ainda existem.

**Onde as Rules entram hoje?**
- As ferramentas (como Windsurf e Cursor) usam as Rules como gatilhos rápidos (Glob patterns). 
- Exemplo: "Sempre que abrir um arquivo `*.ts`, aplique a regra X".
- Elas ainda são úteis para preferências estilísticas muito granulares que não justificam uma Skill inteira (ex: "sempre use aspas simples no Typescript").

*Nota: Em repositórios SOTA, a tendência é migrar as regras complexas para Skills e manter apenas regras sintáticas simples no sistema de Rules nativo da IDE.*

---

## 7. O Fluxo de Vida (End-to-End)

Quando você pede para a IA "Criar a API de Pagamento":

1. **Discovery Inicial:** A IA lê o `agents.md` (Aprende que não deve inventar requisitos e deve ler o contexto).
2. **Roteamento:** A IA percebe que é uma tarefa de arquitetura inicial. Aciona o subagente `planner.md`.
3. **Planejamento:** O `planner` lê a `project/context.md` para ver as diretrizes da stack e elabora os boundaries.
4. **Construção:** O roteamento troca o agente para o `builder.md`.
5. **Invocação de Skills:** O `builder` vê que a tarefa envolve pagamentos. Ele busca em `.agents/skills/` e encontra a skill `stripe-integration`. Ele lê a skill e injeta o conhecimento.
6. **Revisão:** A IA troca para o `reviewer.md` para checar vulnerabilidades e regressões.
7. **Finalização:** A IA sugere o *Commit* usando um *Workflow* predefinido.

---

## Conclusão: Princípios para Recriar a Estrutura

Para recriar uma estrutura SOTA no seu projeto, siga este roteiro:
1. **Tenha um `agents.md`** na raiz ou pasta `.agents/` para as leis inegociáveis.
2. **Divida personas** (planner, builder, reviewer) de forma simples e pragmática (não crie personas hiperespecíficas como "Agente de Botão CSS").
3. **Isole conhecimento em Skills** (`.agents/skills/`). Se o conhecimento for longo e específico de uma tecnologia, transforme-o em uma skill com Frontmatter.
4. **Use metadados precisos** (`description` de Skills e Subagentes) para que a IA faça o roteamento correto sem precisar ler o conteúdo todo de antemão.
