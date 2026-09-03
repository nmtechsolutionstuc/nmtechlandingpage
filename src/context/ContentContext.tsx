import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SiteContent } from '../content/types'
import { defaultContent } from '../content/defaultContent'

const STORAGE_KEY = 'nmtech_content_v3'

// ─── Supabase REST helpers ────────────────────────────────────────────────────
const SB_URL = import.meta.env.VITE_SUPABASE_URL
const SB_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

function hasRemote() {
  return Boolean(SB_URL && SB_KEY)
}

function sbHeaders() {
  return {
    'apikey': SB_KEY!,
    'Authorization': `Bearer ${SB_KEY!}`,
    'Content-Type': 'application/json',
  }
}

async function fetchRemote(): Promise<SiteContent | null> {
  if (!hasRemote()) return null
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/site_content?id=eq.1&select=content`,
      { headers: sbHeaders() }
    )
    if (!res.ok) return null
    const rows = await res.json()
    if (!rows[0]?.content) return null
    return rows[0].content as SiteContent
  } catch {
    return null
  }
}

async function pushRemote(content: SiteContent): Promise<boolean> {
  if (!hasRemote()) return false
  try {
    const res = await fetch(`${SB_URL}/rest/v1/site_content?id=eq.1`, {
      method: 'PATCH',
      headers: { ...sbHeaders(), 'Prefer': 'return=minimal' },
      body: JSON.stringify({ content, updated_at: new Date().toISOString() }),
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
    if (saved) return deepMerge(defaultContent, JSON.parse(saved) as SiteContent)
  } catch {}
  return defaultContent
}

function saveLocal(content: SiteContent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
}

// ─── Deep merge ───────────────────────────────────────────────────────────────
function deepMerge(defaults: SiteContent, saved: Partial<SiteContent>): SiteContent {
  return {
    ...defaults,
    ...saved,
    theme: { ...defaults.theme, ...saved.theme },
    sections: { ...defaults.sections, ...saved.sections },
    hero: { ...defaults.hero, ...saved.hero },
    marquee: { ...defaults.marquee, ...saved.marquee },
    problem: { ...defaults.problem, ...saved.problem },
    industry: { ...defaults.industry, ...saved.industry },
    differentiators: { ...defaults.differentiators, ...saved.differentiators },
    beforeAfter: { ...defaults.beforeAfter, ...saved.beforeAfter },
    pricing: { ...defaults.pricing, ...saved.pricing },
    about: { ...defaults.about, ...saved.about },
    cta: { ...defaults.cta, ...saved.cta },
    contact: { ...defaults.contact, ...saved.contact },
    footer: { ...defaults.footer, ...saved.footer },
    services: saved.services ?? defaults.services,
    projects: saved.projects ?? defaults.projects,
    process: saved.process ?? defaults.process,
    testimonials: saved.testimonials ?? defaults.testimonials,
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

  async function syncFromRemote() {
    if (!hasRemote()) { setSyncStatus('no-remote'); return }
    setSyncStatus('syncing')
    const remote = await fetchRemote()
    if (remote) {
      const merged = deepMerge(defaultContent, remote)
      setContent(merged)
      saveLocal(merged)
      setSyncStatus('synced')
    } else {
      setSyncStatus('error')
    }
  }

  useEffect(() => {
    if (!hasRemote()) return
    // Siempre fetch desde Supabase al montar — localStorage solo da la carga inicial rápida
    syncFromRemote()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
