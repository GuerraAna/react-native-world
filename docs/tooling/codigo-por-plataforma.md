---
sidebar_position: 3
title: Código Específico por Plataforma
description: Platform.OS, arquivos .android.tsx e permissões
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Código Específico por Plataforma

## Três níveis de separação

```tsx
// 1. Runtime check — para divergências pequenas
import {Platform} from 'react-native';

const padding = Platform.OS === 'ios' ? 20 : 16;        // ≈ Build.VERSION check
const topPad = Platform.select({ios: 20, android: 16}); // ≈ when(Build.MANUFACTURER)
```

```text
// 2. Arquivo por plataforma — Metro resolve sozinho pela extensão
Button.android.tsx   → usado no Android
Button.ios.tsx       → usado no iOS
Button.tsx           → fallback
```

```text
// 3. Módulo nativo — quando JS não basta
ver docs/nativo/turbo-modules
```

:::tip Equivalente Android
Extensões `.android.tsx`/`.ios.tsx` são como `src/androidMain/` vs `src/iosMain/` no KMP, ou variantes de `buildTypes` — resolução em **build time**, não runtime.
:::

## Permissões

<Tabs>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// manifest + runtime request
requestPermissionLauncher.launch(Manifest.permission.CAMERA)
```

</TabItem>
<TabItem value="rn" label="React Native">

```tsx
// Android ainda pede no manifest + runtime:
import {PermissionsAndroid} from 'react-native';

const granted = await PermissionsAndroid.request(
  PermissionsAndroid.PERMISSIONS.CAMERA,
);
```

</TabItem>
</Tabs>

Permissões Android funcionam **exatamente como você conhece** — o `AndroidManifest.xml` declara, runtime pede. O RN só adiciona a API JS por cima.

## O que anotar depois

- [ ] `Platform.Version` (Android API level) vs `Build.VERSION.SDK_INT`
- [ ] Estilos por plataforma: `Platform.select` em StyleSheet
- [ ] `.native.tsx` (RN mas não web) quando o app também roda no web
