import { db, desc, eq } from '@rooots/db'
import { topics } from '@rooots/db/schema'
import type { NewTopic, Topic, UpdateTable, WithId } from '@rooots/db/schema/types'
import { insertTopicSchema } from '@rooots/db/schema/types'
import { z } from 'zod'

// READ
export async function getTopics() {
  return await db.query.topics.findMany({ orderBy: desc(topics.id) })
}

export async function getTopicById(id: number): Promise<Topic | undefined> {
  return await db.query.topics.findFirst({
    where: eq(topics.id, id),
  })
}

// CREATE
export async function createTopic(input: NewTopic): Promise<Topic[]> {
  insertTopicSchema.parse(input)
  return await db.insert(topics).values(input).returning()
}

// DELETE
export async function deleteTopic(input: WithId) {
  const { id } = z.object({ id: z.number() }).parse(input)
  return await db.delete(topics).where(eq(topics.id, id))
}

// UPDATE
export async function updateTopic(input: UpdateTable<NewTopic>) {
  z.intersection(z.optional(insertTopicSchema), z.object({ id: z.number() })).parse(input)
  return await db.update(topics).set(input).where(eq(topics.id, input.id))
}

// export async function updateTopicText(input: { id: number; topic: string }) {
//   const { id, topic } = z.object({ id: z.number(), topic: z.string() }).parse(input)
//   return await db.update(topics).set({ topic }).where(eq(topics.id, id))
// }
