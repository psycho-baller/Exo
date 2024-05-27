import { z } from 'zod'

import { desc, eq, like } from '@acme/db'
import { questions } from '@acme/db/schema'
import { insertQuestionSchema } from '@acme/db/schema/types'

// import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { getQuestions } from '../queries/question'
import { useMutation, useQuery } from '@tanstack/react-query'

export const questionRouter = {
  all: { useQuery: () => useQuery(getQuestions) },

  // byId: publicProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
  //   return ctx.db.query.questions.findFirst({
  //     where: eq(questions.id, input.id),
  //   })
  // }),

  // create: protectedProcedure.input(insertQuestionSchema).mutation(async ({ ctx, input }) => {
  //   return await ctx.db
  //     .insert(questions)
  //     .values({ createdByUserId: ctx.session.user.id, ...input })
  //     .returning()
  // }),

  // delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
  //   return ctx.db.delete(questions).where(eq(questions.id, input))
  // }),

  // getQuestionsForPerson: publicProcedure.input(z.number()).query(({ ctx, input }) => {
  //   return ctx.db.query.questions.findMany({
  //     where: eq(questions.personId, input),
  //     orderBy: desc(questions.createdDatetime),
  //   })
  // }),

  // update: protectedProcedure
  //   .input(z.intersection(z.optional(insertQuestionSchema), z.object({ id: z.number() })))
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db.update(questions).set(input).where(eq(questions.id, input.id))
  //   }),

  // updateQuestion: protectedProcedure
  //   .input(z.object({ id: z.number(), question: z.string() }))
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db
  //       .update(questions)
  //       .set({ question: input.question })
  //       .where(eq(questions.id, input.id))
  //   }),

  // assignToPerson: protectedProcedure
  //   .input(z.object({ questionId: z.number(), personId: z.number() }))
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db
  //       .update(questions)
  //       .set({ personId: input.personId })
  //       .where(eq(questions.id, input.questionId))
  //   }),

  // assignToGroup: protectedProcedure
  //   .input(z.object({ questionId: z.number(), groupId: z.number() }))
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db
  //       .update(questions)
  //       .set({ groupId: input.groupId })
  //       .where(eq(questions.id, input.questionId))
  //   }),
}
