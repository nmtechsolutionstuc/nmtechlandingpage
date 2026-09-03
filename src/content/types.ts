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

export interface ProjectItem {
  category: string
  name: string
  image: string
  url: string
  caption: string
  featured: boolean
}

export interface IndustryItem {
  icon: string
  label: string
}

export interface ProcessStep {
  num: string
  title: string
  desc: string
}

export interface DifferentiatorItem {
  icon: string
  title: string
  desc: string
}

export interface PricingTier {
  name: string
  desc: string
  features: string[]
  highlight: boolean
}

export interface TestimonialItem {
  initials: string
  name: string
  role: string
  text: string
}

export interface SiteTheme {
  logoImageUrl: string
  logoText: string
  logoSubtext: string
}

export interface SiteSections {
  hero: boolean
  marquee: boolean
  problem: boolean
  services: boolean
  projects: boolean
  industry: boolean
  process: boolean
  differentiators: boolean
  beforeAfter: boolean
  pricing: boolean
  testimonials: boolean
  contact: boolean
  about: boolean
  ctaFinal: boolean
}

export interface SiteContent {
  theme: SiteTheme
  sections: SiteSections
  hero: {
    eyebrow: string
    titleLine1: string
    titleHighlight: string
    description: string
    cta1Label: string
    cta2Label: string
    trustBadges: string[]
    stats: StatItem[]
  }
  marquee: {
    keywords: string[]
  }
  problem: {
    eyebrow: string
    headline: string
    text: string
    badLabel: string
    badItems: string[]
    goodLabel: string
    goodItems: string[]
  }
  services: ServiceItem[]
  projects: ProjectItem[]
  industry: {
    eyebrow: string
    headline: string
    text: string
    items: IndustryItem[]
    ctaLabel: string
  }
  process: ProcessStep[]
  differentiators: {
    headline: string
    text: string
    items: DifferentiatorItem[]
  }
  beforeAfter: {
    eyebrow: string
    headline: string
    beforeTitle: string
    beforeItems: string[]
    afterTitle: string
    afterItems: string[]
  }
  pricing: {
    eyebrow: string
    headline: string
    text: string
    tiers: PricingTier[]
    ctaLabel: string
    disclaimer: string
  }
  testimonials: TestimonialItem[]
  about: {
    heading: string
    text: string
    ctaLabel: string
  }
  cta: {
    tag: string
    titleLine1: string
    titleHighlight: string
    description: string
    cta1Label: string
    cta2Label: string
  }
  contact: {
    headline: string
    text: string
    whatsapp: string
    email: string
    storeUrl: string
    instagramUser: string
    tiktokUser: string
    location: string
  }
  footer: {
    description: string
  }
}
