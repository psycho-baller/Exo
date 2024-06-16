import { db, desc, eq } from '@acme/db'
import { searchHistories } from '@acme/db/schema'
import type { NewSearchHistory, SearchHistory, UpdateTable, WithId } from '@acme/db/schema/types'
import { insertSearchHistoryhSchema } from '@acme/db/schema/types'
import { z } from 'zod'

// READ
export async function getSearchHistories() {
  return await db.query.searchHistories.findMany({ orderBy: desc(searchHistories.datetime) })
}

export async function getSearchHistoryById(id: number): Promise<SearchHistory | undefined> {
  return await db.query.searchHistories.findFirst({
    where: eq(searchHistories.id, id),
  })
}

export async function getSearchHistoriesForUser(userId: string) {
  return await db.query.searchHistories.findMany({
    where: eq(searchHistories.createdByUserId, userId),
    orderBy: desc(searchHistories.datetime),
  })
}

// CREATE
export async function createSearchHistory(input: NewSearchHistory): Promise<SearchHistory[]> {
  insertSearchHistoryhSchema.parse(input)
  return await db.insert(searchHistories).values(input).returning()
}

// DELETE
export async function deleteSearchHistory(input: WithId) {
  const { id } = z.object({ id: z.number() }).parse(input)
  return await db.delete(searchHistories).where(eq(searchHistories.id, id))
}

// export async function deleteSearchHistoryForUser(userId: string) {
//   return await db.delete(searchHistories).where(eq(searchHistories.createdByUserId, userId))
// }

// UPDATE
export async function updateSearchHistory(input: UpdateTable<NewSearchHistory>) {
  z.intersection(z.optional(insertSearchHistoryhSchema), z.object({ id: z.string() })).parse(input)
  return await db.update(searchHistories).set(input).where(eq(searchHistories.id, input.id))
}
