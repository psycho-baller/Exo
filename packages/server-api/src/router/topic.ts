import { z } from 'zod'

import { desc, eq, like } from '@rooots/db'
import { topics } from '@rooots/db/schema'
import { insertTopicSchema } from '@rooots/db/schema/types'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { createTopic, deleteTopic, getTopicById, getTopics } from '@rooots/queries'

export const topicRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => getTopics()),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => getTopicById(input.id)),

  create: protectedProcedure
    .input(insertTopicSchema)
    .mutation(async ({ ctx, input }) =>
      createTopic({ ...input, createdByUserId: ctx.session.user.id }),
    ),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => deleteTopic(input)),

  // search: publicProcedure.input(z.object({ query: z.string() })).query(({ ctx, input }) => {
  //   return ctx.db.query.topics.findMany({
  //     where: like(topics.name, `%${input.query}%`),
  //     orderBy: desc(topics.id),
  //   })
  // }),
})
