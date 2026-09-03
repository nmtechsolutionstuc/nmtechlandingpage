import FadeIn from './ui/FadeIn'
import AnimatedText from './ui/AnimatedText'
import { useContent } from '../context/ContentContext'

export default function AboutSection() {
  const { content } = useContent()
  const a = content.about

  return (
    <section id="nosotros" className="px-6 md:px-10 py-24 md:py-40 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] blur-3xl pointer-events-none rounded-full" style={{ background: 'radial-gradient(ellipse,var(--accent-01) 0%,transparent 70%)' }} />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center gap-10">
        <FadeIn y={30}>
          <span className="font-medium text-xs tracking-[0.22em] uppercase text-accent">Sobre NMTECH</span>
        </FadeIn>

        <FadeIn delay={0.08} y={36}>
          <h2 className="font-display font-extrabold uppercase leading-[1.05] tracking-tight heading-grad" style={{ fontSize: 'clamp(2.2rem,5.5vw,4.2rem)' }}>
            {a.heading}
          </h2>
        </FadeIn>

        <AnimatedText text={a.text} className="relative text-ink/85 leading-relaxed max-w-xl" style={{ fontSize: 'clamp(1rem,1.8vw,1.15rem)' }} />

        <FadeIn delay={0.2} y={20}>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-white font-semibold uppercase tracking-widest text-sm hover:-translate-y-1 transition-all duration-300"
            style={{ background: `linear-gradient(135deg,var(--accent),var(--accent-d))`, boxShadow: '0 8px 28px var(--accent-shadow)' }}
          >
            {a.ctaLabel}
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
