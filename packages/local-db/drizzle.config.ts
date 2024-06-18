import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: './schema',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'expo',
  tablesFilter: ['*'],
})
