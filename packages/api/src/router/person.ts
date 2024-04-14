import { z } from 'zod';

import { desc, eq, like, or } from '@acme/db';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { people } from '@acme/db/schema';
import { insertPersonSchema } from '@acme/db/schema/types';

export const personRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.people.findMany({ orderBy: desc(people.id) });
  }),

  byId: publicProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
    return ctx.db.query.people.findFirst({
      where: eq(people.id, input.id),
    });
  }),

  create: protectedProcedure.input(insertPersonSchema).mutation(({ ctx, input }) => {
    return ctx.db.insert(people).values(input);
  }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(people).where(eq(people.id, input));
  }),

  search: protectedProcedure.input(z.object({ query: z.string() })).query(({ ctx, input }) => {
    return ctx.db.query.people.findMany({
      where: or(
        like(people.firstName, `%${input.query}%`),
        like(people.lastName, `%${input.query}%`)
      )
    });
  }),
});
