import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type FeatureIconBadgeProps = {
  children: ReactNode
  className?: string
}

export const FeatureIconBadge = ({ children, className }: FeatureIconBadgeProps) => (
  <div
    className={cn(
      'mb-2 flex size-14 items-center justify-center rounded-full bg-card',
      'shadow-[0_2px_14px_color-mix(in_oklch,var(--neon-green-mid)_18%,transparent)]',
      'ring-1 ring-[color-mix(in_oklch,var(--neon-green-deep)_14%,transparent)]',
      'transition-shadow duration-300 group-hover:shadow-[0_4px_18px_color-mix(in_oklch,var(--neon-green-mid)_28%,transparent)]',
      className,
    )}
  >
    {children}
  </div>
)
