import type { Config } from 'drizzle-kit'
import { dbCredentials } from './utils'
export default {
  schema: './schema',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'turso',
  tablesFilter: ['*'],
  dbCredentials,
} satisfies Config
