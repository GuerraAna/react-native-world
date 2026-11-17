// Button.tsx — versão COMPARTILHADA (web + nativo)
//
// O bundler resolve por plataforma:
//   Button.web.tsx    → só web
//   Button.native.tsx → só app (Android/iOS)
//   Button.tsx        → fallback quando nenhuma das acima existe
//
// Regra de ouro: a implementação compartilhada usa apenas APIs que
// funcionam nos DOIS ambientes (Pressable, Text — que o RN Web traduz).
// O que depende de device entra nas variantes .native/.web.

import {Pressable, Text, StyleSheet, type GestureResponderEvent} from 'react-native';

export type ButtonProps = {
  label: string;
  onPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
};

export function Button({label, onPress, disabled}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.botao,
        pressed && styles.pressionado,
        disabled && styles.desabilitado,
      ]}>
      <Text style={styles.texto}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#3DDC84',
    alignItems: 'center',
  },
  pressionado: {opacity: 0.8},
  desabilitado: {opacity: 0.5},
  texto: {color: '#073042', fontWeight: '600', fontSize: 16},
});
