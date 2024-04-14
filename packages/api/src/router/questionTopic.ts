import { z } from 'zod';

import { questionTopics } from '@acme/db/schema';
import { insertQuestionTopicSchema } from '@acme/db/schema/types';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const questionTopicRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.questionTopics.findMany();
  }),
  create: protectedProcedure.input(insertQuestionTopicSchema).mutation(({ ctx, input }) => {
    return ctx.db.insert(questionTopics).values({
      topicId: input.topicId,
      questionId: input.questionId,
    });
  }),
});
