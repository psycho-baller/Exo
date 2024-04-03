import { z } from 'zod';

import { desc, eq } from '@acme/db';
import { users } from '@acme/db/schema';
import { insertUserSchema } from '@acme/db/schema/types';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany({ orderBy: desc(users.username) });
  }),

  byUsername: publicProcedure
    .input(z.object({ username: z.string().min(1).max(31) }))
    .query(({ ctx, input }) => {
      return ctx.db.query.users.findFirst({
        where: eq(users.username, input.username),
      });
    }),

  create: protectedProcedure.input(insertUserSchema).mutation(({ ctx, input }) => {
    return ctx.db.insert(users).values(input);
  }),

  delete: protectedProcedure.input(z.string().min(1).max(31)).mutation(({ ctx, input }) => {
    return ctx.db.delete(users).where(eq(users.username, input));
  }),
});
