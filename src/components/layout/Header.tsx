import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, User } from 'lucide-react'

import { Logo } from '@/components/layout/Logo'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { STORE_NAME } from '@/constants/branding'
import { ROUTES } from '@/constants/routes'
import { useCart } from '@/hooks/useCart'
import { useFavorites } from '@/hooks/useFavorites'
import { cn } from '@/lib/utils'

/**
 * Шапка сайта с анимированным логотипом и навигацией.
 */
export const Header = () => {
  const { totalItems } = useCart()
  const { favoritesCount } = useFavorites()

  const navLinks = [
    { to: ROUTES.HOME, label: 'Главная' },
    { to: ROUTES.PRODUCTS, label: 'Каталог' },
    { to: ROUTES.CART, label: 'Корзина', icon: ShoppingCart, count: totalItems },
    { to: ROUTES.FAVORITES, label: 'Избранное', icon: Heart, count: favoritesCount },
    { to: ROUTES.USER, label: 'Профиль', icon: User },
  ]

  return (
    <header className="sticky top-0 z-50 border-b neon-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to={ROUTES.HOME}
          className="group flex min-w-0 items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`${STORE_NAME} — на главную`}
        >
          <Logo className="size-11 sm:size-12" />
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Основная навигация">
          {navLinks.map(({ to, label, icon: Icon, count }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'relative flex items-center gap-1.5',
              )}
            >
              {Icon && <Icon className="size-4" aria-hidden="true" />}
              <span className="hidden sm:inline">{label}</span>
              {count !== undefined && count > 0 && (
                <Badge
                  variant="default"
                  className="ml-0.5 size-5 justify-center rounded-full p-0 text-xs neon-glow"
                  aria-label={`${label}: ${count}`}
                >
                  {count}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
