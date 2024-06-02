import type {
  MyUseMutationOptions,
  MyUseQueryOptions,
  NewTopic,
  Topic,
  UpdateTable,
  WithId,
} from '@acme/db/schema/types'
import type { SQLiteRunResult } from 'expo-sqlite'

import { createTopic, getTopics, getTopicById, deleteTopic, updateTopic } from '../queries/topics'
import { useMutation, useQuery, QueryClient } from '@tanstack/react-query'

const all = ['topics', 'all'] as const
const byId = ['topics', 'byId'] as const
const create = ['topics', 'create'] as const

export const topicRouter = {
  // READ
  all: {
    useQuery: (options?: MyUseQueryOptions<Topic[]>) =>
      useQuery({ ...options, queryKey: all, queryFn: getTopics }),
  },

  byId: {
    useQuery: ({ id, ...options }: WithId & MyUseQueryOptions<Topic | undefined>) =>
      useQuery({
        ...options,
        queryKey: [...byId, id],
        queryFn: () => getTopicById(id),
      }),
  },

  // CREATE
  create: {
    useMutation: (options?: MyUseMutationOptions<Topic[], NewTopic>) =>
      useMutation({ ...options, mutationKey: create, mutationFn: createTopic }),
  },

  // DELETE
  delete: {
    useMutation: (options?: MyUseMutationOptions<SQLiteRunResult, WithId>) => {
      return useMutation({
        ...options,
        mutationKey: ['topics', 'delete'],
        mutationFn: deleteTopic,
      })
    },
  },

  // UPDATE
  update: {
    useMutation: (options?: MyUseMutationOptions<SQLiteRunResult, UpdateTable<NewTopic>>) => {
      return useMutation({
        ...options,
        mutationKey: ['topics', 'update'],
        mutationFn: updateTopic,
      })
    },
  },
}

const queryClient = new QueryClient()

export const topicInvalidators = {
  topic: {
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
  },
}
