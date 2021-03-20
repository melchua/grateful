import {
  React, useState, useEffect, useCallback,
} from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import styles from '../styles/Home.module.css';
import { postGratitude, getGratitudesByUserId } from '../services/gratitudes';
import { addUserBySub, getUserBySub } from '../services/users';
import Layout from '../components/Layout/Layout';

const NotLoggedIn = () => (
  <div>
    <a href="/api/auth/login">Login</a>
  </div>
);

export default function Home() {
  const { user, isLoading, error } = useUser();
  const [inputValue, setInputValue] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [gratitudes, setGratitudes] = useState([]);
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
  }, [user]);

  // double check if this is the right dependency for ths useCallback
  const getGratitudes = useCallback(async () => {
    if (currentUser) {
      const grats = await getGratitudesByUserId(currentUser.id);
      setGratitudes(grats.data);
    }
  }, [currentUser]);

  useEffect(() => {
    getGratitudes();
  }, [currentUser, getGratitudes]);

  // eslint-disable-next-line
  const handleInputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await postGratitude(currentUser.id, inputValue);
    getGratitudes();
    setInputValue('');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Layout user={user}>
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
          </form>

          <div className={styles.gratitudeContainer}>
            {gratitudes.reverse().map((gratitude) => {
              const { id, description, created_at: createdAt } = gratitude;
              return (
                <div key={id} className={styles.gratitudeItem}>
                  {description}
                  <div className={styles.timestamp}>{createdAt}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </Layout>
  );
}
