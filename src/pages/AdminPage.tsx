import { useState, useEffect, useCallback, useRef } from 'react'
import { useContent } from '../context/ContentContext'
import { SiteContent, ServiceItem, TestimonialItem, StatItem } from '../content/types'
import { FONTS, THEME_PRESETS, defaultContent } from '../content/defaultContent'

const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'nmtech2024'

// ─── Shared input styles ────────────────────────────────────────────────────
const inp = 'w-full bg-[#0E1A30] border border-[#1B2A4A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F7931E] transition-colors'
const lbl = 'block text-[#8A95A8] text-xs uppercase tracking-widest font-medium mb-1.5'
const field = 'flex flex-col gap-0'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={field}>
      <label className={lbl}>{label}</label>
      {children}
    </div>
  )
}

// ─── Login ───────────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pass === ADMIN_PASS) { sessionStorage.setItem('nm_admin', '1'); onLogin() }
    else { setError(true); setTimeout(() => setError(false), 2000) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060D1A]">
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl" style={{ background: 'linear-gradient(135deg,#F7931E,#D97B0E)' }}>
            🔐
          </div>
          <h1 className="font-black text-2xl text-white uppercase tracking-tight">NMTECH Admin</h1>
          <p className="text-[#8A95A8] text-sm mt-1">Panel de administración</p>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Contraseña"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className={`${inp} text-center text-base py-3 ${error ? 'border-red-500' : ''}`}
            autoFocus
          />
          {error && <p className="text-red-400 text-xs text-center">Contraseña incorrecta</p>}
          <button type="submit" className="py-3 rounded-full text-white font-semibold uppercase tracking-widest text-sm transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg,#F7931E,#D97B0E)' }}>
            Ingresar →
          </button>
        </form>
        <p className="text-[#8A95A8] text-xs text-center mt-6">
          Por defecto: <span className="text-[#F7931E]">nmtech2024</span><br />
          Cambiable en <code className="text-white">.env</code> → <code className="text-white">VITE_ADMIN_PASSWORD</code>
        </p>
      </div>
    </div>
  )
}

// ─── Section tabs ────────────────────────────────────────────────────────────
type Tab = 'apariencia' | 'logo' | 'secciones' | 'hero' | 'nosotros' | 'servicios' | 'testimonios' | 'cta' | 'contacto' | 'footer'

const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: 'apariencia', icon: '🎨', label: 'Apariencia' },
  { id: 'logo', icon: '🖼️', label: 'Logo & Marca' },
  { id: 'secciones', icon: '👁️', label: 'Secciones' },
  { id: 'hero', icon: '🏠', label: 'Hero' },
  { id: 'nosotros', icon: '👥', label: 'Nosotros' },
  { id: 'servicios', icon: '⚡', label: 'Servicios' },
  { id: 'testimonios', icon: '⭐', label: 'Testimonios' },
  { id: 'cta', icon: '🎯', label: 'CTA' },
  { id: 'contacto', icon: '📞', label: 'Contacto' },
  { id: 'footer', icon: '🦶', label: 'Footer' },
]

