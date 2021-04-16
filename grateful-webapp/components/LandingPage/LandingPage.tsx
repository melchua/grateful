import Button from '../Button/Button.tsx';
import styles from '../../styles/LandingPage.module.css';

export default function LandingPage() {
  return (
    <div className={styles.landingContainer}>
      <h1>&#x260E; GRATEFUL</h1>
      <h2>Your personalized gratitude journal.</h2>
      <h4>with reminders messaged to you whenever you&apos;d like.</h4>
      <Button>
        <a href="/api/auth/login">GET STARTED</a>
      </Button>
    </div>
  );
}
