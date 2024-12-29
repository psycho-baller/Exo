
import { ExpoSQLiteProvider } from './expo-sqlite';
import { QueryClientProvider } from './query-client';
import { ExpoDrizzleStudio } from './expo-drizzle-studio';
import { useEffect } from 'react';
import { getDeviceId } from '../device';
import { ensureUserExistsInDB } from '@rooots/queries';

export function Provider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void (async () => {
      const deviceId = await getDeviceId();
      await ensureUserExistsInDB(deviceId);
    })();

  }, []);

  return (
    <QueryClientProvider>
      <ExpoSQLiteProvider>
        <ExpoDrizzleStudio>
          {children}
        </ExpoDrizzleStudio>
      </ExpoSQLiteProvider>
    </QueryClientProvider>
  )
}