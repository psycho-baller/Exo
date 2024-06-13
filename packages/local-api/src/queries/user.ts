import { eq } from '@acme/db'
import { users } from '@acme/db/schema'
import { db } from '@acme/db'
import type { Database } from '@acme/db/schema/_table'
import type { NewUser } from '@acme/db/schema/types'
import { deviceName } from 'expo-device'
import { takeUnique } from '@acme/db/utils'

export async function ensureUserExistsInDB(userId: string) {
  const user = await db.select().from(users).where(eq(users.id, userId)).then(takeUnique)
  console.log('user', user)
  if (!user) {
    const firstName = deviceName?.split(' ')[0]?.split("'")[0] ?? 'Unknown'
    const newUser: NewUser = {
      id: userId,
      firstName,
      email: `${firstName}@example.com`,
    }
    await createUser(newUser)
  }
}

export async function createUser(user: NewUser) {
  return await db.insert(users).values(user).returning()
}
