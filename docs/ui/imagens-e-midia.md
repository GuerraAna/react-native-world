---
sidebar_position: 6
title: Imagens e Mídia
sidebar_label: 🖼️ Imagens e Mídia
description: drawables/Glide vs Image, resizeMode, assets e fontes
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Imagens e Mídia

## As três origens de imagem

| Android | React Native | Como funciona |
|---|---|---|
| `res/drawable` + `R.drawable.x` | `require('./img.png')` | asset local, resolvido em **build time** |
| URL (Glide/Coil/Picasso) | `{uri: 'https://...'}` | carregada de rede, com cache |
| Base64/byte array | `{uri: 'data:image/png;base64,...'}` | embutida (ícones pequenos) |

```tsx
// Local — require é ESTÁTICO (o bundler precisa ver o caminho literal)
<Image source={require('./assets/logo.png')} />

// Remota — precisa de dimensões explícitas (não tem wrap_content de remote)
<Image
  source={{uri: 'https://exemplo.com/foto.png'}}
  style={{width: 100, height: 100}}
/>
```

:::warning require não é dinâmico
`require('./img/' + name + '.png')` **não funciona** — o bundler resolve requires estaticamente. É o mesmo motivo pelo qual `R.drawable` usa IDs gerados: o recurso precisa existir em build time. Pra imagens dinâmicas locais, faça um mapa: `const imgs = {logo: require('./logo.png')}`.
:::

## resizeMode ≈ scaleType

O mapeamento mais direto de todo o RN:

| `scaleType` (Android) | `resizeMode` (RN) |
|---|---|
| `centerCrop` | `cover` |
| `fitCenter` | `contain` |
| `fitXY` | `stretch` |
| `centerInside` | `contain` |
| — (corta e repete) | `repeat` |
| `center` | `center` |

```tsx
<Image source={img} resizeMode="cover" />  {/* ≈ centerCrop */}
```

## Fontes e ícones

| Android | RN |
|---|---|
| `res/font/` + `fontFamily` | arquivo na pasta assets + `react-native.config.js` declara fonts |
| VectorDrawable / icon fonts | `react-native-vector-icons` (ícones via fonte) ou SVG via `react-native-svg` |
| Material icons embutidos | `@expo/vector-icons` (vem pronto no Expo) |

```tsx
import Icon from '@expo/vector-icons/MaterialIcons';
<Icon name="home" size={24} color="#3DDC84" />
```

:::tip SVG: react-native-svg
O `react-native-svg` renderiza SVG de verdade — é o **VectorDrawable** do RN. Suporta paths, groups, transforms — bem mais próximo do que você conhece de drawable XML do que parece.
:::

## O que anotar depois

- [ ] `ImageBackground` ≈ layout com background drawable
- [ ] `FastImage`/`expo-image` — cache e performance melhores que o `<Image>` padrão
- [ ] Densidade: `@2x`/`@3x` suffix ≈ `drawable-hdpi/xhdpi`
- [ ] Vídeo/áudio: `expo-av`, `react-native-video` (não é `<Video>` built-in)

## Referências oficiais

- [React Native — Image](https://reactnative.dev/docs/image)
- [Expo — Image](https://docs.expo.dev/versions/latest/sdk/image/)
- [react-native-svg](https://github.com/software-mansion/react-native-svg)
- [Android — Drawable resources](https://developer.android.com/guide/topics/resources/drawable-resource)
