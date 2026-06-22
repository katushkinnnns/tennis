import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'

import { ProductGallery } from '@/components/product/ProductGallery'
import { RatingStars } from '@/components/product/RatingStars'
import { QuantityControl } from '@/components/product/QuantityControl'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { formatPrice, getProductById } from '@/utils/helpers/catalog'
import { ROUTES } from '@/utils/constants/routes'
import { products } from '@/utils/data/products'
import { useCart } from '@/utils/hooks/useCart'
import { useFavorites } from '@/utils/hooks/useFavorites'
import { useRatingsStore } from '@/utils/store/ratingsStore'
import type { ProductRating } from '@/utils/types/product'
import { cn } from '@/lib/utils'

/**
 * Страница детальной информации о товаре.
 */
export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const product = id ? getProductById(products, id) : undefined
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const userRating = useRatingsStore((state) => (id ? state.getRating(id) : undefined))
  const setRating = useRatingsStore((state) => state.setRating)

  if (!product) {
    return <Navigate to="/404" replace />
  }

  const favorite = isFavorite(product.id)
  const displayRating = userRating ?? product.rating

  const handleAddToCart = () => {
    addItem(product.id, quantity)
    toast.success(`${product.name} (${quantity} шт.) добавлен в корзину`)
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product.id)
    toast.success(
      favorite ? 'Удалено из избранного' : 'Добавлено в избранное',
    )
  }

  const handleRatingChange = (rating: ProductRating) => {
    setRating(product.id, rating)
    toast.success(`Ваша оценка: ${rating} звёзд`)
  }

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to={ROUTES.HOME} />}>Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to={ROUTES.PRODUCTS} />}>Каталог</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery images={product.images} alt={product.name} />

        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{product.category}</Badge>
              <Badge variant="outline">{product.brand}</Badge>
              {product.inStock ? (
                <Badge className="bg-primary/10 text-primary">В наличии</Badge>
              ) : (
                <Badge variant="destructive">Нет в наличии</Badge>
              )}
            </div>
            <h1 className="mt-3 text-3xl font-bold">{product.name}</h1>
            <p className="mt-4 text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Рейтинг</p>
            <div className="flex items-center gap-3">
              <RatingStars value={displayRating} readOnly />
              <span className="text-sm text-muted-foreground">
                {displayRating.toFixed(1)} / 5
              </span>
            </div>
          </div>

          <Separator />

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm font-medium">Ваша оценка</p>
            <RatingStars
              value={userRating ?? 0}
              onChange={handleRatingChange}
            />
          </div>

          <div className="space-y-4">
            <p className="text-sm font-medium">Количество</p>
            <QuantityControl value={quantity} onChange={setQuantity} />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 sm:flex-none"
            >
              <ShoppingCart className="size-4" />
              В корзину
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleToggleFavorite}
              aria-label={favorite ? 'Убрать из избранного' : 'Добавить в избранное'}
            >
              <Heart className={cn('size-4', favorite && 'fill-red-500 text-red-500')} />
              {favorite ? 'В избранном' : 'В избранное'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
