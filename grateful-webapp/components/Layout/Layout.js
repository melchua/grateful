import Head from 'next/head';
import Header from './Header/Header.tsx';
import Footer from './Footer/Footer.tsx';
import styles from '../../styles/Layout.module.css';

// eslint-disable-next-line
const Layout = ({ user, children }) => (
  <div className={styles.container}>
    <Head>
      <title>Grateful App</title>
      <link rel="icon" href="/favicon.ico" />

      <meta
        name="viewport"
        content="width=device-width,height=device-height initial-scale=1"
      />
    </Head>

    <Header user={user} />
    <main className={styles.main}>{children}</main>
    <Footer user={user} />
  </div>
);

export default Layout;
