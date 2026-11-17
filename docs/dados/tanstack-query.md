---
sidebar_position: 3
title: TanStack Query
sidebar_label: 🔄 TanStack Query
description: Estado de servidor com cache, retry e stale-while-revalidate — o Repository+Flow do RN
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# TanStack Query

A maior mudança de paradigma da doc: no Android você trata dados de API e estado de UI da mesma forma (ViewModel + StateFlow). No RN, a comunidade separa em **dois tipos de estado**:

```text
CLIENT STATE  → useState, Zustand, Context  (o que o USUÁRIO fez/escolheu)
SERVER STATE  → TanStack Query              (o que veio da API — cache, sync, refetch)
```

Você não "baixa dados e guarda num useState" — você declara **"preciso destes dados"** e o Query cuida de cache, loading, erro, retry e revalidação.

## Mapeamento Repository → Query

| Padrão Android | TanStack Query |
|---|---|
| `Repository` + `suspend fun` | `useQuery({queryKey, queryFn})` |
| `Flow<Result>` na tela | `{data, isLoading, error}` do hook |
| Cache + stale check manual | `staleTime`, `refetchOnWindowFocus` automáticos |
| `retry` no interceptor | `retry` embutido (exponential backoff) |
| `WorkManager` refresh | `refetchInterval`, `invalidateQueries` |
| `distinctUntilChanged` | dedupe automático por `queryKey` |

## O básico

<Tabs>
<TabItem value="kotlin" label="Kotlin (Repository)">

```kotlin
class UserRepository(private val api: Api) {
    suspend fun getUser(id: String) = api.getUser(id)
}

// na tela:
viewModelScope.launch {
    val user = repo.getUser("1") // você gerencia loading/erro/cache
}
```

</TabItem>
<TabItem value="rn" label="TanStack Query">

```tsx
const {data: user, isLoading, error} = useQuery({
  queryKey: ['user', id],           // a "chave de cache"
  queryFn: () => api.getUser(id),   // a "suspend fun do repository"
  staleTime: 60_000,                // ≈ cache válido por 60s
});

// isLoading/error/data prontos — sem useState, sem useEffect
```

</TabItem>
</Tabs>

## Mutações — o "POST do repository"

```tsx
const mutation = useMutation({
  mutationFn: (novoUser) => api.criarUser(novoUser),
  onSuccess: () => {
    // invalida o cache → refetch automático da lista
    queryClient.invalidateQueries({queryKey: ['users']});
  },
});

mutation.mutate({name: 'Ana'});
```

:::tip Equivalente Android
`invalidateQueries` é como chamar `repository.refresh()` — mas em vez de você emitir um novo valor no `MutableStateFlow`, o Query **refaz a requisição automaticamente** em todos os lugares que usam aquela `queryKey`. É o `Flow` emitindo novo valor sem você escrever o emit.
:::

## Por que isso existe (o problema que resolve)

Sem Query, o padrão RN seria:

```tsx
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => { fetchUsers().then(setUsers).finally(...) }, []);
// e aí: e quando o usuário voltar pra tela? refetch? cache? dedupe?
```

Query resolve tudo isso **declarativamente** — a `queryKey` é o "identity" do dado; componentes em telas diferentes com a mesma key compartilham o mesmo fetch (dedupe automático).

## O que anotar depois

- [ ] `queryClient` — o "repositório central" (prefetch, setQueryData)
- [ ] Optimistic updates — atualiza a UI antes da resposta (≈ Room escreve, API confirma)
- [ ] Paginação: `useInfiniteQuery` ≈ Paging 3
- [ ] Persistência do cache: MMKV/AsyncStorage como storage do Query

## Referências oficiais

- [TanStack Query — Documentação](https://tanstack.com/query/latest)
- [TanStack Query — React Native](https://tanstack.com/query/latest/docs/framework/react/react-native)
- [Android — Paging 3](https://developer.android.com/topic/libraries/architecture/paging/v3-overview)
