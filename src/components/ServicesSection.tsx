import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import FadeIn from './ui/FadeIn'
import Icon from './ui/Icon'
import { BrowserFrame, PhoneFrame } from './ui/DeviceFrame'
import { useContent } from '../context/ContentContext'

/**
 * Floating browser + phone mockups with a mouse-tracked 3D tilt: the whole
 * card set gently rotates toward the cursor, and each layer (browser, phone,
 * badge) drifts by a different amount so the depth reads clearly — closer
 * layers move more. Resets to neutral on pointer leave.
 */
function ServicesVisual() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springCfg = { stiffness: 150, damping: 20, mass: 0.5 }

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), springCfg)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), springCfg)

  const browserX = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), springCfg)
  const browserY = useSpring(useTransform(my, [-0.5, 0.5], [-4, 4]), springCfg)
  const phoneX = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), springCfg)
  const phoneY = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), springCfg)
  const badgeX = useSpring(useTransform(mx, [-0.5, 0.5], [-22, 22]), springCfg)
  const badgeY = useSpring(useTransform(my, [-0.5, 0.5], [-14, 14]), springCfg)

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative w-full max-w-[600px] aspect-square mx-auto select-none"
      style={{ perspective: 1000, rotateX, rotateY, transformStyle: 'preserve-3d' }}
    >
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 45%, var(--accent-01) 0%, transparent 70%)' }}
      />

      <motion.div className="absolute top-[6%] left-[2%] w-[78%] aspect-[16/10]" style={{ x: browserX, y: browserY }}>
        <BrowserFrame src="/projects/nmtech-lp-v2.jpg" delay={0} className="w-full h-full" />
      </motion.div>

      <motion.div className="absolute bottom-[2%] right-[0%] w-[38%] aspect-[9/16]" style={{ x: phoneX, y: phoneY }}>
        <PhoneFrame src="/projects/ironcoregym.jpg" delay={1.4} className="w-full h-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: [0, -8, 0] }}
        viewport={{ once: true }}
        transition={{ opacity: { duration: 0.8, delay: 0.6 }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 } }}
        style={{ x: badgeX, y: badgeY }}
        className="absolute top-[58%] left-[-6%] glass-card rounded-2xl px-4 py-3 flex items-center gap-2.5"
      >
        <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--accent-02)' }}>
          <Check size={16} className="text-accent" />
        </span>
        <div>
          <div className="font-semibold text-ink text-xs">Diseño a medida</div>
          <div className="text-ink-dim text-[10px]">Para tu negocio</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ServicesSection() {
  const { content } = useContent()
  const [open, setOpen] = useState(0)
  const services = content.services

  return (
    <section id="servicios" className="px-6 md:px-10 py-24 md:py-36" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-10 items-start">
          <div>
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

          <FadeIn delay={0.2} y={20} className="hidden lg:block">
            <ServicesVisual />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
