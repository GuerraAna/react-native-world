---
sidebar_position: 9
title: Deploy e PWA
sidebar_label: 🚀 Deploy e PWA
description: Build web, Vercel/hosting, PWA instalável e SEO — a "Play Store" da web
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deploy e PWA

No Android, "distribuir" é Gradle → APK/AAB → Play Store. Na web é mais simples e mais estranho ao mesmo tempo: **build → hospedar → URL pública**. E a web tem seu próprio "app instalável": o PWA.

## O pipeline de deploy

| Android | Web (Next.js) |
|---|---|
| `./gradlew assembleRelease` | `next build` |
| AAB → Play Console | `/.next` → servidor/hosting |
| Revisão da loja | Deploy instantâneo (sem revisão!) |
| Rollout percentual | Deploy previews + rollback instantâneo |
| `versionCode`/`versionName` | Deploy por commit/branch |

```bash
# build de produção
npm run build   # gera .next/ otimizado

# rodar local o build de produção
npm start       # serve a versão compilada
```

## Onde hospedar — a "Play Store" é qualquer lugar

<Tabs>
<TabItem value="vercel" label="Vercel (padrão)">

```bash
npm i -g vercel
vercel          # deploy direto do diretório
# ou conectar o repo no GitHub — push = deploy
```

- Criado pelos mesmos autores do Next.js — integração perfeita
- Preview deploy automático por PR/branch
- Edge network global, SSL automático
- **Grátis** pra projetos pessoais (como esta doc no GitHub Pages)

</TabItem>
<TabItem value="outras" label="Alternativas">

- **Netlify / Cloudflare Pages** — concorrentes diretos, mesmo fluxo
- **GitHub Pages** — só estático (`next export` ou SSG)
- **Self-host** — `next build` + `next start` num VPS/Docker
- **Expo web export** — `npx expo export --platform web` gera estático

</TabItem>
</Tabs>

## PWA — o "app instalável" da web

**Progressive Web App** = site que se comporta como app: ícone na home screen, splash screen, funciona offline, aparece na lista de apps. É o "meio termo" que o usuário instala **sem passar pela loja**.

| Conceito Android | PWA |
|---|---|
| `AndroidManifest.xml` | `manifest.json` (ícone, nome, tema, display) |
| Serviço em background | **Service Worker** (cache, offline, push) |
| App instalado | "Adicionar à tela inicial" → ícone |
| Update via loja | Atualiza sozinho no próximo acesso |

```json
// public/manifest.json — o "AndroidManifest" da web
{
  "name": "Meu App",
  "short_name": "App",
  "start_url": "/",
  "display": "standalone",      // sem barra do browser
  "background_color": "#073042",
  "theme_color": "#3DDC84",
  "icons": [{"src": "/icon.png", "sizes": "192x192"}]
}
```

:::tip Equivalente Android
Service Worker ≈ um `Service` que roda **fora** da página, interceptando requisições de rede. É o que permite cache/offline — o "OkHttp cache + interceptor" só que controlando *toda* a rede da página.
:::

## SEO — a "descoberta" que a Play Store fazia por você

No app, a loja indexava seu título e descrição. Na web, **você é responsável**:

```tsx
// app/layout.tsx ou page.tsx
export const metadata = {
  title: 'React Native World',
  description: 'Guia RN para devs Android/Kotlin',
  openGraph: {images: ['/og.png']}, // preview no WhatsApp/Twitter
};
```

```text
sitemap.xml      → lista de URLs pro Google
robots.txt       → o que pode/não pode indexar
metadata         → title/description por página
Open Graph       → card bonito ao compartilhar link
```

:::warning O checklist do "app instalável" pra web
- [ ] HTTPS (obrigatório pra PWA e SEO)
- [ ] `manifest.json` linkado no `<head>`
- [ ] Service Worker registrado (pra "instalável" e offline)
- [ ] Responsivo (Google penaliza site não-mobile)
- [ ] `sitemap.xml` + `robots.txt`
:::

## O que anotar depois

- [ ] `next-pwa` ou `@ducanh2912/next-pwa` — PWA em Next.js
- [ ] Service Worker lifecycle (install → activate → fetch)
- [ ] Web Share API ≈ `Intent.ACTION_SEND`
- [ ] Push notifications web vs FCM (Web Push Protocol)
- [ ] Lighthouse audit — o "pre-launch report" da web

## Referências oficiais

- [Next.js — Deploying](https://nextjs.org/docs/app/building-your-application/deploying)
- [web.dev — Learn PWA](https://web.dev/learn/pwa)
- [Expo — Publish websites](https://docs.expo.dev/distribution/publishing-websites/)
