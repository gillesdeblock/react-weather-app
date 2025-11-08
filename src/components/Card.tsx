import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={twMerge('bg-white rounded border p-6', className)}>{children}</div>
}

export default Card
