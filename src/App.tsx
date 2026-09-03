import { useEffect, useState } from 'react'
import { ContentProvider, useContent } from './context/ContentContext'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'
import ProblemSection from './components/ProblemSection'
import ServicesSection from './components/ServicesSection'
import ProjectsSection from './components/ProjectsSection'
import IndustrySection from './components/IndustrySection'
import ProcessSection from './components/ProcessSection'
import DifferentiatorsSection from './components/DifferentiatorsSection'
import BeforeAfterSection from './components/BeforeAfterSection'
import PricingSection from './components/PricingSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'
import AboutSection from './components/AboutSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import AdminPage from './pages/AdminPage'
import AllProjectsPage from './pages/AllProjectsPage'

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
      className={`fixed bottom-7 left-6 sm:bottom-8 sm:left-8 z-50 w-11 h-11 rounded-full flex items-center justify-center text-white text-lg border border-white/10 transition-all duration-300 hover:-translate-y-1 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      style={{ background: 'var(--surface)' }}
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
      {s.problem && <ProblemSection />}
      {s.services && <ServicesSection />}
      {s.projects && <ProjectsSection />}
      {s.industry && <IndustrySection />}
      {s.process && <ProcessSection />}
      {s.differentiators && <DifferentiatorsSection />}
      {s.beforeAfter && <BeforeAfterSection />}
      {s.pricing && <PricingSection />}
      {s.testimonials && <TestimonialsSection />}
      {s.contact && <ContactSection />}
      {s.about && <AboutSection />}
      {s.ctaFinal && <CTASection />}
      <Footer />
      <WhatsAppFloat />
      <ScrollTop />
    </div>
  )
}

function Router() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (hash === '#admin') return <AdminPage />
  if (hash === '#todos-los-proyectos') return <AllProjectsPage />
  return <LandingPage />
}

export default function App() {
  return (
    <ContentProvider>
      <Router />
    </ContentProvider>
  )
}
