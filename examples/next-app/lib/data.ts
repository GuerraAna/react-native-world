// lib/data.ts — "repository" simulado
//
// Em produção seria Prisma/Drizzle/DB real. Aqui é uma função async
// que mostra o padrão: Server Component chama dados DIRETO,
// sem passar por HTTP — como se a tela pudesse chamar o Room.

export type Usuario = {id: string; nome: string; email: string};

const usuarios: Usuario[] = [
  {id: '1', nome: 'Ana Guerra', email: 'ana@exemplo.com'},
  {id: '2', nome: 'Dev Android', email: 'dev@exemplo.com'},
];

// async — simula uma query de banco (latência)
export async function listarUsuarios(): Promise<Usuario[]> {
  return usuarios;
}

export async function buscarUsuario(id: string): Promise<Usuario | null> {
  return usuarios.find((u) => u.id === id) ?? null;
}
