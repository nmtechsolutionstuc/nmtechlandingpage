import type { SiteContent } from './types'

export const FONTS = [
  { label: 'Kanit', value: 'Kanit', url: 'Kanit:wght@300;400;500;600;700;800;900' },
  { label: 'Rajdhani', value: 'Rajdhani', url: 'Rajdhani:wght@400;500;600;700' },
  { label: 'Inter', value: 'Inter', url: 'Inter:wght@300;400;500;600;700' },
  { label: 'Poppins', value: 'Poppins', url: 'Poppins:wght@300;400;500;600;700' },
  { label: 'Space Grotesk', value: 'Space Grotesk', url: 'Space+Grotesk:wght@300;400;500;600;700' },
  { label: 'Barlow', value: 'Barlow', url: 'Barlow:wght@300;400;500;600;700' },
]

export const THEME_PRESETS = [
  {
    label: 'Tech Navy',
    emoji: '🟠',
    theme: { bgColor: '#060D1A', accentColor: '#F7931E', navyColor: '#1B2A4A', headingGradFrom: '#4A6080', headingGradTo: '#E8EFF5' },
  },
  {
    label: 'Ocean Blue',
    emoji: '🔵',
    theme: { bgColor: '#04091A', accentColor: '#3B82F6', navyColor: '#0F2040', headingGradFrom: '#3A5070', headingGradTo: '#D0E4F5' },
  },
  {
    label: 'Neon Purple',
    emoji: '🟣',
    theme: { bgColor: '#07030F', accentColor: '#A855F7', navyColor: '#1E0A3C', headingGradFrom: '#5A3A7A', headingGradTo: '#E8D8F8' },
  },
  {
    label: 'Matrix Green',
    emoji: '🟢',
    theme: { bgColor: '#030A06', accentColor: '#10B981', navyColor: '#0A2015', headingGradFrom: '#2A5540', headingGradTo: '#C8EFE0' },
  },
  {
    label: 'Crimson',
    emoji: '🔴',
    theme: { bgColor: '#0F0306', accentColor: '#EF4444', navyColor: '#2D0A14', headingGradFrom: '#5A2030', headingGradTo: '#F5D0D0' },
  },
]

