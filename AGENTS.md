# AGENTS.md

Documentação pessoal de estudos de React Native, escrita do ponto de
vista de uma dev Android/Kotlin. Site estático com [Docusaurus](https://docusaurus.io).

## Fluxo de trabalho

- **Commitar e fazer push direto na `main`** — sem PR, sem branch de feature.
- Deploy automático no GitHub Pages via `.github/workflows/deploy.yml`.

## Comandos

```bash
npm install        # dependências
npm start          # dev server (porta 3000, baseUrl /react-native-world/)
npm run build      # build de produção — rodar antes de commitar para validar
npm run serve      # serve o build localmente
npm run typecheck  # checa TS
```

## Convenções de conteúdo (docs/)

- Cada pasta em `docs/` = um segmento na sidebar (ordem via `_category_.json`)
- Páginas usam `sidebar_label` com emoji; título limpo no `title`
- Tabelas de mapeamento `Android/Kotlin → React Native` em cada página
- Abas `<Tabs>`/`<TabItem>` para código comparativo Kotlin vs TypeScript
- Callouts `:::tip Equivalente Android` para pontes mentais
- Seção "O que anotar depois" ao final das páginas como checklist de estudo
- Front matter com dois-pontos no `title` precisa de aspas (YAML)

## Design (src/css/custom.css + src/pages/)

- Tema "game": pixel font (Press Start 2P) em títulos/badges, cards LVL,
  barras de XP, sombras offset retro
- Paleta de transição: Android `#3DDC84`/`#073042` → React `#61DAFB`/`#20232A`
- Ícones da navbar via CSS `mask` + data-URI SVG (evitar `viewBox` negativo)
- Cuidado: `.navbar { color: #fff }` herda para `.navbar-sidebar` — cores da
  sidebar mobile precisam de override explícito (ver seção mobile no CSS)
- Todo elemento novo precisa funcionar nos dois temas (light e dark)

## Pegadinhas responsivas (aprendidas em 2026-11)

- O breakpoint mobile do Docusaurus é fixo em **996px no JS e no CSS**
  (`useWindowSize`) — o drawer `.navbar-sidebar` NÃO renderiza acima disso.
  Não dá pra antecipar o hamburger com CSS; a faixa 997–1200px precisa
  COMPRIMIR os itens para caberem.
- Especificidade: `.navbar__items .navbar__link{display:inline-flex}` (0-2-0)
  sobrescreve o `.navbar__item{display:none}` nativo (0-1-0) — links ficavam
  visíveis no mobile. O hide é reforçado com seletor mais específico
  (`.navbar .navbar__items .navbar__item`) no bloco `@media (max-width:996px)`.
- Plugin de busca: ≤576px o input colapsa num botão-ícone (expande no focus).
  Não esconder o `svg` da lupa nessa faixa — senão vira uma caixa vazia.
  O container fica `position:absolute` na direita: reservar espaço em
  `.navbar__items--right` para não sobrepor o título.
- Dois glows radiais no hero (`::before`/`::after`) criam "costura" vertical
  visível — usar um único `linear-gradient` cobrindo o hero.
- Validar mobile com Playwright real (`devices['Pixel 7']`,
  `devices['iPhone SE']`) — Edge headless força viewport mínimo ~477px.
- swizzle usado: `src/theme/Navbar/MobileSidebar/SecondaryMenu` injeta os
  itens da navbar no topo do drawer + `.navbar-sidebar__divider`.
