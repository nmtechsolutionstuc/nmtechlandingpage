import { useRef, useState, ReactNode } from 'react'

interface MagnetProps {
  children: ReactNode
  strength?: number
  className?: string
}

export default function Magnet({ children, strength = 4, className }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setPos({ x: (e.clientX - cx) / strength, y: (e.clientY - cy) / strength })
    setActive(true)
  }

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 })
    setActive(false)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: active ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
        willChange: 'transform',
      }}
      className={className}
    >
      {children}
    </div>
  )
}
