import Link from 'next/link';
import {listarUsuarios} from '@/lib/data';
import {criarUsuario} from '../actions';

// app/usuarios/page.tsx — Server Component async
//
// Diferença vs RN: busca dados DIRETO no servidor (sem useEffect,
// sem useState, sem loading) — o HTML chega com a lista pronta.

export default async function UsuariosPage() {
  const usuarios = await listarUsuarios(); // acesso direto, sem HTTP

  return (
    <main>
      <h1>Usuários</h1>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            <Link href={`/usuarios/${u.id}`}>{u.nome}</Link> — {u.email}
          </li>
        ))}
      </ul>

      {/* form action={serverAction} — POST automático sem escrever endpoint */}
      <form action={criarUsuario}>
        <input name="nome" placeholder="Novo usuário" required />
        <button type="submit">Criar</button>
      </form>
    </main>
  );
}