export const defaultContent: SiteContent = {
  theme: {
    bgColor: '#060D1A',
    accentColor: '#F7931E',
    navyColor: '#1B2A4A',
    headingGradFrom: '#4A6080',
    headingGradTo: '#E8EFF5',
    fontFamily: 'Kanit',
    logoImageUrl: '',
    logoText: 'NMTECH',
    logoSubtext: 'Solutions',
  },
  sections: {
    hero: true,
    marquee: true,
    about: true,
    services: true,
    projects: true,
    testimonials: true,
    cta: true,
  },
  hero: {
    eyebrow: 'Tecnología & Resultados',
    titleLine1: 'Tu negocio,',
    titleLine2: 'potenciado con',
    titleHighlight: 'Inteligencia Digital',
    description:
      'Automatizamos procesos, creamos herramientas de IA y desarrollamos soluciones digitales que te permiten crecer más rápido, con menos esfuerzo.',
    cta1Label: 'Quiero mi solución →',
    cta2Label: 'Ver servicios',
    stats: [
      { value: 200, suffix: '+', label: 'Horas ahorradas/mes' },
      { value: 50, suffix: '+', label: 'Proyectos entregados' },
      { value: 98, suffix: '%', label: '% Satisfacción' },
    ],
  },
  about: {
    heading: 'Quiénes Somos',
    text: 'En NMTECH Solutions diseñamos soluciones digitales personalizadas. No vendemos tecnología genérica. Entendemos tu negocio y creamos exactamente lo que necesitas para ahorrar tiempo, ganar más y escalar sin límites. Inteligencia artificial, automatizaciones, landing pages de alta conversión y productos digitales que trabajan para ti las 24 horas del día.',
    ctaLabel: 'Hablemos de tu proyecto →',
  },
  services: [
    {
      num: '01',
      name: 'Inteligencia Artificial',
      desc: 'Chatbots, asistentes virtuales y sistemas de IA personalizados que automatizan la atención al cliente y optimizan decisiones de negocio en tiempo real, sin necesidad de conocimientos técnicos.',
      icon: '🤖',
    },
    {
      num: '02',
      name: 'Automatizaciones',
      desc: 'Flujos de trabajo inteligentes que eliminan tareas repetitivas, conectan tus herramientas favoritas y liberan horas valiosas para que te concentres en lo que realmente hace crecer tu negocio.',
      icon: '⚡',
    },
    {
      num: '03',
      name: 'Landing Pages',
      desc: 'Páginas de alta conversión diseñadas con psicología de ventas, animaciones de impacto y UX que transforma visitantes en clientes desde el primer clic. ROI medible desde el día uno.',
      icon: '🚀',
    },
    {
      num: '04',
      name: 'eBooks Digitales',
      desc: 'Empaquetamos tu conocimiento en infoproductos profesionales que generan ingresos pasivos 24/7. Diseño de alto impacto, estrategia de ventas incluida y distribución optimizada.',
      icon: '📚',
    },
    {
      num: '05',
      name: 'Productos Digitales',
      desc: 'Desde apps y herramientas hasta plataformas completas — creamos productos digitales que escalan tu negocio sin aumentar costos operativos. Soluciones que crecen contigo.',
      icon: '💎',
    },
  ],
  testimonials: [
    { initials: 'ML', name: 'Martina López', role: 'Coach de Negocios, Buenos Aires', text: 'Antes pasaba 3 horas diarias en tareas administrativas. Ahora un bot lo hace todo. Literalmente recuperé mi tiempo y mi vida.' },
    { initials: 'CR', name: 'Carlos Rivas', role: 'E-commerce, México', text: 'La landing page que me crearon convirtió un 340% más que la anterior. En el primer mes recuperé la inversión 5 veces.' },
    { initials: 'AP', name: 'Andrea Pereira', role: 'Terapeuta independiente, Colombia', text: 'Pensaba que la IA era solo para empresas grandes. NMTECH me demostró que cualquier negocio puede aprovecharla hoy mismo.' },
    { initials: 'JM', name: 'Javier Morales', role: 'Consultor Financiero, España', text: 'El ebook que creamos juntos se vendió 200 copias en el primer mes. Ingreso pasivo real gracias a la estrategia digital de NMTECH.' },
    { initials: 'VS', name: 'Valentina Soto', role: 'Diseñadora UX freelance, Chile', text: 'Automatizaron mi proceso de captación de clientes completo. Ahora tengo leads llegando solos mientras trabajo en lo que me apasiona.' },
    { initials: 'DG', name: 'Diego González', role: 'Startup SaaS, Uruguay', text: 'El equipo de NMTECH no solo entrega código, entiende tu negocio. Esa diferencia se nota en cada decisión del proyecto.' },
  ],
  cta: {
    tag: 'Empieza hoy',
    titleLine1: '¿Listo para transformar',
    titleHighlight: 'tu negocio con IA?',
    description:
      'Agenda una consulta gratuita y descubre exactamente qué solución digital puede multiplicar tu productividad. Sin compromisos, sin tecnicismos.',
    cta1Label: '💬 Quiero mi consulta gratis',
    cta2Label: 'Ver productos →',
  },
  contact: {
    whatsapp: '+543865468239',
    email: 'nmartinez9815@gmail.com',
    storeUrl: 'https://nmtech5.mitiendanube.com/productos/',
    instagramUser: 'nmtechsolutions',
    tiktokUser: 'njmartinez98',
  },
  footer: {
    description:
      'Soluciones digitales modernas, prácticas y orientadas a resultados. IA, automatización y herramientas digitales para crecer de manera eficiente.',
  },
}
