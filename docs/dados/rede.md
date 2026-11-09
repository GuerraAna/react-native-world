---
sidebar_position: 1
title: Rede e HTTP
sidebar_label: 🌐 Rede e HTTP
description: Retrofit/OkHttp/Moshi vs fetch/axios/Zod
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Rede e HTTP

## Mapeamento

| Android | React Native |
|---|---|
| Retrofit (interface declarativa) | `fetch` / `axios` — chamadas imperativas |
| OkHttp interceptors | `axios.interceptors` |
| Moshi / kotlinx.serialization | `JSON.parse` + tipagem manual, ou **Zod** |
| `@GET`/`@POST` suspend funs | funções async em uma camada `api/` |
| `HttpLoggingInterceptor` | React Native Debugger / network inspect |
| Certificate pinning | `react-native-ssl-pinning` / OkHttp nativo |

## O padrão "camada de API"

Em vez de interface anotada (Retrofit), o RN usa módulos de funções:

<Tabs>
<TabItem value="kotlin" label="Kotlin (Retrofit)">

```kotlin
interface Api {
    @GET("users/{id}")
    suspend fun getUser(@Path("id") id: String): User
}
```

</TabItem>
<TabItem value="rn" label="TypeScript">

```ts
export async function getUser(id: string): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return userSchema.parse(await res.json()); // Zod ≈ Moshi em runtime
}
```

</TabItem>
</Tabs>

:::warning fetch não lança erro em 4xx/5xx
Diferente do Retrofit (que falha em resposta não-2xx), `fetch` **resolve normalmente** com `res.ok === false`. Sempre cheque `res.ok` — ou use axios, que rejeita automaticamente.
:::

## Validação com Zod ≈ serialização com garantia

```ts
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email().optional(),
});

type User = z.infer<typeof userSchema>; // tipo derivado do schema
```

JSON em JS não tem garantia nenhuma — o Zod valida em runtime o que o Moshi/kotlinx garantia via codegen.

## O que anotar depois

- [ ] TanStack Query ≈ repository + cache + retry + stale-while-revalidate
- [ ] WebSocket / SSE vs socket do OkHttp
- [ ] Upload/download de arquivos (`FormData`, expo-file-system)
