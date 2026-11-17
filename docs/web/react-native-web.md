---
sidebar_position: 2
title: React Native Web
sidebar_label: ⚛️ React Native Web
description: Como View e Text viram div e span — o motor que leva RN ao browser
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# React Native Web

**React Native Web** é a biblioteca que implementa as primitivas do RN (`View`, `Text`, `Image`, `Pressable`...) como componentes React que renderizam **elementos DOM de verdade**. É o que faz `expo start --web` funcionar.

## O que acontece por baixo do capô

| Componente RN | Renderiza como | Equivalente Android |
|---|---|---|
| `<View>` | `<div>` com Flexbox | `LinearLayout`/`ConstraintLayout` |
| `<Text>` | `<span>`/`<p>` | `TextView` |
| `<Image>` | `<img>` / `<div>` com background | `ImageView` |
| `<Pressable>` | `<div>` + event handlers | `View` com `onClickListener` |
| `<ScrollView>` | `<div>` com `overflow: scroll` | `ScrollView` |
| `StyleSheet.create` | classes CSS geradas | styles.xml |

```tsx
// Você escreve:
<Pressable onPress={salvar} style={styles.botao}>
  <Text>Salvar</Text>
</Pressable>

// O browser recebe (simplificado):
<div class="r-botao" role="button" tabindex="0">
  <span dir="auto">Salvar</span>
</div>
```

:::tip Equivalente Android
Lembra do Compose Multiplayer... digo, **Compose for Web/WASM**? Mesma ideia: o toolkit de UI que você já conhece compilando para outro alvo. A diferença é que RN Web é maduro e roda em produção no Twitter/X, Flipboard e outros.
:::

## O que funciona e o que não funciona

<Tabs>
<TabItem value="sim" label="✅ Funciona">

- Todo o layout: Flexbox/Yoga → CSS Flexbox nativo
- `StyleSheet`, inline styles, responsive design
- Eventos: `onPress`, `onLongPress` → click/contextmenu
- Animações: Reanimated e Animated têm suporte web
- `TextInput` → `<input>`/`<textarea>`
- Hooks, Context, estado — React é React
- Imagens: `<Image>` → `<img>` ou `background-image`

</TabItem>
<TabItem value="nao" label="❌ Não funciona">

- APIs de device: câmera, GPS, Bluetooth, sensores (a menos que exista API web equivalente — `navigator.geolocation` etc.)
- TurboModules nativos — são Kotlin/Swift, não compilam pra browser
- `AsyncStorage` direto — precisa de shim (localStorage)
- Alguns componentes: `StatusBar`, `PermissionsAndroid` (óbvio), `RefreshControl` nativo
- Bibliotecas sem `.web.js`/`Platform.OS` checks

</TabItem>
</Tabs>

## Testando agora mesmo

```bash
# num projeto Expo:
npx expo start --web

# ou no navegador depois de iniciar:
# pressione "w" no terminal do Metro
```

O Expo já vem com `react-native-web` e `react-dom` configurados — é a forma mais rápida de ver seu app rodando no Chrome.

## Resolução por plataforma (revisão)

```text
components/
├── Button.tsx        → web (e fallback)
├── Button.web.tsx    → só web
└── Button.native.tsx → só app (iOS + Android)
```

A extensão `.native.tsx` é o "tudo menos web" — útil quando o app roda no browser também. É exatamente o `androidMain`/`iosMain` do KMP, resolvido em **build time** pelo bundler.

## O que anotar depois

- [ ] Testar `expo start --web` num projeto exemplo — o que quebra primeiro?
- [ ] `Platform.OS === 'web'` existe? (sim — verificar no código)
- [ ] Quais libs do projeto têm suporte web? Checar `package.json`/`react-native-web` compat
- [ ] Limitações de gestos/touch no browser (react-native-gesture-handler web)

## Referências oficiais

- [React Native Web — Documentação](https://necolas.github.io/react-native-web/)
- [Expo — Run in web browser](https://docs.expo.dev/workflow/web/)
- [React Native — Platform Specific Code](https://reactnative.dev/docs/platform-specific-code)
