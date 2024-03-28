import { createConnection } from './utils';

export const { db } = createConnection();

export { sqliteTable as tableCreator } from './schema/_table';

export * from 'drizzle-orm';
