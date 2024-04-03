import { relations } from 'drizzle-orm';
import { integer, primaryKey, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';
// import { sqliteTable } from './_table';

// User
export const landingPageOptions = ['questions', 'people', 'discover'] as const;
export const postVisibilityOptions = ['public', 'private', 'followers'] as const;
export const roleOptions = ['admin', 'user'] as const;
export const users = sqliteTable('User', {
  username: text('username').notNull().primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name'),
  isPublic: integer('is_public', { mode: 'boolean' }).default(false),
  defaultLandingPage: text('default_landing_page', { enum: landingPageOptions }).default(
    'questions',
  ),
  defaultPostVisibility: text('default_post_visibility', { enum: postVisibilityOptions }).default(
    'public',
  ),
  role: text('role', { enum: roleOptions }).default('user'),
  email: text('email').notNull().unique(),
  phone: text('phone'),
});

// Post
export const posts = sqliteTable('Post', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdDatetime: integer('created_datetime', { mode: 'timestamp_ms' }).defaultNow(),
  question: text('question').notNull(),
  createdByUsername: text('created_by_username'),
});

// SearchHistory
export const searchHistories = sqliteTable(
  'Search_history',
  {
    query: text('query').notNull(),
    fromUsername: text('from_username').notNull(),
    datetime: integer('datetime', { mode: 'timestamp_ms' }).defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.query, table.fromUsername] }),
    };
  },
);

// Topic
export const topics = sqliteTable('Topic', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  createdByUsername: text('created_by_username').notNull(),
});

// Person
export const people = sqliteTable(
  'Person',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdByUsername: text('created_by_username').notNull(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name'),
    birthday: integer('birthday', { mode: 'timestamp' }),
    email: text('email').unique(),
    phoneNumber: text('phone_number').unique(),
    reminderDatetime: integer('reminder_datetime', { mode: 'timestamp_ms' }),
    createdDatetime: integer('created_datetime', { mode: 'timestamp_ms' }).defaultNow(),
    associatedUsername: text('associated_username'),
  },
  (table) => {
    return {
      unique: unique().on(table.firstName, table.lastName, table.birthday),
    };
  },
);

// Group
export const groups = sqliteTable(
  'Grp',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    reminderDatetime: integer('reminder_datetime', { mode: 'timestamp_ms' }),
    createdDatetime: integer('created_datetime', { mode: 'timestamp_ms' }).defaultNow(),
    name: text('name').notNull(),
    createdByUsername: text('created_by_username').notNull(),
  },
  (table) => {
    return {
      unique: unique().on(table.name, table.createdByUsername),
    };
  },
);

// groupsOfPeople
export const groupsOfPeople = sqliteTable(
  'Groups_of_people',
  {
    groupId: integer('group_id').notNull(),
    personId: integer('person_id').notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.groupId, table.personId] }),
    };
  },
);

// Likes
export const likes = sqliteTable(
  'Likes',
  {
    createdDatetime: integer('created_datetime', { mode: 'timestamp_ms' }).defaultNow(),
    createdByUsername: text('created_by_username').notNull(),
    postId: integer('post_id').notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.createdByUsername, table.postId] }),
    };
  },
);

// Comments
export const comments = sqliteTable(
  'Comments',
  {
    createdDatetime: integer('created_datetime', { mode: 'timestamp_ms' }).defaultNow(),
    comment: text('comment').notNull(),
    createdByUsername: text('created_by_username'),
    postId: integer('post_id'),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.createdByUsername, table.postId, table.createdDatetime] }),
    };
  },
);

// PostTopics
export const postTopics = sqliteTable(
  'Post_topics',
  {
    postId: integer('post_id').notNull(),
    topicId: integer('topic_id').notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.postId, table.topicId] }),
    };
  },
);

// Follows
export const follows = sqliteTable(
  'Follows',
  {
    followingUsername: text('following_username').notNull(),
    followedUsername: text('followed_username').notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.followingUsername, table.followedUsername] }),
    };
  },
);

// Question
export const questions = sqliteTable('Question', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdByUsername: text('created_by_username').notNull(),
  question: text('question').notNull(),
  createdDatetime: integer('created_datetime', { mode: 'timestamp_ms' }).defaultNow(),
  reminderDatetime: integer('reminder_datetime', { mode: 'timestamp_ms' }),
  postId: integer('post_id'),
  groupId: integer('group_id'),
  personId: integer('person_id'),
});

// QuestionTopics
export const questionTopics = sqliteTable(
  'Question_topics',
  {
    topicId: integer('topic_id').notNull(),
    questionId: integer('question_id').notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.topicId, table.questionId] }),
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
