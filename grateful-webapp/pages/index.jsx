import Head from "next/head";
import { React, useState } from "react";
import styles from "../styles/Home.module.css";
import MessageButton from "./MessageButton";
import { postGratitude } from "../services/gratitudes";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  // HARD CODE: userId for now until registration/login
  // is setup on frontend
  // Once setup, we can use Context to store the current user
  const [userId, setUserId] = useState(1);
  const handleInputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postGratitude(userId, inputValue);
    setInputValue("");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Grateful App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Grateful App</h1>
        <form className={styles.gratefulForm}>
          Input a gratitude, receive a text when you most need it.
          <textarea
            autoFocus
            placeholder="I am grateful for..."
            className={styles.inputGratitude}
            rows={3}
            cols={50}
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e)}
            maxLength={250}
            name="description"
          />
          <button
            className={styles.submitButton}
            type="submit"
            onClick={handleSubmit}
          >
            Give Gratitude
          </button>
        </form>
      </main>
      <MessageButton />
      <footer className={styles.footer} />
    </div>
  );
}
