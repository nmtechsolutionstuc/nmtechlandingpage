function NMLogo() {
  return (
    <svg width="34" height="34" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="22,2 40,12 40,32 22,42 4,32 4,12" fill="#1B2A4A" stroke="#F7931E" strokeWidth="1.5" />
      <line x1="22" y1="2" x2="22" y2="7" stroke="#F7931E" strokeWidth="1.5" />
      <line x1="30" y1="5" x2="30" y2="10" stroke="#F7931E" strokeWidth="1.5" />
      <line x1="14" y1="5" x2="14" y2="10" stroke="#F7931E" strokeWidth="1.5" />
      <circle cx="22" cy="5" r="2" fill="#F7931E" />
      <circle cx="30" cy="9" r="2" fill="#F7931E" />
      <circle cx="14" cy="9" r="2" fill="#FDB044" />
      <text x="8" y="30" fontFamily="Kanit,sans-serif" fontWeight="900" fontSize="18" fill="#F7931E">N</text>
      <text x="22" y="30" fontFamily="Kanit,sans-serif" fontWeight="900" fontSize="18" fill="white">M</text>
    </svg>
  )
}

const SOCIALS = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/543865468239',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/nmtechsolutions',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@njmartinez98',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.37a8.16 8.16 0 004.77 1.52V7.45a4.85 4.85 0 01-1-.76z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:nmartinez9815@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
]

const LINKS_SERVICIOS = [
  { label: 'Inteligencia Artificial', href: '#servicios' },
  { label: 'Automatizaciones', href: '#servicios' },
  { label: 'Landing Pages', href: '#servicios' },
  { label: 'eBooks Digitales', href: 'https://nmtech5.mitiendanube.com/productos/' },
  { label: 'Productos Digitales', href: 'https://nmtech5.mitiendanube.com/productos/' },
]

const LINKS_COMPANIA = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Clientes', href: '#' },
  { label: 'Contacto', href: '#contacto' },
]

const LINKS_CONTACTO = [
  { label: 'nmartinez9815@gmail.com', href: 'mailto:nmartinez9815@gmail.com' },
  { label: 'WhatsApp Business', href: 'https://wa.me/543865468239' },
  { label: 'Tienda de productos', href: 'https://nmtech5.mitiendanube.com/productos/' },
  { label: 'Agendar llamada', href: 'https://wa.me/543865468239' },
]

export default function Footer() {
  return (
    <footer className="bg-[#060D1A] border-t border-white/5 px-5 sm:px-8 md:px-10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="#hero" className="flex items-center gap-2.5 mb-5">
              <NMLogo />
              <span className="font-black text-xl uppercase tracking-tight leading-none">
                <span className="text-[#F7931E]">NM</span>
                <span className="text-white">TECH</span>
              </span>
            </a>
            <p className="text-[#8A95A8] text-sm leading-relaxed mb-6 max-w-xs">
              Soluciones digitales modernas, prácticas y orientadas a resultados. IA, automatización
              y herramientas digitales para crecer de manera eficiente.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-[#8A95A8] hover:bg-[rgba(247,147,30,0.15)] hover:border-[rgba(247,147,30,0.3)] hover:text-[#F7931E] hover:-translate-y-0.5 transition-all duration-250"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.15em] text-[#F7931E] mb-5">Servicios</h4>
            <ul className="flex flex-col gap-3">
              {LINKS_SERVICIOS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[#8A95A8] text-sm hover:text-white transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Compañía */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.15em] text-[#F7931E] mb-5">Compañía</h4>
            <ul className="flex flex-col gap-3">
              {LINKS_COMPANIA.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[#8A95A8] text-sm hover:text-white transition-colors duration-200">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.15em] text-[#F7931E] mb-5">Contacto</h4>
            <ul className="flex flex-col gap-3">
              {LINKS_CONTACTO.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-[#8A95A8] text-sm hover:text-[#F7931E] transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-7 border-t border-white/5 flex flex-wrap justify-between items-center gap-4">
          <p className="text-[#8A95A8] text-xs">
            © {new Date().getFullYear()} NMTECH Solutions™. Todos los derechos reservados.
          </p>
          <p className="text-[#8A95A8] text-xs">
            <a href="#" className="hover:text-[#F7931E] transition-colors">Política de privacidad</a>
            <span className="mx-3">·</span>
            <a href="#" className="hover:text-[#F7931E] transition-colors">Términos de uso</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
