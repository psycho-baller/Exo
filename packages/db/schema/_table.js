"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mySqlTable = void 0;
var mysql_core_1 = require("drizzle-orm/mysql-core");
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
exports.mySqlTable = (0, mysql_core_1.mysqlTableCreator)(function (name) { return "".concat(name); });
