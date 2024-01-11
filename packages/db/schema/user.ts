import { relations, sql } from "drizzle-orm";
import { int, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { questions, tags } from "./question";

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

// Group
export const groups = mySqlTable("group", {
  id: serial("id").primaryKey(),
  createdByUserId: int("created_by_user_id").notNull(),
  name: text("name").notNull(),
  createdDatetime: timestamp("created_datetime")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// QuestionFriend
export const friendGroups = mySqlTable("friend_group", {
  groupId: int("group_id"),
  friendId: int("friend_id"),
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
  friendGroups: many(friendGroups),
  user: one(users, {
    relationName: "Id of user who created friend",
    fields: [friends.createdByUserId],
    references: [users.id],
  }),
}));

export const groupsRelations = relations(groups, ({ one, many }) => ({
  friendGroups: many(friendGroups),
  createdByUser: one(users, {
    relationName: "Id of user who created group",
    fields: [groups.createdByUserId],
    references: [users.id],
  }),
}));

export const friendGroupsRelations = relations(friendGroups, ({ one }) => ({
  friend: one(friends, {
    relationName: "Id of friend",
    fields: [friendGroups.friendId],
    references: [friends.id],
  }),
  group: one(groups, {
    relationName: "Id of group",
    fields: [friendGroups.groupId],
    references: [groups.id],
  }),
}));
