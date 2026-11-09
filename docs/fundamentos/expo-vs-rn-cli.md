---
sidebar_position: 2
title: Expo vs React Native CLI
description: Os dois caminhos para criar um app RN
---

# Expo vs React Native CLI

## Analogia rápida

| | Android | React Native |
|---|---|---|
| Caminho "gerenciado" | Criar projeto pelo wizard do Android Studio com templates e tudo configurado | **Expo** |
| Caminho "cru" | Projeto Gradle montado na mão, controle total | **React Native CLI** (bare) |

## Expo

- Camada sobre o RN com SDK própria (câmera, notificações, sensores...) sem tocar em código nativo
- **EAS Build**: build na nuvem — você nem precisa de Android Studio/Xcode localmente
- **Expo Go**: app cliente que roda seu código via QR code (≈ Instant Run / app de preview)
- **Prebuild**: gera as pastas `android/` e `ios/` quando precisar de código nativo — não é uma prisão

## React Native CLI (bare)

- Você mantém `android/` e `ios/` desde o dia 1
- Necessário quando: biblioteca nativa customizada, integração com app existente (brownfield), requisitos nativos muito específicos

## Quando usar qual

```text
Precisa só de JS/TS e APIs comuns?          → Expo
Precisa de um módulo nativo seu?            → Expo com prebuild, ou bare
Vai embutir RN num app Android existente?   → Bare (Integration with Existing Apps)
```

:::warning Decisão não é irreversível
`npx expo prebuild` gera o código nativo a partir de um projeto Expo. O caminho de volta (bare → Expo) é bem mais difícil.
:::

## O que anotar depois

- [ ] Development builds do Expo vs Expo Go
- [ ] Config plugins (≈ plugins do Gradle que mexem no manifest)
