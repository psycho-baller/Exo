import type { Config } from 'drizzle-kit'

export default {
  schema: './schema',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'expo',
  tablesFilter: ['*'],
} satisfies Config
