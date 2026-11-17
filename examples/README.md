# Exemplos de referência

Código de referência citado na documentação — **não é um projeto executável**.
São recortes ilustrativos mostrando os padrões do guia, prontos para copiar
para um projeto real.

## Estrutura

```text
examples/
├── universal/          → padrões do "projeto universal" (app + web)
│   ├── shared/Button/  → componente cross-platform com .web/.native
│   ├── navigation/     → Solito link/router compartilhado
│   └── data/           → camada de dados compartilhada (TanStack Query)
└── webview-bridge/     → ponte bidirecional app ↔ WebView
```

Cada pasta tem arquivos comentados explicando o padrão — o objetivo é
referência legível, não um app rodando.
