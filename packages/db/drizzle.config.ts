import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config({
  path: '../../.env',
});

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

export default {
  schema: './schema',
  out: './drizzle',
  driver: 'libsql',
  tablesFilter: ['*'],
  dbCredentials: {
    url: 'http://127.0.0.1:8080',
  },
} satisfies Config;
