import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import FadeIn from './ui/FadeIn'

function StatCounter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const startTime = performance.now()
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
      else setCount(end)
    }
    requestAnimationFrame(animate)
  }, [inView, end])

  return (
    <div ref={ref} className="flex flex-col">
      <span className="font-black text-[#F7931E] text-3xl sm:text-4xl leading-none tabular-nums">
        {count}{suffix}
      </span>
      <span className="text-[#8A95A8] text-xs uppercase tracking-widest mt-1.5 font-medium">{label}</span>
    </div>
  )
}

function TechVisual() {
  return (
    <div className="relative w-[340px] h-[340px] md:w-[400px] md:h-[400px] flex items-center justify-center select-none">
      {/* Grid bg */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage:
            'linear-gradient(rgba(247,147,30,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(247,147,30,0.05) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 75%)',
        }}
      />
      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="absolute w-full h-full rounded-full"
        style={{ border: '1px solid rgba(247,147,30,0.2)' }}
      >
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#F7931E] shadow-[0_0_14px_#F7931E]" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#FDB044] shadow-[0_0_10px_#FDB044]" />
      </motion.div>

      {/* Middle dashed ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute rounded-full"
        style={{
          width: '72%',
          height: '72%',
          border: '1px dashed rgba(247,147,30,0.15)',
        }}
      >
        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-[#F7931E]/60 shadow-[0_0_8px_#F7931E]" />
      </motion.div>

      {/* Inner ring */}
      <div
        className="absolute rounded-full"
        style={{ width: '48%', height: '48%', border: '1px solid rgba(247,147,30,0.08)' }}
      />

      {/* Ambient glow */}
      <div className="absolute w-40 h-40 rounded-full bg-[#F7931E]/10 blur-3xl" />

      {/* Center card */}
      <div className="relative z-10 glass-card rounded-2xl p-5 text-center w-44">
        <div className="text-3xl mb-2">🤖</div>
        <div className="font-bold text-sm text-white mb-0.5">IA Activada</div>
        <div className="text-xs text-[#8A95A8]">Corriendo 24/7</div>
        <div className="mt-2 flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs font-medium">Online</span>
        </div>
      </div>

      {/* Badge left */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[-20px] top-[18%] glass-card rounded-xl px-3 py-2 flex items-center gap-2"
      >
        <span className="text-base">⚡</span>
        <span className="text-xs font-medium text-white whitespace-nowrap">Automatización activa</span>
      </motion.div>

      {/* Badge right */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute right-[-20px] bottom-[18%] glass-card rounded-xl px-3 py-2 flex items-center gap-2"
      >
        <span className="text-base">📈</span>
        <span className="text-xs font-medium text-white whitespace-nowrap">+340% eficiencia</span>
      </motion.div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-28 pb-20 relative overflow-hidden bg-[#060D1A]"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(247,147,30,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(247,147,30,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 80%)',
        }}
      />

      {/* Orbs */}
      <div className="absolute top-[-100px] right-[-80px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(247,147,30,0.18)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[-60px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(27,42,74,0.7)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(247,147,30,0.07)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-px bg-[#F7931E]" />
                <span className="font-semibold text-xs tracking-[0.22em] uppercase text-[#F7931E]">
                  Tecnología &amp; Resultados
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} y={40}>
              <h1
                className="hero-heading font-black uppercase tracking-tight leading-[1.03] mb-6"
                style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}
              >
                Tu negocio,<br />
                potenciado con<br />
                <span className="orange-heading">Inteligencia Digital</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.28} y={20}>
              <p className="text-[#D7E2EA]/65 font-light leading-relaxed mb-9 max-w-lg" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}>
                Automatizamos procesos, creamos herramientas de IA y desarrollamos soluciones
                digitales que te permiten crecer más rápido, con menos esfuerzo.
              </p>
            </FadeIn>

            <FadeIn delay={0.38} y={20}>
              <div className="flex flex-wrap gap-4 mb-12">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F7931E] to-[#D97B0E] text-white font-semibold uppercase tracking-widest text-sm hover:shadow-[0_8px_32px_rgba(247,147,30,0.55)] hover:-translate-y-1 transition-all duration-300"
                >
                  Quiero mi solución →
                </a>
                <a
                  href="#servicios"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#F7931E] text-[#F7931E] font-semibold uppercase tracking-widest text-sm hover:bg-[#F7931E] hover:text-white hover:-translate-y-1 transition-all duration-300"
                >
                  Ver servicios
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.5} y={20}>
              <div className="flex gap-10 pt-8 border-t border-white/8">
                <StatCounter end={200} suffix="+" label="Horas ahorradas/mes" />
                <StatCounter end={50} suffix="+" label="Proyectos entregados" />
                <StatCounter end={98} suffix="%" label="% Satisfacción" />
              </div>
            </FadeIn>
          </div>

          {/* Right visual */}
          <FadeIn delay={0.3} y={30} className="hidden lg:flex justify-center">
            <TechVisual />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
