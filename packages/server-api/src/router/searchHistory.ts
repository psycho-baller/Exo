import { insertSearchHistoryhSchema } from '@rooots/db/schema/types'

import { createTRPCRouter, protectedProcedure } from '../trpc'
import {
  createSearchHistory,
  getSearchHistories,
  getSearchHistoriesForUser,
  getSearchHistoryById,
} from '@rooots/queries'

export const searchHistoryRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => getSearchHistories()),

  // byId: protectedProcedure.query(({ input }) => getSearchHistoryById(input.id)),

  byCurrentUserId: protectedProcedure.query(({ ctx }) =>
    getSearchHistoriesForUser(ctx.session.user.id),
  ),

  create: protectedProcedure
    .input(insertSearchHistoryhSchema)
    .mutation(({ ctx, input }) =>
      createSearchHistory({ ...input, createdByUserId: ctx.session.user.id }),
    ),

  // delete: protectedProcedure
  //   .input(z.object({ id: z.string() }))
  //   .mutation(({ ctx, input }) => deleteSearchHistory({ id: input.id })),

  // deleteUserSearchHistory: protectedProcedure
  //   .input(z.object({ userId: z.string() }))
  //   .mutation(({ ctx, input }) => deleteSearchHistoryForUser(input.userId)),
})
