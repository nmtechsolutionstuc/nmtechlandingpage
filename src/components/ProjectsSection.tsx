import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import FadeIn from './ui/FadeIn'

const PROJECTS = [
  {
    num: '01',
    category: 'Automatización',
    name: 'Sistema IA Chatbot',
    images: {
      topLeft: 'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
      bottomLeft: 'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
      right: 'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
    },
  },
  {
    num: '02',
    category: 'Transformación Digital',
    name: 'AutoFlow CRM',
    images: {
      topLeft: 'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
      bottomLeft: 'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
      right: 'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
    },
  },
  {
    num: '03',
    category: 'Producto Digital',
    name: 'EduMax Digital',
    images: {
      topLeft: 'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
      bottomLeft: 'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
      right: 'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
    },
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
    <div
      className="sticky flex items-center justify-center"
      style={{ top: `${index * 28 + 80}px`, height: '85vh' }}
    >
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
            href="https://nmtech5.mitiendanube.com/productos/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-[#D7E2EA]/30 text-[#D7E2EA]/80 font-medium uppercase tracking-widest text-xs hover:bg-[#D7E2EA]/10 hover:-translate-y-0.5 transition-all duration-300"
          >
            Ver proyecto →
          </a>
        </div>

        {/* Images */}
        <div className="grid grid-cols-5 gap-3 sm:gap-4">
          <div className="col-span-2 flex flex-col gap-3 sm:gap-4">
            <img
              src={project.images.topLeft}
              alt={project.name}
              loading="lazy"
              className="w-full rounded-[24px] sm:rounded-[32px] object-cover"
              style={{ height: 'clamp(110px, 15vw, 200px)' }}
            />
            <img
              src={project.images.bottomLeft}
              alt={project.name}
              loading="lazy"
              className="w-full rounded-[24px] sm:rounded-[32px] object-cover"
              style={{ height: 'clamp(140px, 20vw, 300px)' }}
            />
          </div>
          <div className="col-span-3">
            <img
              src={project.images.right}
              alt={project.name}
              loading="lazy"
              className="w-full h-full rounded-[24px] sm:rounded-[32px] object-cover"
              style={{ minHeight: 'clamp(250px, 35vw, 500px)', maxHeight: '65vh' }}
            />
          </div>
        </div>
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
            Portafolio
          </span>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 140px)' }}
          >
            Proyectos
          </h2>
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
