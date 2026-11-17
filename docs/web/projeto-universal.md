---
sidebar_position: 7
title: Projeto Universal
sidebar_label: 📦 Projeto Universal
description: Um monorepo, duas saídas — app RN e site Next.js compartilhando código
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Projeto Universal

A peça central do segmento: **um codebase alimentando app nativo + site web**. A comunidade convergiu em ferramentas específicas pra isso — não é DIY.

## O modelo mental (KMP ajuda aqui)

```text
monorepo/
├── packages/
│   └── app/                  → código COMPARTILHADO (o "commonMain")
│       ├── features/         → telas e lógica de negócio
│       ├── components/       → UI cross-platform
│       └── api/              → chamadas de dados
├── apps/
│   ├── expo/                 → app nativo (o "androidMain")
│   └── next/                 → site web (o "webMain")
└── package.json (workspaces)
```

A regra é a mesma do KMP: **o máximo possível no shared**, plataforma-específico fica nos apps.

## As ferramentas da comunidade

| Ferramenta | Papel | O que resolve |
|---|---|---|
| **Solito** | Navegação universal | `useRouter().push()` funciona no app (React Navigation) E no web (Next.js) — mesma API |
| **Tamagui** | UI universal | Componentes estilizados que compilam pra RN nativo E DOM — design tokens compartilhados |
| **Expo + Next.js** | Os dois alvos | `apps/expo` (app) e `apps/next` (site) no mesmo monorepo |
| **Turborepo / workspaces** | Monorepo | Gerencia os pacotes e builds |

## Solito na prática

```tsx
// packages/app/features/home/screen.tsx — roda nos DOIS
import {useRouter} from 'solito/router';
import {TextLink} from 'solito/link';

export function HomeScreen() {
  const {push} = useRouter();
  return (
    <>
      {/* No app: navega na stack. No web: vira <a href> com URL real */}
      <TextLink href="/detalhe/42">Ver detalhe</TextLink>
      <Button onPress={() => push('/detalhe/42')} />
    </>
  );
}
```

Solito traduz a navegação declarativa pras duas plataformas — você escreve `href`, ele usa `navigation.navigate()` no app e `<Link>` do Next no web.

## O que vai onde (a divisão real)

<Tabs>
<TabItem value="shared" label="✅ packages/app (shared)">

- Telas e fluxos de UI
- Lógica de negócio e validações (Zod)
- Hooks de dados (TanStack Query, fetch)
- Estado global (Context, Zustand)
- Componentes Tamagui

</TabItem>
<TabItem value="platform" label="⚠️ apps/ (por plataforma)">

- **app nativo**: navegação (React Navigation), permissões, storage nativo, splash/icon
- **site Next**: rotas (`app/`), metadata SEO, SSR/SSG config, API routes
- Wrappers: o que diverge fica em `.native.tsx` vs `.web.tsx`

</TabItem>
</Tabs>

## Iniciando um projeto universal

```bash
# Opção 1 — starter com Solito + Tamagui (recomendado)
npx create-solito-app@latest meu-app-universal

# Opção 2 — Tamagui starter (mais opinativo em UI)
npm create tamagui@latest

# Estrutura gerada:
# apps/expo + apps/next + packages/app + packages/ui
```

:::warning Expectativa realista
O universal é poderoso mas **mais complexo** que "app separado + site separado". Só vale a pena se:
1. O site e o app compartilham muita UI/lógica
2. SEO importa (aí precisa do Next, não só RN Web)
3. Você tem fôlego pra manter o monorepo

Se for só "quero o app no browser", `expo start --web` resolve sem monorepo.
:::

## O que anotar depois

- [ ] `examples/universal/` no repo — código de referência verificável (Button `.web`/`.native`, router Solito, Query compartilhada)
- [ ] Rodar `create-solito-app` e ver a estrutura real
- [ ] Tamagui config — como os tokens viram CSS vars no web
- [ ] Quando um componente vira `.native.tsx` vs `.web.tsx` (APIs de device)
- [ ] Build do monorepo — Turborepo tasks, `yarn workspaces`

## Referências oficiais

- [Solito](https://solito.dev/)
- [Tamagui](https://tamagui.dev/)
- [Turborepo](https://turbo.build/repo/docs)
