// app/contador/Contador.tsx — Client Component
//
// 'use client' na primeira linha marca o componente como interativo:
// recebe JS no browser, pode usar useState/onClick/etc.
// Regra: marcar no MENOR nível possível da árvore.

'use client';

import {useState} from 'react';

export function Contador() {
  const [n, setN] = useState(0);
  return (
    <button onClick={() => setN(n + 1)}>
      Cliques: {n}
    </button>
  );
}
