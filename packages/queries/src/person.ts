import { db, desc, eq } from '@rooots/db'
import { people } from '@rooots/db/schema'
import type { NewPerson, Person, UpdateTable, WithId } from '@rooots/db/schema/types'
import { insertPersonSchema } from '@rooots/db/schema/types'
import { z } from 'zod'

// READ
export async function getPeople() {
  return await db.query.people.findMany({ orderBy: desc(people.id) })
}

export async function getPersonById(id: number): Promise<Person | undefined> {
  return await db.query.people.findFirst({
    where: eq(people.id, id),
  })
}

// CREATE
export async function createPerson(input: NewPerson): Promise<Person[]> {
  insertPersonSchema.parse(input)
  return await db.insert(people).values(input).returning()
}

// DELETE
export async function deletePerson(input: WithId) {
  const { id } = z.object({ id: z.number() }).parse(input)
  return await db.delete(people).where(eq(people.id, id))
}

// UPDATE
export async function updatePerson(input: UpdateTable<NewPerson>) {
  z.intersection(z.optional(insertPersonSchema), z.object({ id: z.number() })).parse(input)
  return await db.update(people).set(input).where(eq(people.id, input.id))
}

export async function updatePersonName(input: {
  id: number
  firstName: string
  lastName?: string
}) {
  const { id, firstName, lastName } = z
    .object({ id: z.number(), firstName: z.string(), lastName: z.string().optional() })
    .parse(input)
  return await db.update(people).set({ firstName, lastName }).where(eq(people.id, id))
}
