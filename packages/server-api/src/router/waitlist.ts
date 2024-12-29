import { insertWaitlistEmailSchema } from './../../../server-db/schema/types'
import { insertUserSchema } from '@rooots/db/schema/types'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { createWaitlistEmail } from '@rooots/queries'

export const waitlistRouter = createTRPCRouter({
  // all: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.query.users.findMany({ orderBy: desc(users.id) })
  // }),

  // byCurrentUserId: protectedProcedure.query(({ ctx }) => {
  //   return ctx.db.query.users.findFirst({
  //     where: eq(users.id, ctx.session.user.id),
  //   })
  // }),

  create: publicProcedure
    .input(insertWaitlistEmailSchema)
    .mutation(({ ctx, input }) => createWaitlistEmail(input)),

  // delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
  //   return ctx.db.delete(users).where(eq(users.id, input))
  // }),
})
