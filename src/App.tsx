import { useEffect, useState } from 'react'
import { ContentProvider, useContent } from './context/ContentContext'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import ProjectsSection from './components/ProjectsSection'
import TestimonialsSection from './components/TestimonialsSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import AdminPage from './pages/AdminPage'

function ScrollTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="#hero"
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg transition-all duration-300 hover:-translate-y-1 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent-d))', boxShadow: '0 4px 20px var(--accent-shadow)' }}
      aria-label="Volver arriba"
    >
      ↑
    </a>
  )
}

function LandingPage() {
  const { content } = useContent()
  const s = content.sections

  return (
    <div style={{ overflowX: 'clip', background: 'var(--bg)' }}>
      <Navbar />
      {s.hero && <HeroSection />}
      {s.marquee && <MarqueeSection />}
      {s.about && <AboutSection />}
      {s.services && <ServicesSection />}
      {s.projects && <ProjectsSection />}
      {s.testimonials && <TestimonialsSection />}
      {s.cta && <CTASection />}
      <Footer />
      <ScrollTop />
    </div>
  )
}

function Router() {
  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#admin')

  useEffect(() => {
    const onHash = () => setIsAdmin(window.location.hash === '#admin')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return isAdmin ? <AdminPage /> : <LandingPage />
}

export default function App() {
  return (
    <ContentProvider>
      <Router />
    </ContentProvider>
  )
}
