import Link from 'next/link';

// app/page.tsx — rota / — Server Component por padrão
//
// Renderiza no servidor, sem JS enviado pro browser.
// SEO-friendly, TTFB rápido — "a tela chega desenhada".

export default function Home() {
  return (
    <main>
      <h1>Exemplo Next.js — RN World</h1>
      <p>App mínimo demonstrando os conceitos do segmento Web.</p>
      <nav>
        <ul>
          <li>
            <Link href="/usuarios">Lista de usuários (Server Component)</Link>
          </li>
          <li>
            <Link href="/contador">Contador (Client Component)</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
