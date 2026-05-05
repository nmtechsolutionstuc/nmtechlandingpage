export interface StatItem {
  value: number
  suffix: string
  label: string
}

export interface ServiceItem {
  num: string
  name: string
  desc: string
  icon: string
}

export interface TestimonialItem {
  initials: string
  name: string
  role: string
  text: string
}

export interface SiteTheme {
  bgColor: string
  accentColor: string
  navyColor: string
  headingGradFrom: string
  headingGradTo: string
  fontFamily: string
  logoImageUrl: string
  logoText: string
  logoSubtext: string
}

export interface SiteSections {
  hero: boolean
  marquee: boolean
  about: boolean
  services: boolean
  projects: boolean
  testimonials: boolean
  cta: boolean
}

export interface SiteContent {
  theme: SiteTheme
  sections: SiteSections
  hero: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    titleHighlight: string
    description: string
    cta1Label: string
    cta2Label: string
    stats: StatItem[]
  }
  about: {
    heading: string
    text: string
    ctaLabel: string
  }
  services: ServiceItem[]
  testimonials: TestimonialItem[]
  cta: {
    tag: string
    titleLine1: string
    titleHighlight: string
    description: string
    cta1Label: string
    cta2Label: string
  }
  contact: {
    whatsapp: string
    email: string
    storeUrl: string
    instagramUser: string
    tiktokUser: string
  }
  footer: {
    description: string
  }
}
