---
sidebar_position: 3
title: Estilos e StyleSheet
sidebar_label: 💅 Estilos e StyleSheet
description: styles.xml, themes e dimens vs StyleSheet.create
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Estilos e StyleSheet

## Onde "moram" os estilos

| Android | React Native |
|---|---|
| `res/layout/*.xml` (atributos) | prop `style` inline ou `StyleSheet.create` |
| `res/values/styles.xml` | Objetos de estilo compartilhados |
| `res/values/dimens.xml` | Constantes/tokens num arquivo `theme.ts` |
| `res/values/colors.xml` | `colors.ts` com exports |
| themes + `?attr/colorPrimary` | Context de tema ou lib (ex: `useTheme`) |
| `drawable/` | `assets/` + `<Image source={require(...)}/>` |

## Na prática

<Tabs>
<TabItem value="kotlin" label="Android (XML)">

```xml
<TextView
    android:layout_width="match_parent"
    android:padding="16dp"
    android:textColor="@color/primary"
    android:textSize="20sp" />
```

</TabItem>
<TabItem value="rn" label="React Native">

```tsx
const styles = StyleSheet.create({
  title: {
    padding: 16,
    color: '#0A7EA4',
    fontSize: 20,
  },
});

<Text style={styles.title}>Olá</Text>
```

</TabItem>
</Tabs>

## Por que `StyleSheet.create` e não objeto solto?

- Validação e otimização (estilos registrados uma vez, passados por referência à nativa)
- Autocomplete e type-checking das props de estilo
- Análogo a declarar estilos em `styles.xml` vs escrever atributos inline

## Combinação e condicionais

```tsx
// ≈ seletores/state lists do Android
<View style={[styles.card, isActive && styles.cardActive]} />

// objeto também funciona inline (mas perde a otimização)
<Text style={{fontSize: 12, color: 'gray'}}>legenda</Text>
```

## O que anotar depois

- [ ] Dark mode: `useColorScheme()` ≈ `values-night/`
- [ ] `Dimensions`/`useWindowDimensions` ≈ `Configuration.screenWidthDp`
- [ ] Libs de estilo: NativeWind (≈ Tailwind), styled-components, Unistyles
