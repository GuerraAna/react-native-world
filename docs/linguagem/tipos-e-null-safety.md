---
sidebar_position: 1
title: Tipos e Null Safety
sidebar_label: 🛡️ Tipos e Null Safety
description: data class, interfaces e null safety nos dois mundos
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Tipos e Null Safety

## Modelagem de dados

<Tabs>
<TabItem value="kotlin" label="Kotlin">

```kotlin
data class User(
    val id: String,
    val name: String,
    val email: String? = null,
)

val user = User(id = "1", name = "Ana")
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
interface User {
  id: string;
  name: string;
  email?: string; // ? = opcional (undefined), não null
}

const user: User = {id: '1', name: 'Ana'};
```

</TabItem>
</Tabs>

:::tip Equivalente Android
`data class` ≈ `interface` + literal de objeto. Não existe `copy()` embutido — usa-se spread: `{...user, name: 'Nova'}`.
:::

## Null safety

| Kotlin | TypeScript |
|---|---|
| `String?` | `string \| null` ou `string \| undefined` |
| `?.` safe call | `?.` optional chaining (igual!) |
| `?:` Elvis | `??` nullish coalescing |
| `!!` (nunca use) | `!` non-null assertion (também evite) |
| `lateinit` | `!:` definite assignment |

<Tabs>
<TabItem value="kotlin" label="Kotlin">

```kotlin
val size = user.email?.length ?: 0
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
const size = user.email?.length ?? 0;
```

</TabItem>
</Tabs>

:::warning Pegadinha
`??` só trata `null`/`undefined`. Para `''`, `0` e `false` o comportamento difere do `||`. E lembre: em JS, `undefined` ≠ `null` — o campo ausente é `undefined`.
:::

## O que anotar depois

- [ ] `type` vs `interface` — quando usar cada
- [ ] `unknown` vs `Any?`
- [ ] Generics: `List<T>` vs `Array<T>`/`T[]`
