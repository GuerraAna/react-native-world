// Button.web.tsx — versão ESPECÍFICA da web
//
// Mesma API pública (ButtonProps), implementação otimizada pra DOM:
// usa um <button> real — melhor semântica, acessibilidade e SEO
// que um <div> com onClick do RN Web.

import type {ButtonProps} from './Button';

export function Button({label, onPress, disabled}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onPress as unknown as React.MouseEventHandler}
      disabled={disabled}
      style={{
        padding: '12px 20px',
        borderRadius: 8,
        backgroundColor: '#3DDC84',
        color: '#073042',
        fontWeight: 600,
        fontSize: 16,
        border: 'none',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}>
      {label}
    </button>
  );
}
