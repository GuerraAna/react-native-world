---
sidebar_position: 4
title: Listas
description: RecyclerView/Adapter vs FlatList/FlashList
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Listas

## Mapeamento

| RecyclerView | FlatList |
|---|---|
| `dataSet` (lista no Adapter) | prop `data` |
| `onCreateViewHolder` + `onBindViewHolder` | prop `renderItem` |
| `getItemViewType` | tipos diferentes via lógica no `renderItem` |
| `DiffUtil` / `ListAdapter` | `keyExtractor` + reconciliação automática |
| `ItemDecoration` (divider) | `ItemSeparatorComponent` |
| `LinearLayoutManager` | padrão; `horizontal` para horizontal |
| `GridLayoutManager` | `numColumns` |
| header/footer | `ListHeaderComponent` / `ListFooterComponent` |
| pull to refresh (SwipeRefreshLayout) | `refreshControl` + `onRefresh` |
| endless scroll (scroll listener) | `onEndReached` |

## Exemplo

<Tabs>
<TabItem value="kotlin" label="Kotlin (RecyclerView)">

```kotlin
class UserAdapter : ListAdapter<User, VH>(Diff()) {
    override fun onBindViewHolder(holder: VH, pos: Int) {
        holder.bind(getItem(pos))
    }
}
recyclerView.adapter = UserAdapter()
```

</TabItem>
<TabItem value="rn" label="React Native (FlatList)">

```tsx
<FlatList
  data={users}
  keyExtractor={(item) => item.id}
  renderItem={({item}) => <UserRow user={item} />}
  ItemSeparatorComponent={() => <View style={{height: 8}} />}
  onEndReached={loadMore}
/>
```

</TabItem>
</Tabs>

## Performance: o alerta do FlatList

- `FlatList` virtualiza (renderiza só o visível) como o `RecyclerView`
- Para listas grandes, a comunidade usa **`@shopify/flash-list`** — reciclagem real de células, API quase idêntica
- Regra de ouro: **`renderItem` e `keyExtractor` estáveis** (não recriar a cada render — pense no `DiffUtil`)

:::warning Não use ScrollView + map para listas longas
`<ScrollView>` renderiza **todos** os filhos de uma vez — é como colocar mil itens num `LinearLayout` dentro de `NestedScrollView`. Só para conteúdo curto e estático.
:::

## O que anotar depois

- [ ] `SectionList` ≈ RecyclerView com headers sticky
- [ ] `getItemLayout` para pular medida (≈ fixed size no RV)
- [ ] `estimatedItemSize` no FlashList
