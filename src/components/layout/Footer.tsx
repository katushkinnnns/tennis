import { STORE_NAME } from '@/constants/branding'
import { StoreName } from '@/components/layout/StoreName'

/**
 * Подвал сайта с информацией о магазине.
 */
export const Footer = () => {
  return (
    <footer className="mt-auto border-t neon-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold">
              <StoreName />
            </p>
            <p className="mt-1 text-sm font-medium">
              <span className="neon-text-green-vibe">Лови vibe.</span>{' '}
              <span className="neon-text-green-boom">Твори boom</span>
            </p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {STORE_NAME} — магазин теннисной экипировки: ракетки, мячи, одежда и обувь от ведущих брендов.
              Доставка по всей России.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {STORE_NAME}. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
