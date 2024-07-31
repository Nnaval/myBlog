"use client";

import React from "react";
import styles from "./login.module.css";
import { signIn } from "next-auth/react";
// import Button from '@/components/button/Button'

const LogIn = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value
    const password = e.target[1].value

    signIn("Credentials", {email, password})
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        
        <input
          type="email"
          placeholder="email"
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="password"
          className={styles.input}
          required
        />

        <button className={styles.button}>LogIn</button>
        {/* {err && "error signing in"} */}
      </form>

      <button onClick={() => signIn("google")}>Login with google</button>
    </div>
  );
};

export default LogIn;
