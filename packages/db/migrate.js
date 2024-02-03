'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var dotenv = require('dotenv');
var migrator_1 = require('drizzle-orm/mysql2/migrator');
dotenv.config({
  path: '../../.env',
});
var _1 = require('.');
// This will run migrations on the database, skipping the ones already applied
await (0, migrator_1.migrate)(_1.db, { migrationsFolder: './drizzle' });
// Don't forget to close the connection, otherwise the script will hang
await _1.connection.end();
