import Layout from '../components/Layout/Layout';
import styles from '../styles/About.module.css';

export default function About() {
  return (
    <Layout>
      <div className={styles.aboutContainer}>
        <h2>How it works</h2>
        <div className={styles.stepContainer}>
          <div className={styles.stepText}>
            <h1>1</h1>
            <h4>
              Write a note of gratitude whenever you feel like it; try to choose
              a consistent time of the day to think about what you&apos;re
              grateful for - in the morning when you wake up is a great time to
              do so.
            </h4>
          </div>
          <div className={styles.image} id={styles.notebook} />
        </div>
        <div className={styles.stepContainer}>
          <div className={styles.stepText}>
            <h1>2</h1>
            <h4>
              Personalize your settings to decide when and how your notes of
              gratitude will be messaged to you. Customize the frequency and
              times to your liking. Etc.
            </h4>
          </div>
          <div className={styles.image} id={styles.calendar} />
        </div>
      </div>
    </Layout>
  );
}
