import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import superjson from 'superjson';
import { MMKV } from "react-native-mmkv"
import AsyncStorage, { type AsyncStorageStatic } from '@react-native-async-storage/async-storage'

import type { ReactNode } from 'react';
import Constants from 'expo-constants';
type CustomAsyncStorage = AsyncStorageStatic & {
  getString: (key: string) => Promise<string | null>
  set: (key: string, value: string | number | boolean | Uint8Array) => Promise<void>
  delete: (key: string) => Promise<void>
}
export function QueryClientProvider(props: { children: ReactNode }) {
  let storage: CustomAsyncStorage | MMKV

  if (Constants.appOwnership === 'expo') {
    // if We are in Expo Go, use AsyncStorage
    storage = AsyncStorage as CustomAsyncStorage
  } else {
    // We are in a standalone app, use MMKV
    storage = new MMKV()
  }
  const clientStorage = {
    setItem: (key: string, value: string | number | boolean | Uint8Array) => {
      storage.set(key, value);
    },
    getItem: (key: string) => {
      const value = storage.getString(key);
      return value === undefined ? null : value;
    },
    removeItem: (key: string) => {
      storage.delete(key);
    },
  };
  const queryClientPersistCacheConfig = {
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  };

  const [queryClient] = useState(() => new QueryClient(queryClientPersistCacheConfig));
  const persister = createAsyncStoragePersister({
    storage: clientStorage,
    // @ts-ignore
    // serialize: superjson.serialize,
    // @ts-ignore
    // deserialize: superjson.deserialize,
  });

  return (
    <PersistQueryClientProvider persistOptions={{ persister }} client={queryClient}>
      {props.children}
    </PersistQueryClientProvider>
  )
}