'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useChat } from '@/lib/hooks/useChat'
import { useRoomParams } from '@/lib/hooks/useRoomParams'
import { useRandomColor } from '@/lib/hooks/useRandomColor'
import { MessageList } from './MessageList'
import { MessageInput } from './MessageInput'
import styles from '@/styles/room.module.css'

interface Message {
  name: string
  mess: string
  className: string
}

export function ChatRoom() {
  const router = useRouter()
  const { roomParams, isLoading, error: paramError } = useRoomParams()
  const { isConnected, error: socketError, createRoom, sendMessage, onMessageReceived } = useChat()
  const { getRandomColor } = useRandomColor()
  const [messages, setMessages] = useState<Message[]>([])
  const [userColor, setUserColor] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  // Set user color and join room
  useEffect(() => {
    if (!roomParams || !isConnected) return

    const color = getRandomColor()
    setUserColor(color)

    // Create/join the room
    createRoom(roomParams.room)
  }, [roomParams, isConnected, createRoom, getRandomColor])

  // Listen for incoming messages
  useEffect(() => {
    const unsubscribe = onMessageReceived((data: Message) => {
      setMessages((prev) => [...prev, data])
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [onMessageReceived])

  // Check errors
  useEffect(() => {
    if (paramError) {
      setTimeout(() => router.push('/'), 2000)
      setError(paramError)
    }
  }, [paramError, router])

  const handleSendMessage = (message: string) => {
    if (!roomParams || !isConnected || !userColor) {
      setError('Not connected to room')
      return
    }

    sendMessage(roomParams, message, userColor)
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>
  }

  if (error || paramError) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.error}>{error || paramError}</div>
        <p>Redirecting to home...</p>
      </div>
    )
  }

  if (!roomParams) {
    return <div className={styles.loading}>Invalid room parameters</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>JS Chat</h2>
        <div className={styles.userInfo}>{roomParams.name}</div>
      </div>

      <div className={styles.roomInfo}>
        <h3>
          Message to room: <span className={styles.roomName}>{roomParams.room}</span>
        </h3>
        <div className={styles.connectionStatus}>
          {isConnected ? (
            <span className={styles.connected}>● Connected</span>
          ) : (
            <span className={styles.disconnected}>● Reconnecting...</span>
          )}
        </div>
      </div>

      {socketError && <div className={styles.socketError}>{socketError}</div>}

      <MessageList messages={messages} />

      <div className={styles.inputSection}>
        <MessageInput
          onSendMessage={handleSendMessage}
          isDisabled={!isConnected}
        />
      </div>
    </div>
  )
}
