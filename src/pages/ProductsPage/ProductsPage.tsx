import { SearchX } from 'lucide-react'

import { ProductCard } from '@/components/product/ProductCard'
import { ProductFilter } from '@/components/product/ProductFilter'
import { EmptyState } from '@/components/product/EmptyState'
import { Skeleton } from '@/components/ui/skeleton'
import { useProductFilters } from '@/utils/hooks/useProductFilters'

/**
 * Страница каталога товаров с фильтрацией.
 */
export const ProductsPage = () => {
  const { filters, setFilters, resetFilters, filteredProducts, isLoading } =
    useProductFilters()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Каталог</h1>
        <p className="mt-1 text-muted-foreground">
          {isLoading ? 'Загрузка...' : `Найдено товаров: ${filteredProducts.length}`}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside>
          <ProductFilter filters={filters} onChange={setFilters} onReset={resetFilters} />
        </aside>

        <div>
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-80 w-full rounded-xl" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <EmptyState
              title="Товары не найдены"
              description="Попробуйте изменить параметры фильтра или сбросить их."
              actionLabel="Сбросить фильтры"
              onAction={resetFilters}
              icon={<SearchX className="size-12" />}
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
