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

// Post
export const posts = mySqlTable('Post', {
  id: serial('id').primaryKey(),
  createdDatetime: timestamp('created_datetime').defaultNow(),
  question: varchar('question', { length: 255 }).notNull(),
  createdByUsername: varchar('created_by_username', { length: 31 }),
});

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

// Topic
export const topics = mySqlTable('Topic', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdByUsername: varchar('created_by_username', { length: 31 }).notNull(),
});

// Person
export const people = mySqlTable(
  'Person',
  {
    id: serial('id').notNull(),
    createdByUsername: varchar('created_by_username', { length: 31 }).notNull(),
    firstName: varchar('first_name', { length: 31 }).notNull(),
    lastName: varchar('last_name', { length: 31 }).notNull(),
    birthday: date('birthday'),
    email: varchar('email', { length: 31 }).unique(),
    phoneNumber: varchar('phone_number', { length: 15 }).unique(),
    reminderDatetime: datetime('reminder_datetime'),
    createdDatetime: timestamp('created_datetime').defaultNow(),
    associatedUsername: varchar('associated_username', { length: 31 }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.id, table.createdByUsername] }),
    };
  },
);

// Group
export const groups = mySqlTable(
  'Group',
  {
    reminderDatetime: datetime('reminder_datetime'),
    createdDatetime: timestamp('created_datetime').defaultNow(),
    name: varchar('name', { length: 63 }).notNull(),
    createdByUsername: varchar('created_by_username', { length: 31 }).notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.name, table.createdByUsername] }),
    };
  },
);

// groupsOfPeople
export const groupsOfPeople = mySqlTable(
  'Groups_of_people',
  {
    name: varchar('name', { length: 63 }).notNull(),
    createdByUsername: varchar('created_by_username', { length: 31 }).notNull(),
    personId: int('person_id').notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.name, table.createdByUsername, table.personId] }),
    };
  },
);

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

// Comments
export const comments = mySqlTable(
  'Comments',
  {
    createdDatetime: timestamp('created_datetime').defaultNow(),
    comment: varchar('comment', { length: 255 }).notNull(),
    createdByUsername: varchar('created_by_username', { length: 31 }).notNull(),
    postId: int('post_id').notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.createdByUsername, table.postId, table.createdDatetime] }),
    };
  },
);

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

// Question
export const questions = mySqlTable(
  'Question',
  {
    id: serial('id').notNull().primaryKey(),
    createdByUsername: varchar('created_by_username', { length: 31 }).notNull(),
    question: varchar('question', { length: 255 }).notNull(),
    createdDatetime: timestamp('created_datetime').defaultNow(),
    reminderDatetime: datetime('reminder_datetime'),
    postId: int('post_id'),
    groupName: varchar('group_name', { length: 63 }),
    personId: int('person_id').notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.id, table.createdByUsername] }),
    };
  },
);

// QuestionTopics
export const questionTopics = mySqlTable(
  'Question_topics',
  {
    topicId: int('topic_id').notNull(),
    questionId: int('question_id').notNull(),
    createdByUsername: varchar('created_by_username', { length: 31 }).notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.topicId, table.questionId, table.createdByUsername] }),
    };
  },
);

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
    fields: [groupsOfPeople.name, groupsOfPeople.createdByUsername],
    references: [groups.name, groups.createdByUsername],
  }),
  person: one(people, {
    relationName: 'People associated with group',
    fields: [groupsOfPeople.createdByUsername, groupsOfPeople.personId],
    references: [people.createdByUsername, people.id],
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
    fields: [questions.groupName, questions.createdByUsername],
    references: [groups.name, groups.createdByUsername],
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
    fields: [questionTopics.questionId, questionTopics.createdByUsername],
    references: [questions.id, questions.createdByUsername],
  }),
}));
