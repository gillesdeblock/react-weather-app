import { useEffect, useState } from 'react'

function useDebounce<T>(value: T, delay: number = 500) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    let intervalID = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(intervalID)
  }, [value, delay])

  return debounced
}

export default useDebounce
