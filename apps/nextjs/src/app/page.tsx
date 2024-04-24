// import ErrorPage from "@/components/ErrorPage";
import { redirect } from 'next/navigation'

import { auth } from '@acme/auth'

export default async function Home() {
  const session = await auth()
  // const isAuthSkip = process.env.AUTH_SKIP === 'true'
  if (session?.user ?? process.env.NODE_ENV === 'development') {
    redirect('/questions')
  } else {
    redirect('/settings')
    // return <ErrorPage error='User not found' />;
  }
}
