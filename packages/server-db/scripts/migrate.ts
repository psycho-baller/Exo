import * as dotenv from 'dotenv'
import { migrate } from 'drizzle-orm/libsql/migrator'

import { createConnection } from '../utils'

dotenv.config({
  path: '../../.env',
})
const { db } = createConnection()
// This will run migrations on the database, skipping the ones already applied
void migrate(db, { migrationsFolder: './drizzle' })
// Don't forget to close the connection, otherwise the script will hang
// await connection.end();
