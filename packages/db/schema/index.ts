import { relations } from 'drizzle-orm';
import {
  boolean,
  date,
  datetime,
  int,
  mysqlEnum,
  primaryKey,
  serial,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/mysql-core';

import { mySqlTable } from './_table';

// User
const landingPageOptions = ['questions', 'people', 'discover'] as const;
export type LandingPageOptions = (typeof landingPageOptions)[number];
export const defaultLandingPage = mysqlEnum('default_landing_page', landingPageOptions);
const postVisibilityOptions = ['public', 'private', 'friends'] as const;
export type PostVisibilityOptions = (typeof postVisibilityOptions)[number];
export const defaultPostVisibility = mysqlEnum('default_post_visibility', postVisibilityOptions);
const roleOptions = ['admin', 'user'] as const;
export type RoleOptions = (typeof roleOptions)[number];
export const role = mysqlEnum('role', roleOptions);
export const users = mySqlTable('User', {
  username: varchar('username', { length: 31 }).notNull().primaryKey(),
  firstName: varchar('first_name', { length: 31 }).notNull(),
  lastName: varchar('last_name', { length: 31 }).notNull(),
  isPublic: boolean('is_public').notNull(),
  defaultLandingPage: defaultLandingPage,
  defaultPostVisibility: defaultPostVisibility,
  role: role.notNull(),
  email: varchar('email', { length: 31 }).notNull().unique(),
  phone: varchar('phone', { length: 15 }),
});
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// Post
export const posts = mySqlTable('Post', {
  id: serial('id').primaryKey(),
  createdDatetime: timestamp('created_datetime').defaultNow(),
  question: varchar('question', { length: 255 }).notNull(),
  createdByUsername: varchar('created_by_username', { length: 31 }),
});
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

// SearchHistory
export const searchHistories = mySqlTable(
  'Search_history',
  {
    query: varchar('query', { length: 255 }).notNull(),
    fromUsername: varchar('from_username', { length: 31 }).notNull(),
    datetime: timestamp('datetime').defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.query, table.fromUsername] }),
    };
  },
);
export type SearchHistory = typeof searchHistories.$inferSelect;
export type NewSearchHistory = typeof searchHistories.$inferInsert;

// Topic
export const topics = mySqlTable('Topic', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdByUsername: varchar('created_by_username', { length: 31 }).notNull(),
});
export type Topic = typeof topics.$inferSelect;
export type NewTopic = typeof topics.$inferInsert;

// Person
export const people = mySqlTable(
  'Person',
  {
    id: serial('id').primaryKey(),
    createdByUsername: varchar('created_by_username', { length: 31 }).notNull(),
    firstName: varchar('first_name', { length: 31 }).notNull(),
    lastName: varchar('last_name', { length: 31 }),
    birthday: date('birthday'),
    email: varchar('email', { length: 31 }).unique(),
    phoneNumber: varchar('phone_number', { length: 15 }).unique(),
    reminderDatetime: datetime('reminder_datetime'),
    createdDatetime: timestamp('created_datetime').defaultNow(),
    associatedUsername: varchar('associated_username', { length: 31 }),
  },
  (table) => {
    return {
      unique: unique().on(table.firstName, table.lastName, table.birthday),
    };
  },
);
export type Person = typeof people.$inferSelect;
export type NewPerson = typeof people.$inferInsert;

// Group
export const groups = mySqlTable(
  'Grp',
  {
    id: serial('id').primaryKey(),
    reminderDatetime: datetime('reminder_datetime'),
    createdDatetime: timestamp('created_datetime').defaultNow(),
    name: varchar('name', { length: 63 }).notNull(),
    createdByUsername: varchar('created_by_username', { length: 31 }).notNull(),
  },
  (table) => {
    return {
      unique: unique().on(table.name, table.createdByUsername),
    };
  },
);
export type Group = typeof groups.$inferSelect;
export type NewGroup = typeof groups.$inferInsert;

// groupsOfPeople
export const groupsOfPeople = mySqlTable(
  'Groups_of_people',
  {
    groupId: int('group_id').notNull(),
    personId: int('person_id').notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.groupId, table.personId] }),
    };
  },
);
export type GroupsOfPeople = typeof groupsOfPeople.$inferSelect;
export type NewGroupsOfPeople = typeof groupsOfPeople.$inferInsert;

// Likes
export const likes = mySqlTable(
  'Likes',
  {
    createdDatetime: timestamp('created_datetime').defaultNow(),
    createdByUsername: varchar('created_by_username', { length: 31 }).notNull(),
    postId: int('post_id').notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.createdByUsername, table.postId] }),
    };
  },
);
export type Like = typeof likes.$inferSelect;
export type NewLike = typeof likes.$inferInsert;

// Comments
export const comments = mySqlTable(
  'Comments',
  {
    createdDatetime: timestamp('created_datetime').defaultNow(),
    comment: varchar('comment', { length: 255 }).notNull(),
    createdByUsername: varchar('created_by_username', { length: 31 }),
    postId: int('post_id'),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.createdByUsername, table.postId, table.createdDatetime] }),
    };
  },
);
export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;

