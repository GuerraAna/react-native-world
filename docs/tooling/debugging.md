---
sidebar_position: 1
title: Debugging
sidebar_label: 🐛 Debugging
description: Logcat, breakpoints e profiling no mundo RN
---

# Debugging

## Mapeamento de ferramentas

| Android | React Native |
|---|---|
| Logcat | `console.log` → Metro logs + `adb logcat` (logs nativos continuam no Logcat!) |
| Breakpoints no IDE | React Native DevTools (Chrome DevTools) / breakpoints no Hermes |
| Layout Inspector | React DevTools inspector / DevTools element picker |
| Network Profiler | DevTools network tab, Flipper, ou inspeção nativa |
| RedBox/exception screen | **LogBox** (telas vermelha/amarela) |
| StrictMode | `<React.StrictMode>` |

## O combo prático

```bash
adb logcat *:S ReactNative:V ReactNativeJS:V   # filtra logs do RN no Logcat
npx react-native log-android                   # atalho para o acima
```

- **React Native DevTools** (antiga dupla Flipper + Hermes debugger): breakpoints, console, network, profiler
- **Element inspector**: `Cmd+D` no emulador → "Toggle Inspector" (≈ Layout Inspector)
- **`adb shell input keyevent 82`**: abre o dev menu sem chacoalhar o device

:::tip Seu conhecimento nativo continua útil
Crashes nativos (de libs, TurboModules) aparecem como stack traces Java/Kotlin normais no Logcat — você vai debugar isso melhor que muita gente do time RN.
:::

## O que anotar depois

- [ ] Performance: `Perf Monitor` no dev menu (FPS JS vs UI)
- [ ] React DevTools Profiler ≈ Compose Layout Inspector/recomposition counts
- [ ] Debug release build: `variant.release` no device
