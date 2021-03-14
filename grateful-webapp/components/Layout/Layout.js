import Head from 'next/head';
import Header from './Header/Header.tsx';
import styles from '../../styles/Layout.module.css';

// eslint-disable-next-line
const Layout = ({ user, children }) => (
  <div className={styles.container}>
    <Head>
      <title>Grateful App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header user={user} />
    <main className={styles.main}>{children}</main>
  </div>
);

export default Layout;
