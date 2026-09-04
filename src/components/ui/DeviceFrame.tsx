import { motion } from 'framer-motion'

/** Floating "browser window" mockup showing a real project screenshot — gently bobbing, used across sections as visual proof of work. */
export function BrowserFrame({ src, className, delay = 0 }: { src: string; className?: string; delay?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay }}
      className={`rounded-xl overflow-hidden border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] ${className}`}
      style={{ background: 'var(--surface)' }}
    >
      <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/[0.06]">
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
      </div>
      <img src={src} alt="" loading="lazy" className="w-full h-full object-cover object-top" />
    </motion.div>
  )
}

/** Floating "phone" mockup, same idea as BrowserFrame but for a mobile screenshot. */
export function PhoneFrame({ src, className, delay = 0 }: { src: string; className?: string; delay?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -16, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay }}
      className={`rounded-[22px] overflow-hidden border-[3px] border-white/15 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] ${className}`}
      style={{ background: 'var(--surface)' }}
    >
      <img src={src} alt="" loading="lazy" className="w-full h-full object-cover object-top" />
    </motion.div>
  )
}
