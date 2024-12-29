import { insertUserSchema } from '@rooots/db/schema/types'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { createUser } from '@rooots/queries'

export const userRouter = createTRPCRouter({
  // all: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.query.users.findMany({ orderBy: desc(users.id) })
  // }),

  // byCurrentUserId: protectedProcedure.query(({ ctx }) => {
  //   return ctx.db.query.users.findFirst({
  //     where: eq(users.id, ctx.session.user.id),
  //   })
  // }),

  create: protectedProcedure
    .input(insertUserSchema)
    .mutation(({ ctx, input }) => createUser(input)),

  // delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
  //   return ctx.db.delete(users).where(eq(users.id, input))
  // }),
})
