---
description: Workflow para coordenar manutenção segura do harness .agents/, roteando criação, revisão, diagnóstico estrutural, reparo aprovado, validação e memória.
---

# Harness Maintenance

Use este workflow quando a tarefa envolver manutenção do harness `.agents/` e precisar coordenar criação, revisão, diagnóstico estrutural ou reparo de artefatos.

Não use este workflow quando:

- a tarefa for uma edição simples e localizada já evidente
- a tarefa for apenas aplicar uma skill a um problema de produto
- a tarefa pedir compatibilidade ou mirrors para plataformas específicas
- a tarefa exigir script determinístico ainda não especificado
- o usuário pedir somente uma resposta conceitual sem alteração ou diagnóstico do harness

## Objetivo

Sequenciar manutenção do harness com escopo explícito, diagnóstico antes de reparo, aprovação antes de mutação e validação antes de concluir.

## Processo

### 1. Definir escopo

- Liste o objetivo da manutenção em uma frase.
- Liste os artefatos candidatos a leitura.
- Declare o que está fora do escopo.
- Se o pedido for amplo, proponha um recorte inicial menor.

### 2. Escolher rota

- Use `skill-creator` para criar, modificar, padronizar ou melhorar uma skill.
- Use `skill-reviewer` para revisar uma skill isolada, comparar skills ou produzir readiness check.
- Use `harness-repair` para diagnóstico multi-artefato, drift estrutural, overlap amplo ou plano de reparo.
- Use workflow apenas para orquestrar etapas; não copie procedimentos completos das skills.

### 3. Diagnosticar antes de editar

- Leia apenas os arquivos necessários ao escopo.
- Produza achados com evidência quando houver diagnóstico.
- Separe achados locais de problemas estruturais.
- Registre itens fora de escopo como diferidos, não como mudanças implícitas.

### 4. Planejar reparo

- Transforme achados aprovados em etapas pequenas.
- Para cada etapa, defina critério de verificação.
- Peça aprovação antes de mutações amplas ou sensíveis.
- Não crie scripts, resources ou workflows adicionais sem novo escopo explícito.

### 5. Executar mudanças aprovadas

- Edite apenas arquivos diretamente ligados ao escopo aprovado.
- Preserve estilo e estrutura existentes quando possível.
- Não refatore artefatos vizinhos por conveniência.
- Após cada etapa, valide o critério definido.

### 6. Validar e registrar

- Releia os arquivos alterados ou o diff relevante.
- Confirme que não houve mudança fora de escopo.
- Se houver tracker ativo definido pelo projeto, atualize-o com o status da tarefa.
- Atualize `.agents/project/MEMORY.md` somente para decisões ou lições duráveis.
- Finalize com status, arquivos alterados, validação feita e próximos passos.

## Output esperado

Entregue quando:

- escopo e fora de escopo estiverem claros
- rota escolhida estiver justificada
- arquivos lidos e alterados forem rastreáveis
- diagnóstico, plano e reparo não forem misturados
- validação e memória forem avaliadas antes de concluir

## Anti-patterns

- **Auditoria por reflexo**: ler todo o harness sem necessidade.
- **Workflow como política global**: repetir regras que pertencem ao `AGENTS.md`.
- **Workflow como skill**: duplicar detalhes de `skill-creator`, `skill-reviewer` ou `harness-repair`.
- **Reparo sem aprovação**: editar antes de transformar diagnóstico em plano aprovado.
- **Compatibilidade acidental**: reabrir mirrors/plataformas sem pedido explícito.
- **Automação prematura**: criar scripts antes de regras e formatos estabilizarem.

## Verification

- Escopo foi definido antes da leitura ampla.
- Rota para skill ou diagnóstico foi escolhida explicitamente.
- Diagnóstico, plano, reparo e validação ficaram separados.
- Mudanças foram pequenas, rastreáveis e aprovadas.
- Itens fora de escopo foram diferidos.
- Tracker de tarefa (se existente) e memória foram avaliados antes da conclusão.
