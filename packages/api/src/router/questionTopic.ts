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
} from '../queries/questionTopic'
import { useMutation, useQuery, QueryClient } from '@tanstack/react-query'

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

const queryClient = new QueryClient()

export const questionTopicInvalidators = {
  questionTopics: {
    all: {
      invalidate: () => {
        return queryClient.invalidateQueries({ queryKey: all })
      },
    },
    byQuestionId: {
      invalidate: ({ id }: WithId) => {
        return queryClient.invalidateQueries({ queryKey: [...byQuestionId, id] })
      },
    },
  },
}
