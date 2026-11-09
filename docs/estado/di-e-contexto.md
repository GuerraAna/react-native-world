---
sidebar_position: 3
title: Injeção de Dependências e Context
sidebar_label: 💉 DI e Context
description: Hilt/Koin vs Context API e providers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Injeção de Dependências e Context

## A grande diferença cultural

No Android, DI (Hilt/Koin) é praticamente obrigatório. No RN, **DI formal é raro** — o ecossistema resolve composição de dependências via:

1. **Context API** — fornecer valor/serviço para a subárvore (≈ escopo de DI)
2. **Props e custom hooks** — composição explícita
3. **Imports de módulo** — módulos ES já são singletons naturais

## Context ≈ escopo de DI

<Tabs>
<TabItem value="kotlin" label="Kotlin (Hilt)">

```kotlin
@Singleton
class UserRepository @Inject constructor(api: Api)

@HiltViewModel
class HomeViewModel @Inject constructor(
    private val repo: UserRepository,
) : ViewModel()
```

</TabItem>
<TabItem value="rn" label="React Native (Context)">

```tsx
const RepoContext = createContext<UserRepository | null>(null);

export function RepoProvider({children}: PropsWithChildren) {
  const repo = useMemo(() => new UserRepository(api), []);
  return <RepoContext.Provider value={repo}>{children}</RepoContext.Provider>;
}

export function useRepo() {
  const ctx = useContext(RepoContext);
  if (!ctx) throw new Error('fora do Provider');
  return ctx;
}
```

</TabItem>
</Tabs>

:::tip Equivalente Android
`<RepoProvider>` envolvendo a subárvore ≈ definir o escopo (`@Singleton`, `@ActivityScoped`). `useContext` ≈ `@Inject` — mas resolvido em runtime pela árvore de componentes, não por grafo de dependências em compile-time.
:::

## Regras práticas

- Context para **tema, auth, locale, serviços** — coisas estáveis e amplas
- Não usar Context para estado que muda toda hora (re-renderiza toda a subárvore)
- "Inject" de verdade (testes, mocks) se faz passando dependências por props/params do hook

## O que anotar depois

- [ ] `React.FC<PropsWithChildren>` e composição de providers
- [ ] Libs de DI se quiser a experiência Koin: `tsyringe`, `inversify`
