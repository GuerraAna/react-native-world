---
sidebar_position: 5
title: CI/CD e Publicação
sidebar_label: 🚢 CI/CD e Publicação
description: fastlane/Play Console vs EAS Build/Submit e deploy web — o pipeline de entrega
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CI/CD e Publicação

Você já conhece o pipeline Android: build → assinar → upload → review → rollout. No RN e na web o formato muda, mas o ciclo é o mesmo. A diferença: na web o "deploy" é instantâneo; no app, a loja continua sendo o gargalo.

## Mapeamento do pipeline

| Android | React Native (app) | Web (Next.js) |
|---|---|---|
| `./gradlew assembleRelease` | **EAS Build** (cloud) ou build local | `next build` + deploy |
| `fastlane` / scripts de release | **EAS Submit** (upload pra loja) | push = deploy automático |
| `signingConfig` + keystore | EAS credenciais / `credentials.json` | — (HTTPS é automático) |
| Play Console internal/beta/prod | EAS channels + track do Play | preview deploys por branch/PR |
| Rollout percentual | staged rollout no Play Console | feature flags / edge config |
| `versionCode`/`versionName` bump | `app.json` version + autoIncrement | deploy por commit (imutável) |

## O pipeline do app — EAS (Expo)

<Tabs>
<TabItem value="gradle" label="Android (Gradle + fastlane)">

```bash
./gradlew bundleRelease
fastlane supply --track internal --aab app-release.aab
# ou manual no Play Console
```

</TabItem>
<TabItem value="eas" label="EAS Build + Submit">

```bash
# Build na nuvem — sem Android Studio/Xcode local
eas build --platform android --profile production

# Upload pra Play Store — o "fastlane supply" gerenciado
eas submit --platform android

# Preview (internal): distribui APK direto por QR/link
eas build --profile preview --platform android
```

</TabItem>
</Tabs>

```json
// eas.json — os "build profiles" ≈ buildTypes/flavors
{
  "build": {
    "preview": {"distribution": "internal"},
    "production": {"autoIncrement": true}
  }
}
```

## O pipeline web — deploy contínuo

```text
git push → CI roda (lint/test/build) → deploy automático
                ↓
      PR/branch = preview deploy (URL única)
      main      = produção
```

Vercel/Netlify conectam o repo e fazem isso sozinhos — **sem "review"** como na loja. O rollback é trocar o deploy ativo, não des-publicar uma versão.

## CI na prática — GitHub Actions

```yaml
# .github/workflows/ci.yml — lint + test + build
name: CI
on: [push]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint && npm test
      - run: npm run build   # app: eas build | web: next build
```

:::tip Equivalente Android
EAS Build é o **Gradle Enterprise remoto** — o build roda na nuvem com cache e credenciais gerenciadas. E o preview deploy da web é como ter um **internal track por branch** — cada PR tem sua "build de teste" numa URL.
:::

## A diferença que mais importa

| Aspecto | App | Web |
|---|---|---|
| **Quem aprova** | Loja (horas/dias de review) | Ninguém — deploy instantâneo |
| **Rollback** | Não dá — só nova versão | Trocar deploy ativo (segundos) |
| **Distribuição** | Binário na loja | URL pública |
| **Versão do usuário** | A que ele atualizou | Sempre a mais recente |

## O que anotar depois

- [ ] EAS Update (OTA) — atualizar JS sem passar pela loja (≈ dinâmico)
- [ ] GitHub Actions matrix: build Android + iOS + testes
- [ ] App signing pelo EAS vs keystore próprio (`credentials.json`)
- [ ] `eas update` vs app store review — o que pode mudar via OTA

## Referências oficiais

- [EAS Build](https://docs.expo.dev/build/introduction/)
- [EAS Submit](https://docs.expo.dev/submit/introduction/)
- [EAS Update (OTA)](https://docs.expo.dev/eas-update/introduction/)
- [Next.js — Deploying](https://nextjs.org/docs/app/building-your-application/deploying)
