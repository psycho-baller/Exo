import { sql } from "drizzle-orm";
import { serial, int, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { mySqlTable } from "./_table";
import { users, friends } from "./user";

// Question
export const questions = mySqlTable("question", {
  id: serial("id").primaryKey(),
  createdByUserId: int("created_by_user_id").references(() => users.id),
  text: text("text").notNull(),
  createdDatetime: timestamp("created_datetime")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Tag
export const tags = mySqlTable("tag", {
  id: serial("id").primaryKey(),
  createdByUserId: int("created_by_user_id").references(() => users.id),
  tagName: varchar("email", { length: 30 }).notNull(),
});

// QuestionTag
export const questionTags = mySqlTable("question_tag", {
  questionId: int("question_id").references(() => questions.id),
  tagId: int("tag_id").references(() => tags.id),
});

// QuestionFriend
export const questionFriends = mySqlTable("question_friend", {
  questionId: int("question_id").references(() => questions.id),
  friendId: int("friend_id").references(() => friends.id),
});
