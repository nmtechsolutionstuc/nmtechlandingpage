import { motion } from 'framer-motion'
import FadeIn from './ui/FadeIn'
import AnimatedText from './ui/AnimatedText'
import { useContent } from '../context/ContentContext'

function FloatingCard({ icon, title, sub, className, delay = 0, x = 0 }: {
  icon: string; title: string; sub: string; className?: string; delay?: number; x?: number
}) {
  return (
    <FadeIn delay={delay} x={x} y={0} duration={0.9} className={className}>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
        className="glass-card rounded-2xl p-4 text-center w-[130px] sm:w-[150px]"
      >
        <div className="text-3xl mb-1.5">{icon}</div>
        <div className="font-bold text-white text-xs">{title}</div>
        <div className="text-[#8A95A8] text-[10px] mt-0.5">{sub}</div>
      </motion.div>
    </FadeIn>
  )
}

export default function AboutSection() {
  const { content } = useContent()
  const a = content.about

  return (
    <section id="nosotros" className="min-h-screen flex items-center justify-center relative px-5 sm:px-8 md:px-10 py-24 overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] blur-3xl pointer-events-none rounded-full" style={{ background: 'radial-gradient(ellipse,var(--accent-01) 0%,transparent 70%)' }} />

      <FloatingCard icon="🤖" title="IA & Chatbots" sub="Automatización inteligente" className="absolute top-[8%] left-[2%] sm:left-[4%] md:left-[6%]" delay={0.1} x={-80} />
      <FloatingCard icon="⚡" title="Automatización" sub="Procesos sin fricción" className="absolute bottom-[10%] left-[3%] sm:left-[6%] md:left-[8%]" delay={0.25} x={-80} />
      <FloatingCard icon="🚀" title="Landing Pages" sub="Alta conversión" className="absolute top-[8%] right-[2%] sm:right-[4%] md:right-[6%]" delay={0.15} x={80} />
      <FloatingCard icon="📚" title="eBooks" sub="Ingresos pasivos" className="absolute bottom-[10%] right-[3%] sm:right-[6%] md:right-[8%]" delay={0.3} x={80} />

      <div className="relative z-10 flex flex-col items-center text-center gap-10 sm:gap-14 max-w-2xl">
        <FadeIn y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(3rem,12vw,140px)' }}>
            {a.heading}
          </h2>
        </FadeIn>

        <AnimatedText
          text={a.text}
          className="text-[#D7E2EA] font-medium leading-relaxed"
          style={{ fontSize: 'clamp(1rem,2vw,1.2rem)' }}
        />

        <FadeIn delay={0.2} y={20} className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              { icon: '✅', text: 'Sin costo inicial' },
              { icon: '⚡', text: 'Respuesta en 24h' },
              { icon: '🎯', text: 'Estrategia personalizada' },
              { icon: '🔒', text: '100% confidencial' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-[#D7E2EA]/60">
                <span>{item.icon}</span>
                <span className="font-medium uppercase tracking-wide text-xs">{item.text}</span>
              </div>
            ))}
          </div>

          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-white font-semibold uppercase tracking-widest text-sm hover:-translate-y-1 transition-all duration-300"
            style={{ background: `linear-gradient(135deg,var(--accent),var(--accent-d))`, boxShadow: '0 4px 24px var(--accent-shadow)' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 32px var(--accent-shadow-lg)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 24px var(--accent-shadow)')}
          >
            {a.ctaLabel}
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
