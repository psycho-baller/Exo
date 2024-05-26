import type { AdapterAccount } from '@auth/core/adapters'
import { relations } from 'drizzle-orm'
import { index, integer, primaryKey, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core'

// import { sqliteTable } from './_table';

// User
export const landingPageOptions = ['questions', 'people', 'discover'] as const
export const postVisibilityOptions = ['public', 'private', 'followers'] as const
export const roleOptions = ['admin', 'user'] as const
export const users = sqliteTable('User', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name'),
  image: text('image'),
  email: text('email').notNull().unique(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  firstName: text('first_name'), //.notNull(),
  lastName: text('last_name'),
  isPublic: integer('is_public', { mode: 'boolean' }).default(false),
  defaultLandingPage: text('default_landing_page', {
    enum: landingPageOptions,
  }).default('questions'),
  defaultPostVisibility: text('default_post_visibility', {
    enum: postVisibilityOptions,
  }).default('public'),
  role: text('role', { enum: roleOptions }).default('user'),
  phone: text('phone'),
})

// Post
export const posts = sqliteTable('Post', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdByUserId: text('created_by_user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  createdDatetime: integer('created_datetime', {
    mode: 'timestamp_ms',
  }).defaultNow(),
  question: text('question').notNull(),
})

// SearchHistory
export const searchHistories = sqliteTable(
  'Search_history',
  {
    query: text('query').notNull(),
    createdByUserId: text('created_by_user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    datetime: integer('datetime', { mode: 'timestamp_ms' }).defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.query, table.createdByUserId] }),
    }
  },
)

// Topic
export const topics = sqliteTable('Topic', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdByUserId: text('created_by_user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
})

// Person
export const people = sqliteTable(
  'Person',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    firstName: text('first_name').notNull(),
    lastName: text('last_name'),
    birthday: integer('birthday', { mode: 'timestamp' }),
    email: text('email').unique(),
    phoneNumber: text('phone_number').unique(),
    reminderDatetime: integer('reminder_datetime', { mode: 'timestamp_ms' }),
    createdDatetime: integer('created_datetime', {
      mode: 'timestamp_ms',
    }).defaultNow(),
    createdByUserId: text('created_by_user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    associatedUserId: text('associated_user_id').references(() => users.id),
  },
  (table) => {
    return {
      unique: unique().on(table.firstName, table.lastName, table.birthday),
    }
  },
)

// Group
export const groups = sqliteTable(
  'Grp',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    reminderDatetime: integer('reminder_datetime', { mode: 'timestamp_ms' }),
    createdDatetime: integer('created_datetime', {
      mode: 'timestamp_ms',
    }).defaultNow(),
    name: text('name').notNull(),
    createdByUserId: text('created_by_user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      unique: unique().on(table.name, table.createdByUserId),
    }
  },
)

// groupsOfPeople
export const groupsOfPeople = sqliteTable(
  'Groups_of_people',
  {
    groupId: integer('group_id')
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
    personId: integer('person_id')
      .notNull()
      .references(() => people.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.groupId, table.personId] }),
    }
  },
)

// Likes
export const likes = sqliteTable(
  'Likes',
  {
    createdDatetime: integer('created_datetime', {
      mode: 'timestamp_ms',
    }).defaultNow(),
    createdByUserId: text('created_by_user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    postId: integer('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.createdByUserId, table.postId] }),
    }
  },
)

// Comments
export const comments = sqliteTable(
  'Comments',
  {
    createdDatetime: integer('created_datetime', {
      mode: 'timestamp_ms',
    }).defaultNow(),
    comment: text('comment').notNull(),
    createdByUserId: text('created_by_user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    postId: integer('post_id').references(() => posts.id, {
      onDelete: 'cascade',
    }),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.createdByUserId, table.postId, table.createdDatetime],
      }),
    }
  },
)

// PostTopics
export const postTopics = sqliteTable(
  'Post_topics',
  {
    postId: integer('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    topicId: integer('topic_id')
      .notNull()
      .references(() => topics.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.postId, table.topicId] }),
    }
  },
)

// Follows
export const follows = sqliteTable(
  'Follows',
  {
    followingUserId: text('following_user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    followedUserId: text('followed_user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.followingUserId, table.followedUserId],
      }),
    }
  },
)

// Question
export const questions = sqliteTable('Question', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  question: text('question').notNull(),
  createdDatetime: integer('created_datetime', {
    mode: 'timestamp_ms',
  }).defaultNow(),
  reminderDatetime: integer('reminder_datetime', { mode: 'timestamp_ms' }),
  createdByUserId: text('created_by_user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  groupId: integer('group_id').references(() => groups.id),
  personId: integer('person_id').references(() => people.id),
  postId: integer('post_id').references(() => posts.id),
})

// QuestionTopics
export const questionTopics = sqliteTable(
  'Question_topics',
  {
    questionId: integer('question_id')
      .notNull()
      .references(() => questions.id, { onDelete: 'cascade' }),
    topicId: integer('topic_id')
      .notNull()
      .references(() => topics.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.topicId, table.questionId] }),
    }
  },
)

