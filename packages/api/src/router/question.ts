import type {
  MyUseMutationOptions,
  MyUseQueryOptions,
  NewQuestion,
  Question,
  UpdateTable,
  WithId,
} from '@acme/db/schema/types'
import type { SQLiteRunResult } from 'expo-sqlite'

// import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import {
  createQuestion,
  getQuestions,
  getQuestionById,
  deleteQuestion,
  getQuestionsForPerson,
  updateQuestion,
  updateQuestionText,
  assignQuestionToPerson,
  assignQuestionToGroup,
} from '../queries/question'
import { useMutation, useQuery, QueryClient } from '@tanstack/react-query'

const all = ['questions', 'all'] as const
const byId = ['questions', 'byId'] as const
const create = ['questions', 'create'] as const

export const questionRouter = {
  all: {
    useQuery: (options?: MyUseQueryOptions<Question[]>) =>
      useQuery({ ...options, queryKey: all, queryFn: getQuestions }),
  },

  byId: {
    useQuery: ({ id, ...options }: WithId & MyUseQueryOptions<Question | undefined>) =>
      useQuery({
        ...options,
        queryKey: [...byId, id],
        queryFn: () => getQuestionById(id),
      }),
  },

  create: {
    useMutation: (options?: MyUseMutationOptions<Question[], NewQuestion>) =>
      useMutation({ ...options, mutationKey: create, mutationFn: createQuestion }),
  },

  delete: {
    useMutation: (options?: MyUseMutationOptions<SQLiteRunResult, WithId>) => {
      return useMutation({
        ...options,
        mutationKey: ['questions', 'delete'],
        mutationFn: deleteQuestion,
      })
    },
  },

  getQuestionsForPerson: {
    useQuery: ({ id, ...options }: WithId & MyUseQueryOptions<Question[]>) =>
      useQuery({
        ...options,
        queryKey: ['questions', 'forPerson', id],
        queryFn: () => getQuestionsForPerson(id),
      }),
  },

  update: {
    useMutation: (options?: MyUseMutationOptions<SQLiteRunResult, UpdateTable<NewQuestion>>) => {
      return useMutation({
        ...options,
        mutationKey: ['questions', 'update'],
        mutationFn: updateQuestion,
      })
    },
  },

  updateText: {
    useMutation: (
      options?: MyUseMutationOptions<SQLiteRunResult, { id: number; question: string }>,
    ) => {
      return useMutation({
        ...options,
        mutationKey: ['questions', 'updateText'],
        mutationFn: updateQuestionText,
      })
    },
  },

  assignToPerson: {
    useMutation: (
      options?: MyUseMutationOptions<SQLiteRunResult, { questionId: number; personId: number }>,
    ) => {
      return useMutation({
        ...options,
        mutationKey: ['questions', 'assignToPerson'],
        mutationFn: assignQuestionToPerson,
      })
    },
  },

  assignToGroup: {
    useMutation: (
      options?: MyUseMutationOptions<SQLiteRunResult, { questionId: number; groupId: number }>,
    ) => {
      return useMutation({
        ...options,
        mutationKey: ['questions', 'assignToGroup'],
        mutationFn: assignQuestionToGroup,
      })
    },
  },
}

const queryClient = new QueryClient()

export const questionInvalidators = {
  question: {
    all: {
      invalidate: () => {
        return queryClient.invalidateQueries({ queryKey: all })
      },
    },
    byId: {
      invalidate: (id: number) => {
        return queryClient.invalidateQueries({ queryKey: [...byId, id] })
      },
    },
    forPerson: {
      invalidate: (id: number) => {
        return queryClient.invalidateQueries({ queryKey: ['questions', 'forPerson', id] })
      },
    },
  },
}
