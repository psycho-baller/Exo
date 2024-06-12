import { z } from 'zod'

import { desc, eq } from '../../../local-db'
import { searchHistories } from '../../../local-db/schema'
import { insertSearchHistoryhSchema } from '../../../local-db/schema/types'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const searchHistoryRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.searchHistories.findMany({
      orderBy: desc(searchHistories.datetime),
    })
  }),

  byCurrentUserId: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.searchHistories.findMany({
      where: eq(searchHistories.createdByUserId, ctx.session.user.id),
      orderBy: desc(searchHistories.datetime),
    })
  }),

  create: protectedProcedure.input(insertSearchHistoryhSchema).mutation(({ ctx, input }) => {
    return ctx.db.insert(searchHistories).values({ createdByUserId: ctx.session.user.id, ...input })
  }),

  delete: protectedProcedure.input(z.object({ userId: z.string() })).mutation(({ ctx, input }) => {
    return ctx.db.delete(searchHistories).where(eq(searchHistories.createdByUserId, input.userId))
  }),
})
