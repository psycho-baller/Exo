import { db, desc, eq } from '../../../local-db'
import { questions } from '../../../local-db/schema'
import type { NewQuestion, Question, UpdateTable, WithId } from '../../../local-db/schema/types'
import { insertQuestionSchema } from '../../../local-db/schema/types'
import { z } from 'zod'

// READ
export async function getQuestions() {
  return await db.query.questions.findMany({ orderBy: desc(questions.id) })
}

export async function getQuestionById(id: number): Promise<Question | undefined> {
  return await db.query.questions.findFirst({
    where: eq(questions.id, id),
  })
}

export async function getQuestionsForPerson(personId: number) {
  return await db.query.questions.findMany({
    where: eq(questions.personId, personId),
    orderBy: desc(questions.createdDatetime),
  })
}

export async function getQuestionsForGroup(groupId: number) {
  return await db.query.questions.findMany({
    where: eq(questions.groupId, groupId),
    orderBy: desc(questions.createdDatetime),
  })
}

// CREATE
export async function createQuestion(input: NewQuestion): Promise<Question[]> {
  insertQuestionSchema.parse(input)
  return await db.insert(questions).values(input).returning()
}

// DELETE
export async function deleteQuestion(input: WithId) {
  const { id } = z.object({ id: z.number() }).parse(input)
  return await db.delete(questions).where(eq(questions.id, id))
}

// UPDATE
export async function updateQuestion(input: UpdateTable<NewQuestion>) {
  z.intersection(z.optional(insertQuestionSchema), z.object({ id: z.number() })).parse(input)
  return await db.update(questions).set(input).where(eq(questions.id, input.id))
}

export async function updateQuestionText(input: { id: number; question: string }) {
  const { id, question } = z.object({ id: z.number(), question: z.string() }).parse(input)
  return await db.update(questions).set({ question }).where(eq(questions.id, id))
}

export async function assignQuestionToPerson(input: { questionId: number; personId: number }) {
  const { questionId, personId } = z
    .object({ questionId: z.number(), personId: z.number() })
    .parse(input)
  return await db.update(questions).set({ personId }).where(eq(questions.id, questionId))
}

export async function assignQuestionToGroup(input: { questionId: number; groupId: number }) {
  const { questionId, groupId } = z
    .object({ questionId: z.number(), groupId: z.number() })
    .parse(input)
  return await db.update(questions).set({ groupId }).where(eq(questions.id, questionId))
}
