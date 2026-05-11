# Frontend Design — Components

Conteúdo referencial de componentes shadcn/ui e layout patterns para frontend.

## 🧩 Componentes — Padrões shadcn/ui

### Princípio

Usar shadcn/ui como base e **customizar via CSS variables** do Tailwind v4. Nunca recriar componentes que o shadcn já oferece.

### Botão Primário (CTA)

```tsx
<Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 cursor-pointer rounded-lg px-6 py-3 font-heading font-bold">
  CTA Principal
</Button>
```

### Botão Secundário

```tsx
<Button variant="outline" className="border-border text-foreground hover:bg-muted transition-colors duration-200 cursor-pointer rounded-lg">
  CTA Secundário
</Button>
```

### Card

```tsx
<Card className="bg-muted/50 border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
  <CardHeader>
    <CardTitle className="font-heading font-bold text-foreground">
      Título
    </CardTitle>
    <CardDescription className="text-muted-foreground">
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
  className="border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:ring-ring focus:border-ring rounded-lg"
  placeholder="Digite aqui..."
/>
```

### Badge

```tsx
<Badge className="bg-muted text-foreground font-body text-xs rounded-full px-3 py-1">
  Badge
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
<section className="bg-background py-16 lg:py-24">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl">
      <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight">
        Título principal do hero
      </h1>
      <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
        Descrição clara e direta do valor entregue.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          CTA Primário
        </Button>
        <Button variant="outline" className="border-border text-foreground hover:bg-muted">
          CTA Secundário
        </Button>
      </div>
    </div>
  </div>
</section>
```

### Dashboard Layout

```tsx
<div className="flex h-screen bg-background">
  {/* Sidebar */}
  <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-muted/30">
    <nav className="flex-1 p-4 space-y-1">
      {/* nav items */}
    </nav>
  </aside>

  {/* Main content */}
  <main className="flex-1 overflow-y-auto">
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-6 py-4">
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
<section className="bg-muted/40 py-12 lg:py-16">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {/* conteúdo com fundo diferenciado */}
  </div>
</section>
```

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
