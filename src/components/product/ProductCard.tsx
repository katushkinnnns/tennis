import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RatingStars } from '@/components/product/RatingStars'
import { formatPrice } from '@/utils/helpers/catalog'
import { getProductRoute } from '@/utils/constants/routes'
import { useCart } from '@/utils/hooks/useCart'
import { useFavorites } from '@/utils/hooks/useFavorites'
import type { Product } from '@/utils/types/product'
import { cn } from '@/lib/utils'

type ProductCardProps = {
  /** Данные товара */
  product: Product
}

/**
 * Карточка товара для каталога и избранного.
 * @param props - Пропсы ProductCard.
 */
export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [imageError, setImageError] = useState(false)
  const favorite = isFavorite(product.id)

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
        <div className="relative aspect-square overflow-hidden bg-muted">
          {!imageError ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="size-full object-cover transition-transform hover:scale-105"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              Нет фото
            </div>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="absolute top-2 left-2">
              Нет в наличии
            </Badge>
          )}
        </div>
      </Link>

      <CardHeader className="flex-1">
        <CardTitle className="line-clamp-2 text-base">
          <Link to={getProductRoute(product.id)} className="hover:text-primary">
            {product.name}
          </Link>
        </CardTitle>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
          <RatingStars value={product.rating} readOnly />
        </div>
      </CardHeader>

      <CardContent className="pb-0">
        <p className="text-xs text-muted-foreground">
          {product.brand} · {product.category}
        </p>
      </CardContent>

      <CardFooter className="gap-2 border-t-0 bg-transparent">
        <Button
          className="flex-1"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          aria-label={`Добавить ${product.name} в корзину`}
        >
          <ShoppingCart className="size-4" />
          В корзину
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleToggleFavorite}
          aria-label={favorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          className={cn(favorite && 'text-red-500')}
        >
          <Heart className={cn('size-4', favorite && 'fill-current')} />
        </Button>
      </CardFooter>
    </Card>
  )
}
