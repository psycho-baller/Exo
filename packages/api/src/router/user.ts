import { z } from 'zod';

import { desc, eq } from '@acme/db';
import { users } from '@acme/db/schema';
import { insertUserSchema } from '@acme/db/schema/types';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany({ orderBy: desc(users.id) });
  }),

  byCurrentUserId: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.session.user.id),
    });
  }),

  create: protectedProcedure.input(insertUserSchema).mutation(({ ctx, input }) => {
    return ctx.db.insert(users).values(input);
  }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.delete(users).where(eq(users.id, input));
  }),
});
