import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import styles from '../styles/Write.module.css';
import { CurrentUserContext } from '../context/CurrentUserContext.tsx';
import { addUserBySub, getUserBySub } from '../services/users';
import { postGratitude } from '../services/gratitudes';
import Layout from '../components/Layout/Layout';

const Write = () => {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [inputValue, setInputValue] = useState('');
  const { user, isLoading, error } = useUser();
  const router = useRouter();

  // eslint-disable-next-line
  const handleInputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postGratitude(currentUser.id, inputValue);
    setInputValue('');
    router.push('/gratitudeList');

    // TODO: Add redirect link to list page
  };
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
      <form className={styles.gratefulForm}>
        <textarea
          autoFocus
          placeholder="I am grateful for..."
          className={styles.inputGratitude}
          rows={20}
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
    </Layout>
  );
};

export default Write;
