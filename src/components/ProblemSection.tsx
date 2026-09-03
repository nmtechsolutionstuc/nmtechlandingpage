import { X, Check } from 'lucide-react'
import FadeIn from './ui/FadeIn'
import { useContent } from '../context/ContentContext'

export default function ProblemSection() {
  const { content } = useContent()
  const p = content.problem

  return (
    <section className="px-6 md:px-10 py-24 md:py-36 relative" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-14 lg:gap-20 items-start">
          <div>
            <FadeIn>
              <span className="font-medium text-xs tracking-[0.22em] uppercase text-accent">{p.eyebrow}</span>
            </FadeIn>
            <FadeIn delay={0.1} y={30}>
              <h2 className="font-display font-extrabold uppercase leading-[1.05] tracking-tight mt-4 mb-7 heading-grad text-balance" style={{ fontSize: 'clamp(2.2rem,4.4vw,3.6rem)' }}>
                {p.headline}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2} y={20}>
              <p className="text-ink-dim leading-relaxed max-w-md" style={{ fontSize: 'clamp(1rem,1.4vw,1.15rem)' }}>
                {p.text}
              </p>
            </FadeIn>
          </div>

          <div className="flex flex-col gap-4">
            <FadeIn delay={0.15} y={24}>
              <div className="rounded-2xl p-7 sm:p-8 border" style={{ background: 'var(--bg-2)', borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-white/[0.06]">
                    <X size={14} className="text-ink-dim" />
                  </span>
                  <span className="font-display font-bold uppercase tracking-wide text-sm text-ink-dim">{p.badLabel}</span>
                </div>
                <ul className="flex flex-col gap-3.5">
                  {p.badItems.map((item) => (
                    <li key={item} className="text-ink-dim/80 text-sm sm:text-[15px] leading-relaxed pl-0">{item}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} y={24}>
              <div className="rounded-2xl p-7 sm:p-8 border glass-card" style={{ borderColor: 'var(--accent-03)' }}>
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--accent-02)' }}>
                    <Check size={14} className="text-accent" />
                  </span>
                  <span className="font-display font-bold uppercase tracking-wide text-sm text-ink">{p.goodLabel}</span>
                </div>
                <ul className="flex flex-col gap-3.5">
                  {p.goodItems.map((item) => (
                    <li key={item} className="text-ink text-sm sm:text-[15px] leading-relaxed font-medium">{item}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
