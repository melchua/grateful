import { React } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Layout from '../components/Layout/Layout';

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user) {
    return (
      <Layout user={user}>
        <div>
          <h1>
            Profile:
            {user.name}
          </h1>
          <h2>Settings</h2>
          Send weekly gratitudes (SMS)
        </div>
      </Layout>
    );
  }

  return <a href="/api/auth/login">Login</a>;
}
