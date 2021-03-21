// eslint-disable-next-line
import React from "react";
import Link from 'next/link';
import styles from '../../../styles/Header.module.css';

const Header = () => (
  <div className={styles.container}>
    <nav>
      <Link href="/">
        <a>Everyday Gratitude</a>
      </Link>
    </nav>
  </div>
);

export default Header;
