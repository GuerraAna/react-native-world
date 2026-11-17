---
sidebar_position: 1
title: Mapa dos Destinos
sidebar_label: 🗺️ Mapa dos Destinos
description: Um código, três destinos — app nativo, navegador mobile e site
---

# Mapa dos Destinos

Até aqui o guia cobriu **um** destino: o app nativo (Android/iOS). Este segmento abre mais dois:

| Destino | O que é | Onde roda | Stack |
|---|---|---|---|
| **Mobile App** | App compilado nativo | Android/iOS instalado | React Native + Metro |
| **Navegador Mobile** | Mesmo código renderizando no browser | Chrome/Safari no celular | React Native Web |
| **Site** | Site com SSR, SEO e deploy web | Qualquer navegador | **Next.js** + código compartilhado |

:::tip Equivalente Android
Você já conhece essa fragmentação de destinos: `minSdk` vs `targetSdk`, phone vs tablet vs TV (`res/` qualifiers). Na web, a "qualifier" é o **ambiente de execução** — DOM existe ou não existe.
:::

## Tabela-mestra de analogias

| Conceito Android | App (RN) | Web (Next.js) |
|---|---|---|
| Activity / tela | Screen na navigation stack | `page.tsx` numa rota |
| Intent + `startActivity` | `navigation.navigate()` | `router.push()` / `<Link>` |
| Deep link / App Link | `linking` config | A própria URL |
| `AndroidManifest.xml` | `app.json` / nativo | `next.config.js` + `layout.tsx` metadata |
| WebView + `JavascriptInterface` | `react-native-webview` | O site JÁ É web — sem ponte |
| Play Store / APK | Gradle build → loja | `next build` → Vercel/hosting |
| `res/values-*/` qualifiers | `Platform.OS` + `.android.tsx` | `.web.tsx` + media queries |
| App instalável | Já é instalável | PWA (manifest + service worker) |

## O que compartilha, o que diverge

```text
COMPARTILHA (o "commonMain" do KMP)
├── lógica de negócio / regras
├── hooks e estado (Context, queries)
├── chamadas de API / camada de dados
├── validações (Zod)
└── componentes de UI *quase* todos

DIVERGE (o "androidMain/webMain")
├── navegação (React Navigation vs App Router)
├── renderização (nativo vs SSR + hidratação)
├── storage (AsyncStorage vs localStorage)
├── permissões e APIs de device
└── distribuição (loja vs deploy)
```

:::warning A pergunta-chave
Antes de escrever qualquer componente no projeto universal: **"isso depende de API de device?"** Se sim, ele entra na parte que diverge (`.native.tsx` vs `.web.tsx`) — exatamente como `expect`/`actual` no Kotlin Multiplatform.
:::

## Três estratégias na prática

1. **Só app, site separado** — o mais comum hoje. Compartilha zero UI, reaproveita só a API backend.
2. **App + web via RN Web** — Expo gera a versão browser do mesmo app (`expo start --web`). Bom pra apps que viram PWA.
3. **Projeto universal** — monorepo com app RN e site Next.js compartilhando pacotes (Solito/Tamagui). Máximo de reaproveitamento, máxima complexidade.

Este segmento cobre as três, na ordem: primeiro o motor (RN Web), depois a ponte que você já conhece (WebView), depois o site de verdade (Next.js) e por fim como juntar tudo.

## O que anotar depois

- [ ] No seu caso real: qual dos 3 destinos faz sentido primeiro?
- [ ] SEO importa? (se sim → Next.js; se não → RN Web pode bastar)
- [ ] Quanto da UI atual depende de API de device?

## Referências oficiais

- [React Native](https://reactnative.dev/)
- [Next.js — Documentação](https://nextjs.org/docs)
- [Android Developers](https://developer.android.com/)
