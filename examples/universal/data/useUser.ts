// useUser.ts — camada de dados compartilhada (TanStack Query)
//
// A mesma query roda no app e no site: o QueryClient é universal,
// o fetch funciona nos dois, e a invalidação de cache sincroniza.
// É o "Repository + Flow" do mundo universal.

import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';

export type User = {id: string; name: string; email: string};

const API = 'https://api.exemplo.com';

// fetch compartilhado — funciona no app (RN) e no site (browser/Node)
async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`${API}/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// query — mesma chave compartilha cache entre telas e plataformas
export function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    staleTime: 60_000,
  });
}

// mutation — invalida o cache (≈ repository.refresh) nos dois lados
export function useUpdateUser(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dados: Partial<User>) =>
      fetch(`${API}/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(dados),
      }).then(r => r.json()),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['user', id]}),
  });
}
