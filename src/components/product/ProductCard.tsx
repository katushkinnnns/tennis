import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RatingStars } from '@/components/product/RatingStars'
import { formatPrice } from '@/lib/catalog'
import { getProductRoute } from '@/constants/routes'
import { useCart } from '@/hooks/useCart'
import { useFavorites } from '@/hooks/useFavorites'
import type { Product } from '@/types'
import { cn } from '@/lib/utils'

type ProductCardProps = {
  /** Данные товара */
  product: Product
  /** Компактный вид — для избранного и узких списков */
  variant?: 'default' | 'compact'
}

/**
 * Карточка товара для каталога и избранного.
 * @param props - Пропсы ProductCard.
 */
export const ProductCard = ({ product, variant = 'default' }: ProductCardProps) => {
  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [imageError, setImageError] = useState(false)
  const favorite = isFavorite(product.id)
  const isCompact = variant === 'compact'

  const handleAddToCart = () => {
    addItem(product.id)
    toast.success(`${product.name} добавлен в корзину`)
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product.id)
    toast.success(
      favorite ? `${product.name} удалён из избранного` : `${product.name} добавлен в избранное`,
    )
  }

  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
      <Link to={getProductRoute(product.id)} aria-label={`Подробнее о ${product.name}`}>
        <div
          className={cn(
            'relative overflow-hidden bg-card',
            isCompact ? 'aspect-[4/3]' : 'aspect-square',
          )}
        >
          {!imageError ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className={cn(
                'size-full object-contain transition-transform hover:scale-105',
                isCompact ? 'p-2' : 'p-3',
              )}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              Нет фото
            </div>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="absolute top-2 left-2 text-xs">
              Нет в наличии
            </Badge>
          )}
        </div>
      </Link>

      <CardHeader className={cn('flex-1', isCompact && 'gap-2 px-4 py-3')}>
        <CardTitle className={cn('line-clamp-2', isCompact ? 'text-sm' : 'text-base')}>
          <Link to={getProductRoute(product.id)} className="hover:text-primary">
            {product.name}
          </Link>
        </CardTitle>
        <div className="flex items-center justify-between gap-2">
          <span className={cn('font-bold text-primary', isCompact ? 'text-base' : 'text-lg')}>
            {formatPrice(product.price)}
          </span>
          <RatingStars
            value={product.rating}
            readOnly
            className={isCompact ? '[&_svg]:size-3.5 [&_button]:p-0' : undefined}
          />
        </div>
      </CardHeader>

      <CardContent className={cn('pb-0', isCompact && 'px-4 py-0')}>
        <p className="text-xs text-muted-foreground">
          {product.brand} · {product.category}
        </p>
      </CardContent>

      <CardFooter className={cn('gap-2 border-t-0 bg-transparent', isCompact && 'px-4 py-3')}>
        <Button
          className="flex-1"
          size={isCompact ? 'sm' : 'default'}
          onClick={handleAddToCart}
          disabled={!product.inStock}
          aria-label={`Добавить ${product.name} в корзину`}
        >
          <ShoppingCart className={cn(isCompact ? 'size-3.5' : 'size-4')} />
          В корзину
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={cn(favorite && 'text-red-500', isCompact && 'size-8')}
          onClick={handleToggleFavorite}
          aria-label={favorite ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
          <Heart className={cn(isCompact ? 'size-3.5' : 'size-4', favorite && 'fill-current')} />
        </Button>
      </CardFooter>
    </Card>
  )
}
