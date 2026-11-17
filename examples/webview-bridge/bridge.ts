// bridge.ts — ponte bidirecional app ↔ WebView (request/response)
//
// react-native-webview só tem postMessage (fire-and-forget).
// Este padrão adiciona request/response com IDs de correlação —
// o equivalente assíncrono do JavascriptInterface.addJavascriptInterface.

// ============ LADO APP (React Native) ============
//
// const webRef = useRef<WebView>(null);
// const bridge = new AppBridge(webRef);
// const resultado = await bridge.call('getUserPrefs', {tema: true});

type PendingResolver = (value: unknown) => void;

export class AppBridge {
  private pending = new Map<number, PendingResolver>();
  private nextId = 0;

  constructor(private webRef: {current: {postMessage: (m: string) => void} | null}) {}

  // Chama uma função no site embutido e aguarda o retorno
  call<T>(acao: string, dados?: unknown): Promise<T> {
    return new Promise((resolve) => {
      const id = this.nextId++;
      this.pending.set(id, resolve as PendingResolver);
      this.webRef.current?.postMessage(JSON.stringify({id, acao, dados}));
    });
  }

  // Conectar no onMessage da <WebView>
  handleMessage = (event: {nativeEvent: {data: string}}) => {
    const {id, resultado, erro} = JSON.parse(event.nativeEvent.data);
    const resolve = this.pending.get(id);
    if (resolve) {
      resolve(erro ? Promise.reject(erro) : resultado);
      this.pending.delete(id);
    }
  };
}

// ============ LADO WEB (site rodando dentro da WebView) ============
//
// Detecta se está dentro do app e responde as chamadas.
// No app: window.ReactNativeWebView existe.
// No browser normal: não existe → o site se comporta como web puro.

declare global {
  interface Window {
    ReactNativeWebView?: {postMessage: (m: string) => void};
  }
}

export const dentroDoApp = () => typeof window !== 'undefined' && !!window.ReactNativeWebView;

type Acao = (dados: unknown) => unknown | Promise<unknown>;

export function registrarAcoes(acoes: Record<string, Acao>) {
  // Android entrega mensagens no document; iOS no window
  const alvo = typeof document !== 'undefined' ? document : window;

  alvo.addEventListener('message', async (e: MessageEvent) => {
    try {
      const {id, acao, dados} = JSON.parse(e.data);
      const resultado = await acoes[acao]?.(dados);
      window.ReactNativeWebView?.postMessage(JSON.stringify({id, resultado}));
    } catch (erro) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({id: null, erro: String(erro)}),
      );
    }
  });
}
