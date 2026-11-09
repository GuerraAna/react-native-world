---
sidebar_position: 2
title: Coroutines vs Async/Await
description: suspend, Flow, Promise e async/await
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Coroutines vs Async/Await

## Mapeamento mental

| Kotlin | TypeScript |
|---|---|
| `suspend fun` | `async function` |
| `await` (em coroutines) / `withContext` | `await` |
| `Deferred<T>` | `Promise<T>` |
| `Flow<T>` | `Observable`/streams, ou libs como `rxjs` |
| `Dispatchers.IO/Main` | JS é single-threaded — não existe troca de dispatcher* |
| `viewModelScope` | Ciclo de vida do componente + cleanup do `useEffect` |

\* O JS roda numa única thread; trabalho pesado de CPU vai para o nativo ou threads nativas.

## Chamada assíncrona básica

<Tabs>
<TabItem value="kotlin" label="Kotlin">

```kotlin
suspend fun fetchUser(id: String): User =
    withContext(Dispatchers.IO) {
        api.getUser(id)
    }

viewModelScope.launch {
    val user = fetchUser("1")
}
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
async function fetchUser(id: string): Promise<User> {
  const response = await api.getUser(id);
  return response.data;
}

useEffect(() => {
  fetchUser('1').then(setUser);
}, []);
```

</TabItem>
</Tabs>

## Diferenças que importam

- **`async` retorna `Promise` imediatamente**: em Kotlin, `suspend` suspende; em JS, toda função `async` já devolve uma Promise — esquecer o `await` silenciosamente retorna uma Promise no lugar do valor.
- **Cancelamento**: coroutines têm cancelamento estruturado; Promises **não cancelam** — usa-se `AbortController`.
- **Erros**: `try/catch` funciona igual, mas um `Promise` rejeitado sem `.catch()` vira `UnhandledPromiseRejection`.

<Tabs>
<TabItem value="kotlin" label="Kotlin">

```kotlin
// cancelamento vem de graça com o escopo
val job = scope.launch { fetchAll() }
job.cancel()
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
const controller = new AbortController();
fetch(url, {signal: controller.signal});
controller.abort();
```

</TabItem>
</Tabs>

## O que anotar depois

- [ ] `Promise.all` ≈ `awaitAll`/`async` + `await`
- [ ] Flow → equivalente mais próximo (RxJS, ou padrões com hooks)
- [ ] Event loop do JS vs despachantes de coroutines
