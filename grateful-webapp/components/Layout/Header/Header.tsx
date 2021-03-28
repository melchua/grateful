// eslint-disable-next-line
import React from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../../styles/Header.module.css';
import Button from '../../Button/Button.tsx';

const Header = () => {
  const router = useRouter();

  const handleNewNote = (e) => {
    e.preventDefault();
    router.push('/write');
  };
  return (
    <div className={styles.container}>
      <nav className={styles.mainNav}>
        <Link href="/">
          <a>Home</a>
        </Link>
        <span>
          <Link href="/gratitudeList">
            <a className={styles.navLink}>Gratitudes</a>
          </Link>
          <Link href="/">
            <a className={styles.navLink}>About</a>
          </Link>
          <Link href="/">
            <a className={styles.navLink}>Profile</a>
          </Link>
          {true ? (
            <Link href="/api/auth/logout">
              <a className={styles.navLink}>Sign out</a>
            </Link>
          ) : (
            <Link href="/api/auth/login">
              <a className={styles.navLink}>Sign in</a>
            </Link>
          )}
          <Button onClick={handleNewNote}>+</Button>
        </span>
      </nav>
    </div>
  );
};

export default Header;
