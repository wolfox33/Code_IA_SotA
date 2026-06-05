# Visual Anti-patterns

Use esta referência durante critique/polish de UI. Ela complementa o `SKILL.md`; não substitui o design system do projeto.

## Evitar

- UI genérica aplicada a qualquer domínio sem considerar usuário, ação principal e densidade.
- Cards dentro de cards sem necessidade estrutural clara.
- Páginas operacionais com composição de landing page quando o usuário precisa escanear, comparar ou repetir ações.
- Gradientes, blobs, orbs ou decoração competindo com conteúdo e comandos.
- Paleta dominada por uma única família de cor quando o domínio pede hierarquia, contraste ou estados claros.
- Texto hero-scale dentro de painéis, tabelas, sidebars ou cards compactos.
- Botões de texto para ações que seriam mais claras como ícone familiar com tooltip.
- Elementos interativos sem hover, focus, active, disabled ou loading coerente.
- Empty/error states que não explicam o estado nem oferecem próxima ação.
- Layouts sem dimensões estáveis para grids, toolbars, tiles, boards ou áreas de mídia.
- Texto que quebra, estoura ou oculta conteúdo em mobile ou em containers estreitos.
- Motion decorativa que não melhora orientação, feedback ou percepção de estado.
- Contraste aceitável no tema principal, mas ruim em hover, disabled, dark mode ou estados selecionados.

## Critique Rápido

Antes de concluir uma UI significativa, pergunte:

- A ação principal é óbvia em menos de cinco segundos?
- A densidade combina com o tipo de produto?
- O olhar percorre a tela na ordem certa?
- A interface continua legível em 375px e 1440px?
- Existe algum elemento visual chamando mais atenção que o workflow?
- Os estados de loading, empty e error preservam confiança?
