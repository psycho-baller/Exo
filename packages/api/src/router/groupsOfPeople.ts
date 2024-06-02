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

import { createTRPCRouter, protectedProcedure } from '../trpc'
import {
  getGroupsOfPeople,
  getPeopleFromGroupId,
  createGroupsOfPeople,
} from '../queries/groupsOfPeople'
import { useMutation, useQuery, QueryClient } from '@tanstack/react-query'

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

const queryClient = new QueryClient()

export const groupsOfPeopleInvalidators = {
  groupsOfPeople: {
    all: { invalidate: () => queryClient.invalidateQueries({ queryKey: all }) },
    byId: {
      invalidate: (id: number) => queryClient.invalidateQueries({ queryKey: [...byId, id] }),
    },
  },
}
