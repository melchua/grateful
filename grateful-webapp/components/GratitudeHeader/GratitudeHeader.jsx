import styles from '../../styles/GratitudeHeader.module.css';
import { currentDateString } from '../../utils/date.ts';

const GratitudeHeader = () => (
  <div className={styles.container}>
    <div className={styles.date}>{currentDateString()}</div>
    <div className={styles.title}>Today I am grateful.</div>
  </div>
);

export default GratitudeHeader;
