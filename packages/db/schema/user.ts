import { sql } from "drizzle-orm";
import { int, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

// User
export const users = mySqlTable("user", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 30 }).notNull(),
  lastName: varchar("last_name", { length: 30 }),
  email: varchar("email", { length: 30 }).notNull().unique(),
  username: varchar("username", { length: 30 }).notNull().unique(),
  // emailVerified: timestamp("emailVerified", {
  //   mode: "date",
  //   fsp: 3,
  // }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
});

// Friend
export const friends = mySqlTable("friend", {
  id: serial("id").primaryKey(),
  createdByUserId: int("created_by_user_id").references(() => users.id),
  friendUserId: int("friend_user_id").references(() => users.id),
  name: text("name").notNull(),
  createdDatetime: timestamp("created_datetime")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
