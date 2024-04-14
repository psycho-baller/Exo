import { createInsertSchema } from 'drizzle-zod';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  comments,
  follows,
  groups,
  groupsOfPeople,
  landingPageOptions,
  likes,
  people,
  posts,
  postTopics,
  postVisibilityOptions,
  questions,
  questionTopics,
  roleOptions,
  searchHistories,
  topics,
  users,
} from '.';

// User
export type LandingPageOptions = (typeof landingPageOptions)[number];
export type PostVisibilityOptions = (typeof postVisibilityOptions)[number];
export type RoleOptions = (typeof roleOptions)[number];
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export const insertUserSchema = createInsertSchema(users, {
  username: ({ username }) => username.min(1).max(31),
  firstName: ({ firstName }) => firstName.min(1).max(31),
  lastName: ({ lastName }) => lastName.min(1).max(31),
  email: ({ email }) => email.min(5).max(31),
  phone: ({ phone }) => phone.min(10).max(15),
});

// Post
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export const insertPostSchema = createInsertSchema(posts);

// SearchHistory
export type SearchHistory = typeof searchHistories.$inferSelect;
export type NewSearchHistory = typeof searchHistories.$inferInsert;
export const insertSearchHistoryhSchema = createInsertSchema(searchHistories)

// Topic
export type Topic = typeof topics.$inferSelect;
export type NewTopic = typeof topics.$inferInsert;
export const insertTopicSchema = createInsertSchema(topics, {
  name: ({ name }) => name.min(1).max(31),
});

// Person
export type Person = typeof people.$inferSelect;
export type NewPerson = typeof people.$inferInsert;
export const insertPersonSchema = createInsertSchema(people, {
  firstName: ({ firstName }) => firstName.min(1).max(31),
  lastName: ({ lastName }) => lastName.min(1).max(31),
  phoneNumber: ({ phoneNumber }) => phoneNumber.min(10).max(15),
});

// Group
export type Group = typeof groups.$inferSelect;
export type NewGroup = typeof groups.$inferInsert;
export const insertGroupSchema = createInsertSchema(groups, {
  name: ({ name }) => name.min(1).max(63),
});

// groupsOfPeople
export type GroupsOfPeople = typeof groupsOfPeople.$inferSelect;
export type NewGroupsOfPeople = typeof groupsOfPeople.$inferInsert;
export const insertGroupsOfPeopleSchema = createInsertSchema(groupsOfPeople);

// Likes
export type Like = typeof likes.$inferSelect;
export type NewLike = typeof likes.$inferInsert;
export const insertLikeSchema = createInsertSchema(likes);

// Comments
export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
export const insertCommentSchema = createInsertSchema(comments, {
  comment: ({ comment }) => comment.min(1).max(255),
});

// PostTopics
export type PostTopics = typeof postTopics.$inferSelect;
export type NewPostTopics = typeof postTopics.$inferInsert;
export const insertPostTopicSchema = createInsertSchema(postTopics);

// Follows
export type Follow = typeof follows.$inferSelect;
export type NewFollow = typeof follows.$inferInsert;
export const insertFollowSchema = createInsertSchema(follows);

// Question
export type Question = typeof questions.$inferSelect;
export type NewQuestion = typeof questions.$inferInsert;
export const insertQuestionSchema = createInsertSchema(questions, {
  question: ({ question }) => question.min(1).max(255),
  postId: ({ postId }) => postId.describe('The post the question is associated with'),
  groupId: ({ groupId }) => groupId.describe('The group the user wants to ask the question to'),
  personId: ({ personId }) => personId.describe('The person the user wants to ask the question to'),
});

// QuestionTopics
export type QuestionTopics = typeof questionTopics.$inferSelect;
export type NewQuestionTopics = typeof questionTopics.$inferInsert;
export const insertQuestionTopicSchema = createInsertSchema(questionTopics);
