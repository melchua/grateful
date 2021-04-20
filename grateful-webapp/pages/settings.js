import { useContext, useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import styles from '../styles/Settings.module.css';
import Layout from '../components/Layout/Layout';
import { CurrentUserContext } from '../context/CurrentUserContext.tsx';
import { addUserBySub, getUserBySub } from '../services/users';
import VerifyPhoneNumberButton from '../components/VerifyPhoneNumberButton/VerifyPhoneNumberButton.tsx';
import Slider from '../components/Slider/Slider.tsx';

export default function Settings() {
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [profileView, setProfileView] = useState(false);

  useEffect(() => {
    // Set user and user grats
    if (user) {
      getUserBySub(user.sub).then((res) => {
        setCurrentUser(res);
        if (!res) addUserBySub(user.sub);
      });
    }
  }, [user, setCurrentUser]);

  return (
    <Layout user={user}>
      <div className={styles.settingsContainer}>
        <div className={styles.sidebar}>
          <div
            role="button"
            className={
              profileView
                ? `${styles.activeOption} ${styles.topOption}`
                : `${styles.option} ${styles.topOption}`
            }
            onClick={() => setProfileView(true)}
            onKeyDown={() => setProfileView(true)}
          >
            <p className={styles.icon}>&#x1F464;</p>
            <p className={styles.optionName}>Profile</p>
          </div>
          <div
            role="button"
            className={profileView ? styles.option : styles.activeOption}
            onClick={() => setProfileView(false)}
            onKeyDown={() => setProfileView(false)}
          >
            <p className={styles.icon}>&#x1F514;</p>
            <p className={styles.optionName}>Notifications</p>
          </div>
        </div>
        {profileView ? (
          <div className={styles.optionContainer}>
            first name last name email
          </div>
        ) : (
          <div className={styles.optionContainer}>
            <h3>Receive Sms?</h3>
            <Slider locked={!currentUser.is_verified} />
            {currentUser.is_verified ? (
              <h3>You are verified</h3>
            ) : (
              <VerifyPhoneNumberButton
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
