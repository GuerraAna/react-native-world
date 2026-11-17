// app/actions.ts — Server Actions
//
// 'use server' marca o arquivo como endpoints do servidor.
// Cada export vira uma chamada RPC que o cliente invoca como função
// normal — o Next gera o POST endpoint por baixo.
//
// Equivalente Android: declarar um @POST no Retrofit sem escrever
// a implementação do servidor.

'use server';

import {revalidatePath} from 'next/cache';

// Simulação de banco — em produção: db.usuario.create(...)
const usuarios: string[] = [];

export async function criarUsuario(formData: FormData) {
  const nome = formData.get('nome');
  if (typeof nome === 'string' && nome.length > 0) {
    usuarios.push(nome);
  }
  // Invalida o cache da rota → próxima render busca dados frescos
  // ≈ repository.invalidate() / emitir novo valor no Flow
  revalidatePath('/usuarios');
}
