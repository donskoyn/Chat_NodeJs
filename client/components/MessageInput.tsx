'use client'

import React, { FormEvent, useState } from 'react'
import { useChat } from '@/lib/hooks/useChat'
import styles from '@/styles/components.module.css'

interface Message {
  name: string
  mess: string
  className: string
}

interface MessageInputProps {
  onSendMessage: (message: string) => void
  isDisabled?: boolean
}

export function MessageInput({ onSendMessage, isDisabled }: MessageInputProps) {
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!message.trim() || isDisabled || isSubmitting) {
      return
    }

    setIsSubmitting(true)

    try {
      onSendMessage(message.trim())
      setMessage('')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.messageForm}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message..."
        className={styles.textarea}
        disabled={isDisabled || isSubmitting}
        rows={4}
      />
      <button
        type="submit"
        className={styles.submitButton}
        disabled={!message.trim() || isDisabled || isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </form>
  )
}
