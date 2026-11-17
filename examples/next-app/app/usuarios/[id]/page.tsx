import {buscarUsuario} from '@/lib/data';
import {notFound} from 'next/navigation';

// app/usuarios/[id]/page.tsx — rota dinâmica
//
// [id] na pasta = parâmetro de rota (≈ nav argument do NavGraph).
// /usuarios/42 → params.id === '42'

export default async function UsuarioPage({
  params,
}: {
  params: Promise<{id: string}>;
}) {
  const {id} = await params; // Next 15+: params é Promise
  const usuario = await buscarUsuario(id);

  if (!usuario) notFound(); // renderiza a página 404

  return (
    <main>
      <h1>{usuario.nome}</h1>
      <p>{usuario.email}</p>
    </main>
  );
}
