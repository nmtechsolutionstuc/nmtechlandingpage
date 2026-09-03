import FadeIn from './ui/FadeIn'
import { useContent } from '../context/ContentContext'

export default function TestimonialsSection() {
  const { content } = useContent()
  const items = content.testimonials
  if (!items?.length) return null

  return (
    <section className="px-6 md:px-10 py-24 md:py-36" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1400px] mx-auto">
        <FadeIn y={30} className="mb-14 md:mb-16 max-w-2xl">
          <span className="font-medium text-xs tracking-[0.22em] uppercase text-accent">Clientes</span>
          <h2 className="font-display font-extrabold uppercase leading-[1.05] tracking-tight mt-4 heading-grad" style={{ fontSize: 'clamp(2.2rem,4.6vw,3.8rem)' }}>
            Lo que dicen de nosotros.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <FadeIn key={i} delay={i * 0.06} y={24}>
              <div className="rounded-2xl p-7 h-full flex flex-col gap-5 border border-white/10 hover:-translate-y-1.5 transition-transform duration-300" style={{ background: 'var(--bg-2)' }}>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-accent text-base">★</span>
                  ))}
                </div>
                <p className="text-ink/80 leading-relaxed flex-1 text-sm">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0" style={{ background: `linear-gradient(135deg,var(--accent),var(--accent-d))` }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-ink text-sm">{t.name}</div>
                    <div className="text-ink-dim text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
