import { z } from 'zod'

import { and, eq } from '@acme/db'
import { questionTopics, topics } from '@acme/db/schema'
import { insertQuestionTopicSchema } from '@acme/db/schema/types'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const questionTopicRouter = createTRPCRouter({
  // READ
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.questionTopics.findMany()
  }),

  getTopicsFromQuestionId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select({ id: topics.id, name: topics.name })
        .from(questionTopics)
        .innerJoin(topics, eq(questionTopics.topicId, topics.id))
        .where(eq(questionTopics.questionId, input.id))
    }),

  // CREATE
  create: protectedProcedure.input(insertQuestionTopicSchema).mutation(({ ctx, input }) => {
    return ctx.db.insert(questionTopics).values({
      topicId: input.topicId,
      questionId: input.questionId,
    })
  }),

  // DELETE
  delete: protectedProcedure
    .input(z.object({ questionId: z.number(), topicId: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db
        .delete(questionTopics)
        .where(
          and(
            eq(questionTopics.questionId, input.questionId),
            eq(questionTopics.topicId, input.topicId),
          ),
        )
    }),

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
