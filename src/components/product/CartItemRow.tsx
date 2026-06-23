import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { QuantityControl } from '@/components/product/QuantityControl'
import { formatPrice } from '@/lib/catalog'
import { getProductRoute } from '@/constants/routes'
import type { Product } from '@/types'

type CartItemRowProps = {
  /** Данные товара */
  product: Product
  /** Количество в корзине */
  quantity: number
  /** Обработчик изменения количества */
  onQuantityChange: (quantity: number) => void
  /** Обработчик удаления */
  onRemove: () => void
}

/**
 * Строка товара в корзине.
 * @param props - Пропсы CartItemRow.
 */
export const CartItemRow = ({
  product,
  quantity,
  onQuantityChange,
  onRemove,
}: CartItemRowProps) => {
  return (
    <div className="flex flex-col gap-4 border-b py-4 sm:flex-row sm:items-center">
      <Link to={getProductRoute(product.id)} className="shrink-0">
        <img
          src={product.images[0]}
          alt={product.name}
          className="size-24 rounded-lg object-cover"
          loading="lazy"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2">
        <Link
          to={getProductRoute(product.id)}
          className="font-medium hover:text-primary"
        >
          {product.name}
        </Link>
        <p className="text-sm text-muted-foreground">
          {product.brand} · {formatPrice(product.price)}
        </p>
        <QuantityControl value={quantity} onChange={onQuantityChange} />
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <span className="text-lg font-semibold">
          {formatPrice(product.price * quantity)}
        </span>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onRemove}
          aria-label={`Удалить ${product.name} из корзины`}
        >
          <Trash2 className="size-4 text-destructive" />
        </Button>
      </div>
    </div>
  )
}
