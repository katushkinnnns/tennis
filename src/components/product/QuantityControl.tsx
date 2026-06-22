import { Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

type QuantityControlProps = {
  /** Текущее количество */
  value: number
  /** Минимальное значение */
  min?: number
  /** Максимальное значение */
  max?: number
  /** Обработчик изменения количества */
  onChange: (value: number) => void
}

/**
 * Компонент управления количеством товара.
 * @param props - Пропсы QuantityControl.
 */
export const QuantityControl = ({
  value,
  min = 1,
  max = 99,
  onChange,
}: QuantityControlProps) => {
  const handleDecrease = () => {
    if (value > min) onChange(value - 1)
  }

  const handleIncrease = () => {
    if (value < max) onChange(value + 1)
  }

  const handleKeyDown = (event: React.KeyboardEvent, action: 'decrease' | 'increase') => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (action === 'decrease') handleDecrease()
      else handleIncrease()
    }
  }

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Количество товара">
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        onClick={handleDecrease}
        disabled={value <= min}
        aria-label="Уменьшить количество"
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, 'decrease')}
      >
        <Minus className="size-4" />
      </Button>
      <span className="min-w-8 text-center font-medium" aria-live="polite">
        {value}
      </span>
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        onClick={handleIncrease}
        disabled={value >= max}
        aria-label="Увеличить количество"
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, 'increase')}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  )
}
