import { createConnection } from './utils';

export const { db, connection } = createConnection();

export { mySqlTable as tableCreator } from './schema/_table';

export * from 'drizzle-orm';
