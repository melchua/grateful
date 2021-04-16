import { React, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { CurrentUserContext } from '../context/CurrentUserContext.tsx';
import styles from '../styles/Home.module.css';
import { addUserBySub, getUserBySub } from '../services/users'; // TODO: Refactor into a reusable hook
import Layout from '../components/Layout/Layout';
import WriteNewButton from '../components/WriteNewButton/WriteNewButton.tsx';
import LandingPage from '../components/LandingPage/LandingPage.tsx';

export default function Home() {
  const { user, isLoading, error } = useUser();
  const [, setCurrentUser] = useContext(CurrentUserContext);

  // Storing the mapping table with db user_id
  // We will need this association throughout the app
  // If we have more pages, we should put this in React.Context
  // However, we also have the Auth0 context, so we could just query
  // getUserBySub when we need it, but maybe too many queries
  useEffect(() => {
    // Set user and user grats
    if (user) {
      getUserBySub(user.sub).then((res) => {
        setCurrentUser(res);
        if (!res) addUserBySub(user.sub);
      });
    }
  }, [user, setCurrentUser]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Layout user={user}>
      {user ? (
        <div className={styles.container}>
          <div className={styles.writeContainer}>
            <Link href="/write">
              <a>
                <WriteNewButton />
              </a>
            </Link>
            <div className={styles.title}>Write new</div>
          </div>
        </div>
      ) : (
        <LandingPage />
      )}
    </Layout>
  );
}
