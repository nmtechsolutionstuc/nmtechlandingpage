import { ArrowUpRight } from 'lucide-react'
import FadeIn from './ui/FadeIn'
import Icon from './ui/Icon'
import { useContent } from '../context/ContentContext'

export default function IndustrySection() {
  const { content } = useContent()
  const d = content.industry
  const waHref = `https://wa.me/${content.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hola! Quiero una web para mi negocio.')}`

  return (
    <section className="py-24 md:py-36" style={{ background: 'var(--bg-2)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <FadeIn y={30} className="mb-14 md:mb-16 max-w-2xl">
          <span className="font-medium text-xs tracking-[0.22em] uppercase text-accent">{d.eyebrow}</span>
          <h2 className="font-display font-extrabold uppercase leading-[1.05] tracking-tight mt-4 mb-5 heading-grad" style={{ fontSize: 'clamp(2.2rem,4.6vw,3.8rem)' }}>
            {d.headline}
          </h2>
          <p className="text-ink-dim leading-relaxed max-w-xl" style={{ fontSize: 'clamp(1rem,1.4vw,1.1rem)' }}>{d.text}</p>
        </FadeIn>
      </div>

      <div className="pl-6 md:pl-10">
        <div className="flex gap-4 overflow-x-auto pb-4 pr-6 md:pr-10 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
          {d.items.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.05} x={20} y={0} className="snap-start shrink-0">
              <div className="w-[180px] sm:w-[210px] aspect-[3/4] rounded-3xl border border-white/10 flex flex-col items-center justify-center gap-5 hover:-translate-y-2 hover:border-accent/40 transition-all duration-300" style={{ background: 'var(--bg)' }}>
                <span className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'var(--accent-02)' }}>
                  <Icon name={item.icon} size={28} className="text-accent" />
                </span>
                <span className="font-display font-semibold uppercase text-ink text-sm tracking-wide text-center px-2">{item.label}</span>
              </div>
            </FadeIn>
          ))}

          <FadeIn x={20} y={0} className="snap-start shrink-0">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[180px] sm:w-[210px] aspect-[3/4] rounded-3xl flex flex-col items-center justify-center gap-4 text-center px-5 hover:-translate-y-2 transition-all duration-300 no-underline"
              style={{ background: `linear-gradient(150deg,var(--accent),var(--accent-d))` }}
            >
              <ArrowUpRight size={26} className="text-white" />
              <span className="font-display font-bold uppercase text-white text-sm leading-snug">{d.ctaLabel}</span>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
