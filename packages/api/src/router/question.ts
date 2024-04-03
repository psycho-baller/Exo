import { z } from 'zod';

import { desc, eq } from '@acme/db';
import { questions } from '@acme/db/schema';
import { insertQuestionSchema } from '@acme/db/schema/types';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const questionRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.questions.findMany({ orderBy: desc(questions.id) });
  }),

  byId: publicProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
    return ctx.db.query.questions.findFirst({
      where: eq(questions.id, input.id),
    });
  }),

  create: protectedProcedure.input(insertQuestionSchema).mutation(({ ctx, input }) => {
    return ctx.db.insert(questions).values(input);
  }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(questions).where(eq(questions.id, input));
  }),

  getQuestionsForPerson: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.db.query.questions.findMany({
      where: eq(questions.personId, input),
      orderBy: desc(questions.createdDatetime),
    });
  }),
});
