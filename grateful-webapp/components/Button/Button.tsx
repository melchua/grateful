import React from 'react';
import styles from '../../styles/Button.module.css';

type PropType = {
  children: any;
  onClick: () => void;
};

const Button = ({ onClick, children }: PropType) => (
  <span
    className={styles.container}
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={() => {}}
  >
    {children}
  </span>
);

export default Button;
