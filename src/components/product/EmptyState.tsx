import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'

type EmptyStateProps = {
  /** Заголовок заглушки */
  title: string
  /** Описание */
  description: string
  /** Текст кнопки действия */
  actionLabel?: string
  /** Обработчик клика по кнопке */
  onAction?: () => void
  /** Дополнительный контент (иконка) */
  icon?: ReactNode
}

/**
 * Универсальная заглушка для пустых состояний страниц.
 * @param props - Пропсы компонента EmptyState.
 */
export const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      {icon && <div className="text-muted-foreground">{icon}</div>}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="max-w-md text-muted-foreground">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button onClick={onAction} aria-label={actionLabel}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
