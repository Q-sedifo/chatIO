export const formatTime = (isoString: string | Date | undefined) => {
  if (!isoString) return null

  return new Date(isoString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}