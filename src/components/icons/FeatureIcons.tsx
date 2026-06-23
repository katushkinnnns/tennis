import type { ReactNode, SVGProps } from 'react'

import { cn } from '@/lib/utils'

type FeatureIconProps = SVGProps<SVGSVGElement>

const iconColors = {
  deep: 'var(--neon-green-deep)',
  mid: 'var(--neon-green-mid)',
  light: 'var(--neon-green-light)',
  ball: '#c8ef2e',
  ballLine: '#2d4a1e',
} as const

export const AssortmentIcon = ({ className, ...props }: FeatureIconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={cn('size-8', className)} aria-hidden="true" {...props}>
    <path d="M18 14 C19 12 21 11 24 11 C27 11 29 12 30 14" stroke={iconColors.mid} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M20 12 C22 10 26 10 28 12" stroke={iconColors.light} strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="24" cy="26" r="13" fill={iconColors.ball} />
    <circle cx="24" cy="26" r="13" fill="url(#assortmentBallShine)" />
    <path d="M24 14.5 C19.5 17 19.5 35 24 37.5" stroke={iconColors.ballLine} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M24 14.5 C28.5 17 28.5 35 24 37.5" stroke={iconColors.ballLine} strokeWidth="1.8" strokeLinecap="round" />
    <ellipse cx="24" cy="26" rx="13" ry="4.2" stroke={iconColors.ballLine} strokeWidth="1.4" fill="none" />
    <defs>
      <radialGradient id="assortmentBallShine" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stopColor="white" stopOpacity="0.55" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
)

export const DeliveryIcon = ({ className, ...props }: FeatureIconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={cn('size-8', className)} aria-hidden="true" {...props}>
    <path d="M8 18 C8 14 10 12 14 12 H28 C31 12 33 13 34 16 L38 22 H42 C44 22 45 23 45 25 V30 C45 32 44 33 42 33 H40" stroke={iconColors.deep} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 22 H34 V33 H14 C10 33 8 31 8 27 V22 Z" fill="color-mix(in oklch, var(--neon-green-light) 18%, white)" stroke={iconColors.deep} strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="16" cy="33" r="3.2" fill={iconColors.deep} />
    <circle cx="38" cy="33" r="3.2" fill={iconColors.deep} />
    <path d="M3 20 C5 18 5 16 3 14" stroke={iconColors.light} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="41" cy="18" r="3" fill={iconColors.ball} />
  </svg>
)

export const QualityIcon = ({ className, ...props }: FeatureIconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={cn('size-8', className)} aria-hidden="true" {...props}>
    <path d="M24 6 L38 12 V24 C38 31.5 32 37 24 40 C16 37 10 31.5 10 24 V12 L24 6 Z" fill="color-mix(in oklch, var(--neon-green-light) 16%, white)" stroke={iconColors.deep} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M17 24 L22 29 L32 18" stroke={iconColors.deep} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="33" cy="14" r="4" fill={iconColors.ball} />
  </svg>
)

export const ExpertIcon = ({ className, ...props }: FeatureIconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={cn('size-8', className)} aria-hidden="true" {...props}>
    <circle cx="20" cy="16" r="6" fill="color-mix(in oklch, var(--neon-green-light) 18%, white)" stroke={iconColors.deep} strokeWidth="1.6" />
    <path d="M10 38 C10 31 14 27 20 27 C26 27 30 31 30 38" stroke={iconColors.deep} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="34" cy="34" r="8" fill="none" stroke={iconColors.deep} strokeWidth="1.8" />
    <path d="M38 38 L42 42" stroke={iconColors.deep} strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="34" cy="32" rx="3" ry="4" fill={iconColors.ball} />
  </svg>
)

export const PaymentIcon = ({ className, ...props }: FeatureIconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={cn('size-8', className)} aria-hidden="true" {...props}>
    <rect x="8" y="14" width="32" height="22" rx="3" fill="color-mix(in oklch, var(--neon-green-light) 16%, white)" stroke={iconColors.deep} strokeWidth="1.8" />
    <path d="M8 20 H40" stroke={iconColors.deep} strokeWidth="1.8" />
    <circle cx="34" cy="28" r="4" fill={iconColors.ball} />
  </svg>
)

export const SupportIcon = ({ className, ...props }: FeatureIconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={cn('size-8', className)} aria-hidden="true" {...props}>
    <path d="M8 22 C8 14 15 8 24 8 C33 8 40 14 40 22 V28 H34 C32 28 31 29 31 31 V35 C31 37 29 39 27 39 H22 C20 39 18 37 18 35 V31 C18 29 17 28 15 28 H8 V22 Z" fill="color-mix(in oklch, var(--neon-green-light) 16%, white)" stroke={iconColors.deep} strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="36" cy="14" r="4" fill={iconColors.ball} />
  </svg>
)

type FeatureIconBadgeProps = {
  children: ReactNode
  className?: string
}

export const FeatureIconBadge = ({ children, className }: FeatureIconBadgeProps) => (
  <div
    className={cn(
      'mb-2 flex size-14 items-center justify-center rounded-full',
      'bg-[#fffef2]',
      'shadow-[0_2px_14px_color-mix(in_oklch,var(--neon-green-mid)_18%,transparent)]',
      'ring-1 ring-[color-mix(in_oklch,var(--neon-green-deep)_14%,transparent)]',
      'transition-shadow duration-300 group-hover:shadow-[0_4px_18px_color-mix(in_oklch,var(--neon-green-mid)_28%,transparent)]',
      className,
    )}
  >
    {children}
  </div>
)
