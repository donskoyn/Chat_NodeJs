import { useCallback } from 'react'

const ALERT_COLORS = ['secondary', 'danger', 'success', 'warning', 'info', 'light']

export function useRandomColor() {
  const getRandomColor = useCallback(() => {
    return ALERT_COLORS[Math.floor(Math.random() * ALERT_COLORS.length)]
  }, [])

  return { getRandomColor, ALERT_COLORS }
}
