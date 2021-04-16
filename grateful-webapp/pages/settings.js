import { useContext, useEffect } from 'react';

import { useUser } from '@auth0/nextjs-auth0';
import Layout from '../components/Layout/Layout';
import { CurrentUserContext } from '../context/CurrentUserContext.tsx';
import { addUserBySub, getUserBySub } from '../services/users';
import VerifyPhoneNumberButton from '../components/VerifyPhoneNumberButton/VerifyPhoneNumberButton.tsx';
import Slider from '../components/Slider/Slider.tsx';

export default function Settings() {
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

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
      <h2>Settings</h2>
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
    </Layout>
  );
}
