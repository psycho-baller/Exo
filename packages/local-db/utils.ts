import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { db } from '.'
import migrations from './drizzle/migrations'
import * as schema from './schema'
import type { Database } from './schema/_table'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { openDatabaseSync } from 'expo-sqlite'
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin'

interface ConnectionResult {
  db: Database
}
export const expo = openDatabaseSync('db2.db', {
  // enableCRSQLite: true,
})
export function createConnection(): ConnectionResult {
  const db = drizzle(expo, {
    schema,
  })

  return {
    db,
    // if we want to use the "using" keyword in the future
    // [Symbol.asyncDispose]: async () => {
    //   console.log("🧨 Closing the database connection...");
    //   await pg.end();
    // },
  }
}

export const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
  if (values.length !== 1) throw new Error('Found non unique or inexistent value')
  return values[0]
}

export const takeUnique = <T extends any[]>(values: T): T[number] | undefined => {
  if (values.length !== 1) return undefined
  return values[0]
}

export const useMigrationHelper = () => {
  return useMigrations(db, migrations)
}

export const useDrizzleStudioHelper = () => {
  return useDrizzleStudio(expo)
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
