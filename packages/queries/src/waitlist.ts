import { type WaitlistEmails, insertWaitlistEmailSchema } from './../../server-db/schema/types'
import { eq } from '@acme/db'
import { waitlistEmails } from './../../server-db/schema'
import { db } from '@acme/db'
import type { Database } from '@acme/db/schema/_table'

export async function createWaitlistEmail(email: string) {
  return await db.insert(waitlistEmails).values({ email }).returning()
}
