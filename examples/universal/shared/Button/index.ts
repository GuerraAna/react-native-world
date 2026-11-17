// index.ts — re-exporta a versão resolvida por plataforma
//
// Quem consome faz `import {Button} from './Button'` e o bundler
// escolhe Button.web.tsx (web) ou Button.tsx (nativo/fallback)
// automaticamente — sem o consumidor saber da variante.

export {Button} from './Button';
export type {ButtonProps} from './Button';
