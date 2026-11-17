---
sidebar_position: 3
title: APIs do Sistema
sidebar_label: 📲 APIs do Sistema
description: Acessibilidade, linking, permissões e sensores — as APIs de device
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# APIs do Sistema

As APIs de device que o Android expõe no SDK e que o RN expõe via módulos nativos — acessibilidade, links, permissões, sensores. O mapeamento é quase 1:1 porque, no fim, **é o mesmo Android por baixo**.

## Mapeamento

| Android API | React Native | Como funciona |
|---|---|---|
| `AccessibilityManager` / `contentDescription` | `accessibilityLabel`, `AccessibilityInfo` | props de a11y em todo componente |
| `Intent.ACTION_VIEW` (abrir URL) | `Linking.openURL()` | abre browser/app externo |
| `PackageManager` + permissões | `PermissionsAndroid` | manifest + runtime request |
| `SensorManager` | `expo-sensors` / `react-native-sensors` | acelerômetro, giroscópio, etc. |
| `Vibrator` | `Vibration` API | vibração simples |
| `ConnectivityManager` | `@react-native-community/netinfo` | estado da rede (wifi/dados/offline) |
| `ClipboardManager` | `@react-native-clipboard/clipboard` | copiar/colar |
| `SharedPreferences` seguras | `expo-secure-store` / Keychain | tokens criptografados |
| Push (FCM) | `expo-notifications` / `@react-native-firebase/messaging` | notificações push |

## Acessibilidade — a que mais se parece com o Android

<Tabs>
<TabItem value="kotlin" label="Kotlin (Views)">

```kotlin
imageView.contentDescription = "Foto do perfil"
button.importantForAccessibility = View.IMPORTANT_FOR_ACCESSIBILITY_YES
```

</TabItem>
<TabItem value="rn" label="React Native">

```tsx
<Image
  source={avatar}
  accessibilityLabel="Foto do perfil"
  accessible={true}
/>
<Pressable accessibilityRole="button" accessibilityHint="Salva o formulário">
```

</TabItem>
</Tabs>

:::tip Equivalente Android
`accessibilityLabel` ≈ `contentDescription`, `accessibilityRole` ≈ a semântica que o TalkBack usa. A diferença: são **props de componente**, não atributos de View — TalkBack e VoiceOver leem igual.
:::

## Permissões (revisão rápida)

```tsx
import {PermissionsAndroid} from 'react-native';

// Mesmo modelo do Android: manifest declara, runtime pede
const granted = await PermissionsAndroid.request(
  PermissionsAndroid.PERMISSIONS.CAMERA,
);
```

O `AndroidManifest.xml` continua sendo a fonte da verdade — `PermissionsAndroid` só adiciona a camada JS por cima do `ActivityCompat.requestPermissions` que você já conhece.

## NetInfo — o "ConnectivityManager" do RN

```tsx
import NetInfo from '@react-native-community/netinfo';

const state = await NetInfo.fetch();
if (state.isConnected && state.type === 'wifi') {
  // ≈ connectivityManager.activeNetwork?.hasTransport(TRANSPORT_WIFI)
}
```

:::warning Nem tudo tem API JS pronta
Sensores, Bluetooth, NFC e APIs muito novas geralmente **não têm módulo built-in** — é aqui que entra seu TurboModule em Kotlin (ver `nativo/turbo-modules`) ou uma lib da comunidade. A regra: se existe no Android SDK e não existe no RN, você escreve a ponte.
:::

## O que anotar depois

- [ ] `AccessibilityInfo.isScreenReaderEnabled()` — detecção de TalkBack/VoiceOver
- [ ] `Linking` — openURL, deep links inbound, `canOpenURL` (≈ `resolveActivity`)
- [ ] Haptics: `expo-haptics` vs `Vibration` — feedback tátil mais rico
- [ ] Background tasks: `Headless JS` ≈ `WorkManager`/`Service`

## Referências oficiais

- [React Native — Accessibility](https://reactnative.dev/docs/accessibility)
- [React Native — Linking](https://reactnative.dev/docs/linking)
- [React Native — PermissionsAndroid](https://reactnative.dev/docs/permissionsandroid)
- [Android — Accessibility](https://developer.android.com/guide/topics/ui/accessibility)
