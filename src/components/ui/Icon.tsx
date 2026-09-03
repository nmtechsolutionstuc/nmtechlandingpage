import {
  LayoutTemplate,
  Building2,
  BookOpen,
  UserRound,
  Store,
  Plug,
  Zap,
  Wrench,
  Smartphone,
  Search,
  MapPin,
  MessageCircle,
  Globe,
  Code2,
  Palette,
  Coffee,
  Dumbbell,
  Scissors,
  Home,
  Stethoscope,
  UtensilsCrossed,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

export const ICONS: Record<string, LucideIcon> = {
  landing: LayoutTemplate,
  institutional: Building2,
  catalog: BookOpen,
  professional: UserRound,
  store: Store,
  integrations: Plug,
  automation: Zap,
  maintenance: Wrench,
  mobile: Smartphone,
  seo: Search,
  maps: MapPin,
  whatsapp: MessageCircle,
  domain: Globe,
  code: Code2,
  design: Palette,
  cafe: Coffee,
  gym: Dumbbell,
  barber: Scissors,
  realestate: Home,
  dental: Stethoscope,
  restaurant: UtensilsCrossed,
  custom: Sparkles,
}

export const ICON_KEYS = Object.keys(ICONS)

export default function Icon({ name, className, size = 20, strokeWidth = 1.75 }: { name: string; className?: string; size?: number; strokeWidth?: number }) {
  const Cmp = ICONS[name] || Sparkles
  return <Cmp className={className} size={size} strokeWidth={strokeWidth} />
}
