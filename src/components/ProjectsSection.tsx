import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import FadeIn from './ui/FadeIn'

const PROJECTS = [
  {
    num: '01',
    category: 'Agencia / Estudio de Diseño',
    name: 'Axion Studio',
    image: 'https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/hero%20sections/animated%20(27).webp',
    caption: 'Ideal para estudios de diseño, agencias creativas o consultoras que buscan una imagen sofisticada y minimalista.',
  },
  {
    num: '02',
    category: 'Fintech / Stablecoin',
    name: 'Halo — USD Halo',
    image: 'https://motionsites.ai/assets/halo-usd-hero-CtMXOklk.gif',
    caption: 'Ideal para fintech, cripto, stablecoins o cualquier producto financiero digital que necesite transmitir confianza.',
  },
  {
    num: '03',
    category: 'Portfolio 3D / Creativo',
    name: 'Jack — 3D Creator',
    image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260715_020402_14047c8b-e116-4ac5-bc7d-1ab18d18a358.png&w=1280&q=85',
    caption: 'Ideal para portfolios de artistas 3D, diseñadores o creativos independientes que quieran destacar su trabajo.',
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
            href="#contacto"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-[#D7E2EA]/30 text-[#D7E2EA]/80 font-medium uppercase tracking-widest text-xs hover:bg-[#D7E2EA]/10 hover:-translate-y-0.5 transition-all duration-300"
          >
            Empezar ahora →
          </a>
        </div>

        {/* Image */}
        <div
          className="w-full flex items-center justify-center rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#0E1A30]"
          style={{ minHeight: 'clamp(220px, 35vw, 460px)', maxHeight: '60vh' }}
        >
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            className="max-w-full h-full object-contain"
            style={{ maxHeight: '60vh' }}
          />
        </div>

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
