---
sidebar_position: 3
title: Padrões e Estruturas
sidebar_label: 🧩 Padrões e Estruturas
description: sealed classes, when, extension functions e coleções
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Padrões e Estruturas

## Sealed class → discriminated union

<Tabs>
<TabItem value="kotlin" label="Kotlin">

```kotlin
sealed interface Result {
    data class Success(val data: String) : Result
    data class Error(val message: String) : Result
}

fun handle(r: Result) = when (r) {
    is Result.Success -> println(r.data)
    is Result.Error -> println(r.message)
}
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
type Result =
  | {type: 'success'; data: string}
  | {type: 'error'; message: string};

function handle(r: Result) {
  switch (r.type) {
    case 'success':
      console.log(r.data); // TS faz narrowing automático
      break;
    case 'error':
      console.log(r.message);
  }
}
```

</TabItem>
</Tabs>

:::tip Equivalente Android
`when` exaustivo ≈ `switch` sobre um campo "discriminador" literal (`type:`). O TypeScript faz *narrowing* igual o smart cast do Kotlin.
:::

## Coleções: quase 1:1

| Kotlin | TypeScript |
|---|---|
| `list.map { }` | `arr.map(x => )` |
| `filter { }` | `arr.filter(x => )` |
| `firstOrNull { }` | `arr.find(x => )` (retorna `undefined`) |
| `associateBy { it.id }` | `Object.fromEntries(arr.map(x => [x.id, x]))` |
| `forEach` | `forEach` |
| imutável por padrão (`List`) | `readonly T[]` / `as const` |

## O que não existe (ou muda)

| Kotlin | Em TS/JS |
|---|---|
| `extension functions` | Funções comuns — monkey-patching de prototype é má prática |
| `data class copy()` | Spread: `{...obj, campo: novo}` |
| `companion object` | `static` members ou constantes no módulo |
| `object` (singleton) | Export de uma instância/const do módulo |
| destructuring | Também existe: `const {name, id} = user` |

## O que anotar depois

- [ ] `var`/`val` → `let`/`const` (e por que `var` de JS é evitado)
- [ ] Imutabilidade: `Object.freeze`, spread patterns
