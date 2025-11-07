import { type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type IconProps = {
  className?: string
  children: ReactNode
  fill?: number
  weight?: number
  grad?: number
  opsz?: number
}

function Icon({ className, children, fill = 0, weight = 400, grad = 0, opsz = 24 }: IconProps) {
  return (
    <span
      className={twMerge('material-symbols-outlined', className)}
      style={{
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grad}, 'opsz' ${opsz}`,
      }}
    >
      {children}
    </span>
  )
}

export default Icon
