import { ArrowRight } from 'lucide-react'
import FadeIn from './ui/FadeIn'
import { useContent } from '../context/ContentContext'

export default function BeforeAfterSection() {
  const { content } = useContent()
  const b = content.beforeAfter

  return (
    <section className="px-6 md:px-10 py-24 md:py-36" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1200px] mx-auto">
        <FadeIn y={30} className="text-center mb-16 md:mb-20 max-w-2xl mx-auto">
          <span className="font-medium text-xs tracking-[0.22em] uppercase text-accent">{b.eyebrow}</span>
          <h2 className="font-display font-extrabold uppercase leading-[1.1] tracking-tight mt-4 heading-grad text-balance" style={{ fontSize: 'clamp(1.9rem,4vw,3.2rem)' }}>
            {b.headline}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1.3fr] gap-8 md:gap-6 items-center">
          <FadeIn y={20} className="rounded-3xl border border-white/10 p-10 flex flex-col items-center text-center gap-6 min-h-[280px] justify-center" style={{ background: 'var(--bg-2)' }}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-dim">{b.beforeTitle}</span>
            <div className="flex flex-wrap justify-center gap-2.5">
              {b.beforeItems.map((item) => (
                <span key={item} className="px-4 py-2 rounded-full border border-white/10 text-ink-dim text-sm">{item}</span>
              ))}
            </div>
          </FadeIn>

          <div className="flex md:flex-col justify-center">
            <span className="w-11 h-11 rounded-full flex items-center justify-center rotate-90 md:rotate-0 mx-auto" style={{ background: 'var(--accent-02)' }}>
              <ArrowRight size={18} className="text-accent" />
            </span>
          </div>

          <FadeIn y={20} delay={0.1} className="rounded-3xl p-10 flex flex-col items-center text-center gap-6 min-h-[280px] justify-center glass-card" style={{ borderColor: 'var(--accent-03)' }}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{b.afterTitle}</span>
            <div className="flex flex-wrap justify-center gap-2.5">
              {b.afterItems.map((item) => (
                <span key={item} className="px-4 py-2 rounded-full text-white text-sm font-medium" style={{ background: `linear-gradient(135deg,var(--accent),var(--accent-d))` }}>{item}</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
