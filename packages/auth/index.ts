import Discord from '@auth/core/providers/discord'
import type { DefaultSession } from '@auth/core/types'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth from 'next-auth'

import { db } from '@acme/db'

export type { Session } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Discord],
  callbacks: {
    session: (opts) => {
      if (!('user' in opts)) throw 'unreachable with session strategy'

      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: opts.user.id,
        },
      }
    },
  },
})
