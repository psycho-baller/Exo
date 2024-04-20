import { z } from 'zod'

import { desc, eq, like, or } from '@acme/db'
import { people } from '@acme/db/schema'
import { insertPersonSchema } from '@acme/db/schema/types'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

export const personRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.people.findMany({ orderBy: desc(people.id) })
  }),

  byId: publicProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
    return ctx.db.query.people.findFirst({
      where: eq(people.id, input.id),
    })
  }),

  create: protectedProcedure.input(insertPersonSchema).mutation(({ ctx, input }) => {
    return ctx.db.insert(people).values({ createdByUserId: ctx.session.user.id, ...input })
  }),

  update: protectedProcedure
    .input(z.intersection(z.optional(insertPersonSchema), z.object({ id: z.number() })))
    .mutation(({ ctx, input }) => {
      return ctx.db.update(people).set(input).where(eq(people.id, input.id))
    }),

  updatePerson: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        firstName: z.string(),
        lastName: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.update(people).set(input).where(eq(people.id, input.id))
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(people).where(eq(people.id, input))
  }),

  search: protectedProcedure.input(z.object({ query: z.string() })).query(({ ctx, input }) => {
    return ctx.db.query.people.findMany({
      where: or(
        like(people.firstName, `%${input.query}%`),
        like(people.lastName, `%${input.query}%`),
      ),
    })
  }),
})