export const accounts = sqliteTable(
  'account',
  {
    userId: integer('id', { mode: 'number' }).references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index('userId_idx').on(account.userId),
  }),
)

export const sessions = sqliteTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: integer('id', { mode: 'number' })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
})

export const verificationTokens = sqliteTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
)

// Relations (deprecated)
// export const usersRelations = relations(users, ({ many }) => ({
//   posts: many(posts, { relationName: 'Created by user' }),
//   searchHistories: many(searchHistories, {
//     relationName: 'Search history by user',
//   }),
//   topics: many(topics, { relationName: 'Topics created by user' }),
//   people: many(people, { relationName: 'People created by user' }),
//   groups: many(groups, { relationName: 'Groups created by user' }),
//   accounts: many(accounts),
// }))

// export const postsRelations = relations(posts, ({ one }) => ({
//   user: one(users, {
//     relationName: 'Created by user',
//     fields: [posts.createdByUserId],
//     references: [users.id],
//   }),
// }))

// export const searchHistoriesRelations = relations(searchHistories, ({ one }) => ({
//   user: one(users, {
//     relationName: 'Search history by user',
//     fields: [searchHistories.createdByUserId],
//     references: [users.id],
//   }),
// }))

// export const topicsRelations = relations(topics, ({ one }) => ({
//   user: one(users, {
//     relationName: 'Topics created by user',
//     fields: [topics.createdByUserId],
//     references: [users.id],
//   }),
// }))

// export const peopleRelations = relations(people, ({ one }) => ({
//   user: one(users, {
//     relationName: 'People created by user',
//     fields: [people.createdByUserId],
//     references: [users.id],
//   }),
// }))

// export const groupsRelations = relations(groups, ({ one }) => ({
//   user: one(users, {
//     relationName: 'Groups created by user',
//     fields: [groups.createdByUserId],
//     references: [users.id],
//   }),
// }))

// export const groupsOfPeopleRelations = relations(groupsOfPeople, ({ one }) => ({
//   group: one(groups, {
//     relationName: 'Groups associated with person',
//     fields: [groupsOfPeople.groupId],
//     references: [groups.id],
//   }),
//   person: one(people, {
//     relationName: 'People associated with group',
//     fields: [groupsOfPeople.personId],
//     references: [people.id],
//   }),
// }))

// export const likesRelations = relations(likes, ({ one }) => ({
//   user: one(users, {
//     relationName: 'User who liked post',
//     fields: [likes.createdByUserId],
//     references: [users.id],
//   }),
//   post: one(posts, {
//     relationName: 'Post liked by user',
//     fields: [likes.postId],
//     references: [posts.id],
//   }),
// }))

// export const commentsRelations = relations(comments, ({ one }) => ({
//   user: one(users, {
//     relationName: 'User who commented on post',
//     fields: [comments.createdByUserId],
//     references: [users.id],
//   }),
//   post: one(posts, {
//     relationName: 'Post commented on by user',
//     fields: [comments.postId],
//     references: [posts.id],
//   }),
// }))

// export const postTopicsRelations = relations(postTopics, ({ one }) => ({
//   post: one(posts, {
//     relationName: 'Post associated with topic',
//     fields: [postTopics.postId],
//     references: [posts.id],
//   }),
//   topic: one(topics, {
//     relationName: 'Topic associated with post',
//     fields: [postTopics.topicId],
//     references: [topics.id],
//   }),
// }))

// export const followsRelations = relations(follows, ({ one }) => ({
//   follower: one(users, {
//     relationName: 'User following',
//     fields: [follows.followingUserId],
//     references: [users.id],
//   }),
//   followed: one(users, {
//     relationName: 'User being followed',
//     fields: [follows.followedUserId],
//     references: [users.id],
//   }),
// }))

// export const questionsRelations = relations(questions, ({ one }) => ({
//   user: one(users, {
//     relationName: 'User who asked question',
//     fields: [questions.createdByUserId],
//     references: [users.id],
//   }),
//   post: one(posts, {
//     relationName: 'Post associated with question',
//     fields: [questions.postId],
//     references: [posts.id],
//   }),
//   group: one(groups, {
//     relationName: 'Group associated with question',
//     fields: [questions.groupId, questions.createdByUserId],
//     references: [groups.id, groups.createdByUserId],
//   }),
//   person: one(people, {
//     relationName: 'Person associated with question',
//     fields: [questions.createdByUserId, questions.personId],
//     references: [people.createdByUserId, people.id],
//   }),
// }))

// export const questionTopicsRelations = relations(questionTopics, ({ one }) => ({
//   topic: one(topics, {
//     relationName: 'Topic associated with question',
//     fields: [questionTopics.topicId],
//     references: [topics.id],
//   }),
//   question: one(questions, {
//     relationName: 'Question associated with topic',
//     fields: [questionTopics.questionId],
//     references: [questions.id],
//   }),
// }))
