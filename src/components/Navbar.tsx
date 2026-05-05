import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useContent } from '../context/ContentContext'

function LogoIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 44 44" fill="none">
      <polygon points="22,2 40,12 40,32 22,42 4,32 4,12" fill="var(--navy)" stroke="var(--accent)" strokeWidth="1.5" />
      <line x1="22" y1="2" x2="22" y2="7" stroke="var(--accent)" strokeWidth="1.5" />
      <line x1="30" y1="5" x2="30" y2="10" stroke="var(--accent)" strokeWidth="1.5" />
      <line x1="14" y1="5" x2="14" y2="10" stroke="var(--accent)" strokeWidth="1.5" />
      <circle cx="22" cy="5" r="2" fill="var(--accent)" />
      <circle cx="30" cy="9" r="2" fill="var(--accent)" />
      <circle cx="14" cy="9" r="2" fill="var(--accent-l)" />
      <text x="8" y="30" fontFamily="inherit" fontWeight="900" fontSize="18" fill="var(--accent)">N</text>
      <text x="22" y="30" fontFamily="inherit" fontWeight="900" fontSize="18" fill="white">M</text>
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
  const { content } = useContent()
  const { theme } = content
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3 backdrop-blur-xl border-b' : 'py-5'
        }`}
        style={scrolled ? { background: `${theme.bgColor}f2`, borderColor: 'var(--accent-03)' } : {}}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5 no-underline">
            {theme.logoImageUrl ? (
              <img src={theme.logoImageUrl} alt={theme.logoText} className="h-10 w-auto object-contain" />
            ) : (
              <>
                <LogoIcon />
                <span className="font-black text-xl uppercase tracking-tight leading-none">
                  <span style={{ color: 'var(--accent)' }}>{theme.logoText}</span>
                  <span className="text-white">{theme.logoText === 'NMTECH' ? '' : ''}</span>
                  <span className="text-xs font-medium tracking-[0.2em] ml-2 align-middle" style={{ color: 'var(--accent)', opacity: 0.5 }}>
                    {theme.logoSubtext}
                  </span>
                </span>
              </>
            )}
          </a>

          <div className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="font-medium uppercase tracking-wider text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors duration-200 text-sm">
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="#contacto"
            className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-semibold uppercase tracking-widest text-sm hover:-translate-y-0.5 transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, var(--accent), var(--accent-d))`,
              boxShadow: '0 0 0 0 transparent',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 24px var(--accent-shadow)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 0 0 transparent')}
          >
            Empezar →
          </a>

          <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2" aria-label="Menu">
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
            className="fixed top-[62px] left-0 right-0 z-40 backdrop-blur-xl border-b px-6 py-6 flex flex-col gap-4 md:hidden"
            style={{ background: `${theme.bgColor}f8`, borderColor: 'var(--accent-03)' }}
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-medium uppercase tracking-wider text-[#D7E2EA] py-2 border-b border-white/5 text-base hover:opacity-80 transition-opacity">
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="mt-2 text-center py-3.5 rounded-full text-white font-semibold uppercase tracking-widest"
              style={{ background: `linear-gradient(135deg, var(--accent), var(--accent-d))` }}
            >
              Empezar ahora →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
