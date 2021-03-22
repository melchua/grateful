import { useContext, useEffect } from 'react';

import { useUser } from '@auth0/nextjs-auth0';
import Layout from '../components/Layout/Layout';
import { CurrentUserContext } from '../context/CurrentUserContext.tsx';
import { addUserBySub, getUserBySub } from '../services/users';

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

  console.log('currentUser ', currentUser);
  console.log('user ', user);
  return (
    <Layout user={user}>
      <h3>Settings</h3>
    </Layout>
  );
}
