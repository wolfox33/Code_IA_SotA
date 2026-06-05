---
name: frontend-design
description: "Use quando a tarefa criar, alterar ou revisar UI visual concreta: layout, componentes, responsividade, acessibilidade, motion, tokens ou documentação de design system em `.agents/project/context-design.md`."
metadata:
  model: inherit
  version: "1.0.0"
  author: "Custom Stack"
  category: "development"
  complexity: 5
  status: active
  tags:
    - frontend
    - design
    - ui
    - ux
    - tailwind
    - shadcn
    - accessibility
    - responsive
---

# Frontend Design — Generalista

Skill generalista de design frontend. Define baseline de layout, motion, acessibilidade, responsividade, componentes e polish visual proporcional ao risco com Tailwind CSS v4, shadcn/ui e Next.js 16. Design system específico do projeto deve ser definido em `.agents/project/context-design.md`.

## Objetivo

Garantir que toda interface gerada siga o design system do projeto, use Tailwind CSS v4 com CSS variables, aproveite shadcn/ui como base, seja acessível (WCAG AA mínimo), responsiva (mobile-first), clara para o usuário-alvo e visualmente polida antes da entrega.

## Use this skill when

- Criando ou alterando componente, página, layout, formulário, dashboard ou landing page
- Definindo ou documentando tokens, design system ou `DESIGN.md`
- Revisando acessibilidade, responsividade, estados visuais, motion ou hierarquia visual
- Ajustando Tailwind/shadcn/ui por motivo visual ou de UX
- Validando uma UI por screenshot, contraste ou comportamento responsivo

## Do not use this skill when

- Trabalhando exclusivamente no backend, API, banco, auth, billing ou deploy
- A tarefa só menciona frontend como diretório, sem mudança visual ou UX
- Implementando lógica de negócio sem impacto em layout, estados ou acessibilidade
- Fazendo refactor mecânico, rename ou ajuste de tipos em componentes sem decisão de design

## Output contracts

Ao aplicar esta skill, entregue ou registre:

- Componentes seguindo o design system do projeto
- Layout responsivo (mobile-first)
- Cores, tipografia e espaçamento seguindo tokens
- Componentes shadcn/ui customizados quando necessário
- Acessibilidade WCAG AA (contraste, focus states, aria labels)
- Motion sutil com respeito a prefers-reduced-motion
- Estados visuais completos quando aplicável: loading, empty, error, disabled, hover e focus
- Critique/polish proporcional ao impacto visual da mudança

## Procedure

### 1. Consultar design system específico

Leia `.agents/project/context-design.md` para design system do projeto. Se não existir, use padrões generalistas abaixo.

### 2. Definir design intent

Antes de desenhar ou alterar UI, identifique rapidamente:

- tipo de produto ou tela: operacional, editorial, SaaS, dashboard, app, landing page, jogo ou ferramenta interna
- usuário principal e ação primária
- informação que precisa ser escaneável primeiro
- densidade esperada: compacta, equilibrada ou expressiva
- prioridade local entre clareza, eficiência, estética e exploração visual

Use esse intent para evitar aplicar o mesmo padrão visual a todo tipo de interface.

### 3. Usar Tailwind v4 CSS variables

Nunca hardcodar cores. Use CSS variables do Tailwind v4:

```css
@theme {
  --color-primary: #HEX;
  --color-secondary: #HEX;
}
```

### 4. Estender shadcn/ui

Use shadcn/ui como base, customize via tokens. Nunca recriar componentes:

```tsx
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
  CTA
</Button>
```

### 5. Implementar responsividade mobile-first

Use breakpoints: 375px → 768px → 1024px → 1440px:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### 6. Validar acessibilidade

Garanta contraste mínimo 4.5:1, focus states visíveis, aria labels:

```tsx
<button aria-label="Close dialog" className="*:focus-visible:ring-ring">
  <X />
</button>
```

### 7. Implementar motion sutil

Transições de 150-300ms, respeitando prefers-reduced-motion:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in { animation: none; }
}
```

### 8. Completar estados visuais

Para componentes interativos, telas de dados e fluxos assíncronos, implemente os estados relevantes:

- loading sem layout shift desnecessário
- empty state com próxima ação clara
- error state acionável, sem esconder falhas
- disabled state distinguível e acessível
- hover/focus/active consistentes com o design system

### 9. Fazer critique/polish antes de concluir

Depois de implementar, revise a tela como designer crítico:

- hierarquia visual comunica a ação principal?
- espaçamento e alinhamentos têm ritmo consistente?
- tipografia combina com a densidade da interface?
- há decoração competindo com conteúdo ou workflow?
- texto cabe no container em mobile e desktop?
- componentes parecem pertencer ao mesmo sistema?
- a UI evita os anti-patterns em `references/visual-anti-patterns.md`?

### 10. Seguir pre-delivery checklist

Verifique: cores seguem paleta, tipografia definida, espaçamento escala de 4px, contraste ≥ 4.5:1, funciona em 375px/768px/1024px/1440px.

Para mudança visual significativa, validar por screenshot/browser em desktop e mobile quando o ambiente permitir. Corrigir problemas visuais óbvios antes de finalizar.

## Verification

- Design system do projeto é seguido (context-design.md consultado)
- Cores usam CSS variables/tokens, não hardcoded
- Componentes estendem shadcn/ui, não recriam
- Responsividade mobile-first implementada
- Acessibilidade WCAG AA validada (contraste, focus, aria)
- Motion respeita prefers-reduced-motion
- Estados visuais relevantes foram cobertos
- Critique/polish foi aplicado proporcionalmente ao impacto visual
- Screenshot/browser foi usado para UI significativa quando disponível
- Checklist pre-delivery completado

> **Skill log**
> - [2026-05-11] Skill criada com padrões de design frontend.
> - [2026-05-11] Stage 6 (Batch 6) adicionou seções operacionais faltantes e removeu emoji de heading Objetivo.
> - [2026-05-11] Refatorada: conteúdo referencial movido para `references/frontend-design.md` para aumentar densidade.
> - [2026-06-05] Incorporado design intent, critique/polish, estados visuais e validação visual proporcional sem adotar fluxo externo obrigatório.

## References

Conteúdo referencial detalhado, padrões de design e exemplos de componentes estão disponíveis em:
- `references/design-system.md` - Design.md, padrões generalistas, tokens, design thinking
- `references/components.md` - Componentes shadcn/ui, layout patterns, motion & interactions
- `references/accessibility.md` - WCAG AA, checklist, responsividade, anti-patterns
- `references/visual-anti-patterns.md` - Anti-patterns visuais e de craft para critique/polish
