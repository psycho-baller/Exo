import { Client } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';

import * as schema from './schema';
import type { Database } from './schema/_table';

interface ConnectionResult {
  db: Database;
  client: Client;
}

export function createConnection(): ConnectionResult {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
  }
  const client = new Client({
    url: databaseUrl,
  });
  // export const connection = await mysql.createConnection({
  //   host: process.env.DB_HOST,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
  //   multipleStatements: true,
  // });
  const db = drizzle(client, { schema });

  return {
    db,
    client,
    // if we want to use the "using" keyword in the future
    // [Symbol.asyncDispose]: async () => {
    //   console.log("🧨 Closing the database connection...");
    //   await pg.end();
    // },
  };
}

export function generateRandomId(length: number): number {
  const id = Math.random() * Math.pow(10, length);
  return Math.floor(id);
}

export function generateRandomUsername(): string {
  const base = 'seeded_user_';
  const randomNumber = generateRandomId(3).toString();
  const username = base + randomNumber;
  return username;
}

export function generateRandomFirstName(): string {
  const base = 'seeded_first_name_';
  const randomNumber = generateRandomId(3).toString();
  const firstName = base + randomNumber;
  return firstName;
}

export function generateRandomLastName(): string {
  const base = 'seeded_last_name_';
  const randomNumber = generateRandomId(3).toString();
  const lastName = base + randomNumber;
  return lastName;
}
