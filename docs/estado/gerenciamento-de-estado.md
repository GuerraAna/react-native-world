---
sidebar_position: 2
title: Gerenciamento de Estado
sidebar_label: 📊 Estado
description: ViewModel, LiveData, StateFlow vs hooks e stores
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Gerenciamento de Estado

## Hierarquia de necessidades

```text
useState          → estado local (≈ rememberSaveable do Compose)
useReducer        → estado local complexo com transições (≈ máquina de estados)
Context           → estado compartilhado na árvore (≈ CompositionLocal)
Zustand/Redux     → estado global (≈ ViewModel compartilhado / singleton)
React Query       → estado de servidor (≈ repository + cache)
```

## Mapeamento ViewModel → RN

| Android | React Native |
|---|---|
| `ViewModel` | Custom hook ou store (Zustand) |
| `MutableLiveData`/`StateFlow` | `useState` / store selector |
| `collectAsStateWithLifecycle` | hook subscription automático |
| `viewModelScope` | cleanup dos hooks / store |
| `SavedStateHandle` | persistência manual (AsyncStorage) |
| `UiState` (single state class) | objeto de estado num `useReducer` |

## Estado local

<Tabs>
<TabItem value="kotlin" label="Kotlin (Compose/VM)">

```kotlin
var count by remember { mutableStateOf(0) }
// ou no ViewModel:
private val _count = MutableStateFlow(0)
val count = _count.asStateFlow()
```

</TabItem>
<TabItem value="rn" label="React Native">

```tsx
const [count, setCount] = useState(0);
// atualização funcional (≈ flow.update { }):
setCount((prev) => prev + 1);
```

</TabItem>
</Tabs>

## Estado global com Zustand (o mais próximo de ViewModel)

```tsx
const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({user}),
}));

// no componente — só re-renderiza quando `user` muda
const user = useUserStore((s) => s.user); // ≈ collect seletivo
```

:::tip Equivalente Android
Um selector de Zustand `useUserStore((s) => s.user)` é como `stateFlow.map { it.user }.distinctUntilChanged().collectAsState()` — assina só o pedaço que interessa.
:::

## O que anotar depois

- [ ] Redux Toolkit vs Zustand — quando cada um
- [ ] React Query/TanStack Query ≈ camada de repository com cache
- [ ] Por que Context **não** é gerenciador de estado de alta frequência
