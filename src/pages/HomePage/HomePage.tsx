import { Link } from 'react-router-dom'

import { homeFeatureIconMap } from '@/components/icons/homeFeatureIconMap'
import { FeatureIconBadge } from '@/components/icons/FeatureIcons'
import { Logo } from '@/components/layout/Logo'
import { ProductCard } from '@/components/product/ProductCard'
import { StoreName } from '@/components/layout/StoreName'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CTA_SLOGAN, CTA_SLOGAN_PARTS, STORE_NAME, STORE_SLOGAN } from '@/constants/branding'
import { ROUTES } from '@/constants/routes'
import { featuredProducts, homeFeatures } from '@/data/homePageContent'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  title: string
  subtitle?: string
  className?: string
}

const SectionHeading = ({ title, subtitle, className }: SectionHeadingProps) => (
  <div className={cn('mb-8 text-center', className)}>
    <h2 className="neon-text-green-tennis text-2xl font-semibold sm:text-3xl">{title}</h2>
    {subtitle && <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>}
  </div>
)

/**
 * Главная страница магазина Vibe Boom Tennis.
 */
export const HomePage = () => {
  return (
    <div className="space-y-20 pb-4">
      <section className="relative overflow-hidden rounded-2xl border neon-border bg-gradient-to-br from-[color-mix(in_oklch,var(--neon-green-light)_14%,var(--background))] via-background to-[color-mix(in_oklch,var(--neon-green-deep)_8%,var(--background))] px-6 py-16 sm:px-12 sm:py-24">
          <div
            className="pointer-events-none absolute -top-16 right-0 size-48 rounded-full bg-[color-mix(in_oklch,var(--neon-green-light)_12%,transparent)] blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 left-0 size-56 rounded-full bg-[color-mix(in_oklch,var(--neon-green-mid)_10%,transparent)] blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center">
            <div className="group hidden lg:block">
              <Logo className="size-44" />
            </div>

            <div className="max-w-2xl space-y-6">
              <h1 className="lg:sr-only">
                <StoreName />
              </h1>

              <p
                className="text-2xl font-black tracking-wide sm:text-3xl md:text-4xl"
                aria-label={STORE_SLOGAN}
              >
                <span className="neon-text-green-vibe">Лови vibe.</span>{' '}
                <span className="neon-text-green-boom">Твори boom</span>
              </p>

              <div className="group lg:hidden">
                <Logo className="size-28" />
              </div>

              <p className="text-lg text-muted-foreground">
                {STORE_NAME} — магазин теннисной экипировки для тех, кто играет ярко.
                Подберём ракетку, обувь и аксессуары для побед на корте.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to={ROUTES.PRODUCTS}
                  className={cn(buttonVariants({ size: 'lg' }), 'neon-glow text-base font-bold')}
                >
                  Перейти в каталог
                </Link>
                <Link
                  to={ROUTES.FAVORITES}
                  className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), 'font-semibold')}
                >
                  Избранное
                </Link>
              </div>
            </div>
          </div>
        </section>

      <section>
        <SectionHeading
          title="Хиты каталога"
          subtitle="Товары с лучшими оценками от игроков Vibe Boom Tennis"
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to={ROUTES.PRODUCTS} className={cn(buttonVariants(), 'neon-glow font-bold')}>
            Все товары
          </Link>
        </div>
      </section>

      <section>
        <SectionHeading
          title="Почему выбирают нас"
          subtitle="Vibe Boom Tennis — это не просто магазин, а партнёр на корте"
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {homeFeatures.map(({ iconId, title, description, details }) => {
            const Icon = homeFeatureIconMap[iconId]

            return (
            <Card key={title} className="group neon-border transition-shadow hover:neon-glow-soft">
              <CardHeader>
                <FeatureIconBadge>
                  <Icon className="size-8 text-primary" strokeWidth={1.75} aria-hidden="true" />
                </FeatureIconBadge>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium text-foreground">{description}</p>
                <p className="text-sm text-muted-foreground">{details}</p>
              </CardContent>
            </Card>
            )
          })}
        </div>
      </section>

      <section className="rounded-2xl border neon-border bg-gradient-to-br from-[color-mix(in_oklch,var(--neon-green-light)_10%,var(--background))] to-[color-mix(in_oklch,var(--neon-green-deep)_6%,var(--background))] px-6 py-12 text-center sm:px-12">
        <p className="text-xl font-black sm:text-2xl" aria-label={CTA_SLOGAN}>
          {CTA_SLOGAN_PARTS.map((part, index) => (
            <span key={part.text}>
              {index > 0 && ' '}
              <span className={part.className}>{part.text}</span>
            </span>
          ))}
        </p>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Изучите наш каталог и найдите идеальную экипировку для следующего матча.
          Бесплатная доставка при заказе от 10 000 ₽.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to={ROUTES.PRODUCTS}
            className={cn(buttonVariants({ size: 'lg' }), 'neon-glow font-bold')}
          >
            Смотреть товары
          </Link>
          <Link
            to={ROUTES.USER}
            className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), 'font-semibold')}
          >
            Мой профиль
          </Link>
        </div>
      </section>
    </div>
  )
}
