import { z } from 'zod';

import { desc, eq } from '@acme/db';
import { searchHistories } from '@acme/db/schema';
import { insertSearchHistoryhSchema } from '@acme/db/schema/types';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const searchHistoryRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.searchHistories.findMany({ orderBy: desc(searchHistories.datetime) });
  }),
  byUsername: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.searchHistories.findMany({
        where: eq(searchHistories.fromUsername, input.username),
        orderBy: desc(searchHistories.datetime),
      });
    }),

  create: protectedProcedure.input(insertSearchHistoryhSchema).mutation(({ ctx, input }) => {
    return ctx.db.insert(searchHistories).values(input);
  }),

  delete: protectedProcedure
    .input(z.object({ username: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(searchHistories).where(eq(searchHistories.fromUsername, input.username));
    }),
});
