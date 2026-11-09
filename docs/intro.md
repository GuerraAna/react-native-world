---
sidebar_position: 1
slug: /intro
title: Introdução
sidebar_label: 👋 Introdução
description: Ponto de partida do guia React Native para devs Android/Kotlin
---

# React Native World

Documentação pessoal de estudos: **React Native do ponto de vista de quem já desenvolve Android com Kotlin**.

## Introdução ao React Native

React Native é um framework de desenvolvimento mobile de código aberto criado pelo Facebook (atual Meta) que permite criar aplicativos para Android e iOS utilizando JavaScript e React.

Diferente de aplicações híbridas que executam dentro de um navegador embarcado (WebView), o React Native utiliza **componentes nativos da plataforma**, proporcionando uma experiência mais próxima de aplicativos desenvolvidos nativamente.

Uma das principais vantagens é o conceito de *"write once, run anywhere"*, permitindo que grande parte do código seja compartilhada entre plataformas, reduzindo tempo de desenvolvimento e manutenção.

## Principais características

- Desenvolvimento multiplataforma para Android e iOS
- JavaScript/TypeScript + React
- Componentes nativos (não WebView)
- Reutilização de código entre plataformas
- Fast Refresh (≈ Apply Changes do Android Studio, só que melhor)
- Ecossistema grande e comunidade ativa

## Como este guia está organizado

Cada seção parte de um conceito que você já conhece do **Android/Kotlin** e mapeia para o equivalente no **React Native**:

| Segmento | Analogia principal |
|---|---|
| Fundamentos | JNI, Gradle, build system |
| Linguagem | Kotlin → TypeScript |
| UI e Layout | Views/XML/Compose → componentes + Flexbox |
| Ciclo de vida e Estado | Activity/ViewModel/Flow |
| Navegação | Intents/NavGraph → React Navigation |
| Dados | Retrofit/Room/SharedPreferences |
| Mundo Nativo | Seu superpoder: TurboModules em Kotlin |
| Tooling | Logcat, JUnit, Espresso |

:::tip Convenção deste guia
Sempre que houver um equivalente direto no mundo Android, ele aparecerá em uma caixa como esta, ou em abas comparativas **Kotlin | TypeScript**.
:::
