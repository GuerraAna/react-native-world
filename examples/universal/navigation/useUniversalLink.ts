// useUniversalLink.ts — navegação compartilhada app + web
//
// O Solito traduz a navegação declarativa pras duas plataformas:
//   no app → React Navigation navigate()
//   no web → Next.js <Link> / router.push()
//
// Este hook encapsula o padrão: uma API que "abra a tela X"
// independente de onde roda.

import {useRouter} from 'solito/router';
import {TextLink, type TextLinkProps} from 'solito/link';

// ——— versão imperativa (equivalente a navigation.navigate) ———
export function useUniversalRouter() {
  const {push, back, replace} = useRouter();
  return {
    // /detalhe/42 funciona tanto como rota do app quanto URL do site
    abrirDetalhe: (id: number | string) => push(`/detalhe/${id}`),
    voltar: back,
    irParaHome: () => replace('/'),
  };
}

// ——— versão declarativa (equivalente a <Link> / deep link) ———
// No app vira um Pressable que navega; no web vira <a href> real
// (SEO-friendly — o link existe no HTML).
export function UniversalLink({href, children}: TextLinkProps) {
  return <TextLink href={href}>{children}</TextLink>;
}
