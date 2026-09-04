import { useState, FormEvent } from 'react'
import { Send, Mail, MapPin } from 'lucide-react'
import FadeIn from './ui/FadeIn'
import { useContent } from '../context/ContentContext'

const NEEDS = ['Landing Page', 'Web profesional', 'Catálogo digital', 'No estoy seguro / quiero asesoramiento']

const inputCls =
  'w-full bg-transparent border-b border-white/15 focus:border-accent outline-none transition-colors duration-300 text-ink placeholder:text-ink-dim/50 py-3 text-[15px]'
const labelCls = 'block text-ink-dim text-[11px] uppercase tracking-[0.15em] font-semibold mb-2'

export default function ContactSection() {
  const { content } = useContent()
  const c = content.contact
  const [form, setForm] = useState({ name: '', business: '', phone: '', email: '', need: NEEDS[0], message: '' })
  const [sent, setSent] = useState(false)

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return

    const lines = [
      `Hola! Soy ${form.name}${form.business ? ` de ${form.business}` : ''}.`,
      `Necesito: ${form.need}.`,
      form.email ? `Mi email: ${form.email}` : '',
      form.message ? `Mensaje: ${form.message}` : '',
      `(Enviado desde nmtechsolutions)`,
    ].filter(Boolean)

    const waNumber = c.whatsapp.replace(/\D/g, '')
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join('\n'))}`
    window.open(waUrl, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <section id="contacto" className="px-6 md:px-10 py-24 md:py-36 relative overflow-hidden" style={{ background: 'var(--bg-2)' }}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none rounded-full" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%,var(--accent-01) 0%,transparent 70%)' }} />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-20">
          <div>
            <FadeIn>
              <span className="font-medium text-xs tracking-[0.22em] uppercase text-accent">Contacto</span>
            </FadeIn>
            <FadeIn delay={0.1} y={26}>
              <h2 className="font-display font-extrabold uppercase leading-[1.05] tracking-tight mt-4 mb-6 heading-grad" style={{ fontSize: 'clamp(2.1rem,4.4vw,3.4rem)' }}>
                {c.headline}
              </h2>
            </FadeIn>
            <FadeIn delay={0.18} y={18}>
              <p className="text-ink-dim leading-relaxed mb-10 max-w-md">{c.text}</p>
            </FadeIn>

            <FadeIn delay={0.26} y={18}>
              <a
                href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white font-semibold uppercase tracking-widest text-xs mb-10 hover:-translate-y-0.5 transition-all duration-300"
                style={{ background: `linear-gradient(135deg,var(--accent),var(--accent-d))`, boxShadow: '0 6px 24px var(--accent-shadow)' }}
              >
                Hablar por WhatsApp
              </a>
            </FadeIn>

            <FadeIn delay={0.32} y={18}>
              <div className="flex flex-col gap-4 pt-8 border-t border-white/[0.07]">
                <a href={`mailto:${c.email}`} className="flex items-center gap-3 text-ink-dim hover:text-ink transition-colors text-sm">
                  <Mail size={16} className="text-accent shrink-0" /> {c.email}
                </a>
                <div className="flex items-center gap-3 text-ink-dim text-sm">
                  <MapPin size={16} className="text-accent shrink-0" /> {c.location}
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.15} y={26}>
            {sent ? (
              <div className="rounded-3xl p-10 glass-card flex flex-col items-center text-center gap-4" style={{ borderColor: 'var(--accent-03)' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'var(--accent-02)' }}>
                  <Send size={22} className="text-accent" />
                </div>
                <h3 className="font-display font-bold text-ink text-xl">¡Listo!</h3>
                <p className="text-ink-dim text-sm max-w-xs">
                  Te abrimos WhatsApp con tu mensaje. Si no se abrió, escribinos directo a {c.whatsapp}.
                </p>
                <button onClick={() => setSent(false)} className="text-accent text-xs font-semibold uppercase tracking-widest mt-2">
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-3xl p-8 sm:p-10 border border-white/10" style={{ background: 'var(--bg)' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 mb-6">
                  <div>
                    <label className={labelCls}>Nombre</label>
                    <input required value={form.name} onChange={(e) => set('name', e.target.value)} className={inputCls} placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label className={labelCls}>Negocio</label>
                    <input value={form.business} onChange={(e) => set('business', e.target.value)} className={inputCls} placeholder="Nombre de tu negocio" />
                  </div>
                  <div>
                    <label className={labelCls}>WhatsApp / Teléfono</label>
                    <input required value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputCls} placeholder="+54 9 ..." />
                  </div>
                  <div>
                    <label className={labelCls}>Email</label>
                    <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls} placeholder="tu@email.com" />
                  </div>
                </div>

                <div className="mb-6">
                  <label className={labelCls}>¿Qué necesitás?</label>
                  <select value={form.need} onChange={(e) => set('need', e.target.value)} className={`${inputCls} appearance-none cursor-pointer`}>
                    {NEEDS.map((n) => <option key={n} value={n} className="bg-[#131313]">{n}</option>)}
                  </select>
                </div>

                <div className="mb-9">
                  <label className={labelCls}>Mensaje</label>
                  <textarea value={form.message} onChange={(e) => set('message', e.target.value)} rows={3} className={`${inputCls} resize-none`} placeholder="Contanos un poco más sobre tu negocio..." />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full text-white font-semibold uppercase tracking-widest text-sm hover:-translate-y-0.5 transition-all duration-300"
                  style={{ background: `linear-gradient(135deg,var(--accent),var(--accent-d))`, boxShadow: '0 6px 24px var(--accent-shadow)' }}
                >
                  Enviar por WhatsApp <Send size={15} />
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
