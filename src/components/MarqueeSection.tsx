import { useContent } from '../context/ContentContext'

export default function MarqueeSection() {
  const { content } = useContent()
  const words = content.marquee.keywords
  if (!words?.length) return null
  const row = [...words, ...words, ...words, ...words]

  return (
    <section className="py-8 border-y border-white/[0.06] overflow-hidden" style={{ background: 'var(--bg-2)' }}>
      <div className="flex whitespace-nowrap animate-marquee">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-8 mx-4">
            <span className="font-display font-semibold uppercase tracking-[0.1em] text-ink-dim/70 text-sm sm:text-base">{w}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
          </span>
        ))}
      </div>
    </section>
  )
}
