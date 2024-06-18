import { z } from 'zod'
import { insertQuestionTopicSchema } from '@acme/db/schema/types'

import { createTRPCRouter, protectedProcedure } from '../trpc'
import {
  createQuestionTopic,
  getQuestionTopics,
  getTopicsFromQuestionId,
  deleteQuestionTopic,
} from '@acme/queries'

export const questionTopicRouter = createTRPCRouter({
  // READ
  all: protectedProcedure.query(({ ctx }) => getQuestionTopics()),

  getTopicsFromQuestionId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => getTopicsFromQuestionId(input.id)),

  // CREATE
  create: protectedProcedure
    .input(insertQuestionTopicSchema)
    .mutation(({ ctx, input }) => createQuestionTopic(input)),

  // DELETE
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => deleteQuestionTopic({ id: input.id })),

  // UPDATE
  // update: protectedProcedure
  //   .input(z.object({ questionId: z.number(), topicId: z.number() }))
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db
  //       .update(questionTopics)
  //       .set({ topicId: input.topicId })
  //       .where(eq(questionTopics.questionId, input.questionId))
  //   }),

  // assignQuestionToTopic: protectedProcedure
  //   .input(z.object({ questionId: z.number(), topicId: z.number() }))
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db
  //       .update(questionTopics)
  //       .set({ topicId: input.topicId })
  //       .where(eq(questionTopics.questionId, input.questionId))
  //   }),
})
