import { Check } from 'lucide-react'
import FadeIn from './ui/FadeIn'
import { useContent } from '../context/ContentContext'

export default function PricingSection() {
  const { content } = useContent()
  const p = content.pricing
  if (!p.tiers?.length) return null

  return (
    <section className="px-6 md:px-10 py-24 md:py-36" style={{ background: 'var(--bg-2)' }}>
      <div className="max-w-[1200px] mx-auto">
        <FadeIn y={30} className="text-center mb-16 md:mb-20 max-w-2xl mx-auto">
          <span className="font-medium text-xs tracking-[0.22em] uppercase text-accent">{p.eyebrow}</span>
          <h2 className="font-display font-extrabold uppercase leading-[1.1] tracking-tight mt-4 mb-5 heading-grad text-balance" style={{ fontSize: 'clamp(2rem,4.4vw,3.6rem)' }}>
            {p.headline}
          </h2>
          <p className="text-ink-dim leading-relaxed">{p.text}</p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {p.tiers.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 0.08} y={24}>
              <div
                className={`h-full rounded-3xl p-8 flex flex-col gap-6 border transition-transform duration-300 hover:-translate-y-1.5 ${tier.highlight ? 'glass-card' : ''}`}
                style={{ background: tier.highlight ? undefined : 'var(--bg)', borderColor: tier.highlight ? 'var(--accent-03)' : 'var(--border)' }}
              >
                {tier.highlight && (
                  <span className="self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white" style={{ background: `linear-gradient(135deg,var(--accent),var(--accent-d))` }}>
                    Más elegido
                  </span>
                )}
                <div>
                  <h3 className="font-display font-bold text-ink text-xl mb-2">{tier.name}</h3>
                  <p className="text-ink-dim text-sm leading-relaxed">{tier.desc}</p>
                </div>
                <ul className="flex flex-col gap-3 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink/85">
                      <Check size={16} className="text-accent shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contacto"
                  className={`text-center py-3.5 rounded-full font-semibold uppercase tracking-widest text-xs transition-all duration-300 hover:-translate-y-0.5 ${
                    tier.highlight ? 'text-white' : 'border border-white/15 text-ink hover:border-white/40'
                  }`}
                  style={tier.highlight ? { background: `linear-gradient(135deg,var(--accent),var(--accent-d))` } : {}}
                >
                  {p.ctaLabel}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="text-center mt-10">
          <p className="text-ink-dim text-xs">{p.disclaimer}</p>
        </FadeIn>
      </div>
    </section>
  )
}
