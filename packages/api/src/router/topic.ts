import { z } from 'zod';

import { desc, eq } from '@acme/db';
import { topics } from '@acme/db/schema';
import { insertTopicSchema } from '@acme/db/schema/types';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const topicRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.topics.findMany({ orderBy: desc(topics.id) });
  }),

  byId: publicProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
    return ctx.db.query.topics.findFirst({
      where: eq(topics.id, input.id),
    });
  }),

  create: protectedProcedure.input(insertTopicSchema).mutation(({ ctx, input }) => {
    return ctx.db.insert(topics).values(input);
  }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(topics).where(eq(topics.id, input));
  }),
});
