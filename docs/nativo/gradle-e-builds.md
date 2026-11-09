---
sidebar_position: 2
title: Gradle e a pasta android/
description: O que continua igual e o que muda no build Android
---

# Gradle e a pasta `android/`

## Boa notícia: é o Gradle que você conhece

A pasta `android/` de um projeto RN é um **projeto Gradle Android normal** — `settings.gradle`, `build.gradle`, `app/build.gradle`, `AndroidManifest.xml`. Seu conhecimento de AGP, signing configs e flavors continua valendo.

## O que muda

| Conceito | No RN |
|---|---|
| Entry point | `MainActivity` estende `ReactActivity` (1 Activity para o app todo) |
| `Application` | `MainApplication` implementa `ReactApplication`, registra packages |
| Dependências RN | `com.facebook.react:react-android` + autolinking via `react-native.config` |
| Bundle JS em release | Empacotado em `assets/` do APK/AAB via task `createBundleReleaseJsAndAssets` |
| Hermes | Engine JS compilada — roda bytecode, não JS puro |

## Autolinking ≈ BOM + auto-discovery

```text
npm install lib-x  →  metro/gradle descobrem o código nativo da lib automaticamente
                    (≈ annotation processor registrando providers, mas sem config)
```

No iOS equivale ao CocoaPods (`pod install`); no Android é via `autolinking` no `settings.gradle`.

## Assinatura e variantes

- `signingConfigs` e `buildTypes` funcionam igual — release precisa de keystore do mesmo jeito
- Product flavors: suportados, mas o JS bundle é um só por padrão (env em JS se faz com libs como `react-native-config` — ≈ `BuildConfig` fields)

:::tip Seu checklist Android continua válido
ProGuard/R8 (`proguard-rules.pro` existe e importa para código nativo de libs), `minSdkVersion`, `targetSdk`, permissions no manifest — tudo igual.
:::

## O que anotar depois

- [ ] `react-native.config.js` e casos que exigem link manual
- [ ] Hermes vs JSC: stack traces, bytecode, `vm` flag
- [ ] App size: splits por ABI (`enableSeparateBuildPerCPUArchitecture`)
