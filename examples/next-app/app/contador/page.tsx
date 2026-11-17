import {Contador} from './Contador';

// app/contador/page.tsx — Server Component hospedando um
// Client Component. O servidor renderiza o HTML; o browser
// "hidrata" o botão com o onClick.

export default function ContadorPage() {
  return (
    <main>
      <h1>Contador interativo</h1>
      <Contador />
    </main>
  );
}
