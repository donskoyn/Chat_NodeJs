'use client'

import { RegistrationForm } from '@/components/RegistrationForm'
import styles from '@/styles/registration.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>JS Chat</h1>
          <p className={styles.subtitle}>Welcome to Real-time Chat</p>
        </div>

        <div className={styles.formWrapper}>
          <h2>Join a Chat Room</h2>
          <RegistrationForm />
        </div>
      </div>
    </main>
  )
}
