---
sidebar_position: 3
title: WebView e Navegadores
sidebar_label: 🔗 WebView e Navegadores
description: De WebView nativa e JavascriptInterface para react-native-webview e browsers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# WebView e Navegadores

Esta é a página mais próxima do seu mundo atual. Você já embutiu web no Android — aqui vai o mapa completo de quando cada abordagem faz sentido.

## Os quatro cenários

| Cenário | Android nativo | Mundo RN/Web |
|---|---|---|
| Site dentro do app | `WebView` + `loadUrl()` | `react-native-webview` |
| Abrir browser externo | `Intent(ACTION_VIEW)` / Custom Tabs | `Linking.openURL()` / `expo-web-browser` |
| App nativo com partes web | `WebView` parcial | Mesmo conceito — `react-native-webview` |
| "App" que é só um site | `WebView` fullscreen (pessima UX) | **PWA** ou RN Web — sem WebView |

## react-native-webview ≈ android.webkit.WebView

<Tabs>
<TabItem value="kotlin" label="Kotlin (WebView nativa)">

```kotlin
webView.settings.javaScriptEnabled = true
webView.addJavascriptInterface(Bridge(), "Android")
webView.loadUrl("https://meusite.com")
```

```kotlin
// JS chama: Android.salvar(dados)
class Bridge {
    @JavascriptInterface
    fun salvar(json: String) { /* ... */ }
}
```

</TabItem>
<TabItem value="rn" label="React Native">

```tsx
import {WebView} from 'react-native-webview';

<WebView
  source={{uri: 'https://meusite.com'}}
  onMessage={(event) => {
    const dados = JSON.parse(event.nativeEvent.data);
    salvar(dados);
  }}
/>
```

```tsx
// No site embutido, o JS posta pro app:
window.ReactNativeWebView.postMessage(JSON.stringify(dados));
```

</TabItem>
</Tabs>

:::tip Equivalente Android
`JavascriptInterface` (nativo→JS expõe objeto) vs `postMessage` (RN↔web são mensagens de texto). No RN a comunicação é **assíncrona e serializada** — não existe objeto injetado síncrono, só `postMessage`/`injectedJavaScript`.
:::

## A decisão certa: WebView, browser ou app de verdade?

```text
Site responsivo já existe e é o produto?
├── Quer "app instalável" rápido → PWA (deploy-e-pwa.md)
├── Precisa de push/câmera/loja   → app RN com telas web pontuais
└── Conteúdo editorial simples    → Custom Tab / Linking.openURL

App nativo que mostra conteúdo web?
├── Termos de uso, FAQ, checkout  → react-native-webview
└── Fluxo principal               → NUNCA WebView (UX péssima, stores rejeitam)
```

:::warning Stores não aceitam "site embrulhado"
Play Store e App Store rejeitam apps que são só uma WebView apontando pra um site. Se a ideia é "meu site virar app", o caminho correto é **PWA** (instalável via navegador) ou **RN Web** (mesmo código, duas saídas) — não WebView fullscreen.
:::

## Navegador mobile como destino

Detalhe que dev Android às vezes esquece: o navegador mobile **é um destino de produção**. Chrome no Android, Safari no iOS — o usuário acessa sua URL sem instalar nada. Por isso o trio de destinos: um bom site mobile-web + PWA cobre a maioria dos casos de "quero mobile sem passar pela loja".

## O que anotar depois

- [ ] `injectedJavaScript` vs `injectedJavaScriptBeforeContentLoaded`
- [ ] `window.ReactNativeWebView` — detecção de "estou dentro de um app"
- [ ] Cookies/sessão compartilhados entre WebView e app
- [ ] `expo-web-browser` (Custom Tabs/SafariVC) para auth OAuth

## Referências oficiais

- [react-native-webview](https://github.com/react-native-webview/react-native-webview)
- [Android — WebView](https://developer.android.com/develop/ui/views/layout/webview/webview)
- [React Native — Linking](https://reactnative.dev/docs/linking)
