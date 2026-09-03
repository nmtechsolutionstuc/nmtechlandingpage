import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import FadeIn from './ui/FadeIn'
import { useContent } from '../context/ContentContext'

function BrowserFrame({ src, className, delay = 0 }: { src: string; className?: string; delay?: number }) {
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
      <img src={src} alt="" loading="eager" className="w-full h-full object-cover object-top" />
    </motion.div>
  )
}

function PhoneFrame({ src, className, delay = 0 }: { src: string; className?: string; delay?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -16, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay }}
      className={`rounded-[22px] overflow-hidden border-[3px] border-white/15 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] ${className}`}
      style={{ background: 'var(--surface)' }}
    >
      <img src={src} alt="" loading="eager" className="w-full h-full object-cover object-top" />
    </motion.div>
  )
}

function HeroVisual() {
  return (
    <div className="relative w-full max-w-[440px] aspect-square mx-auto select-none">
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 45%, var(--accent-01) 0%, transparent 70%)' }}
      />
      <BrowserFrame
        src="/projects/nmtech-lp-v2.jpg"
        delay={0}
        className="absolute top-[6%] left-[2%] w-[78%] aspect-[16/10]"
      />
      <PhoneFrame
        src="/projects/ironcoregym.jpg"
        delay={1.4}
        className="absolute bottom-[2%] right-[0%] w-[38%] aspect-[9/16]"
      />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{ opacity: { duration: 0.8, delay: 0.6 }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 } }}
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
    </div>
  )
}

export default function HeroSection() {
  const { content } = useContent()
  const h = content.hero

  return (
    <section id="hero" className="min-h-screen flex items-center pt-32 pb-16 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0 grid-lines pointer-events-none" style={{ maskImage: 'radial-gradient(ellipse 75% 75% at 50% 35%, black 20%, transparent 75%)' }} />
      <div className="absolute top-[-160px] right-[-120px] w-[560px] h-[560px] rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, var(--accent-01) 0%, transparent 70%)' }} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-16 lg:gap-10 items-center">
          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="font-medium text-xs tracking-[0.22em] uppercase text-accent">{h.eyebrow}</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.12} y={36}>
              <h1 className="font-display font-extrabold uppercase tracking-tight leading-[1.02] mb-7" style={{ fontSize: 'clamp(2.6rem,5.6vw,4.7rem)' }}>
                <span className="heading-grad block">{h.titleLine1}</span>
                <span className="accent-grad block">{h.titleHighlight}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.24} y={20}>
              <p className="text-ink-dim leading-relaxed mb-10 max-w-lg" style={{ fontSize: 'clamp(1rem,1.4vw,1.15rem)' }}>
                {h.description}
              </p>
            </FadeIn>

            <FadeIn delay={0.34} y={20}>
              <div className="flex flex-wrap gap-4 mb-11">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold uppercase tracking-[0.06em] text-sm hover:-translate-y-1 transition-all duration-300"
                  style={{ background: `linear-gradient(135deg,var(--accent),var(--accent-d))`, boxShadow: '0 8px 30px var(--accent-shadow)' }}
                >
                  {h.cta1Label}
                </a>
                <a
                  href="#proyectos"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold uppercase tracking-[0.06em] text-sm border border-white/15 text-ink hover:border-white/40 hover:-translate-y-1 transition-all duration-300"
                >
                  {h.cta2Label}
                </a>
              </div>
            </FadeIn>

            {h.trustBadges?.length > 0 && (
              <FadeIn delay={0.46} y={16}>
                <div className="flex flex-wrap gap-x-7 gap-y-3 pt-8 border-t border-white/[0.07]">
                  {h.trustBadges.map((b) => (
                    <div key={b} className="flex items-center gap-2 text-ink-dim text-xs uppercase tracking-wider font-medium">
                      <Check size={14} className="text-accent shrink-0" />
                      {b}
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}
          </div>

          <FadeIn delay={0.3} y={20} className="hidden lg:block">
            <HeroVisual />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
