---
sidebar_position: 10
title: Autenticação
sidebar_label: 🔐 Autenticação
description: OAuth, sessões e tokens — Credential Manager vs expo-auth-session e Auth.js
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Autenticação

O fluxo de auth é um dos poucos lugares onde app e web divergem **fundamentalmente**: no app você usa OAuth com deep link de retorno; na web, sessão por cookie. Mapear os dois lados evita o erro clássico de tratar um como o outro.

## Mapeamento

| Android/RN | Web (Next.js) | Conceito |
|---|---|---|
| `AccountManager` / `Credential Manager` | `Auth.js` (NextAuth) / `iron-session` | gerenciador de credenciais da plataforma |
| Google Sign-In SDK | OAuth redirect + callback | fluxo de login social |
| `EncryptedSharedPreferences` (token) | Cookie `httpOnly` + Secure | onde o token mora |
| `Intent` deep link de retorno OAuth | callback URL (`/api/auth/callback`) | como o provedor retorna |
| Refresh token + interceptor OkHttp | Server-side refresh no middleware | renovar sessão |
| Biometria / `Keystore` | WebAuthn / Passkeys | auth sem senha |

## O fluxo OAuth lado a lado

<Tabs>
<TabItem value="rn" label="App (expo-auth-session)">

```tsx
import * as AuthSession from 'expo-auth-session';

// 1. Abre o browser de auth (Custom Tab/SafariVC)
const [request, response, promptAsync] =
  Google.useAuthRequest({clientId});

// 2. O retorno é um DEEP LINK — não uma URL de página
//    exp://... ou meuapp://callback → o app captura
const token = response?.authentication?.accessToken;

// 3. Guarda em storage seguro (não AsyncStorage!)
await SecureStore.setItemAsync('token', token);
```

</TabItem>
<TabItem value="web" label="Next.js (Auth.js)">

```tsx
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const {handlers, auth, signIn} = NextAuth({
  providers: [Google],
});

// O cookie de sessão é httpOnly — o JS nunca vê o token.
// A sessão é verificada NO SERVIDOR:
const session = await auth(); // em Server Component/Action
```

</TabItem>
</Tabs>

## As diferenças críticas

| Conceito | App | Web |
|---|---|---|
| **Onde o token vive** | Storage seguro do device (SecureStore) | Cookie `httpOnly` (JS nunca toca) |
| **Retorno do OAuth** | Deep link (`meuapp://callback`) | URL (`/api/auth/callback`) |
| **Quem valida** | O app valida/envia no header | O servidor valida a cada request |
| **Logout** | Apagar token local | Apagar cookie + invalidar no servidor |

:::warning Nunca token em AsyncStorage/localStorage
Nos dois mundos: **tokens de auth não vão em storage não-criptografado**. No app: `expo-secure-store`/Keychain. Na web: cookie `httpOnly` (nunca `localStorage` — XSS rouba). É a mesma regra do `EncryptedSharedPreferences`.
:::

## Universal — quando app e site dividem auth

```text
Mesmo backend, duas portas de entrada:

App RN    → OAuth nativo → token no SecureStore → header Authorization
Site Next → OAuth web   → cookie httpOnly       → sessão no servidor
                ↓
         Mesma API/backend valida os dois
```

:::tip Equivalente Android
`Auth.js` no Next é como o `Credential Manager`/`Google Sign-In` — o framework cuida do fluxo OAuth, do refresh e da sessão; você só declara os providers. E `expo-auth-session` no app é o `CustomTabIntent` + deep link que você faria à mão.
:::

## O que anotar depois

- [ ] PKCE — por que o app usa (sem client secret no bundle)
- [ ] WebAuthn/Passkeys ≈ biometria/FIDO2 no Android
- [ ] `middleware.ts` para rotas protegidas (redirect se sem sessão)
- [ ] Auth em projeto universal: mesmo provider nos dois frontends

## Referências oficiais

- [Expo — AuthSession](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [Auth.js (NextAuth)](https://authjs.dev/)
- [Next.js — Authentication](https://nextjs.org/docs/app/building-your-application/authentication)
- [Android — Credential Manager](https://developer.android.com/identity/sign-in/credential-manager)
