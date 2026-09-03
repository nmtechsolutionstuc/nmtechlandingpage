import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import FadeIn from './ui/FadeIn'
import Icon from './ui/Icon'
import { useContent } from '../context/ContentContext'

export default function ServicesSection() {
  const { content } = useContent()
  const [open, setOpen] = useState(0)
  const services = content.services

  return (
    <section id="servicios" className="px-6 md:px-10 py-24 md:py-36" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1000px] mx-auto">
        <FadeIn y={30} className="mb-14 md:mb-20 max-w-2xl">
          <span className="font-medium text-xs tracking-[0.22em] uppercase text-accent">Lo que hacemos</span>
          <h2 className="font-display font-extrabold uppercase leading-[1.05] tracking-tight mt-4 heading-grad" style={{ fontSize: 'clamp(2.2rem,4.6vw,3.8rem)' }}>
            Todo lo que necesitás para tener una web profesional.
          </h2>
        </FadeIn>

        <div>
          {services.map((s, i) => {
            const isOpen = open === i
            return (
              <FadeIn key={s.num} delay={i * 0.04} y={14}>
                <div style={{ borderTop: i === 0 ? '1px solid var(--border)' : undefined, borderBottom: '1px solid var(--border)' }}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-center gap-5 sm:gap-8 py-6 sm:py-7 text-left"
                  >
                    <span className={`font-display font-extrabold shrink-0 transition-colors duration-300 ${isOpen ? 'text-accent' : 'text-ink/25'}`} style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)' }}>
                      {s.num}
                    </span>
                    <span className={`font-display font-semibold uppercase transition-colors duration-300 flex-1 ${isOpen ? 'text-ink' : 'text-ink/70'}`} style={{ fontSize: 'clamp(1.05rem,1.8vw,1.5rem)' }}>
                      {s.name}
                    </span>
                    <ChevronDown size={20} className={`shrink-0 text-ink-dim transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-start gap-4 pb-7 sm:pb-8 pl-[3.2rem] sm:pl-[4.4rem] pr-8">
                          <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--accent-02)' }}>
                            <Icon name={s.icon} size={18} className="text-accent" />
                          </span>
                          <p className="text-ink-dim leading-relaxed text-sm sm:text-base max-w-xl pt-1.5">{s.desc}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
