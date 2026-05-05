import FadeIn from './ui/FadeIn'

const TESTIMONIALS = [
  {
    initials: 'ML',
    name: 'Martina López',
    role: 'Coach de Negocios, Buenos Aires',
    text: 'Antes pasaba 3 horas diarias en tareas administrativas. Ahora un bot lo hace todo. Literalmente recuperé mi tiempo y mi vida.',
  },
  {
    initials: 'CR',
    name: 'Carlos Rivas',
    role: 'E-commerce, México',
    text: 'La landing page que me crearon convirtió un 340% más que la anterior. En el primer mes recuperé la inversión 5 veces.',
  },
  {
    initials: 'AP',
    name: 'Andrea Pereira',
    role: 'Terapeuta independiente, Colombia',
    text: 'Pensaba que la IA era solo para empresas grandes. NMTECH me demostró que cualquier negocio puede aprovecharla hoy mismo.',
  },
  {
    initials: 'JM',
    name: 'Javier Morales',
    role: 'Consultor Financiero, España',
    text: 'El ebook que creamos juntos se vendió 200 copias en el primer mes. Ingreso pasivo real gracias a la estrategia digital de NMTECH.',
  },
  {
    initials: 'VS',
    name: 'Valentina Soto',
    role: 'Diseñadora UX freelance, Chile',
    text: 'Automatizaron mi proceso de captación de clientes completo. Ahora tengo leads llegando solos mientras trabajo en lo que me apasiona.',
  },
  {
    initials: 'DG',
    name: 'Diego González',
    role: 'Startup SaaS, Uruguay',
    text: 'El equipo de NMTECH no solo entrega código, entiende tu negocio. Esa diferencia se nota en cada decisión del proyecto.',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="bg-[#060D1A] px-5 sm:px-8 md:px-10 py-24 md:py-32">
      <div className="max-w-7xl mx-auto">
        <FadeIn y={40} className="text-center mb-16">
          <span className="inline-block font-semibold text-xs tracking-[0.22em] uppercase text-[#F7931E] bg-[rgba(247,147,30,0.1)] border border-[rgba(247,147,30,0.2)] rounded-full px-4 py-2 mb-5">
            Resultados reales
          </span>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
          >
            Clientes felices
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={i} delay={i * 0.08} y={30}>
              <div className="glass-card rounded-2xl p-7 h-full flex flex-col gap-5 hover:-translate-y-2 transition-transform duration-300">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-[#F7931E] text-base">★</span>
                  ))}
                </div>
                <p className="text-[#D7E2EA]/75 font-light leading-relaxed italic flex-1" style={{ fontSize: 'clamp(0.88rem, 1.4vw, 1rem)' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#F7931E] to-[#1B2A4A] flex items-center justify-center font-bold text-white text-sm border-2 border-[rgba(247,147,30,0.3)] shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-[#8A95A8] text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
