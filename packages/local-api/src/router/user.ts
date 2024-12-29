import { z } from 'zod'

import { desc, eq } from '@rooots/db'
import { users } from '@rooots/db/schema'
import { insertUserSchema } from '@rooots/db/schema/types'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

export const userRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany({ orderBy: desc(users.id) })
  }),

  byCurrentUserId: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.session.user.id),
    })
  }),

  create: protectedProcedure.input(insertUserSchema).mutation(({ ctx, input }) => {
    return ctx.db.insert(users).values(input)
  }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.delete(users).where(eq(users.id, input))
  }),
})
