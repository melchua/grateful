import { React } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Head from 'next/head';

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user) {
    return (
      <div>
        <Head>
          <title>Grateful App: Profile</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h1>
            Welcome
            {user.name}
          </h1>
        </main>
      </div>
    );
  }

  return <a href="/api/auth/login">Login</a>;
}
