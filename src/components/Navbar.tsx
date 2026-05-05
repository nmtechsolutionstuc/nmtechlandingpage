import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

function NMLogo() {
  return (
    <svg width="38" height="38" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const links = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#060D1A]/95 backdrop-blur-xl border-b border-[#F7931E]/10'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5 no-underline">
            <NMLogo />
            <span className="font-black text-xl uppercase tracking-tight leading-none">
              <span className="text-[#F7931E]">NM</span>
              <span className="text-white">TECH</span>
              <span className="text-[#F7931E]/50 text-xs font-medium tracking-[0.2em] ml-2 align-middle">
                Solutions
              </span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-medium uppercase tracking-wider text-[#D7E2EA]/60 hover:text-[#F7931E] transition-colors duration-200 text-sm"
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="#contacto"
            className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#F7931E] to-[#D97B0E] text-white font-semibold uppercase tracking-widest text-sm hover:shadow-[0_0_24px_rgba(247,147,30,0.55)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Empezar →
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2"
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[62px] left-0 right-0 z-40 bg-[#060D1A]/98 backdrop-blur-xl border-b border-[#F7931E]/10 px-6 py-6 flex flex-col gap-4 md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={close}
                className="font-medium uppercase tracking-wider text-[#D7E2EA] hover:text-[#F7931E] transition-colors py-2 border-b border-white/5 text-base"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={close}
              className="mt-2 text-center py-3.5 rounded-full bg-gradient-to-r from-[#F7931E] to-[#D97B0E] text-white font-semibold uppercase tracking-widest"
            >
              Empezar ahora →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
