import '../styles/globals.css';
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { CurrentUserProvider } from '../context/CurrentUserContext.tsx';

// eslint-disable-next-line
function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <CurrentUserProvider>
        <Component {...pageProps} />
      </CurrentUserProvider>
    </UserProvider>
  );
}

export default MyApp;
