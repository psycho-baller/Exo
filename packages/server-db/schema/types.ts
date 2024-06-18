import { createInsertSchema } from 'drizzle-zod'

import {
  comments,
  follows,
  groups,
  groupsOfPeople,
  type landingPageOptions,
  likes,
  people,
  postTopics,
  type postVisibilityOptions,
  posts,
  questionTopics,
  questions,
  type roleOptions,
  searchHistories,
  topics,
  users,
} from '.'

import type { z } from 'zod'
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'

// User
export type LandingPageOptions = (typeof landingPageOptions)[number]
export type PostVisibilityOptions = (typeof postVisibilityOptions)[number]
export type RoleOptions = (typeof roleOptions)[number]
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export const insertUserSchema = createInsertSchema(users, {
  firstName: ({ firstName }) => firstName.min(1).max(31),
  lastName: ({ lastName }) => lastName.min(1).max(31),
  email: ({ email }) => email.min(5).max(31),
  phone: ({ phone }) => phone.min(10).max(15),
})

// Post
export type Post = typeof posts.$inferSelect
export type NewPost = typeof posts.$inferInsert
export const insertPostSchema = createInsertSchema(posts, {
  createdByUserId: ({ createdByUserId }) => createdByUserId.optional(),
})
export type InsertPostSchema = z.infer<typeof insertPostSchema>

// SearchHistory
export type SearchHistory = typeof searchHistories.$inferSelect
export type NewSearchHistory = typeof searchHistories.$inferInsert
export const insertSearchHistoryhSchema = createInsertSchema(searchHistories, {
  createdByUserId: ({ createdByUserId }) => createdByUserId.optional(),
})
export type InsertSearchHistorySchema = z.infer<typeof insertSearchHistoryhSchema>

// Topic
export type Topic = typeof topics.$inferSelect
export type NewTopic = typeof topics.$inferInsert
export const insertTopicSchema = createInsertSchema(topics, {
  createdByUserId: ({ createdByUserId }) => createdByUserId.optional(),
  name: ({ name }) => name.min(1).max(31),
})
export type InsertTopicSchema = z.infer<typeof insertTopicSchema>

// Person
export type Person = typeof people.$inferSelect
export type NewPerson = typeof people.$inferInsert
export const insertPersonSchema = createInsertSchema(people, {
  createdByUserId: ({ createdByUserId }) => createdByUserId.optional(),
  firstName: ({ firstName }) => firstName.min(1).max(31),
  lastName: ({ lastName }) => lastName.min(1).max(31),
  phoneNumber: ({ phoneNumber }) => phoneNumber.min(10).max(15),
})
export type InsertPersonSchema = z.infer<typeof insertPersonSchema>

// Group
export type Group = typeof groups.$inferSelect
export type NewGroup = typeof groups.$inferInsert
export const insertGroupSchema = createInsertSchema(groups, {
  createdByUserId: ({ createdByUserId }) => createdByUserId.optional(),
  name: ({ name }) => name.min(1).max(63),
})
export type InsertGroupSchema = z.infer<typeof insertGroupSchema>
// groupsOfPeople
export type GroupsOfPeople = typeof groupsOfPeople.$inferSelect
export type NewGroupsOfPeople = typeof groupsOfPeople.$inferInsert
export const insertGroupsOfPeopleSchema = createInsertSchema(groupsOfPeople)

// Likes
export type Like = typeof likes.$inferSelect
export type NewLike = typeof likes.$inferInsert
export const insertLikeSchema = createInsertSchema(likes)

// Comments
export type Comment = typeof comments.$inferSelect
export type NewComment = typeof comments.$inferInsert
export const insertCommentSchema = createInsertSchema(comments, {
  comment: ({ comment }) => comment.min(1).max(255),
})

// PostTopics
export type PostTopics = typeof postTopics.$inferSelect
export type NewPostTopics = typeof postTopics.$inferInsert
export const insertPostTopicSchema = createInsertSchema(postTopics)

// Follows
export type Follow = typeof follows.$inferSelect
export type NewFollow = typeof follows.$inferInsert
export const insertFollowSchema = createInsertSchema(follows)

// Question
export type Question = typeof questions.$inferSelect
export type NewQuestion = typeof questions.$inferInsert
export const insertQuestionSchema = createInsertSchema(questions, {
  createdByUserId: ({ createdByUserId }) => createdByUserId.optional(),
  question: ({ question }) => question.min(1).max(255),
  postId: ({ postId }) => postId.describe('The post the question is associated with'),
  groupId: ({ groupId }) => groupId.describe('The group the user wants to ask the question to'),
  personId: ({ personId }) => personId.describe('The person the user wants to ask the question to'),
})
export type InsertQuestionSchema = z.infer<typeof insertQuestionSchema>

// QuestionTopics
export type QuestionTopics = typeof questionTopics.$inferSelect
export type NewQuestionTopics = typeof questionTopics.$inferInsert
export const insertQuestionTopicSchema = createInsertSchema(questionTopics)

// Reusable types
export type WithId = { id: number }
export type UpdateTable<Table> = Partial<
  Omit<Table, 'id' | 'createdByUserId' | 'createdDatetime'>
> &
  WithId

export type MyUseQueryOptions<TData> = Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>
export type MyUseMutationOptions<TData, TVariables> = Omit<
  UseMutationOptions<TData, unknown, TVariables>,
  'mutationKey' | 'mutationFn'
>
