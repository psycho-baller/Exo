import { z } from 'zod';

import { desc, eq } from '@acme/db';
import { users } from '@acme/db/schema/user';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany({ orderBy: desc(users.id) });
  }),

  byId: publicProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
    return ctx.db.query.users.findFirst({
      where: eq(users.id, input.id),
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().min(1),
        username: z.string().min(1),
        image: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(users).values(input);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(users).where(eq(users.id, input));
  }),
});
