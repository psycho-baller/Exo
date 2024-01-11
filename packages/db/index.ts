import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import mysql from 'mysql2/promise';
import * as question from "./schema/question";
// import * as auth from "./schema/auth";
import * as user from "./schema/user";

export const schema = { ...question, ...user };
export const connection = new Client({
  url: process.env.DATABASE_URL,
}).connection();
// export const connection = await mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   multipleStatements: true,
// });
export { mySqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

export const db = drizzle(
  connection,
  { schema },
);
