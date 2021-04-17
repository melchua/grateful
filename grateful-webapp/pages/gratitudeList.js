import React, {
  useContext, useEffect, useCallback, useState,
} from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import styles from '../styles/GratitudeList.module.css';
import { CurrentUserContext } from '../context/CurrentUserContext.tsx';
import { addUserBySub, getUserBySub } from '../services/users';
import { getGratitudesByUserId, deleteGratitude } from '../services/gratitudes';
import Layout from '../components/Layout/Layout';
import { convertLegacyToTemporal, getHumanDateString } from '../utils/date.ts';
import Button from '../components/Button/Button.tsx';

const GratitudeList = () => {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [gratitudes, setGratitudes] = useState([]);
  const [activeGratitudeId, setActiveGratitudeId] = useState(null);
  const { user, isLoading, error } = useUser();

  // double check if this is the right dependency for ths useCallback
  const getGratitudes = useCallback(async () => {
    if (currentUser) {
      const grats = await getGratitudesByUserId(currentUser.id);
      setGratitudes(grats.data);
    }
  }, [currentUser]);

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteGratitude(activeGratitudeId);
    getGratitudes();
  };

  const handleClickItem = (e, id) => {
    e.preventDefault();
    setActiveGratitudeId(id);
  };

  const handleKeyDown = (e) => {
    e.preventDefault();
    // console.log("key", e.key);
    // TODO: Add keyboard handling using the key index
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

  const activeGratitude = gratitudes.find(
    (gratitude) => gratitude.id === activeGratitudeId,
  );

  return (
    <Layout user={user}>
      <div className={styles.gratitudeContainer}>
        <div className={styles.list}>
          {gratitudes.map((gratitude) => {
            const { id, description, created_at: createdAt } = gratitude;
            const isActiveItem = Boolean(activeGratitudeId === id);
            const date = getHumanDateString(convertLegacyToTemporal(createdAt));
            return (
              <div
                key={id}
                // tabIndex={0}
                role="button"
                className={
                  isActiveItem
                    ? styles.gratitudeItemActive
                    : styles.gratitudeItem
                }
                onClick={(e) => handleClickItem(e, id)}
                onKeyDown={(e) => handleKeyDown(e, id)}
              >
                <p className={styles.truncate}>{description}</p>
                <div className={styles.timestamp}>{date}</div>
              </div>
            );
          })}
        </div>

        <div className={styles.gratitudeDisplay}>
          {activeGratitude ? (
            <div>
              <div className={styles.date}>
                {getHumanDateString(
                  convertLegacyToTemporal(activeGratitude.created_at),
                )}
              </div>
              {activeGratitude.description}
              <div className={styles.footer}>
                <Button onClick={(e) => handleDelete(e)}>🗑️</Button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GratitudeList;
