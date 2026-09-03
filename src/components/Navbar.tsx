import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useContent } from '../context/ContentContext'

const links = [
  { href: '#hero', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Trabajos' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
]

function Logo({ text, subtext, imageUrl }: { text: string; subtext: string; imageUrl: string }) {
  if (imageUrl) {
    return <img src={imageUrl} alt={text} className="h-9 w-auto object-contain" />
  }
  return (
    <span className="flex flex-col leading-none select-none">
      <span className="font-display font-extrabold text-lg tracking-tight text-ink">{text}</span>
      <span className="text-[9px] font-medium tracking-[0.32em] text-accent mt-0.5">{subtext?.toUpperCase()}</span>
    </span>
  )
}

export default function Navbar() {
  const { content } = useContent()
  const { theme } = content
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 backdrop-blur-xl border-b border-white/[0.06]' : 'py-6'}`}
        style={scrolled ? { background: 'rgba(7,10,15,0.82)' } : {}}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5 no-underline">
            <Logo text={theme.logoText} subtext={theme.logoSubtext} imageUrl={theme.logoImageUrl} />
          </a>

          <div className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="font-medium text-[13px] tracking-[0.08em] uppercase text-ink-dim hover:text-ink transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="#contacto"
            className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-bg font-semibold text-[12px] tracking-[0.08em] uppercase bg-ink hover:bg-accent hover:text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            Hablemos de tu proyecto
          </a>

          <button onClick={() => setOpen(!open)} className="lg:hidden text-ink p-2 -mr-2" aria-label="Menú">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[64px] left-0 right-0 z-40 backdrop-blur-2xl border-b border-white/[0.06] px-6 py-6 flex flex-col gap-1 lg:hidden"
            style={{ background: 'rgba(7,10,15,0.97)' }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="font-medium tracking-wide text-ink py-3.5 border-b border-white/[0.06] text-base"
              >
                {l.label}
              </motion.a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="mt-5 text-center py-4 rounded-full text-bg font-semibold uppercase tracking-[0.08em] text-sm bg-accent"
            >
              Hablemos de tu proyecto
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
