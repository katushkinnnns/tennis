import type { LucideIcon } from 'lucide-react'
import {
  CreditCard,
  Headphones,
  LayoutGrid,
  ShieldCheck,
  Truck,
  UserRoundSearch,
} from 'lucide-react'

import type { HomeFeatureIconId } from '@/data/homePageContent'

export const homeFeatureIconMap: Record<HomeFeatureIconId, LucideIcon> = {
  assortment: LayoutGrid,
  delivery: Truck,
  quality: ShieldCheck,
  expert: UserRoundSearch,
  payment: CreditCard,
  support: Headphones,
}
