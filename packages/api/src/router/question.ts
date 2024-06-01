import { z } from 'zod'

import { desc, eq, like } from '@acme/db'
import { questions } from '@acme/db/schema'
import type { NewQuestion, Question } from '@acme/db/schema/types'

// import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { createQuestion, getQuestions, getQuestionById } from '../queries/question'
import {
  type UseMutationOptions,
  type UseQueryOptions,
  useMutation,
  useQuery,
  QueryClient,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const all = ['questions', 'all'] as const
const create = ['questions', 'create'] as const

export const questionRouter = {
  useUtils() {
    return {
      all: {
        invalidate: () => {
          return queryClient.invalidateQueries({ queryKey: all })
        },
      },
    }
  },
  all: {
    useQuery: (options: UseQueryOptions<Question[]>) =>
      useQuery({ ...options, queryKey: all, queryFn: getQuestions }),
  },

  byId: {
    useQuery: ({
      id,
      ...options
    }: { id: number } & Partial<UseQueryOptions<Question | undefined>>) =>
      useQuery({
        ...options,
        queryKey: ['questions', 'byId', id],
        queryFn: () => getQuestionById(id),
      }),
  },

  create: {
    useMutation: (options: UseMutationOptions<Question[], unknown, NewQuestion>) =>
      useMutation({ ...options, mutationKey: create, mutationFn: createQuestion }),
  },

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
