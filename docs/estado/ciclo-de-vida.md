---
sidebar_position: 1
title: Ciclo de Vida
sidebar_label: ♻️ Ciclo de Vida
description: onCreate/onResume/onDestroy vs mount/useEffect/AppState
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Ciclo de Vida

## Dois ciclos diferentes

No Android, você gerencia o ciclo de vida de **Activity/Fragment**. No RN, há dois níveis:

1. **Componente**: mount → update → unmount (≈ view lifecycle)
2. **App**: active/background/inactive via `AppState` (≈ `onResume`/`onPause` do `ProcessLifecycleOwner`)

## Mapeamento

| Android | React Native |
|---|---|
| `onCreate` / `onViewCreated` | mount — corpo do componente + `useEffect(..., [])` |
| `onDestroy` / `onDestroyView` | função de cleanup retornada pelo `useEffect` |
| `onStart`/`onStop` | `AppState` (nível app) ou focus do React Navigation |
| `onResume`/`onPause` | `AppState` `active`/`background` |
| `savedInstanceState` | não existe equivalente direto — estado é gerenciado por você |
| `rememberSaveable` (Compose) | bibliotecas de persistência de estado |

## useEffect: o coração

<Tabs>
<TabItem value="kotlin" label="Kotlin (Fragment)">

```kotlin
override fun onViewCreated(view: View, b: Bundle?) {
    observer = startObserving()
}
override fun onDestroyView() {
    observer.stop()
}
```

</TabItem>
<TabItem value="rn" label="React Native">

```tsx
useEffect(() => {
  const observer = startObserving();
  return () => observer.stop(); // cleanup ≈ onDestroyView
}, []); // [] = só no mount/unmount
```

</TabItem>
</Tabs>

```tsx
useEffect(() => {
  // roda no mount E sempre que `query` mudar
}, [query]); // ≈ observe(query) + distinctUntilChanged
```

## AppState ≈ ProcessLifecycleOwner

```tsx
useEffect(() => {
  const sub = AppState.addEventListener('change', (state) => {
    if (state === 'active') refresh();   // ≈ onResume
    if (state === 'background') pause(); // ≈ onPause
  });
  return () => sub.remove();
}, []);
```

:::warning Pegadinha de closures
Dentro do `useEffect`, valores capturados ficam "congelados" naquele render — como capturar uma variável num lambda que sobrevive ao recompose. A dependência array `[deps]` é sua `remember(key)`.
:::

## O que anotar depois

- [ ] `useFocusEffect` do React Navigation ≈ onResume por **tela** (não por app)
- [ ] "Tela ao fundo não desmonta" — stack mantém telas vivas, diferente de Activity destruída
