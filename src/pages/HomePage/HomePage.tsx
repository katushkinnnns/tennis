import { Link } from 'react-router-dom'
import { Package, Shield, Truck } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES } from '@/utils/constants/routes'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: Package,
    title: 'Широкий ассортимент',
    description: 'Ракетки, мячи, одежда и обувь от Wilson, Head, Babolat, Nike и других брендов.',
  },
  {
    icon: Truck,
    title: 'Быстрая доставка',
    description: 'Отправляем заказы по всей России. Бесплатная доставка при заказе от 10 000 ₽.',
  },
  {
    icon: Shield,
    title: 'Гарантия качества',
    description: 'Только оригинальная продукция с официальной гарантией производителя.',
  },
]

/**
 * Главная страница с описанием магазина Tennis Boom.
 */
export const HomePage = () => {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-primary/5 px-6 py-16 sm:px-12 sm:py-24">
        <div className="relative z-10 max-w-2xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Tennis Boom — ваш мир тенниса
          </h1>
          <p className="text-lg text-muted-foreground">
            Профессиональная и любительская экипировка для игроков любого уровня.
            Подберём ракетку, обувь и аксессуары для побед на корте.
          </p>
          <Link to={ROUTES.PRODUCTS} className={cn(buttonVariants({ size: 'lg' }))}>
            Перейти в каталог
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-center text-2xl font-semibold">Почему выбирают нас</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-muted/50 px-6 py-12 text-center sm:px-12">
        <h2 className="text-2xl font-semibold">Готовы к игре?</h2>
        <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
          Изучите наш каталог и найдите идеальную экипировку для следующего матча.
        </p>
        <Link to={ROUTES.PRODUCTS} className={cn(buttonVariants({ size: 'lg' }))}>
          Смотреть товары
        </Link>
      </section>
    </div>
  )
}
