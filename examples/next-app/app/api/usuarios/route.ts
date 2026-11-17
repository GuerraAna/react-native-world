// app/api/usuarios/route.ts — Route Handler = API real
//
// GET /api/usuarios e POST /api/usuarios — seu próprio backend
// dentro do Next. Use quando precisa expor endpoint pra terceiros,
// webhooks, ou pro app RN bater na mesma API do site.
//
// Equivalente Android: escrever um controller do Ktor/Spring
// no mesmo processo do app.

import {listarUsuarios} from '@/lib/data';

export async function GET() {
  const usuarios = await listarUsuarios();
  return Response.json(usuarios);
}

export async function POST(request: Request) {
  const body = await request.json();
  // validação + persistência aqui
  return Response.json({recebido: body}, {status: 201});
}
