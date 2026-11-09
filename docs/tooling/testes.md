---
sidebar_position: 2
title: Testes
sidebar_label: 🧪 Testes
description: JUnit/Espresso/Robolectric vs Jest/RNTL/Maestro
---

# Testes

## Mapeamento por camada

| Android | React Native | Camada |
|---|---|---|
| JUnit + MockK | **Jest** (+ `jest.mock`) | unitário puro (lógica) |
| Robolectric / Compose Test | **React Native Testing Library** (RNTL) | componente, sem device |
| Espresso / UiAutomator | **Maestro** ou **Detox** | E2E no emulador/device |
| Screenshot tests (Paparazzi) | `jest` snapshot / libs de screenshot | regressão visual |
| MockWebServer | `msw` (Mock Service Worker) | rede mockada |

## A filosofia muda pouco

```tsx
// RNTL — queries por "o que o usuário vê", como o Compose Test
render(<LoginScreen />);
fireEvent.changeText(screen.getByPlaceholderText('email'), 'a@b.com');
fireEvent.press(screen.getByText('Entrar'));
await screen.findByText('Bem-vinda'); // async ≈ IdlingResource automático
```

:::tip Equivalente Android
RNTL tem a mesma filosofia do Espresso/Compose Test: **testar pelo que o usuário vê** (texto, a11y label, placeholder) e não pela estrutura interna do componente.
:::

## E2E: Maestro vs Detox

- **Maestro**: YAML declarativo, tolerante a timing (≈ Espresso com menos config), funciona em RN, nativo e híbrido
- **Detox**: gray-box testing (≈ Espresso — conhece o estado interno da app), mais poderoso e mais complexo

## O que anotar depois

- [ ] Mockar nativos: `jest.mock('react-native-mmkv')` ≈ mockar dependências Android
- [ ] Snapshot tests: quando ajudam e quando viram ruído
- [ ] CI: rodar Maestro em emulador no GitHub Actions
