import { useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'

import { ProductCard } from '@/components/product/ProductCard'
import { EmptyState } from '@/components/product/EmptyState'
import { products } from '@/data/products'
import { ROUTES } from '@/constants/routes'
import { useFavorites } from '@/hooks/useFavorites'

/**
 * Страница избранных товаров.
 */
export const FavoritesPage = () => {
  const navigate = useNavigate()
  const { productIds } = useFavorites()
  const favoriteProducts = products.filter((p) => productIds.includes(p.id))

  const handleGoToCatalog = () => navigate(ROUTES.PRODUCTS)

  if (favoriteProducts.length === 0) {
    return (
      <EmptyState
        title="Избранное пусто"
        description="Добавляйте понравившиеся товары, нажимая на иконку сердца."
        actionLabel="Перейти в каталог"
        onAction={handleGoToCatalog}
        icon={<Heart className="size-12" />}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Избранное</h1>
        <p className="mt-1 text-muted-foreground">
          Товаров в избранном: {favoriteProducts.length}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {favoriteProducts.map((product) => (
          <ProductCard key={product.id} product={product} variant="compact" />
        ))}
      </div>
    </div>
  )
}
