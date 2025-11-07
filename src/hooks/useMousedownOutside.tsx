import { RefObject, useEffect } from 'react'

function useMousedownOutside<T extends HTMLElement | null>({
  ref,
  callback,
}: {
  ref: RefObject<T>
  callback: () => void
}) {
  const onClickOutside = function (e: MouseEvent) {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback()
    }
  }

  useEffect(() => {
    document.body.addEventListener('mousedown', onClickOutside)
    return () => {
      document.body.removeEventListener('mousedown', onClickOutside)
    }
  }, [])
}

export default useMousedownOutside
