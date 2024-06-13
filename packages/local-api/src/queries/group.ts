import { db, desc, eq } from '@acme/db'
import { groups } from '@acme/db/schema'
import type { NewGroup, Group, UpdateTable, WithId } from '@acme/db/schema/types'
import { insertGroupSchema } from '@acme/db/schema/types'
import { z } from 'zod'

// READ
export async function getGroups() {
  return await db.query.groups.findMany({ orderBy: desc(groups.id) })
}

export async function getGroupById(id: number): Promise<Group | undefined> {
  return await db.query.groups.findFirst({
    where: eq(groups.id, id),
  })
}

// CREATE
export async function createGroup(input: NewGroup): Promise<Group[]> {
  insertGroupSchema.parse(input)
  return await db.insert(groups).values(input).returning()
}

// DELETE
export async function deleteGroup(input: WithId) {
  const { id } = z.object({ id: z.number() }).parse(input)
  return await db.delete(groups).where(eq(groups.id, id))
}

// UPDATE
export async function updateGroup(input: UpdateTable<NewGroup>) {
  z.intersection(z.optional(insertGroupSchema), z.object({ id: z.number() })).parse(input)
  return await db.update(groups).set(input).where(eq(groups.id, input.id))
}

export async function updateGroupName(input: { id: number; name: string }) {
  const { id, name } = z.object({ id: z.number(), name: z.string() }).parse(input)
  return await db.update(groups).set({ name }).where(eq(groups.id, id))
}
