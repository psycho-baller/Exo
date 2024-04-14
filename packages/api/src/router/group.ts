import { z } from 'zod';

import { eq, like } from '@acme/db';
import { groups } from '@acme/db/schema';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const groupRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.groups.findMany();
  }),

  byId: protectedProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
    return ctx.db.query.groups.findFirst({
      where: eq(groups.id, input.id),
    });
  }),

  search: protectedProcedure.input(z.object({ query: z.string() })).query(({ ctx, input }) => {
    return ctx.db.query.groups.findMany({
      where: like(groups.name, `%${input.query}%`),
    });
  }),
});
