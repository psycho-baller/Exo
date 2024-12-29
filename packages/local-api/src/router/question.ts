import type {
  InsertQuestionSchema,
  MyUseMutationOptions,
  MyUseQueryOptions,
  NewQuestion,
  Question,
  UpdateTable,
  WithId,
} from '@rooots/db/schema/types'
import type { SQLiteRunResult } from 'expo-sqlite'

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
  getQuestionsForGroup,
} from '@rooots/queries'
import { useMutation, useQuery, type QueryClient } from '@tanstack/react-query'
import { getDeviceId } from '../../utils/device'

const all = ['questions', 'all'] as const
const byId = ['questions', 'byId'] as const
const create = ['questions', 'create'] as const

export const questionRouter = {
  // READ
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

  getQuestionsForPerson: {
    useQuery: ({ id, ...options }: WithId & MyUseQueryOptions<Question[]>) =>
      useQuery({
        ...options,
        queryKey: ['questions', 'forPerson', id],
        queryFn: () => getQuestionsForPerson(id),
      }),
  },

  getQuestionsForGroup: {
    useQuery: ({ id, ...options }: WithId & MyUseQueryOptions<Question[]>) =>
      useQuery({
        ...options,
        queryKey: ['groups', 'forGroup', id],
        queryFn: () => getQuestionsForGroup(id),
      }),
  },

  // CREATE
  create: {
    useMutation: (options?: MyUseMutationOptions<Question[], InsertQuestionSchema>) =>
      useMutation({
        ...options,
        mutationKey: create,
        mutationFn: async (input) =>
          createQuestion({ ...input, createdByUserId: await getDeviceId() }),
      }),
  },

  // DELETE
  delete: {
    useMutation: (options?: MyUseMutationOptions<SQLiteRunResult, WithId>) => {
      return useMutation({
        ...options,
        mutationKey: ['questions', 'delete'],
        mutationFn: deleteQuestion,
      })
    },
  },

  // UPDATE
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
      options?: MyUseMutationOptions<SQLiteRunResult, { question: string } & WithId>,
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

export const questionInvalidators = (queryClient: QueryClient) => ({
  all: {
    invalidate: async () => {
      await queryClient.invalidateQueries({ queryKey: all })
    },
  },
  byId: {
    invalidate: async ({ id }: WithId) => {
      await queryClient.invalidateQueries({ queryKey: [...byId, id] })
    },
  },
  forPerson: {
    invalidate: async ({ id }: WithId) => {
      await queryClient.invalidateQueries({ queryKey: ['questions', 'forPerson', id] })
    },
  },
})