// ─── Apariencia ──────────────────────────────────────────────────────────────
function AparienciaForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const t = local.theme
  const set = (patch: Partial<SiteContent['theme']>) => onChange({ ...local, theme: { ...t, ...patch } })

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Presets de tema</h3>
        <div className="flex flex-wrap gap-3">
          {THEME_PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => set(p.theme)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all hover:-translate-y-0.5"
              style={{
                background: p.theme.bgColor,
                borderColor: p.theme.accentColor + '60',
                color: p.theme.accentColor,
              }}
            >
              <span>{p.emoji}</span> {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Color de fondo">
          <div className="flex gap-2 items-center">
            <input type="color" value={t.bgColor} onChange={(e) => set({ bgColor: e.target.value })} className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent" />
            <input type="text" value={t.bgColor} onChange={(e) => set({ bgColor: e.target.value })} className={inp} />
          </div>
        </Field>

        <Field label="Color acento (naranja)">
          <div className="flex gap-2 items-center">
            <input type="color" value={t.accentColor} onChange={(e) => set({ accentColor: e.target.value })} className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent" />
            <input type="text" value={t.accentColor} onChange={(e) => set({ accentColor: e.target.value })} className={inp} />
          </div>
        </Field>

        <Field label="Color navy (secundario)">
          <div className="flex gap-2 items-center">
            <input type="color" value={t.navyColor} onChange={(e) => set({ navyColor: e.target.value })} className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent" />
            <input type="text" value={t.navyColor} onChange={(e) => set({ navyColor: e.target.value })} className={inp} />
          </div>
        </Field>

        <Field label="Fuente principal">
          <select value={t.fontFamily} onChange={(e) => set({ fontFamily: e.target.value })} className={inp}>
            {FONTS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </Field>

        <Field label="Heading gradiente — desde">
          <div className="flex gap-2 items-center">
            <input type="color" value={t.headingGradFrom} onChange={(e) => set({ headingGradFrom: e.target.value })} className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent" />
            <input type="text" value={t.headingGradFrom} onChange={(e) => set({ headingGradFrom: e.target.value })} className={inp} />
          </div>
        </Field>

        <Field label="Heading gradiente — hasta">
          <div className="flex gap-2 items-center">
            <input type="color" value={t.headingGradTo} onChange={(e) => set({ headingGradTo: e.target.value })} className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent" />
            <input type="text" value={t.headingGradTo} onChange={(e) => set({ headingGradTo: e.target.value })} className={inp} />
          </div>
        </Field>
      </div>

      <div className="p-4 rounded-xl border border-white/10 text-sm text-[#8A95A8]">
        <strong className="text-white">Vista previa del acento:</strong>
        <div className="mt-3 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full" style={{ background: t.accentColor }} />
          <div className="w-10 h-10 rounded-full border-2" style={{ borderColor: t.accentColor, background: 'transparent' }} />
          <span className="font-bold text-xl" style={{ color: t.accentColor }}>NMTECH</span>
          <button className="px-4 py-1.5 rounded-full text-white text-xs font-bold" style={{ background: t.accentColor }}>Botón</button>
        </div>
      </div>
    </div>
  )
}

// ─── Logo & Marca ─────────────────────────────────────────────────────────────
function LogoForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const t = local.theme
  const set = (patch: Partial<SiteContent['theme']>) => onChange({ ...local, theme: { ...t, ...patch } })

  return (
    <div className="flex flex-col gap-6">
      <Field label="URL de imagen de logo (dejar vacío para usar logo SVG)">
        <input type="url" value={t.logoImageUrl} onChange={(e) => set({ logoImageUrl: e.target.value })} className={inp} placeholder="https://tu-dominio.com/logo.png" />
      </Field>
      {t.logoImageUrl && (
        <div className="p-4 rounded-xl border border-white/10">
          <p className="text-[#8A95A8] text-xs mb-3 uppercase tracking-widest">Vista previa</p>
          <img src={t.logoImageUrl} alt="Logo preview" className="h-12 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
        </div>
      )}
      <div className="grid grid-cols-2 gap-5">
        <Field label="Texto principal del logo">
          <input type="text" value={t.logoText} onChange={(e) => set({ logoText: e.target.value })} className={inp} />
        </Field>
        <Field label="Subtexto del logo">
          <input type="text" value={t.logoSubtext} onChange={(e) => set({ logoSubtext: e.target.value })} className={inp} />
        </Field>
      </div>
      <div className="p-4 rounded-xl border border-white/10">
        <p className="text-[#8A95A8] text-xs mb-3 uppercase tracking-widest">Vista previa del logo texto</p>
        <div className="flex items-center gap-2">
          <span className="font-black text-2xl uppercase tracking-tight" style={{ color: t.accentColor }}>{t.logoText}</span>
          <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: t.accentColor, opacity: 0.5 }}>{t.logoSubtext}</span>
        </div>
      </div>
    </div>
  )
}

// ─── Secciones ────────────────────────────────────────────────────────────────
const SECTION_LABELS: Record<keyof SiteContent['sections'], string> = {
  hero: 'Hero — Sección principal',
  marquee: 'Marquee — Galería de proyectos',
  about: 'Nosotros — Quiénes somos',
  services: 'Servicios — Lista de servicios',
  projects: 'Proyectos — Portfolio',
  testimonials: 'Testimonios — Clientes',
  cta: 'CTA — Llamada a la acción',
}

function SectionesForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const toggle = (key: keyof SiteContent['sections']) => {
    onChange({ ...local, sections: { ...local.sections, [key]: !local.sections[key] } })
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[#8A95A8] text-sm mb-2">Activá o desactivá cada bloque de la landing page.</p>
      {(Object.keys(local.sections) as (keyof SiteContent['sections'])[]).map((key) => (
        <div key={key} className="flex items-center justify-between p-4 rounded-xl border border-white/8 hover:border-[#F7931E]/30 transition-colors">
          <span className="text-white font-medium text-sm">{SECTION_LABELS[key]}</span>
          <button
            onClick={() => toggle(key)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${local.sections[key] ? 'bg-[#F7931E]' : 'bg-[#1B2A4A]'}`}
          >
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${local.sections[key] ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
      ))}
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const h = local.hero
  const set = (patch: Partial<SiteContent['hero']>) => onChange({ ...local, hero: { ...h, ...patch } })
  const setStat = (i: number, patch: Partial<StatItem>) => {
    const stats = h.stats.map((s, j) => j === i ? { ...s, ...patch } : s)
    set({ stats })
  }
  const addStat = () => set({ stats: [...h.stats, { value: 100, suffix: '+', label: 'Nueva métrica' }] })
  const removeStat = (i: number) => set({ stats: h.stats.filter((_, j) => j !== i) })

  return (
    <div className="flex flex-col gap-5">
      <Field label="Texto eyebrow"><input type="text" value={h.eyebrow} onChange={(e) => set({ eyebrow: e.target.value })} className={inp} /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Título — Línea 1"><input type="text" value={h.titleLine1} onChange={(e) => set({ titleLine1: e.target.value })} className={inp} /></Field>
        <Field label="Título — Línea 2"><input type="text" value={h.titleLine2} onChange={(e) => set({ titleLine2: e.target.value })} className={inp} /></Field>
      </div>
      <Field label="Texto resaltado (naranja)"><input type="text" value={h.titleHighlight} onChange={(e) => set({ titleHighlight: e.target.value })} className={inp} /></Field>
      <Field label="Descripción"><textarea value={h.description} onChange={(e) => set({ description: e.target.value })} className={`${inp} resize-y min-h-[80px]`} /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Botón principal"><input type="text" value={h.cta1Label} onChange={(e) => set({ cta1Label: e.target.value })} className={inp} /></Field>
        <Field label="Botón secundario"><input type="text" value={h.cta2Label} onChange={(e) => set({ cta2Label: e.target.value })} className={inp} /></Field>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <span className={lbl} style={{ marginBottom: 0 }}>Estadísticas</span>
          <button onClick={addStat} className="text-xs px-3 py-1.5 rounded-lg font-medium hover:opacity-80 transition-opacity" style={{ background: 'var(--accent-01)', color: 'var(--accent)', border: '1px solid var(--accent-03)' }}>+ Agregar</button>
        </div>
        <div className="flex flex-col gap-3">
          {h.stats.map((s, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-white/8">
              <input type="number" value={s.value} onChange={(e) => setStat(i, { value: +e.target.value })} className={`${inp} w-20`} />
              <input type="text" value={s.suffix} onChange={(e) => setStat(i, { suffix: e.target.value })} className={`${inp} w-14`} placeholder="+" />
              <input type="text" value={s.label} onChange={(e) => setStat(i, { label: e.target.value })} className={inp} />
              <button onClick={() => removeStat(i)} className="text-red-400 hover:text-red-300 text-lg leading-none shrink-0">×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Nosotros ─────────────────────────────────────────────────────────────────
function NosotrosForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const a = local.about
  const set = (patch: Partial<SiteContent['about']>) => onChange({ ...local, about: { ...a, ...patch } })
  return (
    <div className="flex flex-col gap-5">
      <Field label="Heading"><input type="text" value={a.heading} onChange={(e) => set({ heading: e.target.value })} className={inp} /></Field>
      <Field label="Texto principal"><textarea value={a.text} onChange={(e) => set({ text: e.target.value })} className={`${inp} resize-y min-h-[140px]`} /></Field>
      <Field label="Texto del botón CTA"><input type="text" value={a.ctaLabel} onChange={(e) => set({ ctaLabel: e.target.value })} className={inp} /></Field>
    </div>
  )
}

// ─── Servicios ────────────────────────────────────────────────────────────────
function ServiciosForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const [open, setOpen] = useState<number | null>(0)
  const set = (i: number, patch: Partial<ServiceItem>) => {
    onChange({ ...local, services: local.services.map((s, j) => j === i ? { ...s, ...patch } : s) })
  }
  const add = () => onChange({ ...local, services: [...local.services, { num: String(local.services.length + 1).padStart(2, '0'), name: 'Nuevo servicio', desc: 'Descripción del servicio', icon: '✨' }] })
  const remove = (i: number) => onChange({ ...local, services: local.services.filter((_, j) => j !== i) })

  return (
    <div className="flex flex-col gap-3">
      {local.services.map((s, i) => (
        <div key={i} className="rounded-xl border border-white/8 overflow-hidden">
          <button className="w-full flex items-center justify-between p-4 text-left hover:bg-white/4 transition-colors" onClick={() => setOpen(open === i ? null : i)}>
            <div className="flex items-center gap-3">
              <span className="text-xl">{s.icon}</span>
              <span className="text-white font-medium">{s.num} — {s.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={(e) => { e.stopPropagation(); remove(i) }} className="text-red-400 hover:text-red-300 text-sm px-2">Eliminar</button>
              <span className="text-[#8A95A8]">{open === i ? '▲' : '▼'}</span>
            </div>
          </button>
          {open === i && (
            <div className="p-4 pt-0 flex flex-col gap-4 border-t border-white/5">
              <div className="grid grid-cols-3 gap-3">
                <Field label="Número"><input type="text" value={s.num} onChange={(e) => set(i, { num: e.target.value })} className={inp} /></Field>
                <Field label="Emoji/Icono"><input type="text" value={s.icon} onChange={(e) => set(i, { icon: e.target.value })} className={inp} /></Field>
                <Field label="Nombre"><input type="text" value={s.name} onChange={(e) => set(i, { name: e.target.value })} className={`${inp}`} /></Field>
              </div>
              <Field label="Descripción"><textarea value={s.desc} onChange={(e) => set(i, { desc: e.target.value })} className={`${inp} resize-y min-h-[80px]`} /></Field>
            </div>
          )}
        </div>
      ))}
      <button onClick={add} className="p-3 rounded-xl border border-dashed border-white/20 text-[#8A95A8] text-sm hover:border-[#F7931E]/40 hover:text-white transition-colors">
        + Agregar servicio
      </button>
    </div>
  )
}

// ─── Testimonios ──────────────────────────────────────────────────────────────
function TestimoniosForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const [open, setOpen] = useState<number | null>(0)
  const set = (i: number, patch: Partial<TestimonialItem>) => {
    onChange({ ...local, testimonials: local.testimonials.map((t, j) => j === i ? { ...t, ...patch } : t) })
  }
  const add = () => onChange({ ...local, testimonials: [...local.testimonials, { initials: 'XX', name: 'Nombre Apellido', role: 'Rol, País', text: 'Testimonio del cliente...' }] })
  const remove = (i: number) => onChange({ ...local, testimonials: local.testimonials.filter((_, j) => j !== i) })

  return (
    <div className="flex flex-col gap-3">
      {local.testimonials.map((t, i) => (
        <div key={i} className="rounded-xl border border-white/8 overflow-hidden">
          <button className="w-full flex items-center justify-between p-4 text-left hover:bg-white/4 transition-colors" onClick={() => setOpen(open === i ? null : i)}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ background: 'linear-gradient(135deg,var(--accent),var(--navy))' }}>{t.initials}</div>
              <span className="text-white font-medium">{t.name}</span>
              <span className="text-[#8A95A8] text-sm">{t.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={(e) => { e.stopPropagation(); remove(i) }} className="text-red-400 hover:text-red-300 text-sm px-2">Eliminar</button>
              <span className="text-[#8A95A8]">{open === i ? '▲' : '▼'}</span>
            </div>
          </button>
          {open === i && (
            <div className="p-4 pt-0 flex flex-col gap-4 border-t border-white/5">
              <div className="grid grid-cols-3 gap-3">
                <Field label="Iniciales"><input type="text" value={t.initials} onChange={(e) => set(i, { initials: e.target.value })} className={inp} maxLength={3} /></Field>
                <Field label="Nombre"><input type="text" value={t.name} onChange={(e) => set(i, { name: e.target.value })} className={inp} /></Field>
                <Field label="Rol / País"><input type="text" value={t.role} onChange={(e) => set(i, { role: e.target.value })} className={inp} /></Field>
              </div>
              <Field label="Testimonio"><textarea value={t.text} onChange={(e) => set(i, { text: e.target.value })} className={`${inp} resize-y min-h-[80px]`} /></Field>
            </div>
          )}
        </div>
      ))}
      <button onClick={add} className="p-3 rounded-xl border border-dashed border-white/20 text-[#8A95A8] text-sm hover:border-[#F7931E]/40 hover:text-white transition-colors">
        + Agregar testimonio
      </button>
    </div>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTAForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const c = local.cta
  const set = (patch: Partial<SiteContent['cta']>) => onChange({ ...local, cta: { ...c, ...patch } })
  return (
    <div className="flex flex-col gap-5">
      <Field label="Tag (etiqueta pequeña)"><input type="text" value={c.tag} onChange={(e) => set({ tag: e.target.value })} className={inp} /></Field>
      <Field label="Título línea 1"><input type="text" value={c.titleLine1} onChange={(e) => set({ titleLine1: e.target.value })} className={inp} /></Field>
      <Field label="Título resaltado (naranja)"><input type="text" value={c.titleHighlight} onChange={(e) => set({ titleHighlight: e.target.value })} className={inp} /></Field>
      <Field label="Descripción"><textarea value={c.description} onChange={(e) => set({ description: e.target.value })} className={`${inp} resize-y min-h-[80px]`} /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Botón 1 (WhatsApp)"><input type="text" value={c.cta1Label} onChange={(e) => set({ cta1Label: e.target.value })} className={inp} /></Field>
        <Field label="Botón 2 (Tienda)"><input type="text" value={c.cta2Label} onChange={(e) => set({ cta2Label: e.target.value })} className={inp} /></Field>
      </div>
    </div>
  )
}

// ─── Contacto ─────────────────────────────────────────────────────────────────
function ContactoForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const c = local.contact
  const set = (patch: Partial<SiteContent['contact']>) => onChange({ ...local, contact: { ...c, ...patch } })
  return (
    <div className="flex flex-col gap-5">
      <Field label="WhatsApp (con código de país, ej: +543865468239)"><input type="text" value={c.whatsapp} onChange={(e) => set({ whatsapp: e.target.value })} className={inp} /></Field>
      <Field label="Email"><input type="email" value={c.email} onChange={(e) => set({ email: e.target.value })} className={inp} /></Field>
      <Field label="URL Tienda de productos"><input type="url" value={c.storeUrl} onChange={(e) => set({ storeUrl: e.target.value })} className={inp} /></Field>
      <Field label="Usuario de Instagram (sin @)"><input type="text" value={c.instagramUser} onChange={(e) => set({ instagramUser: e.target.value })} className={inp} /></Field>
      <Field label="Usuario de TikTok (sin @)"><input type="text" value={c.tiktokUser} onChange={(e) => set({ tiktokUser: e.target.value })} className={inp} /></Field>
      <div className="p-4 rounded-xl border border-white/10 text-sm">
        <p className="text-[#8A95A8] text-xs uppercase tracking-widest mb-3">Links generados</p>
        <div className="flex flex-col gap-2">
          <a href={`https://wa.me/${c.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="text-[#F7931E] hover:underline text-xs break-all">WhatsApp: https://wa.me/{c.whatsapp.replace(/\D/g,'')}</a>
          <a href={`https://www.instagram.com/${c.instagramUser}`} target="_blank" rel="noopener noreferrer" className="text-[#F7931E] hover:underline text-xs break-all">Instagram: @{c.instagramUser}</a>
          <a href={`https://www.tiktok.com/@${c.tiktokUser}`} target="_blank" rel="noopener noreferrer" className="text-[#F7931E] hover:underline text-xs break-all">TikTok: @{c.tiktokUser}</a>
        </div>
      </div>
    </div>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function FooterForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const f = local.footer
  const set = (patch: Partial<SiteContent['footer']>) => onChange({ ...local, footer: { ...f, ...patch } })
  return (
    <div className="flex flex-col gap-5">
      <Field label="Descripción del footer"><textarea value={f.description} onChange={(e) => set({ description: e.target.value })} className={`${inp} resize-y min-h-[100px]`} /></Field>
    </div>
  )
}

// ─── Export helper ────────────────────────────────────────────────────────────
function exportJSON(content: SiteContent) {
  const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'nmtech-content.json'; a.click()
  URL.revokeObjectURL(url)
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(sessionStorage.getItem('nm_admin') === '1')
  const [tab, setTab] = useState<Tab>('apariencia')
  const { content, updateContent, resetContent } = useContent()
  const [local, setLocal] = useState<SiteContent>(content)
  const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'saving'>('saved')

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const localRef = useRef<SiteContent>(local)
  const updateRef = useRef(updateContent)
  const hasPending = useRef(false)

  // Keep refs current without causing handleChange recreation
  useEffect(() => { updateRef.current = updateContent }, [updateContent])

  // When content changes from outside (remote fetch / reset) and we have no pending edits, sync local
  useEffect(() => {
    if (!hasPending.current) {
      setLocal(content)
      localRef.current = content
    }
  }, [content])

  // Flush any pending debounced save before unmount so no edits are lost
  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
      if (hasPending.current) updateRef.current(localRef.current)
    }
  }, [])

  // Stable callback — uses refs so it never needs to be recreated
  const handleChange = useCallback((newContent: SiteContent) => {
    localRef.current = newContent
    hasPending.current = true
    setLocal(newContent)
    setSaveStatus('unsaved')
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      updateRef.current(newContent)
      hasPending.current = false
      setSaveStatus('saved')
    }, 700)
  }, [])

  const handleReset = () => {
    if (!confirm('¿Resetear todo el contenido a los valores por defecto? Esta acción no se puede deshacer.')) return
    if (saveTimer.current) clearTimeout(saveTimer.current)
    hasPending.current = false
    resetContent()
    setLocal(defaultContent)
    localRef.current = defaultContent
    setSaveStatus('saved')
  }

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />

  const FORM: Record<Tab, React.ReactNode> = {
    apariencia: <AparienciaForm local={local} onChange={handleChange} />,
    logo: <LogoForm local={local} onChange={handleChange} />,
    secciones: <SectionesForm local={local} onChange={handleChange} />,
    hero: <HeroForm local={local} onChange={handleChange} />,
    nosotros: <NosotrosForm local={local} onChange={handleChange} />,
    servicios: <ServiciosForm local={local} onChange={handleChange} />,
    testimonios: <TestimoniosForm local={local} onChange={handleChange} />,
    cta: <CTAForm local={local} onChange={handleChange} />,
    contacto: <ContactoForm local={local} onChange={handleChange} />,
    footer: <FooterForm local={local} onChange={handleChange} />,
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#030810] text-white" style={{ fontFamily: 'Kanit,sans-serif' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/8 shrink-0" style={{ background: '#060D1A' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black" style={{ background: 'linear-gradient(135deg,#F7931E,#D97B0E)' }}>N</div>
          <span className="font-black text-sm uppercase tracking-widest">NMTECH <span className="text-[#F7931E]">Admin</span></span>
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${saveStatus === 'saved' ? 'text-green-400 bg-green-400/10' : saveStatus === 'saving' ? 'text-yellow-400 bg-yellow-400/10' : 'text-orange-400 bg-orange-400/10'}`}>
            {saveStatus === 'saved' ? '✓ Guardado' : saveStatus === 'saving' ? '⟳ Guardando...' : '● Sin guardar'}
          </span>
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-xs px-4 py-2 rounded-full border border-white/20 text-[#D7E2EA] hover:bg-white/5 transition-colors">
            Ver sitio →
          </a>
          <button onClick={() => { sessionStorage.removeItem('nm_admin'); setAuthed(false) }} className="text-xs px-4 py-2 rounded-full border border-white/10 text-[#8A95A8] hover:text-white hover:border-white/30 transition-colors">
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 border-r border-white/8 flex flex-col overflow-y-auto" style={{ background: '#060D1A' }}>
          <nav className="flex flex-col gap-1 p-3 flex-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${tab === t.id ? 'text-white' : 'text-[#8A95A8] hover:text-white hover:bg-white/4'}`}
                style={tab === t.id ? { background: 'var(--accent-01)', color: 'var(--accent)' } : {}}
              >
                <span className="text-base">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </nav>

          <div className="p-3 flex flex-col gap-2 border-t border-white/8">
            <button onClick={() => exportJSON(local)} className="w-full text-xs py-2.5 px-3 rounded-xl border border-white/15 text-[#8A95A8] hover:text-white hover:border-white/30 transition-colors text-left">
              📥 Exportar JSON
            </button>
            <button onClick={handleReset} className="w-full text-xs py-2.5 px-3 rounded-xl border border-red-900/40 text-red-400 hover:text-red-300 hover:border-red-500/40 transition-colors text-left">
              🗑️ Resetear todo
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{TABS.find((t) => t.id === tab)?.icon}</span>
              <h2 className="font-black text-xl uppercase tracking-tight">{TABS.find((t) => t.id === tab)?.label}</h2>
            </div>
            {FORM[tab]}
          </div>
        </main>
      </div>
    </div>
  )
}
