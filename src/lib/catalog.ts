import type { Product, ProductFilters } from '@/types'

/** Форматирует число как цену в рублях. */
export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price)

/** Находит товар по идентификатору. */
export const getProductById = (
  productList: Product[],
  id: string,
): Product | undefined => productList.find((product) => product.id === id)

/** Фильтрует список товаров по заданным параметрам. */
export const filterProducts = (
  productList: Product[],
  filters: ProductFilters,
): Product[] => {
  const searchLower = filters.search.trim().toLowerCase()

  return productList.filter((product) => {
    if (searchLower) {
      const haystack = `${product.name} ${product.category} ${product.brand}`.toLowerCase()
      if (!haystack.includes(searchLower)) {
        return false
      }
    }

    if (filters.category && product.category !== filters.category) {
      return false
    }

    if (filters.brand && product.brand !== filters.brand) {
      return false
    }

    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false
    }

    if (filters.inStockOnly && !product.inStock) {
      return false
    }

    return true
  })
}

/** Извлекает уникальные значения поля из списка товаров. */
export const getUniqueFieldValues = (
  productList: Product[],
  field: keyof Pick<Product, 'category' | 'brand'>,
): string[] => [...new Set(productList.map((product) => product[field]))].sort()
