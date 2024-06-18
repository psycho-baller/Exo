import type {
  MyUseMutationOptions,
  MyUseQueryOptions,
  NewQuestionTopics,
  QuestionTopics,
  Topic,
  WithId,
} from '@acme/db/schema/types'
import type { SQLiteRunResult } from 'expo-sqlite'

import {
  createQuestionTopic,
  getQuestionTopics,
  getTopicsFromQuestionId,
  deleteQuestionTopic,
} from '@acme/queries'
import { type QueryClient, useMutation, useQuery } from '@tanstack/react-query'

const all = ['questionTopics', 'all'] as const
const byQuestionId = ['questionTopics', 'byQuestionId'] as const
const create = ['questionTopics', 'create'] as const

export const questionTopicRouter = {
  // READ
  all: {
    useQuery: (options?: MyUseQueryOptions<QuestionTopics[]>) =>
      useQuery({ ...options, queryKey: all, queryFn: getQuestionTopics }),
  },

  byQuestionId: {
    useQuery: ({ id, ...options }: WithId & MyUseQueryOptions<Topic[]>) =>
      useQuery({
        ...options,
        queryKey: [...byQuestionId, id],
        queryFn: () => getTopicsFromQuestionId(id),
      }),
  },

  getTopicsFromQuestionId: {
    useQuery: ({ id, ...options }: WithId & MyUseQueryOptions<Topic[]>) =>
      useQuery({
        ...options,
        queryKey: [...byQuestionId, id],
        queryFn: () => getTopicsFromQuestionId(id),
      }),
  },

  // CREATE
  create: {
    useMutation: (options?: MyUseMutationOptions<QuestionTopics[], NewQuestionTopics>) =>
      useMutation({ ...options, mutationKey: create, mutationFn: createQuestionTopic }),
  },

  // DELETE
  delete: {
    useMutation: (options?: MyUseMutationOptions<SQLiteRunResult, WithId>) => {
      return useMutation({
        ...options,
        mutationKey: ['questionTopics', 'delete'],
        mutationFn: deleteQuestionTopic,
      })
    },
  },
}

export const questionTopicInvalidators = (queryClient: QueryClient) => ({
  all: {
    invalidate: async () => {
      await queryClient.invalidateQueries({ queryKey: all })
    },
  },
  byQuestionId: {
    invalidate: async ({ id }: WithId) => {
      await queryClient.invalidateQueries({ queryKey: [...byQuestionId, id] })
    },
  },
})
