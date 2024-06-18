import {
  follows,
  groups,
  people,
  postTopics,
  posts,
  questionTopics,
  questions,
  searchHistories,
  topics,
  users,
} from '../../schema'
import type { Database } from '../../schema/_table'
import { createConnection } from '../../utils'

const cleanupDatabase = async (db: Database) => {
  try {
    // order matters
    await db.delete(questionTopics)
    await db.delete(questions)
    await db.delete(follows)
    await db.delete(postTopics)
    await db.delete(groups)
    await db.delete(people)
    await db.delete(topics)
    await db.delete(searchHistories)
    await db.delete(posts)
    await db.delete(users)
  } catch (error) {
    console.error('Something went wrong...')
    console.error(error)
  }
}

const main = async () => {
  console.log('🧨 Started deleting the database...\n')
  const { db } = createConnection()
  await cleanupDatabase(db)
  console.log('\n🧨 Done deleting the database successfully...\n')
  process.exit(0)
}

void main()
