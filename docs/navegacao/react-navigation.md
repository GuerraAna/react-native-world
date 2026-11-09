---
sidebar_position: 1
title: React Navigation
description: Intents, NavGraph e back stack vs stack/tab/drawer navigators
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# React Navigation

## Mapeamento mental

| Android | React Navigation |
|---|---|
| `Intent` + `startActivity` | `navigation.navigate('Screen')` |
| Navigation Component / NavGraph | **Navigators**: `Stack`, `Tab`, `Drawer` |
| `nav_graph.xml` com destinations | declaração em código (`Stack.Screen`) |
| Safe Args (argumentos tipados) | `RouteProp` + tipagem do `ParamList` |
| Back stack / `popBackStack` | `goBack()`, `pop()`, `popToTop()` |
| Deep links / App Links | `linking` config |
| Activity = 1 tela | Screen = componente na stack |

:::warning Mudança de modelo
No Android, cada Activity é um entry point do sistema. No RN, existe **uma** Activity (a `MainActivity`) e as "telas" são componentes numa stack JS — telas anteriores ficam **montadas** embaixo da atual.
:::

## Estrutura básica

<Tabs>
<TabItem value="kotlin" label="Kotlin (Nav Component)">

```xml
<navigation>
    <fragment android:id="@+id/home" />
    <fragment android:id="@+id/details" />
</navigation>
```

```kotlin
findNavController().navigate(R.id.details, bundleOf("id" to 42))
```

</TabItem>
<TabItem value="rn" label="React Navigation">

```tsx
const Stack = createNativeStackNavigator<RootStackParamList>();

<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Details" component={DetailsScreen} />
  </Stack.Navigator>
</NavigationContainer>

// navegando:
navigation.navigate('Details', {id: 42});
```

</TabItem>
</Tabs>

## Tipagem de parâmetros (o "Safe Args")

```tsx
type RootStackParamList = {
  Home: undefined;
  Details: {id: number}; // params tipados por tela
};

// na tela:
function DetailsScreen({route}: DetailsScreenProps) {
  const {id} = route.params; // type-safe
}
```

## Padrões comuns

```text
Stack    → fluxo linear de telas (≈ activity stack)
Tab      → bottom navigation (≈ BottomNavigationView)
Drawer   → menu lateral (≈ NavigationView + DrawerLayout)
Nesting  → Tab dentro de Stack ≈ nested nav graphs
```

## O que anotar depois

- [ ] Expo Router / file-based routing (≈ convenção sobre configuração)
- [ ] `useFocusEffect` para "onResume por tela"
- [ ] Modal screens e presentation style
