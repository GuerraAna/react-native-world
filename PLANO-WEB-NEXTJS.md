# Plano de ação — Segmento Web & Next.js

> **Status:** proposta para revisão. Nenhuma alteração na doc existente.
> **Branch:** `docs/web-nextjs-plan`

## Objetivo

Expandir a doc de "React Native para devs Android" para **três destinos de
entrega**, mantendo a mesma persona (dev Android nativo/Kotlin):

| Destino | O que é | Equivalente no mundo Android que o leitor já conhece |
|---|---|---|
| **Mobile App** | RN compilando para Android/iOS nativo | O app que ele já escreve (o que a doc cobre hoje) |
| **Navegador Mobile** | O mesmo código renderizando no browser (React Native Web / PWA) | Chrome no Android, WebView dentro de apps |
| **Site Web** | Site/SSR com Next.js consumindo código compartilhado | "O site institucional" + App Links |

O gancho pedagógico: o leitor vem de WebView/Android — a migração mental é
**"o app nativo aprende a viver na web"**, não "aprender web do zero".

## Onde encaixa na doc atual

Hoje a sidebar tem 9 segmentos (intro + 8 categorias). Proposta: **um novo
segmento `docs/web/`** ao final, posição 10 — zero mudanças nos
`_category_.json` existentes.

```
docs/web/
├── _category_.json          → "🌐 RN na Web", generated-index "/web"
├── mapa-dos-destinos.md     → a página de enquadramento (ler primeiro)
├── react-native-web.md
├── webview-e-navegadores.md
├── nextjs-fundamentos.md
├── renderizacao-ssr-ssg.md
├── projeto-universal.md
├── navegacao-e-links.md
└── deploy-e-pwa.md
```

### Páginas propostas (ordem pedagógica)

1. **`mapa-dos-destinos.md`** — "Um código, três destinos". Framing geral:
   app nativo vs browser mobile vs site; quando cada um faz sentido; a
   pergunta-chave "o que compartilha e o que diverge". Tabela-mestra de
   mapeamento (Activity ↔ page, Intent/Deep Link ↔ URL, WebView ↔ iframe...).
2. **`react-native-web.md`** — Como `<View>`/`<Text>` viram `<div>`/`<span>`.
   O que funciona, o que não funciona (APIs nativas), `react-native-web`
   por baixo do capô, suporte do Expo (`expo start --web`).
3. **`webview-e-navegadores.md`** — O ponto de familiaridade do leitor:
   Android `WebView` + `JavascriptInterface` vs `react-native-webview` vs
   abrir no browser. Quando embutir web no app vs quando migrar pra web de
   vez. Bridge JS↔nativo (postMessage ≈ JavascriptInterface).
4. **`nextjs-fundamentos.md`** — Next.js para quem nunca viu web: por que é
   o padrão da comunidade para React na web, App Router, roteamento por
   arquivos (`app/` ≈ NavGraph declarativo), server vs client components
   (≈ "o que roda no servidor vs no device").
5. **`renderizacao-ssr-ssg.md`** — SSR/SSG/ISR/CSR e hidratação. Analogia:
   "a tela já chega desenhada" vs "skeleton + fetch" que ele conhece de
   Android; trade-offs (SEO, TTFB, interatividade).
6. **`projeto-universal.md`** — A peça central: monorepo compartilhando
   código entre app RN e site Next.js. Opções da comunidade: **Solito**
   (starter universal Expo+Next), **Tamagui** (UI cross-platform),
   extensões `.web.tsx`/`.native.tsx` (conecta com `tooling/codigo-por-plataforma`
   — item já listado no "O que anotar depois" daquela página!).
7. **`navegacao-e-links.md`** — React Navigation (app) vs App Router (web),
   deep links universais: URL ↔ Android App Links/intent-filter — o
   mapeamento mais bonito pra quem vem de nativo.
8. **`deploy-e-pwa.md`** — Build de produção web, Vercel/hosting, PWA
   (manifest + service worker ≈ "instalável sem Play Store"), SEO/metadata
   básico — conceito novo pra dev de app.

## Convenções a reaproveitar (zero invenção de formato)

- Tabela `Android/Kotlin → Web/Next.js` em cada página
- `<Tabs>` comparativos — agora com 3 valores quando fizer sentido
  (`kotlin` / `rn` / `web`)
- `:::tip Equivalente Android` para pontes mentais
- `:::warning` para "isso NÃO existe na web" / "isso NÃO existe no app"
- "O que anotar depois" ao final de cada página
- `sidebar_label` com emoji, `title` limpo, `description` curta

## Fontes da comunidade (seguir, não inventar)

- **Next.js Learn** (nextjs.org/learn) — estrutura didática oficial
- **React Native Web** (necolas.github.io/react-native-web) — doc oficial
- **Solito** (solito.dev) — starter universal Expo + Next.js, referência
  da comunidade para "um codebase, app+web"
- **Tamagui** (tamagui.dev) — UI kit cross-platform com `tamagui start`
- **Expo docs** (docs.expo.dev) — `expo start --web`, Expo Router, PWA
- **react-native-webview** — doc oficial da WebView no RN

## Fases de execução

- [ ] **Fase 0 — Pesquisa**: rodar os starters (Solito/Tamagui) e o
  `expo start --web` para validar com exemplos reais antes de escrever
- [ ] **Fase 1 — Esqueleto**: `docs/web/_category_.json` + `mapa-dos-destinos.md`
  (a página-framing valida a narrativa antes do resto)
- [ ] **Fase 2 — Ponte**: `react-native-web.md` + `webview-e-navegadores.md`
  (parte mais próxima do conhecimento atual do leitor)
- [ ] **Fase 3 — Next.js**: `nextjs-fundamentos.md` + `renderizacao-ssr-ssg.md`
- [ ] **Fase 4 — Universal**: `projeto-universal.md` + `navegacao-e-links.md`
  + `deploy-e-pwa.md`
- [ ] **Fase 5 — Integração**: atualizar tabela de segmentos em `intro.md`
  e (opcional) card no homepage; `npm run build` + `typecheck`; revisão
  final → merge na `main`

## Decisões em aberto (pra revisar antes da Fase 1)

1. **Expo Router vs React Navigation**: incluir Expo Router na página de
   navegação universal? É a recomendação atual da comunidade para
   app+web (file-based, igual ao Next), mas adiciona uma camada.
2. **Projeto-exemplo**: o plano pressupõe um exemplo mínimo compartilhado
   entre app+web. Criar um repo-companheiro ou snippets inline bastam?
3. **Ordem do segmento**: posição 10 (depois de Tooling) ou antes de
   Tooling? Proposta atual: 10, para não reordenar nada existente.
4. **Escopo PWA**: apenas "instalável" básico ou aprofundar em service
   workers/offline? Proposta: básico — PWA completo é um segmento futuro.
