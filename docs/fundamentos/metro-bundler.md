---
sidebar_position: 3
title: Metro Bundler
description: O servidor de build do React Native
---

# Metro Bundler

## O que é

O **Metro** é o bundler do React Native: ele resolve o grafo de dependências JS/TS e empacota tudo num bundle que a engine (Hermes) executa.

## Analogias com o mundo Android

| Android | React Native |
|---|---|
| Gradle build + dex/aapt | Metro gera o bundle JS |
| `assembleDebug` incremental | Metro transforma só o que mudou |
| Apply Changes / Instant Run | **Fast Refresh** (hot reload de verdade) |
| `gradlew` rodando em background | Metro server rodando na porta 8081 |

## Na prática

```bash
npx react-native start          # sobe o Metro (≈ dev server)
npx react-native run-android    # build nativo + instala + conecta no Metro
```

O app debug baixa o bundle JS **do servidor Metro** em vez de embutir no APK — por isso mudanças em JS aparecem sem rebuild nativo.

:::tip Equivalente Android
Só rebuilda o `android/` quando mexer em: dependências nativas, `AndroidManifest.xml`, `build.gradle`, ou código Kotlin/Java. Mudança em `.tsx`? Só salva e vê na hora (Fast Refresh).
:::

## O que anotar depois

- [ ] Hermes bytecode em release (bundle virá pré-compilado)
- [ ] Source maps e debugging via Metro
- [ ] `npx react-native start --reset-cache` — o "clean project" do RN
