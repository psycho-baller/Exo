import { z } from 'zod'

import { eq } from '@acme/db'
import { groupsOfPeople, people } from '@acme/db/schema'
import { insertGroupsOfPeopleSchema } from '@acme/db/schema/types'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const groupsOfPeopleRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.groupsOfPeople.findMany()
  }),

  getPeopleFromGroupId: protectedProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.db
      .select({ people })
      .from(groupsOfPeople)
      .innerJoin(people, eq(groupsOfPeople.groupId, people.id))
      .where(eq(groupsOfPeople.groupId, input))
  }),

  create: protectedProcedure.input(insertGroupsOfPeopleSchema).mutation(({ ctx, input }) => {
    return ctx.db.insert(groupsOfPeople).values({
      groupId: input.groupId,
      personId: input.personId,
    })
  }),
})
