import { z } from 'zod';

import { desc, eq } from '@acme/db';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { people, personZod } from '@acme/db/schema';

export const personRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.people.findMany({ orderBy: desc(people.id) });
  }),

  byId: publicProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
    return ctx.db.query.people.findFirst({
      where: eq(people.id, input.id),
    });
  }),

  create: protectedProcedure.input(personZod).mutation(({ ctx, input }) => {
    return ctx.db.insert(people).values(input);
  }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(people).where(eq(people.id, input));
  }),
});
