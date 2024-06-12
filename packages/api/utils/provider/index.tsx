
import { ExpoSQLiteProvider } from '../provider/expo-sqlite';
import { QueryClientProvider } from '../provider/query-client';
import { ExpoDrizzleStudio } from '../provider/expo-drizzle-studio';
import { useEffect } from 'react';
import { getDeviceId } from '../device';
import { ensureUserExistsInDB } from '../../src/queries/user';

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