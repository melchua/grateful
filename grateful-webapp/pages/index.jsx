import Head from 'next/head';
import { React, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import styles from '../styles/Home.module.css';
import { postGratitude } from '../services/gratitudes';

const NotLoggedIn = () => (
  <div>
    <a href="/api/auth/login">Login</a>
  </div>
);

export default function Home() {
  const { user, isLoading, error } = useUser();
  const [inputValue, setInputValue] = useState('');
  console.log('user', user);
  // HARD CODE: userId for now until registration/login
  // is setup on frontend
  // Once setup, we can use Context to store the current user
  // eslint-disable-next-line
  const [userId, setUserId] = useState(1);
  const handleInputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postGratitude(userId, inputValue);
    setInputValue('');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Grateful App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Grateful App</h1>
        {user ? (
          <div>
            <form className={styles.gratefulForm}>
              Input a gratitude, receive a text when you most need it.
              <textarea
                autoFocus
                placeholder="I am grateful for..."
                className={styles.inputGratitude}
                rows={3}
                cols={50}
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e)}
                maxLength={250}
                name="description"
              />
              <button
                className={styles.submitButton}
                type="submit"
                onClick={handleSubmit}
              >
                Give Gratitude
              </button>
              <a href="/api/auth/logout" data-testid="logout">
                Logout
              </a>
            </form>
          </div>
        ) : (
          <NotLoggedIn />
        )}
      </main>
      <footer className={styles.footer} />
    </div>
  );
}
