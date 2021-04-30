import { useContext, useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import styles from '../styles/Settings.module.css';
import Layout from '../components/Layout/Layout';
import { CurrentUserContext } from '../context/CurrentUserContext.tsx';
import { addUserBySub, getUserBySub } from '../services/users';
import VerifyPhoneNumberButton from '../components/VerifyPhoneNumberButton/VerifyPhoneNumberButton.tsx';
import Slider from '../components/Slider/Slider.tsx';
import Button from '../components/Button/Button.tsx';

export default function Settings() {
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [profileView, setProfileView] = useState(false);
  const [formName, setFormName] = useState(user.name);
  const [formEmail, setFormEmail] = useState(user.email);
  const [formPhone, setFormPhone] = useState(currentUser.phone);

  // sliders
  const [textReminder, setTextReminder] = useState(false);
  const [weekly, setWeekly] = useState(false);
  const [biweekly, setBiweekly] = useState(false);

  const toggleReminders = (checked) => {
    if (checked) {
      setWeekly(false);
      setBiweekly(false);
    }
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
          <div className={styles.formContainer}>
            <label htmlFor="name" className={styles.formLabel}>
              Name
              <input
                className={styles.input}
                type="text"
                name="name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </label>
            <label htmlFor="email" className={styles.formLabel}>
              Email
              <input
                className={styles.input}
                type="text"
                name="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
              />
            </label>
            <label htmlFor="phone" className={styles.formLabel}>
              Phone
              <input
                className={styles.input}
                type="text"
                name="phone"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
              />
            </label>

            <Button>SAVE CHANGES</Button>
          </div>
        ) : (
          <div className={styles.formContainer}>
            {currentUser.is_verified ? (
              <>
                <h3>Gratitude Text Reminder</h3>
                <Slider
                  key={1}
                  locked={!currentUser.is_verified}
                  checked={textReminder}
                  setChecked={setTextReminder}
                  setOther={toggleReminders}
                />
                <h3>Text Frequency</h3>
                <h3>Weekly</h3>
                <Slider
                  key={2}
                  locked={!textReminder}
                  checked={weekly}
                  setChecked={setWeekly}
                  setOther={setBiweekly}
                />
                <h3>Bi-Weekly</h3>
                <Slider
                  key={3}
                  locked={!textReminder}
                  checked={biweekly}
                  setChecked={setBiweekly}
                  setOther={setWeekly}
                />
              </>
            ) : (
              <VerifyPhoneNumberButton
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
            <Button className={styles.saveButton}>SAVE CHANGES</Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
