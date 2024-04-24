import type { Config } from 'drizzle-kit'
import { dbCredentials } from './utils'
export default {
  schema: './schema',
  out: './drizzle',
  driver: 'libsql',
  tablesFilter: ['*'],
  dbCredentials,
} satisfies Config
