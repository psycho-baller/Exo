import { db, eq, and } from '@acme/db'
import { questionTopics, topics } from '@acme/db/schema'
import type { NewQuestionTopics, QuestionTopics, UpdateTable, WithId } from '@acme/db/schema/types'
import { insertQuestionTopicSchema } from '@acme/db/schema/types'
import { z } from 'zod'

// READ
export async function getQuestionTopics() {
  return await db.query.questionTopics.findMany()
}

export async function getTopicsFromQuestionId(questionId: number) {
  const topicsFromQuestion = await db
    .select({ topics })
    .from(questionTopics)
    .innerJoin(topics, eq(questionTopics.topicId, topics.id))
    .where(eq(questionTopics.questionId, questionId))
  return topicsFromQuestion.map((topic) => ({
    ...topic.topics,
  }))
}

// CREATE
export async function createQuestionTopic(input: NewQuestionTopics) {
  insertQuestionTopicSchema.parse(input)
  return await db
    .insert(questionTopics)
    .values({
      topicId: input.topicId,
      questionId: input.questionId,
    })
    .returning()
}

// DELETE
export async function deleteQuestionTopic(input: NewQuestionTopics) {
  const { questionId, topicId } = z
    .object({ questionId: z.number(), topicId: z.number() })
    .parse(input)
  return await db
    .delete(questionTopics)
    .where(and(eq(questionTopics.questionId, questionId), eq(questionTopics.topicId, topicId)))
}

// UPDATE
// export async function updateQuestionTopic(input: UpdateTable<NewQuestionTopic>) {
//   z.intersection(z.optional(insertQuestionTopicSchema), z.object({ questionId: z.number(), topicId: z.number() })).parse(input)
//   return await db.update(questionTopics).set(input).where(eq(questionTopics.questionId, input.questionId))
// }

// export async function assignQuestionToTopic(input: { questionId: number; topicId: number }) {
//   const { questionId, topicId } = z.object({ questionId: z.number(), topicId: z.number() }).parse(input)
//   return await db.update(questionTopics).set({ topicId }).where(eq(questionTopics.questionId, questionId))
// }
