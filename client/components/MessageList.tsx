'use client'

import React, { useEffect, useRef } from 'react'
import styles from '@/styles/components.module.css'

interface Message {
  name: string
  mess: string
  className: string
}

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No messages yet. Start the conversation!</p>
      </div>
    )
  }

  return (
    <div className={styles.messageContainer}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`${styles.message} ${styles[`alert${msg.className}`]}`}
        >
          <div className={styles.messageName}>{msg.name}</div>
          <div className={styles.messageText}>{msg.mess}</div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
