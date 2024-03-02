import { mysqlTableCreator } from 'drizzle-orm/mysql-core';
import type { PlanetScaleDatabase } from 'drizzle-orm/planetscale-serverless';

import type * as schema from '../schema';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mySqlTable = mysqlTableCreator((name) => `${name}`);

export type Database = PlanetScaleDatabase<typeof schema>;
