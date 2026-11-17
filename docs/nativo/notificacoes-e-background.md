---
sidebar_position: 5
title: Notificações e Background
sidebar_label: 🔔 Notificações e Background
description: FCM/push, notification channels, Headless JS e trabalho em background
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Notificações e Background

O Android já te ensinou o modelo difícil: canais, payload, background restrictions, WorkManager. No RN, a maior parte disso **continua sendo você** — o FCM é o mesmo, os canais são os mesmos, as restrições de background do Android 12+ são as mesmas.

## Push notifications — FCM é FCM

| Conceito Android | No RN |
|---|---|
| `FirebaseMessagingService` | `expo-notifications` ou `@react-native-firebase/messaging` |
| `onMessageReceived` | listener JS (`setNotificationHandler` / `onMessage`) |
| Notification channels (Android 8+) | `setNotificationChannelAsync` — mesmos canais |
| Token FCM | `getDevicePushTokenAsync` / `getToken` |
| Data vs notification payload | mesma distinção — data chega sempre, notification só em foreground |

<Tabs>
<TabItem value="kotlin" label="Kotlin (FCM)">

```kotlin
class MyService : FirebaseMessagingService() {
    override fun onMessageReceived(msg: RemoteMessage) {
        // msg.data = payload de dados
    }
}
```

</TabItem>
<TabItem value="rn" label="React Native (Expo)">

```tsx
import * as Notifications from 'expo-notifications';

// handler — roda quando a notificação chega (foreground)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
  }),
});

// canal — mesmo conceito do Android
Notifications.setNotificationChannelAsync('default', {
  name: 'Geral',
  importance: Notifications.AndroidImportance.HIGH,
});
```

</TabItem>
</Tabs>

## Trabalho em background — a parte que muda

Aqui está a maior diferença do app nativo: o JS **não roda quando o app está fechado** por padrão.

| Android | RN | Como funciona |
|---|---|---|
| `WorkManager` (tarefa garantida) | **Headless JS** ou lib nativa | JS roda num contexto sem UI — mas só em casos específicos |
| `Service` em background | Headless JS task | roda JS sem React root (sem UI) |
| `BroadcastReceiver` (boot, alarms) | lib nativa / Headless JS | registrado no manifest, chama task JS |
| AlarmManager | `expo-task-manager` / `react-native-background-fetch` | tarefas agendadas, respeitando otimizações |

```tsx
// Headless JS — task que roda SEM UI (background/fetch)
import {AppRegistry} from 'react-native';

AppRegistry.registerHeadlessTask('MeuJob', () =>
  async (data) => {
    // roda JS, mas sem renderizar nada
    await sincronizar(data);
  },
);
```

:::warning Restrições do Android 12+
As mesmas regras que você conhece: background restrictions, battery optimizations, foreground service types. O RN não mágica isso — Headless JS roda **dentro das mesmas regras** do `WorkManager`/JobScheduler do Android.
:::

## A regra prática

```text
Push simples (mostrar notificação)      → expo-notifications ou FCM direto
Tarefa curta em resposta a push        → Headless JS task
Trabalho agendado/garantido            → WorkManager NATIVO (Kotlin) + ponte
  (o RN não substitui WorkManager — ele chama o seu Kotlin)
```

:::tip Seu superpoder de novo
Trabalho de background confiável no Android **ainda é Kotlin** — `WorkManager`, `JobScheduler`, `Service`. O RN não tem equivalente robusto embutido: você escreve o worker nativo que você já sabe fazer, e expõe o resultado pro JS via TurboModule/evento.
:::

## O que anotar depois

- [ ] `expo-task-manager` vs `react-native-background-fetch` vs WorkManager nativo
- [ ] Silent push (data-only) → acorda o app pra processar
- [ ] Deep link cold-start: `getInitialNotification` (app aberto PELA notificação)
- [ ] Permissão `POST_NOTIFICATIONS` (Android 13+) — runtime permission no RN

## Referências oficiais

- [Expo — Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)
- [React Native Firebase — Messaging](https://rnfirebase.io/messaging/usage)
- [React Native — Headless JS](https://reactnative.dev/docs/headless-js-android)
- [Android — WorkManager](https://developer.android.com/topic/libraries/architecture/workmanager)
