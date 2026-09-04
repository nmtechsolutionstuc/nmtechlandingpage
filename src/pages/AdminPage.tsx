import { useState, useEffect, useCallback, useRef, ReactNode } from 'react'
import { useContent } from '../context/ContentContext'
import { SiteContent, ServiceItem, TestimonialItem, StatItem, ProjectItem, IndustryItem, ProcessStep, DifferentiatorItem, PricingTier } from '../content/types'
import { defaultContent } from '../content/defaultContent'
import { ICON_KEYS } from '../components/ui/Icon'
import Icon from '../components/ui/Icon'

const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'nmtech2024'

// ─── Shared input styles ────────────────────────────────────────────────────
const inp = 'w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent transition-colors'
const lbl = 'block text-ink-dim text-xs uppercase tracking-widest font-medium mb-1.5'
const field = 'flex flex-col gap-0'

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={field}>
      <label className={lbl}>{label}</label>
      {children}
    </div>
  )
}

function IconSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--accent-02)' }}>
        <Icon name={value} size={16} className="text-accent" />
      </span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inp}>
        {ICON_KEYS.map((k) => <option key={k} value={k}>{k}</option>)}
      </select>
    </div>
  )
}

// List of strings edited as one item per line — commits on blur to avoid re-render flicker mid-typing.
function TextareaList({ label, value, onChange, placeholder }: { label: string; value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [raw, setRaw] = useState(value.join('\n'))
  useEffect(() => { setRaw(value.join('\n')) }, [value])
  return (
    <Field label={label}>
      <textarea
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        onBlur={() => onChange(raw.split('\n').map((s) => s.trim()).filter(Boolean))}
        className={`${inp} resize-y min-h-[100px]`}
        placeholder={placeholder || 'Un ítem por línea'}
      />
    </Field>
  )
}

// ─── Generic repeater ───────────────────────────────────────────────────────
function Repeater<T>({
  items, onChange, newItem, title, children,
}: {
  items: T[]
  onChange: (items: T[]) => void
  newItem: () => T
  title: (item: T, i: number) => ReactNode
  children: (item: T, set: (patch: Partial<T>) => void, i: number) => ReactNode
}) {
  const [open, setOpen] = useState<number | null>(0)
  const set = (i: number, patch: Partial<T>) => onChange(items.map((it, j) => (j === i ? { ...it, ...patch } : it)))
  const add = () => { onChange([...items, newItem()]); setOpen(items.length) }
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i))

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-white/8 overflow-hidden">
          <button type="button" className="w-full flex items-center justify-between p-4 text-left hover:bg-white/4 transition-colors" onClick={() => setOpen(open === i ? null : i)}>
            <span className="text-white font-medium text-sm truncate pr-3">{title(item, i)}</span>
            <div className="flex items-center gap-2 shrink-0">
              <button type="button" onClick={(e) => { e.stopPropagation(); remove(i) }} className="text-red-400 hover:text-red-300 text-sm px-2">Eliminar</button>
              <span className="text-ink-dim">{open === i ? '▲' : '▼'}</span>
            </div>
          </button>
          {open === i && <div className="p-4 pt-0 flex flex-col gap-4 border-t border-white/5">{children(item, (patch) => set(i, patch), i)}</div>}
        </div>
      ))}
      <button type="button" onClick={add} className="p-3 rounded-xl border border-dashed border-white/20 text-ink-dim text-sm hover:border-accent/40 hover:text-white transition-colors">
        + Agregar
      </button>
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
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl" style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent-d))' }}>
            🔐
          </div>
          <h1 className="font-display font-black text-2xl text-white uppercase tracking-tight">NMTECH Admin</h1>
          <p className="text-ink-dim text-sm mt-1">Panel de administración</p>
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
          <button type="submit" className="py-3 rounded-full text-white font-semibold uppercase tracking-widest text-sm transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent-d))' }}>
            Ingresar →
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Section tabs ────────────────────────────────────────────────────────────
type Tab =
  | 'logo' | 'secciones' | 'hero' | 'marquee' | 'problem' | 'servicios' | 'proyectos'
  | 'industry' | 'process' | 'differentiators' | 'beforeAfter' | 'pricing'
  | 'testimonios' | 'contacto' | 'nosotros' | 'cta' | 'footer'

