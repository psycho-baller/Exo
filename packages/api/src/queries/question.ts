import { db, desc, eq } from '@acme/db'
import { questions } from '@acme/db/schema'
import type { NewQuestion, Question } from '@acme/db/schema/types'
import { insertQuestionSchema } from '@acme/db/schema/types'
import { z } from 'zod'

// READ
export async function getQuestions() {
  return await db.query.questions.findMany({ orderBy: desc(questions.id) })
}

export async function getQuestionById(id: number) {
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

// CREATE
export async function createQuestion(input: NewQuestion) {
  insertQuestionSchema.parse(input)
  return await db.insert(questions).values(input).returning()
}

// DELETE
export async function deleteQuestion(id: number) {
  return await db.delete(questions).where(eq(questions.id, id))
}

// UPDATE
export async function updateQuestion(
  input: Partial<Omit<Question, 'id' | 'createdByUserId' | 'createdDatetime'>> & { id: number },
) {
  z.intersection(z.optional(insertQuestionSchema), z.object({ id: z.number() })).parse(input)
  return await db.update(questions).set(input).where(eq(questions.id, input.id))
}

export async function updateQuestionText(id: number, question: string) {
  return await db.update(questions).set({ question }).where(eq(questions.id, id))
}

export async function assignQuestionToPerson(questionId: number, personId: number) {
  return await db.update(questions).set({ personId }).where(eq(questions.id, questionId))
}

export async function assignQuestionToGroup(questionId: number, groupId: number) {
  return await db.update(questions).set({ groupId }).where(eq(questions.id, questionId))
}
