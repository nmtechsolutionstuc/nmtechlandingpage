import FadeIn from './ui/FadeIn'
import { useContent } from '../context/ContentContext'

export default function TestimonialsSection() {
  const { content } = useContent()

  return (
    <section className="px-5 sm:px-8 md:px-10 py-24 md:py-32" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        <FadeIn y={40} className="text-center mb-16">
          <span className="inline-block font-semibold text-xs tracking-[0.22em] uppercase rounded-full px-4 py-2 mb-5" style={{ color: 'var(--accent)', background: 'var(--accent-01)', border: '1px solid var(--accent-03)' }}>
            Resultados reales
          </span>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(2.5rem,8vw,7rem)' }}>
            Clientes felices
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.08} y={30}>
              <div className="glass-card rounded-2xl p-7 h-full flex flex-col gap-5 hover:-translate-y-2 transition-transform duration-300">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} style={{ color: 'var(--accent)' }} className="text-base">★</span>
                  ))}
                </div>
                <p className="text-[#D7E2EA]/75 font-light leading-relaxed italic flex-1" style={{ fontSize: 'clamp(0.88rem,1.4vw,1rem)' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-sm border-2 shrink-0" style={{ background: `linear-gradient(135deg,var(--accent),var(--navy))`, borderColor: 'var(--accent-03)' }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-[#8A95A8] text-xs">{t.role}</div>
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
