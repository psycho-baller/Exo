import type {
  MyUseMutationOptions,
  MyUseQueryOptions,
  NewPerson,
  Person,
  UpdateTable,
  WithId,
} from '@acme/db/schema/types'
import type { SQLiteRunResult } from 'expo-sqlite'

import {
  createPerson,
  getPeople,
  getPersonById,
  deletePerson,
  updatePerson,
  updatePersonName,
} from '../queries/person'
import { useMutation, useQuery, QueryClient } from '@tanstack/react-query'

const all = ['people', 'all'] as const
const byId = ['people', 'byId'] as const
const create = ['people', 'create'] as const

export const personRouter = {
  // READ
  all: {
    useQuery: (options?: MyUseQueryOptions<Person[]>) =>
      useQuery({ ...options, queryKey: all, queryFn: getPeople }),
  },

  byId: {
    useQuery: ({ id, ...options }: WithId & MyUseQueryOptions<Person | undefined>) =>
      useQuery({
        ...options,
        queryKey: [...byId, id],
        queryFn: () => getPersonById(id),
      }),
  },

  // CREATE
  create: {
    useMutation: (options?: MyUseMutationOptions<Person[], NewPerson>) =>
      useMutation({ ...options, mutationKey: create, mutationFn: createPerson }),
  },

  // DELETE
  delete: {
    useMutation: (options?: MyUseMutationOptions<SQLiteRunResult, WithId>) => {
      return useMutation({
        ...options,
        mutationKey: ['people', 'delete'],
        mutationFn: deletePerson,
      })
    },
  },

  // UPDATE
  update: {
    useMutation: (options?: MyUseMutationOptions<SQLiteRunResult, UpdateTable<NewPerson>>) => {
      return useMutation({
        ...options,
        mutationKey: ['people', 'update'],
        mutationFn: updatePerson,
      })
    },
  },

  updateName: {
    useMutation: (
      options?: MyUseMutationOptions<
        SQLiteRunResult,
        { firstName: string; lastName: string } & WithId
      >,
    ) => {
      return useMutation({
        ...options,
        mutationKey: ['people', 'updateName'],
        mutationFn: updatePersonName,
      })
    },
  },
}

const queryClient = new QueryClient()

export const personInvalidators = {
  person: {
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
