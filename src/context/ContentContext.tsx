import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SiteContent } from '../content/types'
import { defaultContent, FONTS } from '../content/defaultContent'

const STORAGE_KEY = 'nmtech_content_v2'
const CACHE_TS_KEY = 'nmtech_cache_ts'
const CACHE_TTL = 5 * 60 * 1000 // 5 min — re-fetch if cache is older than this

// ─── JSONBin helpers ──────────────────────────────────────────────────────────
const BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID
const BIN_KEY = import.meta.env.VITE_JSONBIN_API_KEY
const BIN_URL = BIN_ID ? `https://api.jsonbin.io/v3/b/${BIN_ID}` : ''

function hasRemote() {
  return Boolean(BIN_ID && BIN_KEY)
}

async function fetchRemote(): Promise<SiteContent | null> {
  if (!hasRemote()) return null
  try {
    const res = await fetch(`${BIN_URL}/latest`, {
      headers: { 'X-Master-Key': BIN_KEY },
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.record as SiteContent
  } catch {
    return null
  }
}

async function pushRemote(content: SiteContent): Promise<boolean> {
  if (!hasRemote()) return false
  try {
    const res = await fetch(BIN_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Master-Key': BIN_KEY },
      body: JSON.stringify(content),
    })
    return res.ok
  } catch {
    return false
  }
}

// ─── Local cache helpers ──────────────────────────────────────────────────────
function loadLocal(): SiteContent {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved) as SiteContent
      return deepMerge(defaultContent, parsed)
    }
  } catch {}
  return defaultContent
}

function saveLocal(content: SiteContent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  localStorage.setItem(CACHE_TS_KEY, String(Date.now()))
}

function cacheIsStale(): boolean {
  const ts = Number(localStorage.getItem(CACHE_TS_KEY) || 0)
  return Date.now() - ts > CACHE_TTL
}

// ─── Deep merge (keep defaults for new fields added after a save) ─────────────
function deepMerge(defaults: SiteContent, saved: Partial<SiteContent>): SiteContent {
  return {
    ...defaults,
    ...saved,
    theme: { ...defaults.theme, ...saved.theme },
    sections: { ...defaults.sections, ...saved.sections },
    hero: { ...defaults.hero, ...saved.hero },
    about: { ...defaults.about, ...saved.about },
    cta: { ...defaults.cta, ...saved.cta },
    contact: { ...defaults.contact, ...saved.contact },
    footer: { ...defaults.footer, ...saved.footer },
    services: saved.services ?? defaults.services,
    testimonials: saved.testimonials ?? defaults.testimonials,
  }
}

// ─── Theme application ────────────────────────────────────────────────────────
function hexToRgb(hex: string): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!r) return '247,147,30'
  return `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
}
function darkenHex(hex: string, amount = 25): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!r) return hex
  const ch = (n: string) => Math.max(0, parseInt(n, 16) - amount).toString(16).padStart(2, '0')
  return `#${ch(r[1])}${ch(r[2])}${ch(r[3])}`
}
function lightenHex(hex: string, amount = 20): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!r) return hex
  const ch = (n: string) => Math.min(255, parseInt(n, 16) + amount).toString(16).padStart(2, '0')
  return `#${ch(r[1])}${ch(r[2])}${ch(r[3])}`
}

function applyTheme(theme: SiteContent['theme']) {
  const root = document.documentElement
  const aRgb = hexToRgb(theme.accentColor)
  root.style.setProperty('--accent', theme.accentColor)
  root.style.setProperty('--accent-d', darkenHex(theme.accentColor, 25))
  root.style.setProperty('--accent-l', lightenHex(theme.accentColor, 20))
  root.style.setProperty('--accent-rgb', aRgb)
  root.style.setProperty('--accent-01', `rgba(${aRgb},0.08)`)
  root.style.setProperty('--accent-02', `rgba(${aRgb},0.15)`)
  root.style.setProperty('--accent-03', `rgba(${aRgb},0.25)`)
  root.style.setProperty('--accent-shadow', `rgba(${aRgb},0.4)`)
  root.style.setProperty('--accent-shadow-lg', `rgba(${aRgb},0.55)`)
  root.style.setProperty('--bg', theme.bgColor)
  root.style.setProperty('--bg-rgb', hexToRgb(theme.bgColor))
  root.style.setProperty('--bg2', lightenHex(theme.bgColor, 8))
  root.style.setProperty('--navy', theme.navyColor)
  root.style.setProperty('--navy-rgb', hexToRgb(theme.navyColor))
  root.style.setProperty('--head-from', theme.headingGradFrom)
  root.style.setProperty('--head-to', theme.headingGradTo)
  document.body.style.background = theme.bgColor

  const fontDef = FONTS.find((f) => f.value === theme.fontFamily)
  if (fontDef) {
    let link = document.getElementById('dynamic-font') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.id = 'dynamic-font'
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
    link.href = `https://fonts.googleapis.com/css2?family=${fontDef.url}&display=swap`
    document.body.style.fontFamily = `'${theme.fontFamily}', sans-serif`
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error' | 'no-remote'

interface ContentContextValue {
  content: SiteContent
  syncStatus: SyncStatus
  updateContent: (c: SiteContent) => Promise<void>
  resetContent: () => void
  refetch: () => void
}

const ContentContext = createContext<ContentContextValue>({
  content: defaultContent,
  syncStatus: 'no-remote',
  updateContent: async () => {},
  resetContent: () => {},
  refetch: () => {},
})

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(loadLocal)
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(hasRemote() ? 'syncing' : 'no-remote')

  applyTheme(content.theme)

  async function syncFromRemote() {
    if (!hasRemote()) { setSyncStatus('no-remote'); return }
    setSyncStatus('syncing')
    const remote = await fetchRemote()
    if (remote) {
      const merged = deepMerge(defaultContent, remote)
      setContent(merged)
      saveLocal(merged)
      applyTheme(merged.theme)
      setSyncStatus('synced')
    } else {
      setSyncStatus('error')
    }
  }

  // On mount: fetch remote if stale or never fetched
  useEffect(() => {
    if (!hasRemote()) return
    // Always fetch in admin; for public site only fetch if cache is stale
    const isAdmin = window.location.hash === '#admin'
    if (isAdmin || cacheIsStale()) {
      syncFromRemote()
    } else {
      setSyncStatus('synced')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Apply theme whenever it changes
  useEffect(() => {
    applyTheme(content.theme)
  }, [content.theme])

  const updateContent = async (newContent: SiteContent) => {
    setContent(newContent)
    saveLocal(newContent)
    if (hasRemote()) {
      setSyncStatus('syncing')
      const ok = await pushRemote(newContent)
      setSyncStatus(ok ? 'synced' : 'error')
    }
  }

  const resetContent = () => {
    setContent(defaultContent)
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(CACHE_TS_KEY)
    applyTheme(defaultContent.theme)
    if (hasRemote()) pushRemote(defaultContent)
    setSyncStatus(hasRemote() ? 'synced' : 'no-remote')
  }

  return (
    <ContentContext.Provider value={{ content, syncStatus, updateContent, resetContent, refetch: syncFromRemote }}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => useContext(ContentContext)
