---
sidebar_position: 1
title: Componentes Básicos
sidebar_label: 🧱 Componentes Básicos
description: Tabela de mapeamento View → componente RN
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Componentes Básicos

## Tabela de mapeamento

| Android (Views) | Jetpack Compose | React Native |
|---|---|---|
| `ViewGroup` / `View` | `Box`/`Column`/`Row` | `<View>` |
| `TextView` | `Text` | `<Text>` |
| `EditText` | `TextField` | `<TextInput>` |
| `Button` | `Button` | `<Pressable>` (ou `Button` simples) |
| `ImageView` | `Image` | `<Image>` |
| `ScrollView` | `Column(verticalScroll)` | `<ScrollView>` |
| `RecyclerView` | `LazyColumn` | `<FlatList>` / `FlashList` |
| `Switch` | `Switch` | `<Switch>` |
| `ProgressBar` | `CircularProgressIndicator` | `<ActivityIndicator>` |
| `WebView` | — | `react-native-webview` (lib) |
| `Toast` | `Snackbar` | `ToastAndroid` / libs |

:::warning Diferença importante
Todo texto precisa estar dentro de `<Text>` — não existe texto "solto" num `<View>` como num `TextView` implícito ou numa `Text()` do Compose dentro de container.
:::

## Exemplo lado a lado

<Tabs>
<TabItem value="compose" label="Compose (Kotlin)">

```kotlin
Column(modifier = Modifier.padding(16.dp)) {
    Text(text = "Olá", fontSize = 20.sp)
    Button(onClick = { /* ação */ }) {
        Text("Clique")
    }
}
```

</TabItem>
<TabItem value="rn" label="React Native (TSX)">

```tsx
<View style={{padding: 16}}>
  <Text style={{fontSize: 20}}>Olá</Text>
  <Pressable onPress={() => {/* ação */}}>
    <Text>Clique</Text>
  </Pressable>
</View>
```

</TabItem>
</Tabs>

:::tip Quem conhece Compose sai na frente
O modelo mental é o mesmo: **UI é função de estado**, componentes são funções, re-render acontece quando o estado muda. `remember` ≈ `useState`, recomposição ≈ re-render.
:::

## O que anotar depois

- [ ] SafeAreaView ≈ `WindowInsets`/edge-to-edge
- [ ] KeyboardAvoidingView ≈ `adjustResize`/`imePadding`
- [ ] Modal, StatusBar, TouchableOpacity vs Pressable
