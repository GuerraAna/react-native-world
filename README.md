# React Native World

Documentação pessoal de estudos: **React Native para quem vem do Android/Kotlin**.

🌐 **Acesse o site:** https://guerraana.github.io/react-native-world/

Site construído com [Docusaurus](https://docusaurus.io).

## Comandos

```bash
npm install        # instala dependências
npm start          # dev server em http://localhost:3000/react-native-world/
npm run build      # build de produção em ./build
npm run serve      # serve o build localmente
npm run typecheck  # checa tipos TS
```

## Estrutura

```
docs/                  # conteúdo (markdown) — cada pasta = um segmento na sidebar
  fundamentos/         # arquitetura, Expo vs CLI, Metro
  linguagem/           # Kotlin → TypeScript
  ui/                  # componentes, Flexbox, StyleSheet, listas
  estado/              # ciclo de vida, estado, DI/Context
  navegacao/           # React Navigation
  dados/               # rede e armazenamento
  nativo/              # TurboModules em Kotlin, Gradle
  tooling/             # debug, testes, código por plataforma
src/pages/index.tsx    # homepage
docusaurus.config.ts   # configuração do site
sidebars.ts            # sidebar (autogerada a partir de docs/)
```

## Convenções de conteúdo

- Tabelas de mapeamento `Android/Kotlin → React Native` em cada página
- Abas comparativas de código com `<Tabs>`/`<TabItem>`
- Callouts `:::tip Equivalente Android` para pontes mentais
- Seção "O que anotar depois" ao final de cada página como checklist de estudo

## Deploy

Push para `main` faz deploy automático no GitHub Pages via
`.github/workflows/deploy.yml`. É preciso configurar o repo em
**Settings → Pages → Source: GitHub Actions**.