// PostTopics
export const postTopics = mySqlTable(
  'Post_topics',
  {
    postId: int('post_id').notNull(),
    topicId: int('topic_id').notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.postId, table.topicId] }),
    };
  },
);
export type PostTopics = typeof postTopics.$inferSelect;
export type NewPostTopics = typeof postTopics.$inferInsert;

// Follows
export const follows = mySqlTable(
  'Follows',
  {
    followingUsername: varchar('following_username', { length: 31 }).notNull(),
    followedUsername: varchar('followed_username', { length: 31 }).notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.followingUsername, table.followedUsername] }),
    };
  },
);
export type Follow = typeof follows.$inferSelect;
export type NewFollow = typeof follows.$inferInsert;

// Question
export const questions = mySqlTable('Question', {
  id: serial('id').primaryKey(),
  createdByUsername: varchar('created_by_username', { length: 31 }).notNull(),
  question: varchar('question', { length: 255 }).notNull(),
  createdDatetime: timestamp('created_datetime').defaultNow(),
  reminderDatetime: datetime('reminder_datetime'),
  postId: int('post_id'),
  groupId: varchar('group_id', { length: 63 }),
  personId: int('person_id'),
});
export type Question = typeof questions.$inferSelect;
export type NewQuestion = typeof questions.$inferInsert;

// QuestionTopics
export const questionTopics = mySqlTable(
  'Question_topics',
  {
    topicId: int('topic_id').notNull(),
    questionId: int('question_id').notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.topicId, table.questionId] }),
    };
  },
);
export type QuestionTopics = typeof questionTopics.$inferSelect;
export type NewQuestionTopics = typeof questionTopics.$inferInsert;

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts, { relationName: 'Created by user' }),
  searchHistories: many(searchHistories, { relationName: 'Search history by user' }),
  topics: many(topics, { relationName: 'Topics created by user' }),
  people: many(people, { relationName: 'People created by user' }),
  groups: many(groups, { relationName: 'Groups created by user' }),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    relationName: 'Created by user',
    fields: [posts.createdByUsername],
    references: [users.username],
  }),
}));

export const searchHistoriesRelations = relations(searchHistories, ({ one }) => ({
  user: one(users, {
    relationName: 'Search history by user',
    fields: [searchHistories.fromUsername],
    references: [users.username],
  }),
}));

export const topicsRelations = relations(topics, ({ one }) => ({
  user: one(users, {
    relationName: 'Topics created by user',
    fields: [topics.createdByUsername],
    references: [users.username],
  }),
}));

export const peopleRelations = relations(people, ({ one }) => ({
  user: one(users, {
    relationName: 'People created by user',
    fields: [people.createdByUsername],
    references: [users.username],
  }),
}));

export const groupsRelations = relations(groups, ({ one }) => ({
  user: one(users, {
    relationName: 'Groups created by user',
    fields: [groups.createdByUsername],
    references: [users.username],
  }),
}));

export const groupsOfPeopleRelations = relations(groupsOfPeople, ({ one }) => ({
  group: one(groups, {
    relationName: 'Groups associated with person',
    fields: [groupsOfPeople.groupId],
    references: [groups.id],
  }),
  person: one(people, {
    relationName: 'People associated with group',
    fields: [groupsOfPeople.personId],
    references: [people.id],
  }),
}));

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    relationName: 'User who liked post',
    fields: [likes.createdByUsername],
    references: [users.username],
  }),
  post: one(posts, {
    relationName: 'Post liked by user',
    fields: [likes.postId],
    references: [posts.id],
  }),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    relationName: 'User who commented on post',
    fields: [comments.createdByUsername],
    references: [users.username],
  }),
  post: one(posts, {
    relationName: 'Post commented on by user',
    fields: [comments.postId],
    references: [posts.id],
  }),
}));

export const postTopicsRelations = relations(postTopics, ({ one }) => ({
  post: one(posts, {
    relationName: 'Post associated with topic',
    fields: [postTopics.postId],
    references: [posts.id],
  }),
  topic: one(topics, {
    relationName: 'Topic associated with post',
    fields: [postTopics.topicId],
    references: [topics.id],
  }),
}));

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(users, {
    relationName: 'User following',
    fields: [follows.followingUsername],
    references: [users.username],
  }),
  followed: one(users, {
    relationName: 'User being followed',
    fields: [follows.followedUsername],
    references: [users.username],
  }),
}));

export const questionsRelations = relations(questions, ({ one }) => ({
  user: one(users, {
    relationName: 'User who asked question',
    fields: [questions.createdByUsername],
    references: [users.username],
  }),
  post: one(posts, {
    relationName: 'Post associated with question',
    fields: [questions.postId],
    references: [posts.id],
  }),
  group: one(groups, {
    relationName: 'Group associated with question',
    fields: [questions.groupId, questions.createdByUsername],
    references: [groups.id, groups.createdByUsername],
  }),
  person: one(people, {
    relationName: 'Person associated with question',
    fields: [questions.createdByUsername, questions.personId],
    references: [people.createdByUsername, people.id],
  }),
}));

export const questionTopicsRelations = relations(questionTopics, ({ one }) => ({
  topic: one(topics, {
    relationName: 'Topic associated with question',
    fields: [questionTopics.topicId],
    references: [topics.id],
  }),
  question: one(questions, {
    relationName: 'Question associated with topic',
    fields: [questionTopics.questionId],
    references: [questions.id],
  }),
}));
