import { z } from 'zod'
import { insertPersonSchema } from '@acme/db/schema/types'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { createPerson, deletePerson, getPeople, getPersonById, updatePerson } from '@acme/queries'

export const personRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => getPeople()),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => getPersonById(input.id)),

  create: protectedProcedure
    .input(insertPersonSchema)
    .mutation(({ ctx, input }) => createPerson({ ...input, createdByUserId: ctx.session.user.id })),

  update: protectedProcedure
    .input(z.intersection(z.optional(insertPersonSchema), z.object({ id: z.number() })))
    .mutation(({ ctx, input }) => updatePerson(input)),

  updatePerson: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        firstName: z.string(),
        lastName: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => updatePerson(input)),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => deletePerson(input)),
})