const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: 'logo', icon: '🖼️', label: 'Logo & Marca' },
  { id: 'secciones', icon: '👁️', label: 'Secciones' },
  { id: 'hero', icon: '🏠', label: 'Hero' },
  { id: 'marquee', icon: '🔠', label: 'Frase destacada' },
  { id: 'problem', icon: '⚠️', label: 'El problema' },
  { id: 'servicios', icon: '⚡', label: 'Servicios' },
  { id: 'proyectos', icon: '💼', label: 'Proyectos' },
  { id: 'industry', icon: '🏪', label: 'Rubros' },
  { id: 'process', icon: '🧭', label: 'Proceso' },
  { id: 'differentiators', icon: '✅', label: 'Diferenciales' },
  { id: 'beforeAfter', icon: '🔁', label: 'Antes / Después' },
  { id: 'pricing', icon: '💳', label: 'Precios' },
  { id: 'testimonios', icon: '⭐', label: 'Testimonios' },
  { id: 'contacto', icon: '📞', label: 'Contacto' },
  { id: 'nosotros', icon: '👥', label: 'Sobre NMTECH' },
  { id: 'cta', icon: '🎯', label: 'CTA final' },
  { id: 'footer', icon: '🦶', label: 'Footer' },
]

// ─── Logo & Marca ─────────────────────────────────────────────────────────────
function LogoForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const t = local.theme
  const set = (patch: Partial<SiteContent['theme']>) => onChange({ ...local, theme: { ...t, ...patch } })

  return (
    <div className="flex flex-col gap-6">
      <p className="text-ink-dim text-sm">La paleta de color y la tipografía del sitio son fijas (marca NMTECH) para mantener una identidad visual consistente. Acá podés editar el logo.</p>
      <Field label="URL de imagen de logo (dejar vacío para usar el logo de texto)">
        <input type="url" value={t.logoImageUrl} onChange={(e) => set({ logoImageUrl: e.target.value })} className={inp} placeholder="https://tu-dominio.com/logo.png" />
      </Field>
      {t.logoImageUrl && (
        <div className="p-4 rounded-xl border border-white/10">
          <p className="text-ink-dim text-xs mb-3 uppercase tracking-widest">Vista previa</p>
          <img src={t.logoImageUrl} alt="Logo preview" className="h-12 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
        </div>
      )}
      <div className="grid grid-cols-2 gap-5">
        <Field label="Texto principal del logo"><input type="text" value={t.logoText} onChange={(e) => set({ logoText: e.target.value })} className={inp} /></Field>
        <Field label="Subtexto del logo"><input type="text" value={t.logoSubtext} onChange={(e) => set({ logoSubtext: e.target.value })} className={inp} /></Field>
      </div>
    </div>
  )
}

// ─── Secciones ────────────────────────────────────────────────────────────────
const SECTION_LABELS: Record<keyof SiteContent['sections'], string> = {
  hero: 'Hero — Portada principal',
  marquee: 'Frase destacada (tira de palabras)',
  problem: 'El problema — Tu web habla antes que vos',
  services: 'Servicios',
  projects: 'Proyectos — Portfolio',
  industry: 'Imaginá tu negocio — Rubros',
  process: 'Proceso — Cómo trabajamos',
  differentiators: 'Diferenciales',
  beforeAfter: 'Antes / Después',
  pricing: 'Precios',
  testimonials: 'Testimonios',
  contact: 'Contacto — Formulario',
  about: 'Sobre NMTECH',
  ctaFinal: 'CTA final',
}

function SectionesForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const toggle = (key: keyof SiteContent['sections']) => {
    onChange({ ...local, sections: { ...local.sections, [key]: !local.sections[key] } })
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-ink-dim text-sm mb-2">Activá o desactivá cada bloque de la página.</p>
      {(Object.keys(local.sections) as (keyof SiteContent['sections'])[]).map((key) => (
        <div key={key} className="flex items-center justify-between p-4 rounded-xl border border-white/8 hover:border-accent/30 transition-colors">
          <span className="text-white font-medium text-sm">{SECTION_LABELS[key]}</span>
          <button
            onClick={() => toggle(key)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${local.sections[key] ? 'bg-accent' : 'bg-white/10'}`}
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
  const setStat = (i: number, patch: Partial<StatItem>) => set({ stats: h.stats.map((s, j) => (j === i ? { ...s, ...patch } : s)) })
  const addStat = () => set({ stats: [...h.stats, { value: 100, suffix: '+', label: 'Nueva métrica' }] })
  const removeStat = (i: number) => set({ stats: h.stats.filter((_, j) => j !== i) })

  return (
    <div className="flex flex-col gap-5">
      <Field label="Texto eyebrow (arriba del título)"><input type="text" value={h.eyebrow} onChange={(e) => set({ eyebrow: e.target.value })} className={inp} /></Field>
      <Field label="Título — línea 1"><input type="text" value={h.titleLine1} onChange={(e) => set({ titleLine1: e.target.value })} className={inp} /></Field>
      <Field label="Título — línea destacada (color acento)"><input type="text" value={h.titleHighlight} onChange={(e) => set({ titleHighlight: e.target.value })} className={inp} /></Field>
      <Field label="Descripción"><textarea value={h.description} onChange={(e) => set({ description: e.target.value })} className={`${inp} resize-y min-h-[80px]`} /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Botón principal"><input type="text" value={h.cta1Label} onChange={(e) => set({ cta1Label: e.target.value })} className={inp} /></Field>
        <Field label="Botón secundario"><input type="text" value={h.cta2Label} onChange={(e) => set({ cta2Label: e.target.value })} className={inp} /></Field>
      </div>
      <TextareaList label="Indicadores de confianza (uno por línea)" value={h.trustBadges} onChange={(v) => set({ trustBadges: v })} />

      <div>
        <div className="flex items-center justify-between mb-3">
          <span className={lbl} style={{ marginBottom: 0 }}>Estadísticas (opcional, dejar vacío si no tenés métricas reales)</span>
          <button onClick={addStat} className="text-xs px-3 py-1.5 rounded-lg font-medium hover:opacity-80 transition-opacity text-accent" style={{ background: 'var(--accent-01)', border: '1px solid var(--accent-03)' }}>+ Agregar</button>
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

// ─── Marquee ──────────────────────────────────────────────────────────────────
function MarqueeForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  return <TextareaList label="Palabras de la tira (una por línea)" value={local.marquee.keywords} onChange={(v) => onChange({ ...local, marquee: { keywords: v } })} />
}

// ─── Problema ─────────────────────────────────────────────────────────────────
function ProblemForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const p = local.problem
  const set = (patch: Partial<SiteContent['problem']>) => onChange({ ...local, problem: { ...p, ...patch } })
  return (
    <div className="flex flex-col gap-5">
      <Field label="Eyebrow"><input type="text" value={p.eyebrow} onChange={(e) => set({ eyebrow: e.target.value })} className={inp} /></Field>
      <Field label="Título"><input type="text" value={p.headline} onChange={(e) => set({ headline: e.target.value })} className={inp} /></Field>
      <Field label="Texto"><textarea value={p.text} onChange={(e) => set({ text: e.target.value })} className={`${inp} resize-y min-h-[90px]`} /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-5">
          <Field label="Etiqueta columna izquierda"><input type="text" value={p.badLabel} onChange={(e) => set({ badLabel: e.target.value })} className={inp} /></Field>
          <TextareaList label="Ítems (uno por línea)" value={p.badItems} onChange={(v) => set({ badItems: v })} />
        </div>
        <div className="flex flex-col gap-5">
          <Field label="Etiqueta columna derecha"><input type="text" value={p.goodLabel} onChange={(e) => set({ goodLabel: e.target.value })} className={inp} /></Field>
          <TextareaList label="Ítems (uno por línea)" value={p.goodItems} onChange={(v) => set({ goodItems: v })} />
        </div>
      </div>
    </div>
  )
}

// ─── Servicios ────────────────────────────────────────────────────────────────
function ServiciosForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  return (
    <Repeater<ServiceItem>
      items={local.services}
      onChange={(services) => onChange({ ...local, services })}
      newItem={() => ({ num: String(local.services.length + 1).padStart(2, '0'), name: 'Nuevo servicio', desc: 'Descripción del servicio', icon: 'custom' })}
      title={(s) => `${s.num} — ${s.name}`}
    >
      {(s, set) => (
        <>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Número"><input type="text" value={s.num} onChange={(e) => set({ num: e.target.value })} className={inp} /></Field>
            <Field label="Nombre"><input type="text" value={s.name} onChange={(e) => set({ name: e.target.value })} className={inp} /></Field>
          </div>
          <Field label="Ícono"><IconSelect value={s.icon} onChange={(icon) => set({ icon })} /></Field>
          <Field label="Descripción"><textarea value={s.desc} onChange={(e) => set({ desc: e.target.value })} className={`${inp} resize-y min-h-[80px]`} /></Field>
        </>
      )}
    </Repeater>
  )
}

// ─── Proyectos ────────────────────────────────────────────────────────────────
function ProyectosForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const featuredCount = local.projects.filter((p) => p.featured).length
  return (
    <div className="flex flex-col gap-4">
      <p className="text-ink-dim text-sm">Cargá acá tus proyectos reales (los que ya tenés publicados). La imagen puede ser una URL o una ruta dentro de /public/projects.</p>
      <p className="text-ink-dim text-sm">
        Marcá <strong className="text-ink">"Destacado"</strong> en los que quieras mostrar en la pila de la portada (máximo 4 — hoy tenés <strong className={featuredCount > 4 ? 'text-red-400' : 'text-accent'}>{featuredCount}</strong>). El resto igual aparece en "Ver todos los proyectos".
      </p>
      <Repeater<ProjectItem>
        items={local.projects}
        onChange={(projects) => onChange({ ...local, projects })}
        newItem={() => ({ category: 'Rubro / Servicio', name: 'Nombre del proyecto', image: '', url: '', caption: '', featured: false })}
        title={(p) => `${p.featured ? '★ ' : ''}${p.name || 'Nuevo proyecto'}`}
      >
        {(p, set) => (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nombre"><input type="text" value={p.name} onChange={(e) => set({ name: e.target.value })} className={inp} /></Field>
              <Field label="Categoría / Rubro"><input type="text" value={p.category} onChange={(e) => set({ category: e.target.value })} className={inp} /></Field>
            </div>
            <Field label="Imagen (URL o /projects/archivo.jpg)"><input type="text" value={p.image} onChange={(e) => set({ image: e.target.value })} className={inp} placeholder="/projects/mi-proyecto.jpg" /></Field>
            <Field label="Link del sitio publicado"><input type="url" value={p.url} onChange={(e) => set({ url: e.target.value })} className={inp} placeholder="https://..." /></Field>
            <Field label="Descripción corta"><textarea value={p.caption} onChange={(e) => set({ caption: e.target.value })} className={`${inp} resize-y min-h-[70px]`} /></Field>
            <label className="flex items-center gap-2 text-sm text-ink-dim">
              <input type="checkbox" checked={p.featured} onChange={(e) => set({ featured: e.target.checked })} />
              Destacado en la portada
            </label>
            {p.image && (
              <div className="rounded-xl overflow-hidden border border-white/10">
                <img src={p.image} alt="" className="w-full h-32 object-cover object-top" onError={(e) => { e.currentTarget.style.display = 'none' }} />
              </div>
            )}
          </>
        )}
      </Repeater>
    </div>
  )
}

// ─── Rubros (Industry) ─────────────────────────────────────────────────────────
function IndustryForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const d = local.industry
  const set = (patch: Partial<SiteContent['industry']>) => onChange({ ...local, industry: { ...d, ...patch } })
  return (
    <div className="flex flex-col gap-5">
      <Field label="Eyebrow"><input type="text" value={d.eyebrow} onChange={(e) => set({ eyebrow: e.target.value })} className={inp} /></Field>
      <Field label="Título"><input type="text" value={d.headline} onChange={(e) => set({ headline: e.target.value })} className={inp} /></Field>
      <Field label="Texto"><textarea value={d.text} onChange={(e) => set({ text: e.target.value })} className={`${inp} resize-y min-h-[70px]`} /></Field>
      <Field label="Texto del botón final"><input type="text" value={d.ctaLabel} onChange={(e) => set({ ctaLabel: e.target.value })} className={inp} /></Field>
      <Repeater<IndustryItem>
        items={d.items}
        onChange={(items) => set({ items })}
        newItem={() => ({ icon: 'custom', label: 'Nuevo rubro' })}
        title={(i) => i.label}
      >
        {(item, setItem) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Rubro"><input type="text" value={item.label} onChange={(e) => setItem({ label: e.target.value })} className={inp} /></Field>
            <Field label="Ícono"><IconSelect value={item.icon} onChange={(icon) => setItem({ icon })} /></Field>
          </div>
        )}
      </Repeater>
    </div>
  )
}

// ─── Proceso ──────────────────────────────────────────────────────────────────
function ProcessForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  return (
    <Repeater<ProcessStep>
      items={local.process}
      onChange={(process) => onChange({ ...local, process })}
      newItem={() => ({ num: String(local.process.length + 1).padStart(2, '0'), title: 'Nuevo paso', desc: 'Descripción del paso' })}
      title={(s) => `${s.num} — ${s.title}`}
    >
      {(s, set) => (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-3">
            <Field label="N°"><input type="text" value={s.num} onChange={(e) => set({ num: e.target.value })} className={inp} /></Field>
            <Field label="Título"><input type="text" value={s.title} onChange={(e) => set({ title: e.target.value })} className={inp} /></Field>
          </div>
          <Field label="Descripción"><textarea value={s.desc} onChange={(e) => set({ desc: e.target.value })} className={`${inp} resize-y min-h-[70px]`} /></Field>
        </>
      )}
    </Repeater>
  )
}

// ─── Diferenciales ─────────────────────────────────────────────────────────────
function DifferentiatorsForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const d = local.differentiators
  const set = (patch: Partial<SiteContent['differentiators']>) => onChange({ ...local, differentiators: { ...d, ...patch } })
  return (
    <div className="flex flex-col gap-5">
      <Field label="Título"><input type="text" value={d.headline} onChange={(e) => set({ headline: e.target.value })} className={inp} /></Field>
      <Field label="Texto"><textarea value={d.text} onChange={(e) => set({ text: e.target.value })} className={`${inp} resize-y min-h-[70px]`} /></Field>
      <Repeater<DifferentiatorItem>
        items={d.items}
        onChange={(items) => set({ items })}
        newItem={() => ({ icon: 'custom', title: 'Nuevo diferencial', desc: 'Descripción' })}
        title={(i) => i.title}
      >
        {(item, setItem) => (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Título"><input type="text" value={item.title} onChange={(e) => setItem({ title: e.target.value })} className={inp} /></Field>
              <Field label="Ícono"><IconSelect value={item.icon} onChange={(icon) => setItem({ icon })} /></Field>
            </div>
            <Field label="Descripción"><textarea value={item.desc} onChange={(e) => setItem({ desc: e.target.value })} className={`${inp} resize-y min-h-[60px]`} /></Field>
          </>
        )}
      </Repeater>
    </div>
  )
}

// ─── Antes / Después ────────────────────────────────────────────────────────────
function BeforeAfterForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const b = local.beforeAfter
  const set = (patch: Partial<SiteContent['beforeAfter']>) => onChange({ ...local, beforeAfter: { ...b, ...patch } })
  return (
    <div className="flex flex-col gap-5">
      <Field label="Eyebrow"><input type="text" value={b.eyebrow} onChange={(e) => set({ eyebrow: e.target.value })} className={inp} /></Field>
      <Field label="Título"><input type="text" value={b.headline} onChange={(e) => set({ headline: e.target.value })} className={inp} /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-5">
          <Field label="Título columna 'antes'"><input type="text" value={b.beforeTitle} onChange={(e) => set({ beforeTitle: e.target.value })} className={inp} /></Field>
          <TextareaList label="Ítems (uno por línea)" value={b.beforeItems} onChange={(v) => set({ beforeItems: v })} />
        </div>
        <div className="flex flex-col gap-5">
          <Field label="Título columna 'después'"><input type="text" value={b.afterTitle} onChange={(e) => set({ afterTitle: e.target.value })} className={inp} /></Field>
          <TextareaList label="Ítems (uno por línea)" value={b.afterItems} onChange={(v) => set({ afterItems: v })} />
        </div>
      </div>
    </div>
  )
}

// ─── Precios ──────────────────────────────────────────────────────────────────
function PricingForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const p = local.pricing
  const set = (patch: Partial<SiteContent['pricing']>) => onChange({ ...local, pricing: { ...p, ...patch } })
  return (
    <div className="flex flex-col gap-5">
      <Field label="Eyebrow"><input type="text" value={p.eyebrow} onChange={(e) => set({ eyebrow: e.target.value })} className={inp} /></Field>
      <Field label="Título"><input type="text" value={p.headline} onChange={(e) => set({ headline: e.target.value })} className={inp} /></Field>
      <Field label="Texto"><textarea value={p.text} onChange={(e) => set({ text: e.target.value })} className={`${inp} resize-y min-h-[60px]`} /></Field>
      <Field label="Texto de los botones"><input type="text" value={p.ctaLabel} onChange={(e) => set({ ctaLabel: e.target.value })} className={inp} /></Field>
      <Field label="Aclaración debajo de los planes"><input type="text" value={p.disclaimer} onChange={(e) => set({ disclaimer: e.target.value })} className={inp} /></Field>

      <Repeater<PricingTier>
        items={p.tiers}
        onChange={(tiers) => set({ tiers })}
        newItem={() => ({ name: 'Nuevo plan', desc: 'Descripción', features: ['Característica 1'], highlight: false })}
        title={(t) => t.name}
      >
        {(tier, setTier) => (
          <>
            <Field label="Nombre"><input type="text" value={tier.name} onChange={(e) => setTier({ name: e.target.value })} className={inp} /></Field>
            <Field label="Descripción"><input type="text" value={tier.desc} onChange={(e) => setTier({ desc: e.target.value })} className={inp} /></Field>
            <TextareaList label="Características (una por línea)" value={tier.features} onChange={(features) => setTier({ features })} />
            <label className="flex items-center gap-2 text-sm text-ink-dim">
              <input type="checkbox" checked={tier.highlight} onChange={(e) => setTier({ highlight: e.target.checked })} />
              Destacar este plan ("más elegido")
            </label>
          </>
        )}
      </Repeater>
    </div>
  )
}

// ─── Testimonios ──────────────────────────────────────────────────────────────
function TestimoniosForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-ink-dim text-sm">Solo agregá testimonios de clientes reales. Esta sección se muestra oculta hasta que la actives en "Secciones".</p>
      <Repeater<TestimonialItem>
        items={local.testimonials}
        onChange={(testimonials) => onChange({ ...local, testimonials })}
        newItem={() => ({ initials: 'XX', name: 'Nombre Apellido', role: 'Rol, ciudad', text: 'Testimonio del cliente...' })}
        title={(t) => t.name}
      >
        {(t, set) => (
          <>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Iniciales"><input type="text" value={t.initials} onChange={(e) => set({ initials: e.target.value })} className={inp} maxLength={3} /></Field>
              <Field label="Nombre"><input type="text" value={t.name} onChange={(e) => set({ name: e.target.value })} className={inp} /></Field>
              <Field label="Rol / Ciudad"><input type="text" value={t.role} onChange={(e) => set({ role: e.target.value })} className={inp} /></Field>
            </div>
            <Field label="Testimonio"><textarea value={t.text} onChange={(e) => set({ text: e.target.value })} className={`${inp} resize-y min-h-[80px]`} /></Field>
          </>
        )}
      </Repeater>
    </div>
  )
}

// ─── Contacto ─────────────────────────────────────────────────────────────────
function ContactoForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const c = local.contact
  const set = (patch: Partial<SiteContent['contact']>) => onChange({ ...local, contact: { ...c, ...patch } })
  return (
    <div className="flex flex-col gap-5">
      <Field label="Título"><input type="text" value={c.headline} onChange={(e) => set({ headline: e.target.value })} className={inp} /></Field>
      <Field label="Texto"><textarea value={c.text} onChange={(e) => set({ text: e.target.value })} className={`${inp} resize-y min-h-[70px]`} /></Field>
      <Field label="WhatsApp (con código de país, ej: +543865468239)"><input type="text" value={c.whatsapp} onChange={(e) => set({ whatsapp: e.target.value })} className={inp} /></Field>
      <Field label="Email"><input type="email" value={c.email} onChange={(e) => set({ email: e.target.value })} className={inp} /></Field>
      <Field label="Ubicación"><input type="text" value={c.location} onChange={(e) => set({ location: e.target.value })} className={inp} /></Field>
      <Field label="Usuario de Instagram (sin @)"><input type="text" value={c.instagramUser} onChange={(e) => set({ instagramUser: e.target.value })} className={inp} /></Field>
      <Field label="Usuario de TikTok (sin @)"><input type="text" value={c.tiktokUser} onChange={(e) => set({ tiktokUser: e.target.value })} className={inp} /></Field>
      <div className="p-4 rounded-xl border border-white/10 text-sm">
        <p className="text-ink-dim text-xs uppercase tracking-widest mb-3">Links generados</p>
        <div className="flex flex-col gap-2">
          <a href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-xs break-all">WhatsApp: https://wa.me/{c.whatsapp.replace(/\D/g, '')}</a>
          <a href={`https://www.instagram.com/${c.instagramUser}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-xs break-all">Instagram: @{c.instagramUser}</a>
          <a href={`https://www.tiktok.com/@${c.tiktokUser}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-xs break-all">TikTok: @{c.tiktokUser}</a>
        </div>
      </div>
    </div>
  )
}

// ─── Sobre NMTECH ───────────────────────────────────────────────────────────────
function NosotrosForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const a = local.about
  const set = (patch: Partial<SiteContent['about']>) => onChange({ ...local, about: { ...a, ...patch } })
  return (
    <div className="flex flex-col gap-5">
      <Field label="Título"><input type="text" value={a.heading} onChange={(e) => set({ heading: e.target.value })} className={inp} /></Field>
      <Field label="Texto principal"><textarea value={a.text} onChange={(e) => set({ text: e.target.value })} className={`${inp} resize-y min-h-[140px]`} /></Field>
      <Field label="Texto del botón CTA"><input type="text" value={a.ctaLabel} onChange={(e) => set({ ctaLabel: e.target.value })} className={inp} /></Field>
    </div>
  )
}

// ─── CTA final ──────────────────────────────────────────────────────────────────
function CTAForm({ local, onChange }: { local: SiteContent; onChange: (c: SiteContent) => void }) {
  const c = local.cta
  const set = (patch: Partial<SiteContent['cta']>) => onChange({ ...local, cta: { ...c, ...patch } })
  return (
    <div className="flex flex-col gap-5">
      <Field label="Tag (etiqueta pequeña)"><input type="text" value={c.tag} onChange={(e) => set({ tag: e.target.value })} className={inp} /></Field>
      <Field label="Título línea 1"><input type="text" value={c.titleLine1} onChange={(e) => set({ titleLine1: e.target.value })} className={inp} /></Field>
      <Field label="Título línea destacada"><input type="text" value={c.titleHighlight} onChange={(e) => set({ titleHighlight: e.target.value })} className={inp} /></Field>
      <Field label="Descripción"><textarea value={c.description} onChange={(e) => set({ description: e.target.value })} className={`${inp} resize-y min-h-[80px]`} /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Botón 1"><input type="text" value={c.cta1Label} onChange={(e) => set({ cta1Label: e.target.value })} className={inp} /></Field>
        <Field label="Botón 2 (WhatsApp)"><input type="text" value={c.cta2Label} onChange={(e) => set({ cta2Label: e.target.value })} className={inp} /></Field>
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
  const [tab, setTab] = useState<Tab>('secciones')
  const { content, updateContent, resetContent, syncStatus } = useContent()
  const [local, setLocal] = useState<SiteContent>(content)
  const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'saving'>('saved')

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const localRef = useRef<SiteContent>(local)
  const updateRef = useRef(updateContent)
  const hasPending = useRef(false)

  useEffect(() => { updateRef.current = updateContent }, [updateContent])

  useEffect(() => {
    if (!hasPending.current) {
      setLocal(content)
      localRef.current = content
    }
  }, [content])

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
      if (hasPending.current) updateRef.current(localRef.current)
    }
  }, [])

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
    logo: <LogoForm local={local} onChange={handleChange} />,
    secciones: <SectionesForm local={local} onChange={handleChange} />,
    hero: <HeroForm local={local} onChange={handleChange} />,
    marquee: <MarqueeForm local={local} onChange={handleChange} />,
    problem: <ProblemForm local={local} onChange={handleChange} />,
    servicios: <ServiciosForm local={local} onChange={handleChange} />,
    proyectos: <ProyectosForm local={local} onChange={handleChange} />,
    industry: <IndustryForm local={local} onChange={handleChange} />,
    process: <ProcessForm local={local} onChange={handleChange} />,
    differentiators: <DifferentiatorsForm local={local} onChange={handleChange} />,
    beforeAfter: <BeforeAfterForm local={local} onChange={handleChange} />,
    pricing: <PricingForm local={local} onChange={handleChange} />,
    testimonios: <TestimoniosForm local={local} onChange={handleChange} />,
    contacto: <ContactoForm local={local} onChange={handleChange} />,
    nosotros: <NosotrosForm local={local} onChange={handleChange} />,
    cta: <CTAForm local={local} onChange={handleChange} />,
    footer: <FooterForm local={local} onChange={handleChange} />,
  }

  return (
    <div className="min-h-screen flex flex-col text-white" style={{ background: 'var(--bg-2)', fontFamily: 'Inter,sans-serif' }}>
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/8 shrink-0" style={{ background: 'var(--bg)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black" style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent-d))' }}>N</div>
          <span className="font-display font-black text-sm uppercase tracking-widest">NMTECH <span className="text-accent">Admin</span></span>
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${saveStatus === 'saved' ? 'text-green-400 bg-green-400/10' : saveStatus === 'saving' ? 'text-yellow-400 bg-yellow-400/10' : 'text-accent bg-accent/10'}`}>
            {saveStatus === 'saved' ? '✓ Guardado' : saveStatus === 'saving' ? '⟳ Guardando...' : '● Sin guardar'}
          </span>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${syncStatus === 'synced' ? 'text-blue-400 bg-blue-400/10' : syncStatus === 'syncing' ? 'text-yellow-400 bg-yellow-400/10' : syncStatus === 'error' ? 'text-red-400 bg-red-400/10' : 'text-ink-dim bg-white/5'}`}>
            {syncStatus === 'synced' ? '☁ Supabase OK' : syncStatus === 'syncing' ? '⟳ Sincronizando...' : syncStatus === 'error' ? '✗ Error Supabase' : '○ Sin remoto'}
          </span>
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-xs px-4 py-2 rounded-full border border-white/20 text-ink hover:bg-white/5 transition-colors">
            Ver sitio →
          </a>
          <button onClick={() => { sessionStorage.removeItem('nm_admin'); setAuthed(false) }} className="text-xs px-4 py-2 rounded-full border border-white/10 text-ink-dim hover:text-white hover:border-white/30 transition-colors">
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-56 shrink-0 border-r border-white/8 flex flex-col overflow-y-auto" style={{ background: 'var(--bg)' }}>
          <nav className="flex flex-col gap-1 p-3 flex-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${tab === t.id ? 'text-accent' : 'text-ink-dim hover:text-white hover:bg-white/4'}`}
                style={tab === t.id ? { background: 'var(--accent-01)' } : {}}
              >
                <span className="text-base">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </nav>

          <div className="p-3 flex flex-col gap-2 border-t border-white/8">
            <button onClick={() => exportJSON(local)} className="w-full text-xs py-2.5 px-3 rounded-xl border border-white/15 text-ink-dim hover:text-white hover:border-white/30 transition-colors text-left">
              📥 Exportar JSON
            </button>
            <button onClick={handleReset} className="w-full text-xs py-2.5 px-3 rounded-xl border border-red-900/40 text-red-400 hover:text-red-300 hover:border-red-500/40 transition-colors text-left">
              🗑️ Resetear todo
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{TABS.find((t) => t.id === tab)?.icon}</span>
              <h2 className="font-display font-black text-xl uppercase tracking-tight">{TABS.find((t) => t.id === tab)?.label}</h2>
            </div>
            {FORM[tab]}
          </div>
        </main>
      </div>
    </div>
  )
}
