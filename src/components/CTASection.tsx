import FadeIn from './ui/FadeIn'

export default function CTASection() {
  return (
    <section
      id="contacto"
      className="bg-[#060D1A] px-5 sm:px-8 md:px-10 py-28 md:py-36 relative overflow-hidden"
    >
      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(247,147,30,0.13)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <FadeIn y={30}>
          <span className="inline-block font-semibold text-xs tracking-[0.22em] uppercase text-[#F7931E] bg-[rgba(247,147,30,0.1)] border border-[rgba(247,147,30,0.2)] rounded-full px-4 py-2 mb-7">
            Empieza hoy
          </span>
        </FadeIn>

        <FadeIn delay={0.1} y={40}>
          <h2
            className="font-black uppercase leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}
          >
            <span className="hero-heading">¿Listo para transformar</span>
            <br />
            <span className="orange-heading">tu negocio con IA?</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} y={20}>
          <p
            className="text-[#D7E2EA]/60 font-light leading-relaxed mb-12 max-w-xl mx-auto"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)' }}
          >
            Agenda una consulta gratuita y descubre exactamente qué solución digital puede
            multiplicar tu productividad. Sin compromisos, sin tecnicismos.
          </p>
        </FadeIn>

        <FadeIn delay={0.3} y={20}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="https://wa.me/543865468239"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-gradient-to-r from-[#F7931E] to-[#D97B0E] text-white font-semibold uppercase tracking-widest text-sm hover:shadow-[0_8px_32px_rgba(247,147,30,0.6)] hover:-translate-y-1 transition-all duration-300"
            >
              💬 Quiero mi consulta gratis
            </a>
            <a
              href="https://nmtech5.mitiendanube.com/productos/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full border-2 border-[#F7931E] text-[#F7931E] font-semibold uppercase tracking-widest text-sm hover:bg-[#F7931E] hover:text-white hover:-translate-y-1 transition-all duration-300"
            >
              Ver productos →
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.4} y={20}>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {[
              { icon: '✅', text: 'Sin costo inicial' },
              { icon: '⚡', text: 'Respuesta en 24h' },
              { icon: '🔒', text: '100% confidencial' },
              { icon: '🎯', text: 'Estrategia personalizada' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-[#8A95A8] text-xs uppercase tracking-widest font-medium">
                <span className="text-base">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
