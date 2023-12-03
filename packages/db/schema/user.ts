import { relations, sql } from "drizzle-orm";
import { int, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { questionFriends, questions, tags } from "./question";

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
  createdByUserId: int("created_by_user_id").notNull(),
  friendUserId: int("friend_user_id"),
  name: text("name").notNull(),
  createdDatetime: timestamp("created_datetime")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  friends: many(friends, { relationName: "Id of user who created friend" }),
  questions: many(questions, {
    relationName: "Id of user who created question",
  }),
  tags: many(tags, { relationName: "Id of user who created tag" }),
}));

export const friendsRelations = relations(friends, ({ one, many }) => ({
  user: one(users, {
    relationName: "Id of user who created friend",
    fields: [friends.createdByUserId],
    references: [users.id],
  }),
  friend: one(users, {
    relationName: "Id of friend user (optional)",
    fields: [friends.friendUserId],
    references: [users.id],
  }),
  questions: many(questionFriends, {
    relationName: "Id of friend",
  }),
}));
