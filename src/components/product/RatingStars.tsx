import { Star } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { ProductRating } from '@/utils/types/product'

type RatingStarsProps = {
  /** Текущее значение рейтинга (0 — не оценено) */
  value: number
  /** Режим только для чтения */
  readOnly?: boolean
  /** Обработчик выбора оценки */
  onChange?: (rating: ProductRating) => void
  /** Дополнительные CSS-классы */
  className?: string
}

/**
 * Компонент отображения и выбора рейтинга (1–5 звёзд).
 * @param props - Пропсы RatingStars.
 */
export const RatingStars = ({
  value,
  readOnly = false,
  onChange,
  className,
}: RatingStarsProps) => {
  const handleSelect = (rating: ProductRating) => {
    if (!readOnly && onChange) onChange(rating)
  }

  const handleKeyDown = (event: React.KeyboardEvent, rating: ProductRating) => {
    if (readOnly) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleSelect(rating)
    }
  }

  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={readOnly ? `Рейтинг: ${value} из 5` : 'Выберите оценку'}
    >
      {([1, 2, 3, 4, 5] as ProductRating[]).map((star) => {
        const filled = star <= Math.round(value)

        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            className={cn(
              'rounded p-0.5 transition-colors',
              readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110',
              filled ? 'text-amber-500' : 'text-muted-foreground/40',
            )}
            onClick={() => handleSelect(star)}
            onKeyDown={(e) => handleKeyDown(e, star)}
            aria-label={`${star} звезд`}
            tabIndex={readOnly ? -1 : 0}
            role={readOnly ? undefined : 'radio'}
            aria-checked={!readOnly ? star === value : undefined}
          >
            <Star className={cn('size-5', filled && 'fill-current')} />
          </button>
        )
      })}
    </div>
  )
}
