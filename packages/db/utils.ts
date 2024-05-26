import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

import * as schema from './schema'
import type { Database } from './schema/_table'

interface ConnectionResult {
  db: Database
  client: ReturnType<typeof createClient>
}
export const dbCredentials = {
  url:
    !(process.env.NODE_ENV === 'development') && process.env.TURSO_CONNECTION_URL
      ? process.env.TURSO_CONNECTION_URL
      : 'http://127.0.0.1:8080',
  authToken: process.env.TURSO_AUTH_TOKEN,
}
export function createConnection(): ConnectionResult {
  const client = createClient(dbCredentials)
  const db = drizzle(client, { schema })

  return {
    db,
    client,
    // if we want to use the "using" keyword in the future
    // [Symbol.asyncDispose]: async () => {
    //   console.log("🧨 Closing the database connection...");
    //   await pg.end();
    // },
  }
}

export function generateRandomId(length: number): number {
  const id = Math.random() * 10 ** length
  return Math.floor(id)
}

export function generateRandomUserId(): string {
  const base = 'seeded_user_'
  const randomNumber = generateRandomId(3).toString()
  const username = base + randomNumber
  return username
}

export function generateRandomFirstName(): string {
  const base = 'seeded_first_name_'
  const randomNumber = generateRandomId(3).toString()
  const firstName = base + randomNumber
  return firstName
}

export function generateRandomLastName(): string {
  const base = 'seeded_last_name_'
  const randomNumber = generateRandomId(3).toString()
  const lastName = base + randomNumber
  return lastName
}
