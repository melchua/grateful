import React, {
  useContext, useEffect, useCallback, useState,
} from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import styles from '../styles/GratitudeList.module.css';
import { CurrentUserContext } from '../context/CurrentUserContext.tsx';
import { addUserBySub, getUserBySub } from '../services/users';
import { getGratitudesByUserId, deleteGratitude } from '../services/gratitudes';
import Layout from '../components/Layout/Layout';

const GratitudeList = () => {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [gratitudes, setGratitudes] = useState([]);
  const { user, isLoading, error } = useUser();

  // double check if this is the right dependency for ths useCallback
  const getGratitudes = useCallback(async () => {
    if (currentUser) {
      const grats = await getGratitudesByUserId(currentUser.id);
      setGratitudes(grats.data);
    }
  }, [currentUser]);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteGratitude(id);
    getGratitudes();
  };

  useEffect(() => {
    getGratitudes();
  }, [currentUser, getGratitudes]);

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

  console.log('gratitudes', gratitudes);
  return (
    <Layout user={user}>
      <div className={styles.gratitudeContainer}>
        {gratitudes.reverse().map((gratitude) => {
          const { id, description, created_at: createdAt } = gratitude;
          return (
            <div key={id} className={styles.gratitudeItem}>
              {description}
              <div className={styles.timestamp}>{createdAt}</div>
              <button type="submit" onClick={(e) => handleDelete(e, id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default GratitudeList;
