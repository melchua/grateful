// eslint-disable-next-line
import React from "react";
import styles from '../../../styles/Footer.module.css';

type Proptype = {
  user: Object;
};

const Footer = ({ user }: Proptype) => (
  <div className={styles.container}>
    <nav>
      {user && (
        <a href="/profile">
          <img className={styles.avatar} src={user.picture} alt="avatar" />
        </a>
      )}
      <div>
        {user ? (
          <a href="/api/auth/logout" data-testid="logout">
            logout
          </a>
        ) : (
          <a href="/api/auth/login">Login</a>
        )}
      </div>
    </nav>
  </div>
);

export default Footer;
