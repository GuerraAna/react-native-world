---
sidebar_position: 5
title: Server Actions e Dados
sidebar_label: ⚡ Server Actions e Dados
description: Busca de dados no servidor, cache, Server Actions e Route Handlers — o backend dentro do Next
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Server Actions e Dados

A peça que muda tudo pra quem vem de app: no Next.js **você não precisa mais de uma API separada** pra muitos casos — o servidor web *é* o backend. Três mecanismos: fetch em Server Components, Server Actions (mutações) e Route Handlers (API real quando precisar).

## Mapeamento da camada de dados

| Android/RN | Next.js | Conceito |
|---|---|---|
| Repository (suspend funs) | `fetch()` em Server Component | busca direta no servidor, sem endpoint próprio |
| OkHttp cache + interceptors | `fetch(url, {next: {revalidate}})` | cache controlado por revalidação |
| Retrofit `@POST` endpoint | **Server Action** (`'use server'`) | mutação sem escrever endpoint manual |
| Seu próprio backend (Ktor/Spring) | **Route Handler** (`route.ts`) | API REST real dentro do Next |
| OkHttp Interceptor (auth, logs) | `middleware.ts` | intercepta TODA request antes da rota |
| Room/SQLite direto | acesso direto ao banco no Server Component | sem camada HTTP entre você e o dado |

## Buscar dados sem useEffect

No RN você sempre faz `useEffect` + `fetch` + `setState` + loading. Em Server Component, o componente é `async` e **busca direto**:

<Tabs>
<TabItem value="rn" label="React Native (cliente)">

```tsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Text>Carregando...</Text>;
  return <FlatList data={users} renderItem={...} />;
}
```

</TabItem>
<TabItem value="next" label="Next.js (servidor)">

```tsx
// app/users/page.tsx — roda NO SERVIDOR
export default async function UserList() {
  const users = await db.user.findMany(); // acesso DIRETO ao banco!
  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
// Sem useState, sem loading, sem useEffect — HTML chega pronto
```

</TabItem>
</Tabs>

:::tip Equivalente Android
É como se sua `Activity` pudesse chamar o **Room direto** em vez de passar por Retrofit → API → banco. O "repository" vira uma função `async` no servidor — a camada HTTP desaparece quando o Next é full-stack.
:::

## Cache e revalidação

```tsx
// Cacheia por 60s — o "OkHttp cache" declarativo
fetch('https://api.com/dados', {next: {revalidate: 60}});

// Revalida sob demanda (após uma mutação)
import {revalidatePath} from 'next/cache';
revalidatePath('/users'); // ≈ invalidar cache do repositório
```

## Server Actions — mutações sem endpoint

```tsx
// app/actions.ts — 'use server' marca como endpoint do servidor
'use server';

export async function criarUser(formData: FormData) {
  await db.user.create({data: {name: formData.get('name')}});
  revalidatePath('/users');
}
```

```tsx
// No componente — chama como função normal, roda NO SERVIDOR
import {criarUser} from './actions';

<form action={criarUser}>
  <input name="name" />
  <button type="submit">Criar</button>
</form>
```

:::warning O que acontece por baixo
O `form action={criarUser}` vira um **POST endpoint automático** — o Next gera a rota pra você. É como declarar um `@POST` no Retrofit mas **sem escrever a implementação do servidor**. Só funciona com Server Components ou `'use server'` no arquivo.
:::

## Route Handlers — API real quando precisar

```tsx
// app/api/users/route.ts — vira GET /api/users
export async function GET() {
  const users = await db.user.findMany();
  return Response.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  // ...
}
```

Quando usar: endpoints públicos pra terceiros, webhooks, ou quando o app RN também precisa bater na mesma API que o site usa.

## O que anotar depois

- [ ] `examples/next-app/` no repo — app Next.js **mínimo e que compila** (Server Components, Server Actions, Route Handler, rota dinâmica)
- [ ] `cookies()`/`headers()` — acessar request data no servidor
- [ ] Streaming com `Suspense` — partes da página chegam prontas
- [ ] `useFormStatus`/`useActionState` — loading de Server Actions no cliente
- [ ] Data fetching patterns: waterfall vs parallel (`Promise.all`)

## Referências oficiais

- [Next.js — Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Next.js — Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Next.js — Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
