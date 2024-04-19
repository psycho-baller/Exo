import { auth, signIn, signOut } from '@acme/auth';

export async function AuthShowcase() {
  const session = await auth();

  if (!session) {
    return (
      <form
        action={async () => {
          'use server';
          await signIn('discord');
        }}
      >
        <button>Sign in with Discord</button>
      </form>
    );
  }

  return (
    <section>
      {session && (
        <div>
          <p>Logged in as {session.user.name}</p>
          <br />
          <p>Email: {session.user.email}</p>
          <br />
          <img src={session.user?.image ?? undefined} alt={session.user?.name ?? undefined} />
          <br />
          <p>Access token: {session.expires}</p>
        </div>
      )}

      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button>Sign out</button>
      </form>
    </section>
  );
}
