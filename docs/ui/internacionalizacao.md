---
sidebar_position: 7
title: Internacionalização (i18n)
sidebar_label: 🌍 i18n
description: strings.xml/values-pt vs i18n-js, expo-localization e next-intl
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Internacionalização (i18n)

No Android, strings ficam em `res/values-*/` e o sistema resolve por locale automaticamente. No RN/web, i18n é **uma biblioteca**, não um recurso do sistema — mas o modelo mental é o mesmo: chave → string localizada.

## Mapeamento

| Android | React Native | Web (Next.js) |
|---|---|---|
| `res/values/strings.xml` | objeto/JSON de traduções | `messages/en.json` (next-intl) |
| `res/values-pt/strings.xml` | `pt` no objeto/locale | `messages/pt.json` |
| `getString(R.string.x)` | `t('chave')` / `i18n.t()` | `t('chave')` do `useTranslations` |
| `resources.getQuantityString` | pluralização da lib | `t('chave', {count})` |
| Locale do sistema (automático) | `expo-localization` | `middleware` + `Accept-Language` |
| `NumberFormat`/dates | `Intl` API (mesma do Android!) | `Intl` / `next-intl` formatters |

## A stack comum

<Tabs>
<TabItem value="rn" label="App (i18n-js + expo-localization)">

```tsx
import * as Localization from 'expo-localization';
import {I18n} from 'i18n-js';

const i18n = new I18n({
  en: {welcome: 'Hello, {name}!'},
  pt: {welcome: 'Olá, {name}!'},
});

// locale do device — ≈ Resources.getConfiguration().locale
i18n.locale = Localization.getLocales()[0].languageCode;
i18n.fallbacks = true;

i18n.t('welcome', {name: 'Ana'}); // "Olá, Ana!"
```

</TabItem>
<TabItem value="web" label="Next.js (next-intl)">

```tsx
// messages/pt.json: {"welcome": "Olá, {name}!"}
import {useTranslations} from 'next-intl';

function Home() {
  const t = useTranslations();
  return <h1>{t('welcome', {name: 'Ana'})}</h1>;
}
// A rota já carrega o locale: /pt/usuarios, /en/usuarios
```

</TabItem>
</Tabs>

## As diferenças que pegam

| Android | RN/Web |
|---|---|
| Sistema resolve `values-*` sozinho | **Você** gerencia locale — estado/rota |
| Fallback automático pro `values/` padrão | Configure `fallbacks`/`defaultLocale` |
| `getString()` em qualquer contexto | `t()` só dentro de componente/provider |
| Strings são recursos do sistema | Strings são dados — carregue/bundle conforme precisa |

:::tip `Intl` é universal
A API `Intl` (`DateTimeFormat`, `NumberFormat`, `PluralRules`) é a **mesma** no Android (via ICU), no JS moderno e no Node — formatação de data/moeda/plural não precisa de lib. `Intl.DateTimeFormat('pt-BR').format(data)` funciona igual nos dois lados.
:::

## O que anotar depois

- [ ] `expo-localization` — locale, timezone, RTL do device
- [ ] `react-i18next` vs `i18n-js` — quando cada um
- [ ] next-intl middleware — roteamento por locale (≈ qualifiers na URL)
- [ ] RTL layouts — `I18nManager` ≈ `layoutDirection="rtl"`

## Referências oficiais

- [Expo — Localization](https://docs.expo.dev/versions/latest/sdk/localization/)
- [i18n-js](https://github.com/fnando/i18n-js)
- [next-intl](https://next-intl.dev/)
- [Android — Localization](https://developer.android.com/guide/topics/resources/localization)
