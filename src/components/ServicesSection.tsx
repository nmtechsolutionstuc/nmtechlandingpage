import FadeIn from './ui/FadeIn'

const SERVICES = [
  {
    num: '01',
    name: 'Inteligencia Artificial',
    desc: 'Chatbots, asistentes virtuales y sistemas de IA personalizados que automatizan la atención al cliente y optimizan decisiones de negocio en tiempo real, sin necesidad de conocimientos técnicos.',
    icon: '🤖',
  },
  {
    num: '02',
    name: 'Automatizaciones',
    desc: 'Flujos de trabajo inteligentes que eliminan tareas repetitivas, conectan tus herramientas favoritas y liberan horas valiosas para que te concentres en lo que realmente hace crecer tu negocio.',
    icon: '⚡',
  },
  {
    num: '03',
    name: 'Landing Pages',
    desc: 'Páginas de alta conversión diseñadas con psicología de ventas, animaciones de impacto y UX que transforma visitantes en clientes desde el primer clic. ROI medible desde el día uno.',
    icon: '🚀',
  },
  {
    num: '04',
    name: 'eBooks Digitales',
    desc: 'Empaquetamos tu conocimiento en infoproductos profesionales que generan ingresos pasivos 24/7. Diseño de alto impacto, estrategia de ventas incluida y distribución optimizada.',
    icon: '📚',
  },
  {
    num: '05',
    name: 'Productos Digitales',
    desc: 'Desde apps y herramientas hasta plataformas completas — creamos productos digitales que escalan tu negocio sin aumentar costos operativos. Soluciones que crecen contigo.',
    icon: '💎',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="servicios"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 relative z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <div className="max-w-5xl mx-auto">
        <FadeIn y={40} className="text-center mb-16 sm:mb-20 md:mb-28">
          <h2
            className="font-black uppercase leading-none tracking-tight text-[#060D1A]"
            style={{ fontSize: 'clamp(3rem, 12vw, 140px)' }}
          >
            Servicios
          </h2>
        </FadeIn>

        <div>
          {SERVICES.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.1} y={20}>
              <div
                className="flex items-start gap-6 sm:gap-10 py-8 sm:py-10 md:py-12 group cursor-default"
                style={{
                  borderTop: i === 0 ? '1px solid rgba(12,12,12,0.12)' : undefined,
                  borderBottom: '1px solid rgba(12,12,12,0.12)',
                }}
              >
                <span
                  className="font-black text-[#060D1A] leading-none shrink-0 group-hover:text-[#F7931E] transition-colors duration-300"
                  style={{ fontSize: 'clamp(3rem, 10vw, 120px)' }}
                >
                  {s.num}
                </span>
                <div className="pt-2 sm:pt-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{s.icon}</span>
                    <h3
                      className="font-medium uppercase text-[#060D1A] group-hover:text-[#F7931E] transition-colors duration-300"
                      style={{ fontSize: 'clamp(1rem, 2.2vw, 2rem)' }}
                    >
                      {s.name}
                    </h3>
                  </div>
                  <p
                    className="font-light leading-relaxed text-[#060D1A]/55 max-w-2xl"
                    style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.15rem)' }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5} y={20} className="mt-16 text-center">
          <a
            href="https://nmtech5.mitiendanube.com/productos/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-[#F7931E] to-[#D97B0E] text-white font-semibold uppercase tracking-widest text-sm hover:shadow-[0_8px_32px_rgba(247,147,30,0.55)] hover:-translate-y-1 transition-all duration-300"
          >
            Ver tienda de productos →
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
