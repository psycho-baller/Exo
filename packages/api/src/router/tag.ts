import { z } from 'zod';

import { desc, eq } from '@acme/db';
import { tags } from '@acme/db/schema/question';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const tagRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.tags.findMany({ orderBy: desc(tags.id) });
  }),

  byId: publicProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
    return ctx.db.query.tags.findFirst({
      where: eq(tags.id, input.id),
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        createdByUserId: z.number(),
        tagName: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(tags).values(input);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(tags).where(eq(tags.id, input));
  }),
});
