import { useEffect, useState } from 'react'

interface RoomParams {
  name: string
  room: string
}

export function useRoomParams() {
  const [roomParams, setRoomParams] = useState<RoomParams | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const params = localStorage.getItem('roomParams')
      if (!params) {
        setError('No room parameters found')
        setIsLoading(false)
        return
      }

      const parsed = JSON.parse(params)
      if (!parsed.name || !parsed.room) {
        setError('Invalid room parameters')
        setIsLoading(false)
        return
      }

      setRoomParams(parsed)
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to parse room params'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const setRoomParamsData = (params: RoomParams) => {
    localStorage.setItem('roomParams', JSON.stringify(params))
    setRoomParams(params)
  }

  return { roomParams, isLoading, error, setRoomParamsData }
}
