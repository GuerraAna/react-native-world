---
sidebar_position: 1
title: TurboModules em Kotlin
sidebar_label: 🤖 TurboModules
description: Escrevendo módulos nativos chamados pelo JS — seu superpoder
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# TurboModules em Kotlin

> **Este é o seu diferencial**: a maioria dos devs RN não sabe Kotlin. Você sabe — e pode escrever a camada nativa que falta no ecossistema.

## Quando escrever código nativo

- API do Android sem biblioteca RN existente (ex: API muito nova ou vendor-specific)
- Performance: processamento pesado que não cabe na thread JS
- Reusar SDK Android existente da empresa

## Anatomia (nova arquitetura)

```text
spec em TypeScript  --Codegen-->  interface gerada  -->  impl em Kotlin  -->  JS chama direto via JSI
```

<Tabs>
<TabItem value="ts" label="Spec (TypeScript)">

```ts
// NativeLocalStorage.ts — a spec alimenta o Codegen
import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  setItem(value: string, key: string): void;
  getItem(key: string): string | null;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeLocalStorage');
```

</TabItem>
<TabItem value="kotlin" label="Impl (Kotlin)">

```kotlin
// NativeLocalStorageModule.kt — extends da classe gerada pelo Codegen
class NativeLocalStorageModule(context: ReactApplicationContext) :
    NativeLocalStorageSpec(context) {

    override fun getName() = NAME

    override fun setItem(value: String, key: String) {
        prefs.edit().putString(key, value).apply()
    }

    override fun getItem(key: String): String? =
        prefs.getString(key, null)

    companion object { const val NAME = "NativeLocalStorage" }
}
```

</TabItem>
</Tabs>

## Conceitos que você já conhece

| No módulo nativo | Equivale a |
|---|---|
| `ReactApplicationContext` | `Context` (é um `ContextWrapper`!) |
| `ReactPackage` + `PackageList` | Registrar componente no DI/manual |
| `@ReactMethod` (arquitetura antiga) | Métodos expostos via reflection (≈ JNI names) |
| `Promise`/`Callback` params | Continuation/result callback de volta ao JS |
| `RCTDeviceEventEmitter` | `LocalBroadcast` JS→nativo (eventos) |

:::warning Threads
Métodos chamados do JS rodam na **native modules thread**, não na main — mesma regra de sempre: UI na main thread, trabalho pesado fora dela.
:::

## O que anotar depois

- [ ] Fabric components: expor uma `View` nativa customizada
- [ ] Eventos nativo→JS (DeviceEventEmitter vs Flow)
- [ ] Empacotar como lib (`create-react-native-library`)
