---
sidebar_position: 4
title: Performance
sidebar_label: ⚡ Performance
description: Profiler/Systrace vs Perf Monitor, Hermes sampling e bundle size
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Performance

O RN tem um modelo de threads que você já conhece por instinto — e é por isso que a análise de performance se parece tanto com a do Android.

## As threads (revisão que importa)

```text
JS thread    → executa seu código React, lógica, estado
UI thread    → desenha nativos, animações, gestos
Shadow/Yoga  → calcula layout
```

**Frame drop acontece quando uma dessas trava** — e cada uma trava por motivos diferentes.

## Mapeamento de ferramentas

| Android Profiler | RN | O que mede |
|---|---|---|
| CPU Profiler + frame timing | **Perf Monitor** (dev menu) | FPS da UI thread vs JS thread — jank real |
| Systrace / method tracing | **Hermes sampling profiler** | quais funções JS estão comendo CPU |
| Memory Profiler | `performance.memory` / Flipper | heap JS, alocações |
| Network Profiler | DevTools network | requests, waterfall |
| Layout Inspector (recomposition) | React DevTools Profiler | quais componentes re-renderizam e por quê |
| APK Analyzer / app size | bundle size, `npx react-native-bundle-visualizer` | tamanho do JS bundle |

## O combo prático

```bash
# Perf Monitor no app (dev menu → "Show Perf Monitor")
# Mostra dois FPS:
#   UI thread FPS  — animações, scroll nativo
#   JS thread FPS  — seu React renderizando
```

```text
UI FPS baixo  → layout pesado, muitas Views, animação na thread errada
JS FPS baixo  → renders demais, lógica pesada no render, JSON parse grande
Ambos ok mas travando → bridge saturada (chamadas nativas demais)
```

## Os vilões clássicos (e suas versões RN)

| Vilão Android | Vilão RN | Sintoma |
|---|---|---|
| Muito trabalho na main thread | Lógica pesada no render / JS thread | UI congela durante processamento |
| RecyclerView sem reciclagem | `ScrollView` + `.map` com mil itens | scroll travando |
| `findViewById` repetido | `renderItem` recriado a cada render | FlatList engasga |
| Imagens gigantes | `<Image>` sem dimensão/resize | memória e jank |
| Overdraw / View aninhadas | Views aninhadas profundas | UI FPS baixo |
| `notifyDataSetChanged` | estado global mudando tudo | re-render em cascata |

:::tip Equivalente Android
O `Perf Monitor` separando UI FPS de JS FPS é o `GPU rendering bars` do Android mostrando qual thread excedeu 16ms. E o `renderItem` instável é como recriar o `ViewHolder` a cada `onBind` — o RN reconcilia de novo.
:::

## Reduzindo re-renders — as ferramentas

```tsx
// React DevTools Profiler — mostra quem renderizou e por quê
// (o "recomposition count" do Compose)

// 1. Memo — componente puro só re-renderiza se props mudam
const Row = memo(({item}) => <Text>{item.name}</Text>);

// 2. Callbacks estáveis — não recria a função a cada render
const onPress = useCallback(() => abrir(item.id), [item.id]);

// 3. renderItem estável — defina fora ou useCallback
const renderItem = useCallback(({item}) => <Row item={item} />, []);
```

## O que anotar depois

- [ ] Flashlight — profiling de performance pra RN (mais preciso que Perf Monitor)
- [ ] `InteractionManager` — adiar trabalho pesado até as animações acabarem (≈ `doOnPreDraw`/`post`)
- [ ] RAM bundles / inline requires — carregar só o necessário no startup
- [ ] `why-did-you-render` — descobrir re-renders desnecessários

## Referências oficiais

- [React Native — Performance](https://reactnative.dev/docs/performance)
- [Flashlight — performance profiler](https://docs.flashlight.dev/)
- [Hermes — Profiling](https://hermesengine.dev/docs/profile-with-hermes)
- [Android — App performance](https://developer.android.com/topic/performance)
