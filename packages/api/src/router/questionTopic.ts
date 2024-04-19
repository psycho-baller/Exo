import { z } from 'zod';

import { eq } from '@acme/db';
import { questionTopics, topics } from '@acme/db/schema';
import { insertQuestionTopicSchema } from '@acme/db/schema/types';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const questionTopicRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.questionTopics.findMany();
  }),

  getTopicsFromQuestionId: protectedProcedure
    .input(z.object({ questionId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select({ id: topics.id, name: topics.name })
        .from(questionTopics)
        .innerJoin(topics, eq(questionTopics.topicId, topics.id))
        .where(eq(questionTopics.questionId, input.questionId));
    }),

  create: protectedProcedure.input(insertQuestionTopicSchema).mutation(({ ctx, input }) => {
    return ctx.db.insert(questionTopics).values({
      topicId: input.topicId,
      questionId: input.questionId,
    });
  }),
});
