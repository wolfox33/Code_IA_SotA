---
name: tech-stack-decision
description: "Use quando a tarefa exigir decisão explícita de tecnologia, versão, framework, runtime, banco, ORM, ferramenta de teste ou migração de stack para SaaS/app com requisitos ainda em aberto."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "development"
  complexity: 3
  status: active
  tags:
    - stack
    - technology
    - decision
    - saas
    - framework
    - library
---

# Tech Stack Decision Guide

Guia definitivo para decisões de stack tecnológica em projetos SaaS. Use esta skill quando estiver em dúvida sobre quais tecnologias, frameworks ou versões utilizar.

## Objetivo

Fornecer decisões claras e fundamentadas sobre frameworks e bibliotecas, versões estáveis recomendadas, critérios de escolha baseados em requisitos, alternativas e trade-offs, compatibilidade entre tecnologias.

## Use this skill when

- Iniciar projeto e escolher stack ainda não definida
- Comparar tecnologias similares com trade-offs reais
- Validar framework, biblioteca, runtime, ORM, banco ou ferramenta de teste antes de adotar
- Atualizar versões quando compatibilidade ou estabilidade forem parte da decisão
- Estabelecer padrão tecnológico do time/projeto
- Planejar migração de uma stack para outra

## Do not use this skill when

- A tarefa é implementar em uma stack já definida no projeto
- A dúvida é de API/uso de uma biblioteca específica, não escolha de tecnologia
- Projeto tem requisitos de nicho não cobertos por este guia
- Time já tem expertise consolidada e o usuário não pediu comparação
- A decisão é apenas arquitetura de módulos; use `vertical-slice-modular-monolith`

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Decisão clara de tecnologia, framework ou versão
- Justificativa baseada em requisitos do projeto
- Análise de trade-offs entre alternativas
- Matriz de compatibilidade entre tecnologias
- Documentação da decisão (ADR se apropriado)

## Procedure

### 1. Identificar tipo de projeto

Classifique o projeto: SaaS Full-Stack, API Backend, Agent-Based Application, Landing Page.

- **SaaS Full-Stack**: Aplicação web com frontend e backend integrados, autenticação, banco de dados, workflows de negócio
- **API Backend**: API REST ou GraphQL servindo múltiplos clientes, sem frontend próprio
- **Agent-Based Application**: Aplicação com agentes AI, LangGraph, workflows complexos de LLM
- **Landing Page**: Página estática ou marketing, sem backend complexo, foco em SEO/conversão

### 2. Avaliar requisitos

Considere: Performance, escalabilidade, DX, time expertise, tipo de projeto.

- **Performance**: Latência máxima aceitável, throughput esperado, requisitos de cache
- **Escalabilidade**: Número de usuários esperado, pico de tráfego, necessidade de horizontal scaling
- **DX**: Experiência de desenvolvimento desejada, preferência por linguagem/framework, tamanho do time
- **Time expertise**: Skills existentes do time, curva de aprendizado aceitável, disponibilidade de recursos
- **Tipo de projeto**: Complexidade do domínio, necessidade de real-time, integrações externas

### 3. Consultar stack padrão

Use a stack padrão recomendada em `references/stack-standard.md`.

- Leia a stack padrão recomendada para o tipo de projeto identificado
- Verifique versões recomendadas e versões a evitar
- Confirme se a stack padrão atende aos requisitos avaliados
- Se a stack padrão não atender, considere alternativas no passo 5

### 4. Validar compatibilidade

Verifique matriz de compatibilidade entre tecnologias em `references/compatibility.md`.

- Consulte a matriz de compatibilidade para as tecnologias escolhidas
- Verifique se todas as tecnologias são compatíveis entre si
- Confirme se as versões escolhidas são estáveis e production-ready
- Identifique conflitos potenciais ou dependências problemáticas

### 5. Considerar alternativas

Avalie alternativas conforme guia em `references/decision-guide.md`.

- Liste alternativas relevantes para cada tecnologia escolhida
- Compare trade-offs: performance, DX, manutenção, comunidade, licenciamento
- Avalie se as alternativas atendem melhor aos requisitos específicos do projeto
- Documente razões para rejeição de alternativas não escolhidas

### 6. Documentar decisão

Use template de ADR conforme `references/compatibility.md`.

- Crie arquivo ADR no formato especificado
- Documente contexto, opções consideradas, decisão final, justificativa
- Liste trade-offs aceitos e condições para revisão futura
- Registre data da decisão e responsável

## Verification

- Tecnologia escolhida é estável e production-ready
- Versão é compatível com outras tecnologias da stack
- Justificativa é baseada em requisitos do projeto
- Trade-offs são documentados
- Decisão é registrada em ADR ou documentação
- Alternativas foram consideradas e rejeitadas com motivo

> **Skill log**
> - [2026-05-11] Skill criada com guia de decisões de stack tecnológica.
> - [2026-05-11] Stage 6 (Batch 6) adicionou seções operacionais faltantes e removeu emoji de heading Objetivo.
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/tech-stack-decision.md` para aumentar densidade.

## References

Conteúdo referencial detalhado, stack padrão recomendada e guias de decisão estão disponíveis em:
- `references/stack-standard.md` - Stack padrão recomendada, versões, versões a evitar
- `references/decision-guide.md` - Guia de decisão por tipo de projeto, critérios de decisão
- `references/compatibility.md` - Matriz de compatibilidade, alternativas, template de decisão
