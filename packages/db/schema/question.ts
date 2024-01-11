import { relations, sql } from "drizzle-orm";
import { int, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { friends, users } from "./user";

// Question
export const questions = mySqlTable("question", {
  id: serial("id").primaryKey(),
  createdByUserId: int("created_by_user_id").notNull(),
  friendId: int("friend_id"),
  text: text("text").notNull(),
  createdDatetime: timestamp("created_datetime")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Tag
export const tags = mySqlTable("tag", {
  id: serial("id").primaryKey(),
  createdByUserId: int("created_by_user_id").notNull(),
  name: varchar("name", { length: 30 }).notNull(),
});

// QuestionTag
export const questionTags = mySqlTable("question_tag", {
  questionId: int("question_id"),
  tagId: int("tag_id"),
});

export const questionsRelations = relations(questions, ({ one, many }) => ({
  questionTags: many(questionTags),
  friend: one(friends, {
    relationName: "Friend of the question",
    fields: [questions.friendId],
    references: [friends.id],
  }),
  createdByUser: one(users, {
    relationName: "Id of user who created question",
    fields: [questions.createdByUserId],
    references: [users.id],
  }),
}));

export const tagsRelations = relations(tags, ({ one, many }) => ({
  questionTags: many(questionTags),
  createdByUser: one(users, {
    relationName: "Id of user who created tag",
    fields: [tags.createdByUserId],
    references: [users.id],
  }),
}));

export const questionTagsRelations = relations(questionTags, ({ one }) => ({
  question: one(questions, {
    relationName: "Id of question",
    fields: [questionTags.questionId],
    references: [questions.id],
  }),
  tag: one(tags, {
    relationName: "Id of tag",
    fields: [questionTags.tagId],
    references: [tags.id],
  }),
}));

