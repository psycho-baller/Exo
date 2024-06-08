import type {
  MyUseMutationOptions,
  MyUseQueryOptions,
  NewGroup,
  Group,
  UpdateTable,
  WithId,
  InsertGroupSchema,
} from '@acme/db/schema/types'
import type { SQLiteRunResult } from 'expo-sqlite'

import {
  createGroup,
  getGroups,
  getGroupById,
  deleteGroup,
  updateGroup,
  updateGroupName,
} from '../queries/group'
import { useMutation, useQuery, QueryClient } from '@tanstack/react-query'
import { getDeviceId } from '../../utils/device'

const all = ['groups', 'all'] as const
const byId = ['groups', 'byId'] as const
const create = ['groups', 'create'] as const

export const groupRouter = {
  // READ
  all: {
    useQuery: (options?: MyUseQueryOptions<Group[]>) =>
      useQuery({ ...options, queryKey: all, queryFn: getGroups }),
  },

  byId: {
    useQuery: ({ id, ...options }: WithId & MyUseQueryOptions<Group | undefined>) =>
      useQuery({
        ...options,
        queryKey: [...byId, id],
        queryFn: () => getGroupById(id),
      }),
  },

  // CREATE
  create: {
    useMutation: (options?: MyUseMutationOptions<Group[], InsertGroupSchema>) =>
      useMutation({
        ...options,
        mutationKey: create,
        mutationFn: async (input) =>
          createGroup({ ...input, createdByUserId: await getDeviceId() }),
      }),
  },

  // DELETE
  delete: {
    useMutation: (options?: MyUseMutationOptions<SQLiteRunResult, WithId>) => {
      return useMutation({
        ...options,
        mutationKey: ['groups', 'delete'],
        mutationFn: deleteGroup,
      })
    },
  },

  // UPDATE
  update: {
    useMutation: (options?: MyUseMutationOptions<SQLiteRunResult, UpdateTable<NewGroup>>) => {
      return useMutation({
        ...options,
        mutationKey: ['groups', 'update'],
        mutationFn: updateGroup,
      })
    },
  },

  updateName: {
    useMutation: (options?: MyUseMutationOptions<SQLiteRunResult, { name: string } & WithId>) => {
      return useMutation({
        ...options,
        mutationKey: ['groups', 'updateName'],
        mutationFn: updateGroupName,
      })
    },
  },
}

const queryClient = new QueryClient()

export const groupInvalidators = {
  group: {
    all: {
      invalidate: () => {
        return queryClient.invalidateQueries({ queryKey: all })
      },
    },
    byId: {
      invalidate: ({ id }: WithId) => {
        return queryClient.invalidateQueries({ queryKey: [...byId, id] })
      },
    },
  },
}
