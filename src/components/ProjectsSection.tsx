import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, LayoutGrid } from 'lucide-react'
import FadeIn from './ui/FadeIn'
import { useContent } from '../context/ContentContext'

const MAX_FEATURED = 4

export default function ProjectsSection() {
  const { content } = useContent()
  const marked = content.projects.filter((p) => p.featured)
  const featured = (marked.length ? marked : content.projects).slice(0, MAX_FEATURED)
  const [hovered, setHovered] = useState<number | null>(null)

  if (!featured.length) return null

  return (
    <section id="proyectos" className="px-6 md:px-10 py-24 md:py-36 overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1400px] mx-auto">
        <FadeIn y={30} className="mb-16 sm:mb-20 max-w-2xl flex items-end justify-between flex-wrap gap-6">
          <div>
            <span className="font-medium text-xs tracking-[0.22em] uppercase text-accent">Portfolio</span>
            <h2 className="font-display font-extrabold uppercase leading-[1.05] tracking-tight mt-4 heading-grad" style={{ fontSize: 'clamp(2.2rem,4.6vw,3.8rem)' }}>
              Trabajos que hablan por nosotros.
            </h2>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.1}>
        <div className="flex items-center overflow-x-auto no-scrollbar px-6 md:px-10 py-14" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex items-center mx-auto">
            {featured.map((project, i) => {
              const isHovered = hovered === i
              const dim = hovered !== null && !isHovered
              return (
                <motion.a
                  key={project.name + i}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  className="group relative shrink-0 rounded-[26px] overflow-hidden border border-white/14 no-underline"
                  style={{
                    width: 'min(70vw, 320px)',
                    aspectRatio: '3 / 4',
                    marginLeft: i === 0 ? 0 : 'min(-7vw, -46px)',
                    background: 'var(--surface)',
                    zIndex: isHovered ? 40 : i,
                  }}
                  animate={{
                    scale: isHovered ? 1.08 : dim ? 0.94 : 1,
                    rotate: isHovered ? 0 : i % 2 === 0 ? -3 : 3,
                    y: isHovered ? -24 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                >
                  <img src={project.image} alt={project.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/10" />
                  <motion.div
                    className="absolute inset-0 bg-black"
                    animate={{ opacity: dim ? 0.65 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  <span className="absolute top-4 left-4 font-display font-extrabold text-white/70 text-2xl leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center bg-white text-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight size={16} />
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="text-accent text-[10px] uppercase tracking-widest font-semibold mb-1">{project.category}</div>
                    <div className="font-display font-bold text-white leading-tight text-lg mb-1.5">{project.name}</div>
                    <p className="text-white/70 text-xs leading-relaxed max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                      {project.caption}
                    </p>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2} className="text-center mt-6">
        <a
          href="#todos-los-proyectos"
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold uppercase tracking-widest text-xs border border-white/15 text-ink hover:border-white/40 hover:-translate-y-0.5 transition-all duration-300"
        >
          <LayoutGrid size={15} /> Ver todos los proyectos
        </a>
      </FadeIn>
    </section>
  )
}
