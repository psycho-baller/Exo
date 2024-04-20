import type { Config } from 'drizzle-kit'

export default {
  schema: './schema',
  out: './drizzle',
  driver: 'libsql',
  tablesFilter: ['*'],
  dbCredentials: {
    url: 'http://127.0.0.1:8080',
  },
} satisfies Config
