'use client'

import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/styles/registration.module.css'

export function RegistrationForm() {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }

    if (!room.trim()) {
      setError('Please enter a room name')
      return
    }

    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters')
      return
    }

    if (room.trim().length < 2) {
      setError('Room name must be at least 2 characters')
      return
    }

    setIsLoading(true)

    try {
      // Store room params in localStorage
      localStorage.setItem(
        'roomParams',
        JSON.stringify({
          name: name.trim(),
          room: room.trim(),
        })
      )

      // Navigate to chat room
      router.push('/room')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(`Failed to join room: ${errorMessage}`)
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          type="text"
          id="name"
          className={styles.input}
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          required
          minLength={2}
          maxLength={50}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="room" className={styles.label}>
          Room
        </label>
        <input
          type="text"
          id="room"
          className={styles.input}
          placeholder="Enter room name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          disabled={isLoading}
          required
          minLength={2}
          maxLength={50}
        />
      </div>

      <button
        type="submit"
        className={styles.button}
        disabled={isLoading}
      >
        {isLoading ? 'Joining...' : 'Join Chat Room'}
      </button>
    </form>
  )
}
