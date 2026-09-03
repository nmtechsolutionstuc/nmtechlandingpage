import FadeIn from './ui/FadeIn'
import { useContent } from '../context/ContentContext'

export default function CTASection() {
  const { content } = useContent()
  const c = content.cta
  const contact = content.contact

  return (
    <section className="px-6 md:px-10 py-28 md:py-40 relative overflow-hidden" style={{ background: 'var(--bg-2)' }}>
      <div className="absolute inset-0 grid-lines pointer-events-none opacity-60" style={{ maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 10%, transparent 75%)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none rounded-full" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%,var(--accent-02) 0%,transparent 70%)' }} />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <FadeIn y={26}>
          <span className="inline-block font-semibold text-xs tracking-[0.22em] uppercase rounded-full px-4 py-2 mb-8 text-accent" style={{ background: 'var(--accent-01)', border: '1px solid var(--accent-03)' }}>
            {c.tag}
          </span>
        </FadeIn>

        <FadeIn delay={0.1} y={40}>
          <h2 className="font-display font-extrabold uppercase leading-[1.05] tracking-tight mb-7" style={{ fontSize: 'clamp(2.2rem,5.6vw,4.6rem)' }}>
            <span className="heading-grad block">{c.titleLine1}</span>
            <span className="accent-grad block">{c.titleHighlight}</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} y={20}>
          <p className="text-ink-dim leading-relaxed mb-12 max-w-xl mx-auto" style={{ fontSize: 'clamp(1rem,1.8vw,1.15rem)' }}>
            {c.description}
          </p>
        </FadeIn>

        <FadeIn delay={0.3} y={20}>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full text-white font-semibold uppercase tracking-widest text-sm hover:-translate-y-1 transition-all duration-300"
              style={{ background: `linear-gradient(135deg,var(--accent),var(--accent-d))`, boxShadow: '0 8px 30px var(--accent-shadow)' }}
            >
              {c.cta1Label}
            </a>
            <a
              href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold uppercase tracking-widest text-sm border border-white/15 text-ink hover:border-white/40 hover:-translate-y-1 transition-all duration-300"
            >
              {c.cta2Label}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
