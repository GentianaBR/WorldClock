import { useEffect, useState } from 'react'

// Custom hook that returns the current time and updates it at a specified interval
export function useNow(intervalMs: number) {
  // Initialize state with the current date and time
  const [now, setNow] = useState<Date>(new Date())

  // Set up an interval to update the time every `intervalMs` milliseconds
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)

    // Clean up the interval when the component unmounts or intervalMs changes
    return () => clearInterval(id)
  }, [intervalMs])

  // Return the current time
  return now
}
