import * as dotenv from 'dotenv';
import { migrate } from 'drizzle-orm/mysql2/migrator';

import { connection, db } from '.';

dotenv.config({
  path: '../../.env',
});
// This will run migrations on the database, skipping the ones already applied
migrate(db, { migrationsFolder: './drizzle' });
// Don't forget to close the connection, otherwise the script will hang
// await connection.end();
