import type {Metadata} from 'next';
import type {ReactNode} from 'react';

// layout.tsx ≈ a Activity que hospeda todos os fragments —
// compartilha estrutura (nav, footer) entre todas as rotas.
export const metadata: Metadata = {
  title: 'Exemplo RN World — Next.js',
  description: 'App mínimo demonstrando Server Components, Server Actions e Route Handlers',
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
