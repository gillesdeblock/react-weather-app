import { ReactNode } from 'react'

function Card({ children }: { children: ReactNode }) {
  return <div className="bg-white rounded border p-6">{children}</div>
}

export default Card
