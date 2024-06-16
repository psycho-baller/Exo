import { z } from 'zod'

import { eq } from '@acme/db'
import { groupsOfPeople, people } from '@acme/db/schema'
import type {
  Group,
  GroupsOfPeople,
  MyUseMutationOptions,
  MyUseQueryOptions,
  NewGroup,
  NewGroupsOfPeople,
  Person,
  WithId,
} from '@acme/db/schema/types'

import { getGroupsOfPeople, getPeopleFromGroupId, createGroupsOfPeople } from '@acme/queries'
import { type QueryClient, useMutation, useQuery } from '@tanstack/react-query'

const all = ['groupsOfPeople', 'all'] as const
const byId = ['groupsOfPeople', 'byId'] as const
const create = ['groupsOfPeople', 'create'] as const
export const groupsOfPeopleRouter = {
  // READ
  all: {
    useQuery: (options?: MyUseQueryOptions<GroupsOfPeople[]>) =>
      useQuery({ ...options, queryKey: all, queryFn: getGroupsOfPeople }),
  },

  getPeopleFromGroupId: {
    useQuery: ({ id, ...options }: WithId & MyUseQueryOptions<Person[]>) =>
      useQuery({
        ...options,
        queryKey: [...byId, id],
        queryFn: () => getPeopleFromGroupId(id),
      }),
  },

  // CREATE
  create: {
    useMutation: (options?: MyUseMutationOptions<GroupsOfPeople[], NewGroupsOfPeople>) =>
      useMutation({ ...options, mutationKey: create, mutationFn: createGroupsOfPeople }),
  },
}

export const groupsOfPeopleInvalidators = (queryClient: QueryClient) => ({
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
})
