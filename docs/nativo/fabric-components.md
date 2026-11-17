---
sidebar_position: 4
title: Fabric Components
sidebar_label: 🧩 Fabric Components
description: Expor uma View nativa customizada para o JS — o TurboModule da UI
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Fabric Components

TurboModule expõe **funções** nativas pro JS. **Fabric Component** expõe uma **View nativa inteira** — um componente de UI customizado que renderiza Views de verdade (mapa, player de vídeo, widget complexo). Se o TurboModule é "chamar código nativo", o Fabric é "embute View nativa na árvore React".

## Quando escrever um

- Componente nativo complexo sem equivalente RN (mapa customizado, SurfaceView, player)
- Lib existente no Android que você quer expor como `<MeuComponente />`
- Performance: UI que precisa do pipeline nativo (renderização customizada)

## Anatomia (nova arquitetura)

```text
spec .tsx (props tipadas) --Codegen--> interface gerada --> impl Kotlin --> <MeuComponente /> no JS
```

<Tabs>
<TabItem value="ts" label="Spec (TypeScript)">

```tsx
// RTNMyNativeView.ts — a spec define as props
import type {ViewProps} from 'react-native';
import type {DirectEventHandler} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

interface NativeProps extends ViewProps {
  texto?: string;
  onChange?: DirectEventHandler<{value: string}>;
}

export default codegenNativeComponent<NativeProps>('RTNMyNativeView');
```

</TabItem>
<TabItem value="kotlin" label="Impl (Kotlin)">

```kotlin
// MyNativeViewManager.kt — o "Adapter" da View nativa
@ReactModule(name = MyNativeViewManager.NAME)
class MyNativeViewManager :
    SimpleViewManager<MyNativeView>(),
    RTNMyNativeViewManagerInterface<MyNativeView> {

    override fun getName() = NAME

    override fun createViewInstance(context: ThemedReactContext) =
        MyNativeView(context) // sua View Android normal

    @ReactProp(name = "texto")
    override fun setTexto(view: MyNativeView, value: String?) {
        view.setText(value)
    }

    companion object { const val NAME = "RTNMyNativeView" }
}
```

</TabItem>
</Tabs>

## Conceitos que você já conhece

| No Fabric | Equivale a |
|---|---|
| `SimpleViewManager<T>` | Adapter/Controller da View — o "como criar e configurar" |
| `@ReactProp(name = "x")` | setter exposto ao JS — ≈ custom attribute no `attrs.xml` |
| `ThemedReactContext` | `Context` (é um ContextWrapper) |
| `DirectEventHandler` | callback/evento emitido da View nativa → JS |
| codegenNativeComponent | O "contract" — gera a interface type-safe |

## Uso no JS

```tsx
import RTNMyNativeView from './specs/RTNMyNativeView';

<RTNMyNativeView
  texto="Olá do Kotlin"
  onChange={(e) => console.log(e.nativeEvent.value)}
  style={{width: 200, height: 100}}
/>
```

:::tip Equivalente Android
Pense no `ViewManager` como um `RecyclerView.Adapter` invertido: em vez de você chamar métodos na View, o JS envia **props** e o manager aplica. E a spec TypeScript é o `attrs.xml` + `styleable` — o contrato entre XML e código.
:::

## O que anotar depois

- [ ] `codegenConfig` no package.json — onde o Codegen procura specs
- [ ] Commands (`receiveCommand`) — chamadas imperativas JS → View nativa
- [ ] Interoperabilidade: como libs legadas (antigo ViewManager) coexistem
- [ ] `create-react-native-library` — scaffold de uma lib com Fabric

## Referências oficiais

- [React Native — Fabric Native Components](https://reactnative.dev/docs/fabric-native-components-introduction)
- [React Native — Native UI Components](https://reactnative.dev/docs/native-components-android)
- [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
