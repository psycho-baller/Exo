import { z } from 'zod'
import { insertGroupSchema } from '@rooots/db/schema/types'

import { createTRPCRouter, protectedProcedure } from '../trpc'
import {
  createGroup,
  deleteGroup,
  getGroupById,
  getGroups,
  updateGroup,
  updateGroupName,
} from '@rooots/queries'

export const groupRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => getGroups()),

  byId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => getGroupById(input.id)),

  create: protectedProcedure
    .input(insertGroupSchema)
    .mutation(({ ctx, input }) => createGroup({ createdByUserId: ctx.session.user.id, ...input })),

  update: protectedProcedure
    .input(z.intersection(z.optional(insertGroupSchema), z.object({ id: z.number() })))
    .mutation(({ ctx, input }) => updateGroup(input)),

  updateName: protectedProcedure
    .input(z.object({ id: z.number(), name: z.string() }))
    .mutation(({ ctx, input }) => updateGroupName(input)),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => deleteGroup(input)),
})
