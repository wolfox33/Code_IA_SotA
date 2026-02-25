---
name: frontend-design
description: Skill de design frontend para o SaaS Bagual. Define design system (cores, tipografia, espaçamento), padrões de componentes com Tailwind CSS v4, shadcn/ui e Next.js 16. Inclui branding guidelines, UX patterns, acessibilidade, responsividade e anti-patterns a evitar.
metadata:
  model: inherit
  version: 1.0.0
  author: Custom Stack
  category: development
  complexity: 5
  tags: [frontend, design, ui, ux, tailwind, shadcn, branding, bagual]
  compatible_with: [antigravity, windsurf, opencode]
---

# Frontend Design — Bagual

Skill de design frontend para o SaaS Bagual (bagual.org). Define o design system completo, padrões visuais, componentes e boas práticas de UI/UX com Tailwind CSS v4, shadcn/ui e Next.js 16.

## 🎯 Objetivo

Garantir que toda interface gerada:
- Siga o **branding Bagual** (cores, tipografia, tom)
- Use **Tailwind CSS v4** com CSS variables e design tokens
- Aproveite **shadcn/ui** como base de componentes
- Seja **acessível** (WCAG AA mínimo)
- Seja **responsiva** (mobile-first: 375px → 768px → 1024px → 1440px)
- Tenha **personalidade visual** — nunca pareça genérico/AI slop

## Use this skill when

- Criando qualquer componente, página ou layout
- Definindo estilos visuais para novas features
- Revisando ou melhorando UI existente
- Implementando landing pages, dashboards, formulários
- Precisando de decisão sobre cor, tipografia, espaçamento
- Construindo componentes reutilizáveis

## Do not use this skill when

- Trabalhando exclusivamente no backend/API
- Configurando infraestrutura ou deploy
- Implementando lógica de negócio sem UI

## Instructions

1. **Consultar Design System** abaixo antes de qualquer decisão visual
2. **Usar Tailwind v4 CSS variables** — nunca hardcodar cores
3. **Estender shadcn/ui** — customizar, não recriar do zero
4. **Validar acessibilidade** — contraste, focus states, aria labels
5. **Testar responsividade** — mobile-first, breakpoints definidos
6. **Verificar checklist** antes de entregar qualquer componente

## Safety

- **NUNCA** usar cores fora da paleta sem justificativa
- **NUNCA** remover focus states ou indicadores de acessibilidade
- **NUNCA** usar `dangerouslySetInnerHTML` sem sanitização
- **SEMPRE** respeitar `prefers-reduced-motion` em animações
- **SEMPRE** manter contraste mínimo 4.5:1 para texto
- **SEMPRE** usar `cursor-pointer` em elementos clicáveis

---

## 🎨 Design System — Bagual

### Identidade da Marca

| Atributo | Valor |
|----------|-------|
| **Nome** | Bagual |
| **Domínio** | bagual.org |
| **Símbolo** | Cavalo em galope (sketch style) |
| **Tom** | Forte, direto, eficiente |
| **Personalidade** | Agilidade, independência, robustez |
| **Estilo Visual** | Orgânico + minimalista, rústico refinado |

### Paleta de Cores

```css
/* Tailwind v4 — app.css ou globals.css */
@theme {
  --color-smoky-black: #11120D;
  --color-olive-drab: #565449;
  --color-bone: #D8CFBC;
  --color-floral-white: #FFFBF4;

  /* Semantic aliases */
  --color-background: #FFFBF4;
  --color-foreground: #11120D;
  --color-muted: #D8CFBC;
  --color-muted-foreground: #565449;
  --color-primary: #11120D;
  --color-primary-foreground: #FFFBF4;
  --color-secondary: #D8CFBC;
  --color-secondary-foreground: #11120D;
  --color-accent: #565449;
  --color-accent-foreground: #FFFBF4;
  --color-border: #D8CFBC;
  --color-ring: #565449;
  --color-destructive: #B91C1C;
  --color-destructive-foreground: #FFFBF4;
  --color-success: #15803D;
  --color-warning: #A16207;
}
```

| Nome | Hex | Uso |
|------|-----|-----|
| **Smoky Black** | `#11120D` | Textos principais, títulos, ícones, CTAs primários |
| **Olive Drab** | `#565449` | Textos secundários, bordas, ícones muted |
| **Bone** | `#D8CFBC` | Superfícies, cards, fundos de seção, separadores |
| **Floral White** | `#FFFBF4` | Background principal — leitura confortável |

