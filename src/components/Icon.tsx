import { type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type IconProps = {
  className?: string
  children: ReactNode
  fill?: number
  weight?: number
  grad?: number
  opsz?: number
  onClick?: () => void
}

function Icon({
  className,
  children,
  onClick,
  fill = 0,
  weight = 400,
  grad = 0,
  opsz = 24,
}: IconProps) {
  return (
    <span
      className={twMerge('material-symbols-outlined', className)}
      style={{
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grad}, 'opsz' ${opsz}`,
      }}
      onClick={onClick}
    >
      {children}
    </span>
  )
}

export default Icon
