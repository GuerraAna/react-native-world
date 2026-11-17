---
sidebar_position: 5
title: Animações e Gestos
sidebar_label: ✨ Animações e Gestos
description: ObjectAnimator/MotionEvent vs Animated, Reanimated e Gesture Handler
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Animações e Gestos

Animações e toque são onde a Bridge antiga mais sofria — e onde a nova arquitetura mais brilha. Três bibliotecas cobrem quase tudo, cada uma com um papel diferente.

## Mapeamento

| Android | React Native | Uso |
|---|---|---|
| `ViewPropertyAnimator` (`view.animate()`) | **Animated API** (built-in) | animações simples, fade, translate |
| `ObjectAnimator` / `ValueAnimator` | **Reanimated** | animações complexas, 60fps na UI thread |
| `MotionEvent` / `onTouchEvent` | `Pressable` / `onResponder*` | toques simples |
| `GestureDetector` / `ScaleGestureDetector` | **Gesture Handler** | pinch, pan, swipe, long press |
| `MotionLayout` / physics | Reanimated `withSpring` | animações com física |
| `Choreographer` / frame callback | Reanimated worklets | código rodando por frame na UI thread |

## As três camadas

```text
Animated (built-in)    → simples, declarativa, roda na JS thread*
Reanimated (lib)       → worklets rodam NA UI thread — animação não trava com JS ocupado
Gesture Handler (lib)  → gestos nativos de verdade (pinch, pan) — substitui o sistema de toque do RN
```

\* `useNativeDriver: true` joga parte da animação pro nativo, mas com limitações (só props não-layout).

<Tabs>
<TabItem value="kotlin" label="Kotlin (View animation)">

```kotlin
view.animate()
    .translationY(0f)
    .alpha(1f)
    .setDuration(300)
    .start()
```

</TabItem>
<TabItem value="rn" label="Reanimated">

```tsx
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';

const offset = useSharedValue(100);
offset.value = withSpring(0); // roda na UI thread — não trava

<Animated.View style={{transform: [{translateY: offset.value}]}} />
```

</TabItem>
</Tabs>

## Por que Reanimated existe (o problema que você reconhece)

No modelo antigo, a animação era calculada na **JS thread** — se o JS estivesse ocupado (fetch, parse de JSON), a animação **engasgava**. É exatamente o problema de fazer cálculo de frame na thread errada — como processar animação num callback de rede em vez do `Choreographer`.

O Reanimated resolve com **worklets**: funções marcadas que rodam direto na UI thread, sem passar pela bridge.

```tsx
// 'worklet' implícita — essa função roda na UI thread nativa
const style = useAnimatedStyle(() => ({
  transform: [{scale: withSpring(pressed.value ? 1.2 : 1)}],
}));
```

:::tip Equivalente Android
`useSharedValue` ≈ `MutableState` do Compose que dispara recomposição — mas aqui dispara **re-render na UI thread nativa**, não na JS. Por isso animações Reanimated ficam fluidas mesmo com a JS thread ocupada.
:::

## Gestos nativos de verdade

```tsx
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const pinch = Gesture.Pinch().onUpdate((e) => {
  scale.value = e.scale; // ≈ ScaleGestureDetector.onScale
});

<GestureDetector gesture={pinch}>
  <Animated.View style={style} />
</GestureDetector>
```

## O que anotar depois

- [ ] `useNativeDriver` — quando ajuda, quando não é suportado
- [ ] Reanimated 3/4: shared values vs Animated.Value
- [ ] `LayoutAnimation` — animações de layout automáticas (≈ `animateLayoutChanges`)
- [ ] Gesture Handler `Gesture.Simultaneous`/`Exclusive` ≈ combinações de detectores

## Referências oficiais

- [React Native — Animations](https://reactnative.dev/docs/animations)
- [Reanimated — Documentação](https://docs.swmansion.com/react-native-reanimated/)
- [Gesture Handler — Documentação](https://docs.swmansion.com/react-native-gesture-handler/)
