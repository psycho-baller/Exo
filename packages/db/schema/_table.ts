import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { sqliteTableCreator } from 'drizzle-orm/sqlite-core';

import type * as schema from '../schema';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const sqliteTable = sqliteTableCreator((name) => `${name}`);

export type Database = LibSQLDatabase<typeof schema>;
