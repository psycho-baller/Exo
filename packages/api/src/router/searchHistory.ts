import type {
  MyUseMutationOptions,
  MyUseQueryOptions,
  NewSearchHistory,
  SearchHistory,
  UpdateTable,
  WithId,
} from '@acme/db/schema/types'
import type { SQLiteRunResult } from 'expo-sqlite'

import {
  createSearchHistory,
  getSearchHistories,
  getSearchHistoryById,
  deleteSearchHistory,
  getSearchHistoriesForUser,
  updateSearchHistory,
} from '../queries/searchHistory'
import { useMutation, useQuery, QueryClient } from '@tanstack/react-query'

const all = ['searchHistories', 'all'] as const
const byId = ['searchHistories', 'byId'] as const
const create = ['searchHistories', 'create'] as const

export const searchHistoryRouter = {
  // READ
  all: {
    useQuery: (options?: MyUseQueryOptions<SearchHistory[]>) =>
      useQuery({ ...options, queryKey: all, queryFn: getSearchHistories }),
  },

  byId: {
    useQuery: ({ id, ...options }: WithId & MyUseQueryOptions<SearchHistory | undefined>) =>
      useQuery({
        ...options,
        queryKey: [...byId, id],
        queryFn: () => getSearchHistoryById(id),
      }),
  },

  getSearchHistoriesForUser: {
    useQuery: (options: MyUseQueryOptions<SearchHistory[]>) =>
      useQuery({
        ...options,
        queryKey: ['searchHistories', 'forUser', '69420'],
        queryFn: () => getSearchHistoriesForUser('69420'),
      }),
  },

  // CREATE
  create: {
    useMutation: (options?: MyUseMutationOptions<SearchHistory[], NewSearchHistory>) =>
      useMutation({ ...options, mutationKey: create, mutationFn: createSearchHistory }),
  },

  // DELETE
  delete: {
    useMutation: (options?: MyUseMutationOptions<SQLiteRunResult, WithId>) => {
      return useMutation({
        ...options,
        mutationKey: ['searchHistories', 'delete'],
        mutationFn: deleteSearchHistory,
      })
    },
  },

  // UPDATE
  update: {
    useMutation: (
      options?: MyUseMutationOptions<SQLiteRunResult, UpdateTable<NewSearchHistory>>,
    ) => {
      return useMutation({
        ...options,
        mutationKey: ['searchHistories', 'update'],
        mutationFn: updateSearchHistory,
      })
    },
  },
}

const queryClient = new QueryClient()

export const searchHistoryInvalidators = {
  searchHistory: {
    all: {
      invalidate: () => {
        return queryClient.invalidateQueries({ queryKey: all })
      },
    },
    byId: {
      invalidate: (id: string) => {
        return queryClient.invalidateQueries({ queryKey: [...byId, id] })
      },
    },
    forUser: {
      invalidate: (id: string) => {
        return queryClient.invalidateQueries({ queryKey: ['searchHistories', 'forUser', id] })
      },
    },
  },
}
