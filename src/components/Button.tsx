import { type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = {
  className?: string
  children: ReactNode
  disabled?: boolean
  onClick: () => void
}

function Button({ className = '', children, disabled, onClick }: ButtonProps) {
  return (
    <button
      className={twMerge(
        'px-2 py-1 bg-sky-400 border text-white font-semibold hover:bg-sky-500 active:bg-sky-600 disabled:bg-slate-400',
        className,
      )}
      disabled={disabled}
      onClick={() => onClick()}
    >
      {children}
    </button>
  )
}

export default Button
