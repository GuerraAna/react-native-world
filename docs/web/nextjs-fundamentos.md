---
sidebar_position: 4
title: Next.js Fundamentos
sidebar_label: ▲ Next.js Fundamentos
description: O framework React para web — App Router, rotas por arquivo, server components
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Next.js Fundamentos

React puro te dá componentes. **Next.js** te dá o app inteiro: rotas, renderização no servidor, otimização de imagens, build e deploy. É o padrão da comunidade para React na web — pense nele como "o framework que o Android SDK + Navigation + lifecycle são pro app".

## Por que não React puro?

| React sozinho | Next.js |
|---|---|
| Só componentes — você monta tudo | Framework completo, decisões tomadas |
| Client-side only (SPA) | SSR, SSG, ISR — HTML pronto |
| Roteamento: você instala e configura | File-based routing embutido |
| Imagens/fonts/scripts: manual | `next/image`, `next/font` otimizados |
| SEO: sofrido | Metadata API + SSR = SEO nativo |

:::tip Equivalente Android
É como a diferença entre `View` + `Fragment` soltos vs o **Navigation Component** + template de projeto do Android Studio. Você *poderia* montar à mão, mas a comunidade convergiu pra uma estrutura padrão.
:::

## App Router: rotas são arquivos

O Next.js 13+ usa o **App Router** — a estrutura de pastas *é* a navegação:

```text
app/
├── page.tsx              → /            (home)
├── layout.tsx            → layout raiz (≈ Activity que hospeda)
├── sobre/
│   └── page.tsx          → /sobre
└── usuario/
    └── [id]/
        └── page.tsx      → /usuario/42  (param dinâmico)
```

<Tabs>
<TabItem value="kotlin" label="Kotlin (Nav Component)">

```xml
<!-- nav_graph.xml -->
<navigation>
    <fragment android:id="@+id/home" />
    <fragment android:id="@+id/details">
        <argument android:name="id" />
    </fragment>
</navigation>
```

</TabItem>
<TabItem value="next" label="Next.js">

```tsx
// app/usuario/[id]/page.tsx
export default function UsuarioPage({
  params,
}: {
  params: {id: string};
}) {
  return <h1>Usuário {params.id}</h1>;
}
```

</TabItem>
</Tabs>

## Server vs Client Components — a divisão nova

No App Router, **tudo é Server Component por padrão**: renderiza no servidor, sem JS enviado pro browser. Pra ter interatividade (onClick, useState, useEffect), você marca `'use client'`:

```tsx
// app/contador/page.tsx — Server Component (padrão)
export default function Page() {
  return <Contador />; // pode renderizar client components
}
```

```tsx
// app/contador/Contador.tsx — Client Component
'use client';

import {useState} from 'react';

export function Contador() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>+{n}</button>;
}
```

:::warning Mudança de mentalidade
No RN **tudo** é "client" — roda no device. No Next, a pergunta é "preciso de interatividade?" → `'use client'` no menor nível possível da árvore. É como escolher entre `ViewModel` (lógica no servidor) vs `View` (interação local) — mas com granularidade por componente.
:::

## Iniciando um projeto

```bash
npx create-next-app@latest meu-site
# responde: TypeScript? sim · App Router? sim · Tailwind? opcional

cd meu-site
npm run dev   # → http://localhost:3000
```

## O que anotar depois

- [ ] `layout.tsx` aninhado ≈ Activity com fragments compartilhando scaffold
- [ ] `loading.tsx` / `error.tsx` — convenções de UI de estado por rota
- [ ] Route Groups `(pasta)` — organiza sem afetar a URL
- [ ] `generateStaticParams` ≈ "build variants" por rota
- [ ] **Server Actions** — funções que rodam no servidor chamadas do cliente (≈ endpoint sem escrever API)
- [ ] **Route Handlers** (`route.ts`) — API endpoints dentro do Next (≈ seu próprio backend)
- [ ] `next/image` e `next/font` — otimização automática de assets
- [ ] `middleware.ts` — intercepta requests (≈ OkHttp interceptor no servidor)

## Referências oficiais

- [Next.js — Documentação](https://nextjs.org/docs)
- [Next.js — Learn (curso oficial)](https://nextjs.org/learn)
- [Next.js — App Router](https://nextjs.org/docs/app)
