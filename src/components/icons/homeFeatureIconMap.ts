import type { ComponentType, SVGProps } from 'react'

import type { HomeFeatureIconId } from '@/data/homePageContent'
import {
  AssortmentIcon,
  DeliveryIcon,
  ExpertIcon,
  PaymentIcon,
  QualityIcon,
  SupportIcon,
} from '@/components/icons/FeatureIcons'

type FeatureIconComponent = ComponentType<SVGProps<SVGSVGElement>>

export const homeFeatureIconMap: Record<HomeFeatureIconId, FeatureIconComponent> = {
  assortment: AssortmentIcon,
  delivery: DeliveryIcon,
  quality: QualityIcon,
  expert: ExpertIcon,
  payment: PaymentIcon,
  support: SupportIcon,
}
