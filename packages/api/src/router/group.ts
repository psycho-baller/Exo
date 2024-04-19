import { z } from 'zod';

import { desc, eq, like } from '@acme/db';
import { groups, groupsOfPeople, people, questions } from '@acme/db/schema';
import { insertGroupSchema } from '@acme/db/schema/types';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const groupRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.groups.findMany();
  }),

  byId: protectedProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
    return ctx.db.query.groups.findFirst({
      where: eq(groups.id, input.id),
    });
  }),

  getQuestionsForGroup: protectedProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.db.query.questions.findMany({
      where: eq(questions.groupId, input),
      orderBy: desc(questions.createdDatetime),
    });
  }),

  create: protectedProcedure.input(insertGroupSchema).mutation(({ ctx, input }) => {
    return ctx.db
      .insert(groups)
      .values({ createdByUserId: ctx.session.user.id, ...input })
      .returning();
  }),

  update: protectedProcedure
    .input(z.intersection(z.optional(insertGroupSchema), z.object({ id: z.number() })))
    .mutation(({ ctx, input }) => {
      return ctx.db.update(groups).set(input).where(eq(groups.id, input.id));
    }),

  updateName: protectedProcedure
    .input(z.object({ id: z.number(), name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.update(groups).set(input).where(eq(groups.id, input.id));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(groups).where(eq(groups.id, input));
  }),

  search: protectedProcedure.input(z.object({ query: z.string() })).query(({ ctx, input }) => {
    return ctx.db.query.groups.findMany({
      where: like(groups.name, `%${input.query}%`),
    });
  }),
});
