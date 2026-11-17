---
sidebar_position: 6
title: Renderização na Web
sidebar_label: 🖥️ SSR / SSG / CSR
description: Server-side rendering, geração estática e hidratação — ou "a tela já chega desenhada"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Renderização na Web

No Android, **toda tela é desenhada no device** — o sistema renderiza Views no processo do app. Na web, existe uma pergunta que você nunca precisou fazer: **onde o HTML é gerado?** Servidor ou browser?

## As quatro estratégias

| Estratégia | Onde renderiza | Quando | Analogia Android |
|---|---|---|---|
| **CSR** (Client-Side Rendering) | Browser, com JS | Interatividade alta, SEO irrelevante | App normal — tela vazia + fetch + preenche |
| **SSR** (Server-Side Rendering) | Servidor, a cada request | Dados frescos + SEO | "Tela já vem desenhada" — sem skeleton |
| **SSG** (Static Site Generation) | No build, vira arquivo | Conteúdo raramente muda | APK com dados já "compilados" dentro |
| **ISR** (Incremental Static Regen.) | Build + revalida em background | Meio-termo: estático + atualiza | Cache com `max-age` e refresh silencioso |

<Tabs>
<TabItem value="csr" label="CSR — o padrão RN">

```tsx
// Como o app RN funciona: renderiza vazio, busca, preenche
function Usuario() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch('/api/user').then(r => r.json()).then(setUser);
  }, []);
  if (!user) return <Text>Carregando...</Text>; // skeleton
  return <Text>{user.name}</Text>;
}
```

</TabItem>
<TabItem value="ssr" label="SSR — servidor renderiza">

```tsx
// app/user/page.tsx — roda NO SERVIDOR
export default async function UserPage() {
  const user = await db.user.findFirst(); // acesso direto ao banco!
  return <h1>{user.name}</h1>; // HTML chega pronto no browser
}
```

</TabItem>
</Tabs>

## Hidratação — o "attach" do JS

SSR entrega **HTML estático bonito** — botão aparece, mas não clica. Aí o browser baixa o JS e o React **"hidrata"**: conecta os event handlers ao HTML existente. É como se a View já existisse e o `onClickListener` fosse anexado depois.

```text
1. Request → servidor renderiza HTML completo
2. Browser exibe página (rápido, SEO-friendly)
3. JS carrega → React "hidrata" (attach dos handlers)
4. Página interativa
```

:::warning O flash de hidratação
Conteúdo que depende de dados do cliente (tema escuro, data local, user logado) pode **piscar** — o servidor renderiza uma coisa, o cliente "corrige" depois. Padrão: renderizar neutro no server, atualizar no `useEffect`.
:::

## Escolhendo por página — o poder do App Router

O Next.js deixa você escolher **por rota**, não por app inteiro:

```tsx
// Estático (SSG) — o default
export default function Sobre() { /* vira HTML no build */ }

// Revalida a cada 60s (ISR)
export const revalidate = 60;

// Dinâmico a cada request (SSR)
export const dynamic = 'force-dynamic';

// Client-side puro
'use client'; // dentro do componente
```

:::tip Equivalente Android
É como decidir **por tela** se usa cache do Room, sempre bate na API, ou mostra dados do bundle. Só que na web a decisão afeta **o que o crawler do Google vê** — por isso existe toda essa maquinaria.
:::

## SEO — a razão de tudo isso existir

Apps nativos não se preocupam com "ser encontrado" — a Play Store indexa por você. Na web, **o Google é a loja**: SSR/SSG faz o crawler ver conteúdo real em vez de um `<div id="root">` vazio. Por isso site institucional/blog/landing → SSR ou SSG, dashboard/logado → CSR tá ótimo.

## O que anotar depois

- [ ] `loading.tsx` (skeleton por rota) — funciona com SSR streaming
- [ ] Streaming SSR — partes da página chegam prontas em sequência
- [ ] `metadata` export / `generateMetadata` — title/description por página
- [ ] Quando ISR revalida: primeiro request após `revalidate` dispara rebuild em background

## Referências oficiais

- [Next.js — Rendering](https://nextjs.org/docs/app/building-your-application/rendering)
- [Next.js — Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
