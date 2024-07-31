'use client'

import React from 'react'
import styles from './login.module.css'
import { signIn } from 'next-auth/react'
const LogIn = () => {
  return (
    <div className={styles.container}>
      <button onClick={() => signIn('google')}>
        Login with google
      </button>
    </div>
  )
}

export default LogIn