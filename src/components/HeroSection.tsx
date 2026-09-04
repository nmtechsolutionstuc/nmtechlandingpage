import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import FadeIn from './ui/FadeIn'
import { useContent } from '../context/ContentContext'

/**
 * Full-bleed hologram video sitting behind the hero content. Opacity + a
 * screen blend against the black section background make the video's own
 * black background disappear, leaving only the blue hologram glow — plus a
 * left-to-right dark gradient (mobile: a flatter vignette) so the headline
 * on the left always sits on near-solid black regardless of what the video
 * is doing underneath it at that moment.
 *
 * Always autoplays regardless of prefers-reduced-motion — it's muted,
 * ambient, decorative footage (not the kind of motion that preference is
 * meant to suppress), and gating it there was hiding the effect entirely
 * for anyone with "reduce motion" on at the OS level.
 *
 * On desktop (hover-capable pointers only) it also does a very subtle
 * parallax: the video nudges a few px opposite the cursor and eases back to
 * center when the mouse leaves the hero. It's pre-scaled slightly so that
 * small shift never reveals an edge.
 */
function HeroBackgroundVideo({ heroRef }: { heroRef: React.RefObject<HTMLElement> }) {
  const [canHover, setCanHover] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setCanHover(mq.matches)
    const onChange = () => setCanHover(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springCfg = { stiffness: 60, damping: 18, mass: 0.6 }
  const x = useSpring(useTransform(mx, [-0.5, 0.5], [18, -18]), springCfg)
  const y = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), springCfg)

  useEffect(() => {
    if (!canHover || !heroRef.current) return
    const el = heroRef.current

    function onMove(e: PointerEvent) {
      const rect = el.getBoundingClientRect()
      mx.set((e.clientX - rect.left) / rect.width - 0.5)
      my.set((e.clientY - rect.top) / rect.height - 0.5)
    }
    function onLeave() {
      mx.set(0)
      my.set(0)
    }

    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave, { passive: true })
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [canHover, heroRef, mx, my])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/hero-hologram-poster.jpg"
        className="absolute object-cover object-[88%_82%] lg:object-center opacity-[0.65] lg:opacity-[0.85]"
        style={{
          top: '-3%', left: '-3%', width: '106%', height: '106%', maxWidth: 'none',
          mixBlendMode: 'screen', filter: 'brightness(1.35) contrast(1.15) saturate(1.15)', x, y,
        }}
      >
        <source src="/videos/hero-hologram.webm" type="video/webm" />
        <source src="/videos/hero-hologram.mp4" type="video/mp4" />
      </motion.video>

      {/* Dark gradient so the headline column always sits on near-solid black regardless of what the video is doing underneath it */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            'linear-gradient(90deg, #000 0%, rgba(0,0,0,0.95) 32%, rgba(0,0,0,0.3) 62%, rgba(0,0,0,0.05) 100%)',
        }}
      />
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(180deg, #000 0%, #000 30%, rgba(0,0,0,0.72) 55%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.68) 100%)',
        }}
      />
    </div>
  )
}

export default function HeroSection() {
  const { content } = useContent()
  const h = content.hero
  const heroRef = useRef<HTMLElement>(null)

  return (
    <section id="hero" ref={heroRef} className="min-h-screen flex items-center pt-32 pb-16 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0 grid-lines pointer-events-none" style={{ maskImage: 'radial-gradient(ellipse 75% 75% at 50% 35%, black 20%, transparent 75%)' }} />
      <div className="absolute top-[-160px] right-[-120px] w-[560px] h-[560px] rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, var(--accent-01) 0%, transparent 70%)' }} />
      <HeroBackgroundVideo heroRef={heroRef} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full relative z-10">
        <div className="max-w-2xl">
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
      </div>
    </section>
  )
}
