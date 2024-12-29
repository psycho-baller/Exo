import { type WaitlistEmails, insertWaitlistEmailSchema } from './../../server-db/schema/types'
import { eq } from '@rooots/db'
import { waitlistEmails } from './../../server-db/schema'
import { db } from '@rooots/db'
import type { Database } from '@rooots/db/schema/_table'

export async function createWaitlistEmail(email: string) {
  return await db.insert(waitlistEmails).values({ email }).returning()
}
