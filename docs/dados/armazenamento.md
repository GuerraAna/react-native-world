---
sidebar_position: 2
title: Armazenamento Local
sidebar_label: 🗄️ Armazenamento
description: SharedPreferences, DataStore e Room vs AsyncStorage, MMKV e SQLite
---

# Armazenamento Local

## Mapeamento

| Android | React Native |
|---|---|
| `SharedPreferences` | `@react-native-async-storage/async-storage` (async) ou **MMKV** (sync, rápido) |
| `DataStore` (Preferences/Proto) | MMKV / AsyncStorage |
| `Room` (SQLite) | `react-native-sqlite-storage`, `expo-sqlite`, **Realm**, **WatermelonDB** |
| `DataStore` + Flow observable | WatermelonDB observables / Realm listeners |
| EncryptedSharedPreferences | `react-native-keychain`, `expo-secure-store` |
| Internal storage (files) | `react-native-fs`, `expo-file-system` |

## Key-value simples

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

await AsyncStorage.setItem('token', token);   // ≈ prefs.edit().putString().apply()
const token = await AsyncStorage.getItem('token');
```

```tsx
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();
storage.set('token', token);        // síncrono — sem await
const token = storage.getString('token');
```

:::tip MMKV é o queridinho
Síncrono (dá pra ler no render sem flash), muito mais rápido que AsyncStorage, e é a mesma lib que apps como o WeChat usam. Funciona com TursoModules — bom candidato para sua seção nativa.
:::

## Banco de dados

- `expo-sqlite` — acesso direto ao SQLite, API moderna (≈ SupportSQLiteOpenHelper)
- **Realm** — banco de objetos com sync (≈ Realm no Android, mesma lib!)
- **WatermelonDB** — SQLite otimizado para muitos registros + sync

:::warning Segredos não vão em AsyncStorage
`AsyncStorage` não é criptografado — tokens e credenciais vão para `expo-secure-store`/Keychain (≈ `EncryptedSharedPreferences` + Keystore).
:::

## O que anotar depois

- [ ] Migrations: SQLite version vs Room migrations
- [ ] Persistir stores: `zustand/middleware persist` + MMKV
