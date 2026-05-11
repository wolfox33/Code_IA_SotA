# Frontend Design — Design System

Conteúdo referencial de design system para frontend.

## Instructions

1. **Consultar context-design.md** se disponível para design system específico
2. **Usar padrões generalistas** abaixo se não houver design system específico
3. **Usar Tailwind v4 CSS variables** — nunca hardcodar cores
4. **Estender shadcn/ui** — customizar, não recriar do zero
5. **Validar acessibilidade** — contraste, focus states, aria labels
6. **Testar responsividade** — mobile-first, breakpoints definidos
7. **Verificar checklist** antes de entregar qualquer componente

## Safety

- **NUNCA** usar cores fora da paleta do projeto sem justificativa
- **NUNCA** remover focus states ou indicadores de acessibilidade
- **NUNCA** usar `dangerouslySetInnerHTML` sem sanitização
- **SEMPRE** respeitar `prefers-reduced-motion` em animações
- **SEMPRE** manter contraste mínimo 4.5:1 para texto
- **SEMPRE** usar `cursor-pointer` em elementos clicáveis

## 📋 Google Design.md — Formato Padrão

### O que é

Formato estruturado que combina tokens legíveis por máquina (YAML frontmatter) com rationale legível por humanos (markdown). Útil para:
- Documentação de design systems compartilháveis entre agentes
- Validação automática via CLI (`npx @google/design.md lint`)
- Exportação para outros formatos (Tailwind, tokens.json, Figma)
- Controle de versão de mudanças de design

### Quando usar

**Criar DESIGN.md quando:**
- Projeto tem design system definido e precisa ser documentado
- Precisa validar tokens automaticamente (contrast-ratio, referências quebradas)
- Precisa exportar para outras ferramentas (Figma, Tailwind theme)
- Precisa versionar mudanças de design com diff

**Não criar DESIGN.md quando:**
- Projeto não tem design system definido
- Design é ad-hoc/evolutivo sem tokens estruturados
- Prefere documentação informal

### Estrutura do DESIGN.md

```yaml
version: alpha
name: [Nome do Design System]
description: [Descrição]
colors:
  primary: "#HEX"
  secondary: "#HEX"
  [outros tokens]
typography:
  h1:
    fontFamily: [Font]
    fontSize: [Tamanho]
    [outras propriedades]
rounded:
  sm: 4px
  md: 8px
spacing:
  xs: 4px
  sm: 8px
components:
  [component-name]:
    backgroundColor: "{colors.primary}"
    [outras propriedades]

## Overview
[Rationale do design system]

## Colors
[Explicação das cores e quando usar]

## Typography
[Explicação da tipografia]
```

### Ferramentas CLI

```bash
# Instalar
npm install @google/design.md

# Lint — validar DESIGN.md
npx @google/design.md lint DESIGN.md

# Diff — comparar versões
npx @google/design.md diff DESIGN.md DESIGN-v2.md

# Export — converter para Tailwind/tokens.json
npx @google/design.md export --format tailwind DESIGN.md > tailwind.theme.json

# Spec — output da especificação
npx @google/design.md spec
```

## 🎨 Padrões Generalistas

### Cores

Defina paleta de cores em DESIGN.md ou context-design.md. Padrões gerais:
- Usar escala de cores com primary, secondary, accent, neutral
- Garantir contraste WCAG AA mínimo (4.5:1 para texto)
- Definir semantic aliases: background, foreground, muted, border, destructive, success, warning

### Tipografia

Defina fontes em DESIGN.md ou context-design.md. Padrões gerais:
- Font heading para títulos (h1-h6)
- Font body para texto corrido
- Escala tipográfica consistente (ex: 12px, 14px, 16px, 18px, 24px, 30px, 36px, 48px)
- Line height apropriado (1.2-1.6 para legibilidade)

### Espaçamento

Usar escala de 4px (Tailwind default):
- `gap-1` / `p-1`: 4px — espaço mínimo
- `gap-2` / `p-2`: 8px — padding compacto
- `gap-3` / `p-3`: 12px — inputs compactos
- `gap-4` / `p-4`: 16px — padrão
- `gap-6` / `p-6`: 24px — seções internas
- `gap-8` / `p-8`: 32px — entre seções
- `gap-12` / `p-12`: 48px — blocos maiores
- `gap-16` / `p-16`: 64px — hero sections

### Border Radius

| Uso | Valor padrão |
|-----|-------------|
| **Botões** | 8px (`rounded-lg`) |
| **Cards** | 12px (`rounded-xl`) |
| **Inputs** | 8px (`rounded-lg`) |
| **Modais** | 16px (`rounded-2xl`) |
| **Avatares** | full (`rounded-full`) |
| **Badges** | full (`rounded-full`) |

### Sombras

```css
/* Exemplo de escala de sombras */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.07);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.08);
```

## 🎭 Design Thinking

Antes de implementar qualquer interface, responder:

1. **Propósito**: Que problema esta interface resolve? Quem usa?
2. **Tom**: Definido no design system do projeto (context-design.md)
3. **Diferencial**: O que torna esta tela memorável? Qual é o elemento que o usuário vai lembrar?
4. **Restrições**: Performance, acessibilidade, responsividade

### Direção Estética

Consulte context-design.md para direção estética específica do projeto. Padrões gerais:
- **Estilo**: Consistente com identidade do projeto
- **Layout**: Limpo, generoso em whitespace, hierarquia clara
- **Atmosfera**: Definida pelo branding do projeto
- **Movimento**: Sutil e funcional — transições suaves, sem exagero
- **Ícones**: Lucide React (consistente, clean) — nunca emojis como ícones
- **Imagens**: Consistentes com tom e estilo do projeto

## 📖 Resources

- [Google Design.md GitHub](https://github.com/google-labs-code/design.md)
- [Google Design.md Docs](https://stitch.withgoogle.com/docs/design-md/overview)
- [Design Token Community Group Spec](https://www.designtokens.org/tr/2025.10/format/)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
