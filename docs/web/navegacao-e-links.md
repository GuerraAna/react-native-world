---
sidebar_position: 7
title: Navegação e Links
sidebar_label: 🧭 Navegação e Links
description: React Navigation vs App Router, deep links e App Links — o mapeamento mais bonito
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Navegação e Links

A navegação é onde app e web mais divergem em *implementação* — mas menos em *conceito* do que parece. Afinal, um deep link no Android já é uma URL.

## React Navigation vs App Router

| Conceito | React Navigation (app) | Next.js App Router (web) |
|---|---|---|
| Tela/destino | `Stack.Screen` | `page.tsx` numa pasta |
| Ir para tela | `navigation.navigate('Detail')` | `router.push('/detail')` ou `<Link>` |
| Voltar | `goBack()` | `router.back()` |
| Parâmetros | `route.params` | `params` no componente / `[id]` na pasta |
| Deep link | `linking` config (prefixes) | A URL **é** o link |
| Estrutura aninhada | Navigators dentro de Navigators | `layout.tsx` aninhados |

<Tabs>
<TabItem value="rn" label="React Navigation">

```tsx
<Stack.Screen name="Detalhe" component={DetalheScreen} />

navigation.navigate('Detalhe', {id: 42});

// na tela:
const {id} = route.params;
```

</TabItem>
<TabItem value="next" label="Next.js">

```tsx
// app/detalhe/[id]/page.tsx
<Link href="/detalhe/42">Abrir</Link>
router.push('/detalhe/42');

// na página:
export default function Page({params}: {params: {id: string}}) {
  return <h1>Detalhe {params.id}</h1>;
}
```

</TabItem>
</Tabs>

## Deep links — o mapeamento que você já sabe

No Android você já configurou **App Links**: um `<intent-filter>` que captura `https://meusite.com/detalhe/42` e abre a Activity certa. Na web universal, o fluxo é:

```text
https://meusite.com/detalhe/42
├── no browser        → Next.js renderiza /detalhe/42
├── no app instalado  → Android App Link abre a tela nativa
└── smart banner      → "abrir no app" (ou prompt de instalação)
```

<Tabs>
<TabItem value="kotlin" label="Kotlin (App Link)">

```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <data android:scheme="https"
          android:host="meusite.com"
          android:pathPrefix="/detalhe" />
</intent-filter>
```

</TabItem>
<TabItem value="rn" label="React Navigation linking">

```tsx
const linking = {
  prefixes: ['https://meusite.com', 'meuapp://'],
  config: {
    screens: {
      Detalhe: 'detalhe/:id', // mapeia URL → tela
    },
  },
};

<NavigationContainer linking={linking}>
```

</TabItem>
</Tabs>

:::tip Equivalente Android
O `linking.config` do React Navigation é **exatamente** o `pathPrefix` do intent-filter — só que declarativo e completo (mapeia params também). E o Next.js? Não precisa de config nenhuma: a URL *já é* a rota. O site e os deep links do app ficam **naturalmente sincronizados**.
:::

## Navegação universal com Solito

Num projeto universal, o Solito abstrai os dois mundos:

```tsx
// funciona no app E no web com a mesma API
import {useRouter} from 'solito/router';
import {TextLink} from 'solito/link';

<TextLink href="/detalhe/42">Abrir</TextLink>  // app: navigate | web: <a>
router.push('/detalhe/42');                   // app: navigate | web: router.push
```

## O que anotar depois

- [ ] `solito/link` — quando usar `TextLink` vs `useRouter`
- [ ] Universal links iOS + App Links Android no mesmo domínio
- [ ] `router.replace()` vs `router.push()` (semelhante a flags de Intent)
- [ ] Estado de navegação web: scroll restoration, `shallow` routing

## Referências oficiais

- [React Navigation — Deep linking](https://reactnavigation.org/docs/deep-linking)
- [Next.js — Routing](https://nextjs.org/docs/app/building-your-application/routing)
- [Android — App Links](https://developer.android.com/training/app-links)
