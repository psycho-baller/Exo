import { z } from 'zod'
import { insertGroupsOfPeopleSchema } from '@rooots/db/schema/types'

import { createTRPCRouter, protectedProcedure } from '../trpc'
import { createGroupsOfPeople, getGroupsOfPeople, getPeopleFromGroupId } from '@rooots/queries'

export const groupsOfPeopleRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => getGroupsOfPeople()),

  getPeopleFromGroupId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => getPeopleFromGroupId(input.id)),

  create: protectedProcedure
    .input(insertGroupsOfPeopleSchema)
    .mutation(({ ctx, input }) => createGroupsOfPeople(input)),
})
