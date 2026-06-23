import { Link } from 'react-router-dom'

import { buttonVariants } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

/**
 * Страница 404 — товар или маршрут не найден.
 */
export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold">Страница не найдена</h2>
      <p className="max-w-md text-muted-foreground">
        Запрашиваемая страница не существует или была удалена.
      </p>
      <Link to={ROUTES.HOME} className={cn(buttonVariants())}>
        На главную
      </Link>
    </div>
  )
}
