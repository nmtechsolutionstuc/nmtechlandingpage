import { useContent } from '../context/ContentContext'

type ContentValue = ReturnType<typeof useContent>['content']

const SOCIALS: { label: string; show: (c: ContentValue) => boolean; getHref: (c: ContentValue) => string; icon: JSX.Element }[] = [
  { label: 'WhatsApp', show: (c) => !!c.contact.whatsapp, getHref: (c) => `https://wa.me/${c.contact.whatsapp.replace(/\D/g, '')}`, icon: <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
  { label: 'Instagram', show: (c) => !!c.contact.instagramUser, getHref: (c) => `https://www.instagram.com/${c.contact.instagramUser}`, icon: <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  { label: 'Facebook', show: (c) => !!c.contact.facebookUser, getHref: (c) => `https://www.facebook.com/${c.contact.facebookUser}`, icon: <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.022 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.918 8.437-9.94z"/></svg> },
  { label: 'TikTok', show: (c) => !!c.contact.tiktokUser, getHref: (c) => `https://www.tiktok.com/@${c.contact.tiktokUser}`, icon: <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.37a8.16 8.16 0 004.77 1.52V7.45a4.85 4.85 0 01-1-.76z"/></svg> },
  { label: 'Email', show: (c) => !!c.contact.email, getHref: (c) => `mailto:${c.contact.email}`, icon: <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg> },
]

export default function Footer() {
  const { content } = useContent()
  const { theme, contact, footer } = content

  return (
    <footer className="border-t border-white/[0.06] px-6 md:px-10 pt-16 pb-8" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          <div>
            <a href="#hero" className="flex flex-col leading-none mb-5 no-underline">
              <span className="font-display font-extrabold text-lg text-ink">{theme.logoText}</span>
              <span className="text-[9px] font-medium tracking-[0.32em] text-accent mt-0.5">{theme.logoSubtext?.toUpperCase()}</span>
            </a>
            <p className="text-ink-dim text-sm leading-relaxed mb-6 max-w-xs">{footer.description}</p>
            <div className="flex gap-3">
              {SOCIALS.filter((s) => s.show(content)).map((s) => (
                <a
                  key={s.label}
                  href={s.getHref(content)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-ink-dim hover:-translate-y-0.5 transition-all duration-250 hover:text-accent"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.15em] mb-5 text-accent">Servicios</h4>
            <ul className="flex flex-col gap-3">
              {content.services.slice(0, 6).map((s) => (
                <li key={s.name}><a href="#servicios" className="text-ink-dim text-sm hover:text-ink transition-colors duration-200">{s.name}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.15em] mb-5 text-accent">Compañía</h4>
            <ul className="flex flex-col gap-3">
              {[{ label: 'Nosotros', href: '#nosotros' }, { label: 'Trabajos', href: '#proyectos' }, { label: 'Proceso', href: '#proceso' }, { label: 'Contacto', href: '#contacto' }].map((l) => (
                <li key={l.label}><a href={l.href} className="text-ink-dim text-sm hover:text-ink transition-colors duration-200">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.15em] mb-5 text-accent">Contacto</h4>
            <ul className="flex flex-col gap-3">
              <li><a href={`mailto:${contact.email}`} className="text-ink-dim text-sm hover:text-ink transition-colors duration-200">{contact.email}</a></li>
              <li><a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-accent text-sm hover:text-accent-l transition-colors duration-200">WhatsApp</a></li>
              <li className="text-ink-dim text-sm">{contact.location}</li>
            </ul>
          </div>
        </div>

        <div className="pt-7 border-t border-white/[0.06]">
          <p className="text-ink-dim text-xs">© {new Date().getFullYear()} {theme.logoText} {theme.logoSubtext}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
