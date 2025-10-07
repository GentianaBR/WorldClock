import { useEffect, useState } from 'react'

// Custom hook that syncs a state value with localStorage
export function useLocalStorage<T>(key: string, initial: T) {
  // Initialize state with value from localStorage (if available), otherwise use the initial value
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      // If parsing fails or localStorage is inaccessible, fall back to initial value
      return initial
    }
  })

  // Whenever the key or value changes, update localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Silently fail if localStorage is unavailable (e.g., private mode or quota exceeded)
    }
  }, [key, value])

  // Return the current value and a setter function, just like useState
  return [value, setValue] as const
}
