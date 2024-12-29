import { eq } from '@rooots/db'
import { users } from '@rooots/db/schema'
import { db } from '@rooots/db'
import type { NewUser } from '@rooots/db/schema/types'
import { deviceName } from 'expo-device'
import { takeUnique } from '@rooots/db/utils'

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
