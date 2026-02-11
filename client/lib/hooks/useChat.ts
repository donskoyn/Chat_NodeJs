import { useCallback } from 'react'
import { useSocket } from '@/lib/socket'

interface RoomParams {
  name: string
  room: string
}

interface Message {
  name: string
  mess: string
  className: string
}

export function useChat() {
  const { socket, isConnected, error } = useSocket()

  const createRoom = useCallback(
    (roomName: string) => {
      if (!socket || !isConnected) {
        console.error('Socket not connected')
        return
      }
      socket.emit('create', roomName)
    },
    [socket, isConnected]
  )

  const sendMessage = useCallback(
    (roomParams: RoomParams, message: string, color: string) => {
      if (!socket || !isConnected) {
        console.error('Socket not connected')
        return
      }

      socket.emit('send mess', {
        idroom: roomParams.room,
        mess: message,
        name: roomParams.name,
        className: color,
      })
    },
    [socket, isConnected]
  )

  const onMessageReceived = useCallback(
    (callback: (message: Message) => void) => {
      if (!socket) return

      socket.on('add mess', callback)

      return () => {
        socket.off('add mess', callback)
      }
    },
    [socket]
  )

  return {
    socket,
    isConnected,
    error,
    createRoom,
    sendMessage,
    onMessageReceived,
  }
}
