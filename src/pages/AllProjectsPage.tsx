import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import FadeIn from '../components/ui/FadeIn'
import { useContent } from '../context/ContentContext'

export default function AllProjectsPage() {
  const { content } = useContent()
  const { theme, projects } = content

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <header className="px-6 md:px-10 py-6 flex items-center justify-between border-b border-white/[0.06]">
        <a href="#hero" className="flex flex-col leading-none no-underline">
          <span className="font-display font-extrabold text-lg text-ink">{theme.logoText}</span>
          <span className="text-[9px] font-medium tracking-[0.32em] text-accent mt-0.5">{theme.logoSubtext?.toUpperCase()}</span>
        </a>
        <a href="#proyectos" className="inline-flex items-center gap-2 text-ink-dim hover:text-ink transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Volver al inicio
        </a>
      </header>

      <div className="px-6 md:px-10 py-16 md:py-24 max-w-[1400px] mx-auto">
        <FadeIn y={26} className="mb-14 max-w-2xl">
          <span className="font-medium text-xs tracking-[0.22em] uppercase text-accent">Portfolio completo</span>
          <h1 className="font-display font-extrabold uppercase leading-[1.05] tracking-tight mt-4 heading-grad" style={{ fontSize: 'clamp(2rem,4.4vw,3.4rem)' }}>
            Todos los proyectos.
          </h1>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <FadeIn key={p.name + i} delay={i * 0.05} y={20}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl overflow-hidden border border-white/10 no-underline hover:border-white/25 transition-colors duration-300"
                style={{ background: 'var(--bg-2)' }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white text-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
                <div className="p-5">
                  <div className="text-accent text-[10px] uppercase tracking-widest font-semibold mb-1">{p.category}</div>
                  <div className="font-display font-bold text-ink text-base mb-1.5">{p.name}</div>
                  <p className="text-ink-dim text-xs leading-relaxed">{p.caption}</p>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}
