---
sidebar_position: 2
title: Flexbox (Yoga)
description: O sistema de layout do RN para quem conhece LinearLayout/ConstraintLayout
---

# Flexbox e Yoga

## Mudança de paradigma

No Android você escolhe o **container** (`LinearLayout`, `ConstraintLayout`, `FrameLayout`) e ele define como os filhos se posicionam. No RN **todo layout é Flexbox**, resolvido pela engine **Yoga** — você descreve o comportamento via propriedades de estilo.

## Mapeamento mental

| Android | Flexbox no RN |
|---|---|
| `LinearLayout(vertical)` | `flexDirection: 'column'` (**padrão!**) |
| `LinearLayout(horizontal)` | `flexDirection: 'row'` |
| `match_parent` (eixo principal) | `flex: 1` |
| `wrap_content` | padrão (sem `flex`) |
| `layout_weight="1"` | `flex: 1` (weight realmente igual) |
| `gravity="center"` | `justifyContent: 'center'` + `alignItems: 'center'` |
| `layout_gravity` | `alignSelf` no filho |
| `ConstraintLayout` | Combinações de flex + `position: 'absolute'` (bem menos poderoso) |
| `dp` | unidades são **density-independent** por padrão — escreva `16`, não `16.dp` |

## Os dois eixos (maior fonte de confusão)

```tsx
<View style={{
  flexDirection: 'column',   // eixo principal = vertical
  justifyContent: 'center',  // distribui no eixo principal (vertical) ≈ gravity vertical
  alignItems: 'center',      // alinha no eixo cruzado (horizontal) ≈ gravity horizontal
}}>
```

:::warning Pegadinha clássica
`justifyContent` ≠ `justify_content` de texto. E como `column` é o padrão, `justifyContent` age na **vertical** — invertido em relação à intuição de quem vem do web ou pensa em `row` primeiro.
:::

## O que anotar depois

- [ ] `gap` (substitui margin em filhos) ≈ `Arrangement.spacedBy`
- [ ] `position: 'absolute'` + zIndex ≈ `FrameLayout`/elevation
- [ ] `flexWrap` para layouts que quebram linha
