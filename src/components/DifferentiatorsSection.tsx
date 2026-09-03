import FadeIn from './ui/FadeIn'
import Icon from './ui/Icon'
import { useContent } from '../context/ContentContext'

export default function DifferentiatorsSection() {
  const { content } = useContent()
  const d = content.differentiators
  if (!d.items?.length) return null

  return (
    <section className="px-6 md:px-10 py-24 md:py-36" style={{ background: 'var(--bg-2)' }}>
      <div className="max-w-[1400px] mx-auto">
        <FadeIn y={30} className="mb-14 md:mb-20 max-w-2xl">
          <span className="font-medium text-xs tracking-[0.22em] uppercase text-accent">Diferenciales</span>
          <h2 className="font-display font-extrabold uppercase leading-[1.05] tracking-tight mt-4 mb-5 heading-grad" style={{ fontSize: 'clamp(2.2rem,4.6vw,3.8rem)' }}>
            {d.headline}
          </h2>
          <p className="text-ink-dim leading-relaxed max-w-xl" style={{ fontSize: 'clamp(1rem,1.4vw,1.1rem)' }}>{d.text}</p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-white/10" style={{ background: 'var(--border)' }}>
          {d.items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.04} y={16}>
              <div className="h-full p-7 sm:p-8 flex flex-col gap-4" style={{ background: 'var(--bg)' }}>
                <Icon name={item.icon} size={22} className="text-accent" />
                <h3 className="font-display font-bold text-ink text-base">{item.title}</h3>
                <p className="text-ink-dim text-sm leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
