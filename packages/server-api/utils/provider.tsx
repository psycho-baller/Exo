import type { ReactNode } from 'react';
import { useState } from 'react';
import Constants from 'expo-constants';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { httpBatchLink, loggerLink } from '@trpc/client';
import superjson from 'superjson';
import { MMKV } from "react-native-mmkv"

import { api } from './trpc'

/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
const getBaseUrl = () => {
  /**
   * Gets the IP address of your host-machine. If it cannot automatically find it,
   * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
   * you don't have anything else running on it, or you'd have to change it.
   *
   * **NOTE**: This is only for development. In production, you'll want to set the
   * baseUrl to your production API URL.
   */

  const debuggerHost = Constants.expoConfig?.hostUri
  const localhost = debuggerHost?.split(':')[0]

  if (!localhost) {
    return 'https://convo-topics.vercel.app'
  }
  return `http://${localhost}:3000`
}

/**
 * A wrapper for your app that provides the TRPC context.
 * Use only in _app.tsx
 */

export function Provider(props: { children: ReactNode }) {

  const storage = new MMKV();

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
    serialize: superjson.serialize,
    // @ts-ignore
    deserialize: superjson.deserialize,
  });
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
          colorMode: 'ansi',
        }),
        httpBatchLink({
          transformer: superjson,
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            const headers = new Map<string, string>()
            headers.set('x-trpc-source', 'expo-react')
            return Object.fromEntries(headers)
          },
        }),
      ],
    }),
  )

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <PersistQueryClientProvider persistOptions={{ persister }} client={queryClient}>
        {props.children}
      </PersistQueryClientProvider>
    </api.Provider>
  )
}
