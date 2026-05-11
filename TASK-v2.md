# TASK — Stage 24: Governança Evolutiva do Harness

Esta task rastreia a implementação da Stage 24 conforme definido em `PRD-v2.md`.

---

# 1. Preparação

- [x] Criar PRD-v2 para Stage 24
- [x] Criar este TASK-v2.md

---

# 2. Implementação

## 2.1 Orçamento e Diretrizes de Divisão do AGENTS.md

- [x] Definir orçamento do AGENTS.md: 300-500 linhas máximo
- [x] Adicionar diretriz de orçamento ao AGENTS.md
- [x] Adicionar diretriz de orçamento ao README
- [x] Definir critérios de divisão quando orçamento excedido
- [x] Definir onde mover conteúdo (skills/workflows/references)

## 2.2 Regras de Granularidade de Referência

- [x] Definir granularidade de referência: 1 tópico por arquivo
- [x] Definir tamanho máximo por arquivo de referência (50-100 linhas)
- [x] Adicionar regras de granularidade ao README

## 2.3 Hierarquia de Override

- [x] Definir hierarquia de override: AGENTS.md > skill > workflow > subagent
- [x] Documentar hierarquia de override no governance.md
- [x] Documentar hierarquia de override no README
- [x] Adicionar exemplos de resolução de conflitos

## 2.4 Ciclo de Vida Expandido

- [x] Adicionar estado experimental ao ciclo de vida
- [x] Definir semântica para estado experimental
- [x] Documentar estados de ciclo de vida no README
- [x] Definir regras de transição entre estados
- [x] Adicionar status: active a todas as skills existentes

## 2.5 Workflow de Manutenção do Harness

- [x] Revisar workflow existente harness-maintenance.md
- [x] Confirmar que workflow está operacional

## 2.6 Comandos CLI de Governança

- [x] Documentar comandos CLI para verificações de governança em governance.md

---

# 3. Validação

## 3.1 Validação de Orçamento do AGENTS.md

- [ ] Confirmar que AGENTS.md está dentro do orçamento (300-500 linhas)
- [ ] Confirmar que diretrizes de divisão são claras
- [ ] Testar comando CLI para verificar orçamento
- [ ] Verificar que aviso de orçamento dispara corretamente

## 3.2 Validação de Granularidade de Referência

- [ ] Confirmar que arquivos de referência seguem regras de granularidade
- [ ] Testar validação CLI detecta referências excedidas
- [ ] Verificar que aviso dispara corretamente
- [ ] Confirmar que não existem monolitos de referência

## 3.3 Validação de Hierarquia de Override

- [ ] Confirmar que hierarquia de override está documentada
- [ ] Testar validação CLI detecta conflitos
- [ ] Verificar que exemplos são claros
- [ ] Confirmar que hierarquia é consistente

## 3.4 Validação de Ciclo de Vida

- [ ] Confirmar que estado experimental está documentado
- [ ] Testar CLI mostra skills experimentais
- [ ] Verificar que regras de transição são claras
- [ ] Confirmar que skill-creator suporta experimental

## 3.5 Validação de Workflow de Manutenção

- [ ] Confirmar que workflow está operacional
- [ ] Testar execução do workflow
- [ ] Verificar integração com skill-reviewer
- [ ] Verificar integração com harness-repair
- [ ] Confirmar que gatilhos funcionam corretamente

## 3.6 Validação de Comandos CLI

- [ ] Testar todos os comandos CLI de governança
- [ ] Verificar que comandos produzem saída correta
- [ ] Confirmar que comandos integram com validação
- [ ] Verificar que tratamento de erros funciona corretamente

---

# 4. Conclusão

- [ ] Atualizar memória do projeto se decisões duráveis emergirem
- [ ] Confirmar checklist de aceite da Stage 24
- [ ] Sugerir commit apenas após esta stage estar completa

---

# Checklist de Aceite

A Stage 24 está concluída apenas quando:

- [x] Governança criada em `.agents/skills/harness-repair/references/governance.md`
- [x] Orçamento do AGENTS.md definido e documentado (300-500 linhas)
- [x] Regras de granularidade de referência definidas e aplicadas
- [x] Hierarquia de override documentada em governance.md e referenciada no AGENTS.md
- [x] Ciclo de vida expandido com estado experimental
- [x] Workflow de manutenção do harness operacionalizado
- [x] Comandos CLI para verificações de governança documentados
- [x] Documentação atualizada (README, AGENTS.md)
