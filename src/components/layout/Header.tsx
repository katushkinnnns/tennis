import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, User } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { ROUTES } from '@/utils/constants/routes'
import { useCart } from '@/utils/hooks/useCart'
import { useFavorites } from '@/utils/hooks/useFavorites'
import { cn } from '@/lib/utils'

/**
 * Шапка сайта с навигацией и счётчиками корзины/избранного.
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
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to={ROUTES.HOME}
          className="text-xl font-bold text-primary"
          aria-label="Tennis Boom — на главную"
        >
          Tennis Boom
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
                  className="ml-0.5 size-5 justify-center rounded-full p-0 text-xs"
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
