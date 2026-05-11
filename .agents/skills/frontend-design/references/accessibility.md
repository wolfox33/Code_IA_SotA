# Frontend Design — Accessibility & Responsividade

Conteúdo referencial de acessibilidade, responsividade e checklist para frontend.

## ♿ Acessibilidade

### Requisitos mínimos (WCAG AA)

| Critério | Requisito | Status Bagual |
|----------|-----------|---------------|
| **Contraste texto** | 4.5:1 mínimo | ✅ Smoky Black/Floral White = 18.5:1 |
| **Contraste texto secundário** | 4.5:1 mínimo | ✅ Olive Drab/Floral White = 5.8:1 |
| **Focus visible** | Indicador visível em todos os interativos | Implementar |
| **Keyboard nav** | Tab order lógico, Enter/Space ativam | Implementar |
| **Screen reader** | Labels, roles, aria-* corretos | Implementar |
| **Reduced motion** | Respeitar preferência do sistema | Implementar |

### Focus ring padrão

```css
/* globals.css */
*:focus-visible {
  outline: 2px solid var(--color-olive-drab);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Checklist por componente

- [ ] `aria-label` em botões com apenas ícone
- [ ] `role` correto em elementos interativos customizados
- [ ] `aria-expanded` em accordions/dropdowns
- [ ] `aria-live="polite"` em regiões que atualizam dinamicamente
- [ ] Labels associados a todos os inputs (`htmlFor`)
- [ ] Alt text descritivo em imagens (nunca vazio exceto decorativas)

## 📱 Responsividade

### Breakpoints (Tailwind v4 default)

| Breakpoint | Largura | Dispositivo |
|------------|---------|-------------|
| **Default** | 0-639px | Mobile |
| **sm** | 640px+ | Mobile landscape |
| **md** | 768px+ | Tablet |
| **lg** | 1024px+ | Desktop |
| **xl** | 1280px+ | Desktop wide |
| **2xl** | 1536px+ | Desktop ultra-wide |

### Testar em

- **375px** — iPhone SE / mobile mínimo
- **768px** — iPad / tablet
- **1024px** — Desktop padrão
- **1440px** — Desktop wide

### Padrões responsivos

```tsx
{/* Texto responsivo */}
<h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold">

{/* Grid responsivo */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">

{/* Padding responsivo */}
<section className="px-4 sm:px-6 lg:px-8 py-8 lg:py-16">

{/* Sidebar: hidden mobile, visible desktop */}
<aside className="hidden lg:block w-64">

{/* Mobile menu: visible mobile, hidden desktop */}
<Sheet>
  <SheetTrigger className="lg:hidden">
    <Menu className="h-6 w-6" />
  </SheetTrigger>
  <SheetContent side="left">
    {/* mobile nav */}
  </SheetContent>
</Sheet>
```

## 🚫 Anti-Patterns — O que NUNCA fazer

### Visual

- ❌ **Cores fora da paleta do projeto** sem justificativa documentada
- ❌ **Gradientes roxo/rosa AI** — clichê de "feito por AI"
- ❌ **Fontes genéricas** (system-ui, sans-serif) sem fallback definido
- ❌ **Emojis como ícones** — usar Lucide React (SVG)
- ❌ **Sombras exageradas** ou efeitos 3D desnecessários

### UX

- ❌ **Sem loading states** — sempre usar Skeleton ou Spinner
- ❌ **Sem error states** — sempre mostrar feedback de erro
- ❌ **Sem empty states** — sempre ter UI para "nenhum resultado"
- ❌ **Botões sem hover/focus** — todo interativo precisa de feedback
- ❌ **Formulários sem validação visual** — mostrar erros inline
- ❌ **Scroll infinito sem indicador** — mostrar "carregando mais..."
- ❌ **Modais sem forma de fechar** — sempre ter X ou Esc

### Código

- ❌ **Inline styles** — usar classes Tailwind
- ❌ **Cores hardcoded** — usar CSS variables/tokens
- ❌ **`!important`** — resolver especificidade corretamente
- ❌ **Divs clicáveis** sem `role="button"` e `tabIndex={0}`
- ❌ **Imagens sem dimensões** — sempre definir width/height ou aspect-ratio
- ❌ **Fontes sem `display: swap`** — evitar FOIT

## ✅ Pre-Delivery Checklist

Antes de entregar qualquer componente ou página, verificar:

### Visual
- [ ] Cores seguem a paleta do projeto (definida em context-design.md)
- [ ] Tipografia usa fontes definidas no design system
- [ ] Espaçamento segue escala de 4px do Tailwind
- [ ] Border radius consistente
- [ ] Sombras usam tokens definidos (sm, md, lg)

### Interação
- [ ] `cursor-pointer` em todos os elementos clicáveis
- [ ] Hover states com transição suave (150-300ms)
- [ ] Focus states visíveis para navegação por teclado
- [ ] `prefers-reduced-motion` respeitado em animações

### Acessibilidade
- [ ] Contraste de texto ≥ 4.5:1
- [ ] Todos os inputs têm labels associados
- [ ] Botões com ícone têm `aria-label`
- [ ] Imagens têm alt text descritivo
- [ ] Tab order lógico e funcional

### Responsividade
- [ ] Funciona em 375px (mobile mínimo)
- [ ] Funciona em 768px (tablet)
- [ ] Funciona em 1024px (desktop)
- [ ] Funciona em 1440px (desktop wide)
- [ ] Texto não transborda em nenhum breakpoint

### Performance
- [ ] Fontes carregadas via `next/font` (não CDN externo em produção)
- [ ] Imagens usando `next/image` com dimensões definidas
- [ ] Sem CSS não utilizado
- [ ] Componentes pesados com `dynamic()` ou lazy loading

### Código
- [ ] Sem emojis como ícones (usar Lucide React SVG)
- [ ] Sem cores hardcoded (usar tokens Tailwind ou do design system)
- [ ] Sem inline styles
- [ ] Componentes seguem padrão shadcn/ui

## 🗂️ Estrutura de Arquivos

```
src/
├── app/
│   ├── globals.css              # @theme com tokens Bagual
│   ├── layout.tsx               # Fonts (Ubuntu, Open Sans), body classes
│   └── (pages)/
├── components/
│   ├── ui/                      # shadcn/ui components (gerados via CLI)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   └── shared/
│       ├── Logo.tsx
│       ├── EmptyState.tsx
│       ├── LoadingSkeleton.tsx
│       └── ErrorBoundary.tsx
└── features/
    └── [feature]/
        └── components/          # Componentes específicos da feature
```
