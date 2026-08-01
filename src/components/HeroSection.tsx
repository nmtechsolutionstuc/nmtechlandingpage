import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import FadeIn from './ui/FadeIn'
import { useContent } from '../context/ContentContext'

function StatCounter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const startTime = performance.now()
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
      else setCount(end)
    }
    requestAnimationFrame(animate)
  }, [inView, end])

  return (
    <div ref={ref} className="flex flex-col">
      <span className="font-black text-3xl sm:text-4xl leading-none tabular-nums" style={{ color: 'var(--accent)' }}>
        {count}{suffix}
      </span>
      <span className="text-[#8A95A8] text-xs uppercase tracking-widest mt-1.5 font-medium">{label}</span>
    </div>
  )
}

function TechVisual() {
  return (
    <div className="relative w-[340px] h-[340px] md:w-[400px] md:h-[400px] flex items-center justify-center select-none">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: 'linear-gradient(var(--accent-01) 1px,transparent 1px),linear-gradient(90deg,var(--accent-01) 1px,transparent 1px)',
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 75%)',
        }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="absolute w-full h-full rounded-full"
        style={{ border: '1px solid var(--accent-02)' }}
      >
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full" style={{ background: 'var(--accent)', boxShadow: '0 0 14px var(--accent)' }} />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full" style={{ background: 'var(--accent-l)', boxShadow: '0 0 10px var(--accent-l)' }} />
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute rounded-full"
        style={{ width: '72%', height: '72%', border: '1px dashed var(--accent-02)' }}
      >
        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: 'var(--accent)', opacity: 0.6, boxShadow: '0 0 8px var(--accent)' }} />
      </motion.div>

      <div className="absolute rounded-full" style={{ width: '48%', height: '48%', border: '1px solid var(--accent-01)' }} />
      <div className="absolute w-40 h-40 rounded-full blur-3xl" style={{ background: 'var(--accent-01)' }} />

      <div className="relative z-10 glass-card rounded-2xl p-5 text-center w-44">
        <div className="text-3xl mb-2">🤖</div>
        <div className="font-bold text-sm text-white mb-0.5">IA Activada</div>
        <div className="text-xs text-[#8A95A8]">Corriendo 24/7</div>
        <div className="mt-2 flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs font-medium">Online</span>
        </div>
      </div>

      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-[-20px] top-[18%] glass-card rounded-xl px-3 py-2 flex items-center gap-2">
        <span className="text-base">⚡</span>
        <span className="text-xs font-medium text-white whitespace-nowrap">Automatización activa</span>
      </motion.div>

      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }} className="absolute right-[-20px] bottom-[18%] glass-card rounded-xl px-3 py-2 flex items-center gap-2">
        <span className="text-base">📈</span>
        <span className="text-xs font-medium text-white whitespace-nowrap">+340% eficiencia</span>
      </motion.div>
    </div>
  )
}

export default function HeroSection() {
  const { content } = useContent()
  const h = content.hero

  return (
    <section id="hero" className="min-h-screen flex items-center pt-28 pb-20 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(var(--accent-01) 1px,transparent 1px),linear-gradient(90deg,var(--accent-01) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 80%)',
        }}
      />
      <div className="absolute top-[-100px] right-[-80px] w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle,var(--accent-02) 0%,transparent 70%)' }} />
      <div className="absolute bottom-0 left-[-60px] w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: `radial-gradient(circle,rgba(var(--navy-rgb,27,42,74),0.7) 0%,transparent 70%)` }} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-px" style={{ background: 'var(--accent)' }} />
                <span className="font-semibold text-xs tracking-[0.22em] uppercase" style={{ color: 'var(--accent)' }}>{h.eyebrow}</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} y={40}>
              <h1 className="font-black uppercase tracking-tight leading-[1.03] mb-6" style={{ fontSize: 'clamp(2.8rem,5.5vw,5rem)' }}>
                <span className="hero-heading">{h.titleLine1}<br />{h.titleLine2}<br /></span>
                <span className="orange-heading">{h.titleHighlight}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.28} y={20}>
              <p className="text-[#D7E2EA]/65 font-light leading-relaxed mb-9 max-w-lg" style={{ fontSize: 'clamp(1rem,1.5vw,1.15rem)' }}>
                {h.description}
              </p>
            </FadeIn>

            <FadeIn delay={0.38} y={20}>
              <div className="flex flex-wrap gap-4 mb-12">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold uppercase tracking-widest text-sm hover:-translate-y-1 transition-all duration-300"
                  style={{ background: `linear-gradient(135deg,var(--accent),var(--accent-d))`, boxShadow: '0 4px 24px var(--accent-shadow)' }}
                >
                  {h.cta1Label}
                </a>
                <a
                  href="#servicios"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold uppercase tracking-widest text-sm hover:-translate-y-1 transition-all duration-300"
                  style={{ border: '2px solid var(--accent)', color: 'var(--accent)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'white' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)' }}
                >
                  {h.cta2Label}
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.5} y={20}>
              <div className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-10 pt-8 border-t border-white/8">
                {h.stats.map((s) => (
                  <StatCounter key={s.label} end={s.value} suffix={s.suffix} label={s.label} />
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} y={30} className="hidden lg:flex justify-center">
            <TechVisual />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