**Regras de uso:**
- Background predominante: `floral-white` (evitar branco puro `#FFF`)
- CTAs primários: `smoky-black` com texto `floral-white`
- Cards e áreas de conteúdo: `bone` para diferenciar do fundo
- Texto principal: `smoky-black` sobre `floral-white` (contraste 18.5:1 ✅)
- Texto secundário: `olive-drab` sobre `floral-white` (contraste 5.8:1 ✅)

### Tipografia

```css
@theme {
  --font-heading: 'Ubuntu', sans-serif;
  --font-body: 'Open Sans', sans-serif;
}
```

| Elemento | Fonte | Peso | Uso |
|----------|-------|------|-----|
| **Headings (h1-h3)** | Ubuntu | Bold (700) | Títulos, hero text, section headers |
| **Subheadings (h4-h6)** | Ubuntu | Medium (500) | Subtítulos, card headers |
| **Body** | Open Sans | Regular (400) | Texto corrido, descrições, labels |
| **Body emphasis** | Open Sans | SemiBold (600) | Destaques em texto, links, badges |
| **Small/Caption** | Open Sans | Regular (400) | Metadata, timestamps, helper text |

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@500;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
```

**Ou via `next/font` (recomendado):**
```typescript
// app/layout.tsx
import { Ubuntu, Open_Sans } from 'next/font/google'

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-body',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html className={`${ubuntu.variable} ${openSans.variable}`}>
      <body className="font-body bg-floral-white text-smoky-black">
        {children}
      </body>
    </html>
  )
}
```

### Escala Tipográfica

| Nível | Tamanho | Line Height | Letter Spacing | Classe Tailwind |
|-------|---------|-------------|----------------|-----------------|
| **Display** | 48px / 3rem | 1.1 | -0.02em | `text-5xl font-heading font-bold` |
| **H1** | 36px / 2.25rem | 1.2 | -0.01em | `text-4xl font-heading font-bold` |
| **H2** | 30px / 1.875rem | 1.25 | -0.01em | `text-3xl font-heading font-bold` |
| **H3** | 24px / 1.5rem | 1.3 | 0 | `text-2xl font-heading font-bold` |
| **H4** | 20px / 1.25rem | 1.4 | 0 | `text-xl font-heading font-medium` |
| **Body Large** | 18px / 1.125rem | 1.6 | 0 | `text-lg` |
| **Body** | 16px / 1rem | 1.6 | 0 | `text-base` |
| **Small** | 14px / 0.875rem | 1.5 | 0 | `text-sm` |
| **Caption** | 12px / 0.75rem | 1.5 | 0.01em | `text-xs` |

### Espaçamento

Usar escala de 4px (Tailwind default). Valores mais usados:

| Token | Valor | Uso |
|-------|-------|-----|
| `gap-1` / `p-1` | 4px | Espaço mínimo entre ícone e texto |
| `gap-2` / `p-2` | 8px | Padding interno de badges, chips |
| `gap-3` / `p-3` | 12px | Padding de inputs compactos |
| `gap-4` / `p-4` | 16px | Padding padrão de cards, inputs |
| `gap-6` / `p-6` | 24px | Padding de seções internas |
| `gap-8` / `p-8` | 32px | Espaço entre seções |
| `gap-12` / `p-12` | 48px | Espaço entre blocos maiores |
| `gap-16` / `p-16` | 64px | Padding de hero sections |
| `gap-24` / `p-24` | 96px | Espaço entre seções de landing page |

### Border Radius

| Uso | Valor | Classe |
|-----|-------|--------|
| **Botões** | 8px | `rounded-lg` |
| **Cards** | 12px | `rounded-xl` |
| **Inputs** | 8px | `rounded-lg` |
| **Modals** | 16px | `rounded-2xl` |
| **Avatares** | full | `rounded-full` |
| **Badges** | full | `rounded-full` |

### Sombras

```css
@theme {
  --shadow-sm: 0 1px 2px 0 rgb(17 18 13 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(17 18 13 / 0.07), 0 2px 4px -2px rgb(17 18 13 / 0.05);
  --shadow-lg: 0 10px 15px -3px rgb(17 18 13 / 0.08), 0 4px 6px -4px rgb(17 18 13 / 0.04);
}
```

| Nível | Uso |
|-------|-----|
| `shadow-sm` | Cards em repouso, inputs |
| `shadow-md` | Cards em hover, dropdowns |
| `shadow-lg` | Modals, popovers, elementos flutuantes |

---

## 🧩 Componentes — Padrões shadcn/ui + Bagual

### Princípio

Usar shadcn/ui como base e **customizar via CSS variables** do Tailwind v4. Nunca recriar componentes que o shadcn já oferece.

### Botão Primário (CTA)

```tsx
<Button className="bg-smoky-black text-floral-white hover:bg-olive-drab transition-colors duration-200 cursor-pointer rounded-lg px-6 py-3 font-heading font-bold">
  Começar agora
</Button>
```

### Botão Secundário

```tsx
<Button variant="outline" className="border-bone text-smoky-black hover:bg-bone transition-colors duration-200 cursor-pointer rounded-lg">
  Saiba mais
</Button>
```

### Card

```tsx
<Card className="bg-bone/50 border-bone rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
  <CardHeader>
    <CardTitle className="font-heading font-bold text-smoky-black">
      Título
    </CardTitle>
    <CardDescription className="text-olive-drab">
      Descrição do card
    </CardDescription>
  </CardHeader>
  <CardContent>
    {/* conteúdo */}
  </CardContent>
</Card>
```

### Input

```tsx
<Input
  className="border-bone bg-floral-white text-smoky-black placeholder:text-olive-drab/60 focus:ring-olive-drab focus:border-olive-drab rounded-lg"
  placeholder="Digite aqui..."
/>
```

### Badge

```tsx
<Badge className="bg-bone text-smoky-black font-body text-xs rounded-full px-3 py-1">
  Novo
</Badge>
```

### Hierarquia de componentes shadcn recomendados

| Componente | Quando usar |
|------------|-------------|
| `Button` | Ações primárias e secundárias |
| `Card` | Containers de conteúdo |
| `Dialog` | Modais de confirmação, formulários |
| `Sheet` | Painéis laterais (mobile nav, filtros) |
| `Tabs` | Navegação entre seções relacionadas |
| `Table` | Dados tabulares |
| `Form` + `Input` | Formulários com validação |
| `Toast` / `Sonner` | Notificações e feedback |
| `Skeleton` | Loading states |
| `Avatar` | Fotos de perfil |
| `DropdownMenu` | Menus contextuais |
| `Command` | Paleta de comandos / search |
| `Tooltip` | Informações adicionais on hover |

---

## 🎭 Design Thinking

Antes de implementar qualquer interface, responder:

1. **Propósito**: Que problema esta interface resolve? Quem usa?
2. **Tom**: O Bagual é **forte, direto, eficiente** — interfaces devem refletir isso
3. **Diferencial**: O que torna esta tela memorável? Qual é o elemento que o usuário vai lembrar?
4. **Restrições**: Performance, acessibilidade, responsividade

### Direção Estética do Bagual

| Aspecto | Direção |
|---------|---------|
| **Estilo** | Minimalismo refinado com toques orgânicos/rústicos |
| **Layout** | Limpo, generoso em whitespace, hierarquia clara |
| **Atmosfera** | Terroso, sofisticado, confiável |
| **Movimento** | Sutil e funcional — transições suaves, sem exagero |
| **Ícones** | Lucide React (consistente, clean) — nunca emojis como ícones |
| **Imagens** | Quando usar, manter tom terroso/natural, evitar stock genérico |

### Voz Visual

- **Forte**: Títulos em Ubuntu Bold, CTAs com alto contraste
- **Direta**: Sem decoração desnecessária, cada elemento tem propósito
- **Eficiente**: Informação acessível rapidamente, hierarquia visual clara

---

## 📐 Layout Patterns

### Container padrão

```tsx
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  {children}
</div>
```

### Grid responsivo

```tsx
{/* 1 col mobile → 2 cols tablet → 3 cols desktop */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>
```

### Hero Section

```tsx
<section className="bg-floral-white py-16 lg:py-24">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl">
      <h1 className="text-4xl lg:text-5xl font-heading font-bold text-smoky-black leading-tight">
        Título principal do hero
      </h1>
      <p className="mt-6 text-lg text-olive-drab leading-relaxed">
        Descrição clara e direta do valor entregue.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Button className="bg-smoky-black text-floral-white hover:bg-olive-drab">
          CTA Primário
        </Button>
        <Button variant="outline" className="border-bone text-smoky-black hover:bg-bone">
          CTA Secundário
        </Button>
      </div>
    </div>
  </div>
</section>
```

### Dashboard Layout

```tsx
<div className="flex h-screen bg-floral-white">
  {/* Sidebar */}
  <aside className="hidden lg:flex w-64 flex-col border-r border-bone bg-bone/30">
    <nav className="flex-1 p-4 space-y-1">
      {/* nav items */}
    </nav>
  </aside>

  {/* Main content */}
  <main className="flex-1 overflow-y-auto">
    <header className="sticky top-0 z-10 bg-floral-white/80 backdrop-blur-sm border-b border-bone px-6 py-4">
      {/* top bar */}
    </header>
    <div className="p-6">
      {children}
    </div>
  </main>
</div>
```

### Seção com fundo diferenciado

```tsx
<section className="bg-bone/40 py-12 lg:py-16">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {/* conteúdo com fundo bone para diferenciar do floral-white */}
  </div>
</section>
```

---

## ✨ Motion & Interactions

### Princípios

- **Funcional**: Animações devem comunicar estado, não decorar
- **Sutil**: Transições de 150-300ms, easing natural
- **Respeitosa**: Sempre respeitar `prefers-reduced-motion`

### Transições padrão

```css
/* Aplicar globalmente via Tailwind */
.transition-default {
  @apply transition-all duration-200 ease-in-out;
}
```

| Interação | Duração | Propriedade |
|-----------|---------|-------------|
| **Hover em botão** | 200ms | `background-color`, `color` |
| **Hover em card** | 200ms | `box-shadow`, `transform` |
| **Focus em input** | 150ms | `border-color`, `ring` |
| **Abertura de modal** | 300ms | `opacity`, `transform` |
| **Toast/notification** | 200ms | `opacity`, `translateY` |

### Card hover com elevação

```tsx
<Card className="shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
```

### Staggered reveal (page load)

```tsx
// Usar com framer-motion ou CSS animation-delay
<div className="space-y-4">
  {items.map((item, i) => (
    <div
      key={item.id}
      className="animate-fade-in-up"
      style={{ animationDelay: `${i * 100}ms` }}
    >
      {/* content */}
    </div>
  ))}
</div>
```

```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.4s ease-out forwards;
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up {
    animation: none;
    opacity: 1;
  }
}
```

---

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

---

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

---

## 🚫 Anti-Patterns — O que NUNCA fazer

### Visual

- ❌ **Branco puro** (`#FFFFFF`) como background — usar `floral-white` (#FFFBF4)
- ❌ **Gradientes roxo/rosa AI** — clichê de "feito por AI"
- ❌ **Inter, Roboto, Arial** como fonte — usar Ubuntu + Open Sans
- ❌ **Emojis como ícones** — usar Lucide React (SVG)
- ❌ **Cores fora da paleta** sem justificativa documentada
- ❌ **Sombras exageradas** ou efeitos 3D desnecessários
- ❌ **Fontes genéricas** (system-ui, sans-serif) sem fallback definido

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

---

## ✅ Pre-Delivery Checklist

Antes de entregar qualquer componente ou página, verificar:

### Visual
- [ ] Cores seguem a paleta Bagual (smoky-black, olive-drab, bone, floral-white)
- [ ] Tipografia usa Ubuntu (headings) + Open Sans (body)
- [ ] Espaçamento segue escala de 4px do Tailwind
- [ ] Border radius consistente (lg para botões/inputs, xl para cards)
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
- [ ] Sem cores hardcoded (usar tokens Tailwind)
- [ ] Sem inline styles
- [ ] Componentes seguem padrão shadcn/ui

---

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

---

## 📖 Resources

- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
- [Google Fonts — Ubuntu](https://fonts.google.com/specimen/Ubuntu)
- [Google Fonts — Open Sans](https://fonts.google.com/specimen/Open+Sans)
- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

## Example Interactions

- "Criar landing page para o Bagual"
- "Implementar dashboard com sidebar e cards"
- "Criar formulário de login seguindo o design system"
- "Adicionar dark mode ao design system"
- "Revisar acessibilidade deste componente"
- "Criar componente de pricing table"
- "Implementar empty state para lista sem itens"
- "Criar hero section com CTA"

## Behavioral Traits

- Sempre aplica a paleta Bagual antes de qualquer outra decisão
- Prioriza legibilidade e hierarquia visual clara
- Usa shadcn/ui como base, customiza via tokens — nunca recria
- Prefere simplicidade refinada a complexidade decorativa
- Valida acessibilidade em toda entrega
- Sugere melhorias visuais quando identifica anti-patterns
- Mantém consistência entre páginas e componentes
