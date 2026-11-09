---
sidebar_position: 1
title: "Arquitetura: Bridge vs Nova Arquitetura"
description: Como o JavaScript se comunica com o código nativo
---

# Arquitetura

## A analogia com JNI

No Android, quando você chama código nativo (C/C++) a partir do Kotlin, usa **JNI** — uma ponte que serializa chamadas entre a JVM e o mundo nativo. O React Native tem um conceito parecido, só que invertido: o **JavaScript** precisa chamar APIs nativas (Android/iOS).

## Arquitetura antiga: a Bridge

```
JS Thread  --(JSON serializado, assíncrono)-->  Bridge  -->  Native Modules (Java/Kotlin/Obj-C)
```

- Todo tráfego JS↔nativo passava por uma fila serializada em JSON
- Assíncrono por natureza → gargalo em animações e chamadas frequentes
- 3 threads principais: **JS thread**, **UI/main thread**, **shadow thread** (layout/Yoga)

## Nova arquitetura (padrão atual)

| Peça | Papel | Analogia Android |
|---|---|---|
| **JSI** (JS Interface) | Interface C++ que permite chamadas **síncronas** e diretas JS↔nativo, sem serialização | JNI moderno / AIDL direto |
| **Fabric** | Novo sistema de renderização de UI | Equivale à troca do sistema de Views pelo Compose |
| **TurboModules** | Substitui Native Modules com carregamento lazy | Como módulos dinâmicos com inicialização sob demanda |
| **Codegen** | Gera bindings type-safe a partir de specs TypeScript | O KSP/kapt gerando código a partir de anotações |
| **Yoga** | Engine de layout Flexbox multiplataforma | LayoutInflater + measure/layout pass |

:::tip Equivalente Android
Pense na **Bridge** como um `Handler`/`Messenger` trocando JSON entre processos, e no **JSI** como chamar código nativo via JNI com referência direta de memória — sem marshalling.
:::

## O que anotar depois

- [ ] Como funciona o loop de render do Fabric
- [ ] Hermes (engine JS) vs JVM/ART — garbage collection, startup
- [ ] Quando a Bridge antiga ainda aparece (bibliotecas legadas)
