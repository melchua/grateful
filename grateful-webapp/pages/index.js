import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Grateful App</h1>
        <form className={styles.gratefulForm}>
          Input a gratitude, receive a text when you most need it.
          <textarea
            autofocus
            placeholder="I am grateful for..."
            className={styles.inputGratitude}
            rows={3}
            cols={50}
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e)}
            maxLength={250}
          />
          <button className={styles.submitButton} type="submit">
            Give Gratitude
          </button>
        </form>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
