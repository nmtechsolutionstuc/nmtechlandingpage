import { ReactNode } from 'react'

interface CTAButtonProps {
  href?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  variant?: 'primary' | 'outline' | 'ghost'
  target?: string
  rel?: string
}

export default function CTAButton({
  href,
  onClick,
  children,
  className = '',
  variant = 'primary',
  target,
  rel,
}: CTAButtonProps) {
  const base =
    'inline-flex items-center gap-2 font-medium uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap'

  const variants = {
    primary:
      'px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base bg-gradient-to-r from-[#F7931E] to-[#D97B0E] text-white shadow-[0_4px_24px_rgba(247,147,30,0.4)] hover:shadow-[0_8px_32px_rgba(247,147,30,0.6)] hover:-translate-y-1',
    outline:
      'px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base border-2 border-[#F7931E] text-[#F7931E] hover:bg-[#F7931E] hover:text-white hover:-translate-y-1',
    ghost:
      'px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base border-2 border-[#D7E2EA]/40 text-[#D7E2EA] hover:bg-[#D7E2EA]/10 hover:-translate-y-1',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel}>
        {children}
      </a>
    )
  }
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
