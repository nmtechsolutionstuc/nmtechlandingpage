import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import FadeIn from './ui/FadeIn'

const PROJECTS = [
  {
    num: '01',
    category: 'Fitness / Gimnasio',
    name: 'IronCore Performance',
    image: '/projects/ironcoregym.jpg',
    url: 'https://ironcoregym-nmtech.vercel.app/',
    caption: 'Ideal para gimnasios, boxes o entrenadores que buscan una estética potente, oscura y motivadora.',
  },
  {
    num: '02',
    category: 'Servicios Tech / Corporativo',
    name: 'NMTECH Solutions v1',
    image: '/projects/nmtech-lp-v1.jpg',
    url: 'https://nmtech-lp-v1.vercel.app/',
    caption: 'Ideal para empresas de servicios tecnológicos que buscan un estilo oscuro, sobrio y corporativo.',
  },
  {
    num: '03',
    category: 'Servicios Tech / Datos & IA',
    name: 'NMTECH Solutions v2',
    image: '/projects/nmtech-lp-v2.jpg',
    url: 'https://nmtech-lp-v2.vercel.app/',
    caption: 'Ideal para negocios de datos, IA o desarrollo que quieran un toque técnico, con detalles tipo terminal/código.',
  },
  {
    num: '04',
    category: 'Servicios Tech / Minimalista',
    name: 'NMTECH Solutions v3',
    image: '/projects/nmtech-lp-v3.jpg',
    url: 'https://nmtech-lp-v3.vercel.app/',
    caption: 'Ideal para marcas que prefieren un estilo claro, limpio y minimalista en vez de temas oscuros.',
  },
  {
    num: '05',
    category: 'E-commerce / Tienda de Productos',
    name: 'Dinax Tech',
    image: '/projects/dinaxtech.jpg',
    url: 'https://dinaxtech.vercel.app/',
    caption: 'Ideal para tiendas y catálogos de productos físicos que necesitan mostrar categorías y consultar por WhatsApp.',
  },
]

function ProjectCard({
  project,
  index,
  progress,
}: {
  project: (typeof PROJECTS)[0]
  index: number
  progress: MotionValue<number>
}) {
  const total = PROJECTS.length
  const targetScale = 1 - (total - 1 - index) * 0.04
  const rangeStart = index / total
  const rangeEnd = 1
  const scale = useTransform(progress, [rangeStart, rangeEnd], [1, targetScale])

  return (
    <div className="flex items-center justify-center mb-10 sm:mb-14 last:mb-0">
      <motion.div
        className="w-full rounded-[36px] sm:rounded-[44px] md:rounded-[52px] border border-[#D7E2EA]/15 bg-[#060D1A] p-4 sm:p-6 md:p-8 overflow-hidden"
        style={{ scale, transformOrigin: 'top center' }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between mb-4 md:mb-6 flex-wrap gap-3">
          <div className="flex items-baseline gap-4">
            <span
              className="font-black hero-heading leading-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
            >
              {project.num}
            </span>
            <div>
              <div className="text-[#F7931E] text-xs uppercase tracking-widest font-medium">
                {project.category}
              </div>
              <div
                className="text-white font-bold uppercase tracking-tight leading-none"
                style={{ fontSize: 'clamp(1.1rem, 2.5vw, 2.2rem)' }}
              >
                {project.name}
              </div>
            </div>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-[#D7E2EA]/30 text-[#D7E2EA]/80 font-medium uppercase tracking-widest text-xs hover:bg-[#D7E2EA]/10 hover:-translate-y-0.5 transition-all duration-300"
          >
            Ver sitio →
          </a>
        </div>

        {/* Image */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#0E1A30]"
        >
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            className="w-full object-cover object-top"
            style={{ height: 'clamp(220px, 40vw, 460px)' }}
          />
        </a>

        {/* Leyenda */}
        <p className="text-[#D7E2EA]/60 text-sm sm:text-base leading-relaxed mt-4 md:mt-6 max-w-2xl">
          {project.caption}
        </p>
      </motion.div>
    </div>
  )
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id="proyectos"
      className="bg-[#060D1A] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 relative z-20 px-5 sm:px-8 md:px-10 pb-32"
    >
      <div className="max-w-5xl mx-auto">
        <FadeIn y={40} className="text-center pt-20 sm:pt-24 md:pt-32 mb-16 sm:mb-20 md:mb-28">
          <span className="inline-block font-semibold text-xs tracking-[0.22em] uppercase text-[#F7931E] bg-[rgba(247,147,30,0.1)] border border-[rgba(247,147,30,0.2)] rounded-full px-4 py-2 mb-5">
            Inspiración
          </span>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 140px)' }}
          >
            Estilos que vas a aprender a crear
          </h2>
          <p className="text-[#D7E2EA]/60 font-medium mt-5 max-w-xl mx-auto" style={{ fontSize: 'clamp(0.95rem,1.5vw,1.1rem)' }}>
            Referencias de diseño para inspirarte — al terminar vas a poder crear landing pages así vos mismo, gratis y con IA.
          </p>
        </FadeIn>

        <div ref={containerRef}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
