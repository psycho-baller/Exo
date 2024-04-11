// import ErrorPage from "@/components/ErrorPage";
// import { getUser } from "@/lib/talkToBackend";
// import { useAuthorStore } from "@/stores/author";
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth, signIn, signOut } from '@acme/auth';

export default async function Home() {
  const session = await auth();
  const isAuthSkip = process.env.AUTH_SKIP === 'true';
  if (session || (process.env.NODE_ENV === 'development' && isAuthSkip)) {
    redirect('/questions');
  } else {
    redirect('/settings');
    // return <ErrorPage error='User not found' />;
  }
}
