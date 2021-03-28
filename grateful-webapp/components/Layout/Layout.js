import Head from 'next/head';
import Header from './Header/Header.tsx';
import styles from '../../styles/Layout.module.css';

// eslint-disable-next-line
const Layout = ({ user, children }) => (
  <div className={styles.container}>
    <Head>
      <title>Grateful App</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway&display=swap"
        rel="stylesheet"
      />
      <meta
        name="viewport"
        content="width=device-width,height=device-height initial-scale=1"
      />
    </Head>

    <Header user={user} />
    <main className={styles.main}>{children}</main>
  </div>
);

export default Layout;
