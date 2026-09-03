import FadeIn from './ui/FadeIn'
import { useContent } from '../context/ContentContext'

export default function ProcessSection() {
  const { content } = useContent()
  const steps = content.process
  if (!steps?.length) return null

  return (
    <section id="proceso" className="px-6 md:px-10 py-24 md:py-36" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1100px] mx-auto">
        <FadeIn y={30} className="mb-16 md:mb-24 max-w-2xl">
          <span className="font-medium text-xs tracking-[0.22em] uppercase text-accent">Cómo trabajamos</span>
          <h2 className="font-display font-extrabold uppercase leading-[1.05] tracking-tight mt-4 heading-grad" style={{ fontSize: 'clamp(2.2rem,4.6vw,3.8rem)' }}>
            De tu idea a una web publicada.
          </h2>
        </FadeIn>

        <div className="relative">
          <div className="hidden sm:block absolute left-[27px] top-2 bottom-2 w-px" style={{ background: 'var(--border)' }} />
          <div className="flex flex-col gap-2">
            {steps.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.08} y={20}>
                <div className="flex items-start gap-6 sm:gap-8 py-6 sm:py-8">
                  <div className="relative shrink-0">
                    <span className="hidden sm:flex w-14 h-14 rounded-full items-center justify-center font-display font-bold text-accent border" style={{ background: 'var(--bg)', borderColor: 'var(--accent-03)' }}>
                      {s.num}
                    </span>
                    <span className="sm:hidden font-display font-extrabold text-accent text-2xl">{s.num}</span>
                  </div>
                  <div className="pt-1 sm:pt-3">
                    <h3 className="font-display font-bold uppercase text-ink tracking-tight mb-2" style={{ fontSize: 'clamp(1.1rem,2vw,1.6rem)' }}>
                      {s.title}
                    </h3>
                    <p className="text-ink-dim leading-relaxed max-w-lg" style={{ fontSize: 'clamp(0.9rem,1.4vw,1.05rem)' }}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
