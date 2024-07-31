"use client"
import { useState } from "react";
import styles from "./register.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [err, setErr] = useState(false)
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch ("/api/auth/reg", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name, email, password,
        }),
      })

      if(res.status === 400) {
        setServerErrorMessage(true)
      } else{
        res.status === 201 && router.push("/dashboard/login?success=Account successfully created");

      }

    } catch (error) {
      setErr(true)
      // console.log("error =", err);
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className={styles.input}
          required
        />
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

        <button className={styles.button}>Register</button>
      {err && "error signing in"}
      </form>

      <Link href="/dashboard/login">
      Login with an existing account
      </Link>
      {serverErrorMessage && "username already exists"}
    </div>
  );
};

export default Register;
