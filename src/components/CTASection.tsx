import FadeIn from './ui/FadeIn'
import { useContent } from '../context/ContentContext'

export default function CTASection() {
  const { content } = useContent()
  const c = content.cta
  const contact = content.contact

  return (
    <section id="contacto" className="px-5 sm:px-8 md:px-10 py-28 md:py-36 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none rounded-full" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%,var(--accent-01) 0%,transparent 70%)' }} />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <FadeIn y={30}>
          <span className="inline-block font-semibold text-xs tracking-[0.22em] uppercase rounded-full px-4 py-2 mb-7" style={{ color: 'var(--accent)', background: 'var(--accent-01)', border: '1px solid var(--accent-03)' }}>
            {c.tag}
          </span>
        </FadeIn>

        <FadeIn delay={0.1} y={40}>
          <h2 className="font-black uppercase leading-[1.05] tracking-tight mb-6" style={{ fontSize: 'clamp(2.2rem,5vw,4.2rem)' }}>
            <span className="hero-heading">{c.titleLine1}</span>
            <br />
            <span className="orange-heading">{c.titleHighlight}</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} y={20}>
          <p className="text-[#D7E2EA]/60 font-light leading-relaxed mb-12 max-w-xl mx-auto" style={{ fontSize: 'clamp(1rem,1.8vw,1.15rem)' }}>
            {c.description}
          </p>
        </FadeIn>

        <FadeIn delay={0.3} y={20}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full text-white font-semibold uppercase tracking-widest text-sm hover:-translate-y-1 transition-all duration-300"
              style={{ background: `linear-gradient(135deg,var(--accent),var(--accent-d))`, boxShadow: '0 4px 24px var(--accent-shadow)' }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 32px var(--accent-shadow-lg)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 24px var(--accent-shadow)')}
            >
              {c.cta1Label}
            </a>
            <a
              href={contact.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold uppercase tracking-widest text-sm hover:-translate-y-1 transition-all duration-300"
              style={{ border: '2px solid var(--accent)', color: 'var(--accent)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)' }}
            >
              {c.cta2Label}
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.4} y={20}>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {[
              { icon: '✅', text: 'Sin costo inicial' },
              { icon: '⚡', text: 'Respuesta en 24h' },
              { icon: '🔒', text: '100% confidencial' },
              { icon: '🎯', text: 'Estrategia personalizada' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-[#8A95A8] text-xs uppercase tracking-widest font-medium">
                <span className="text-base">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
