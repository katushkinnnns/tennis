import type { Product, ProductFilters } from '@/utils/types/product'

/**
 * Форматирует число как цену в рублях.
 * @param price - Цена в рублях.
 * @returns Отформатированная строка цены.
 */
export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price)

/**
 * Находит товар по идентификатору.
 * @param products - Список товаров.
 * @param id - Идентификатор товара.
 * @returns Товар или undefined, если не найден.
 */
export const getProductById = (
  products: Product[],
  id: string,
): Product | undefined => products.find((product) => product.id === id)

/**
 * Фильтрует список товаров по заданным параметрам.
 * @param products - Исходный список товаров.
 * @param filters - Параметры фильтрации.
 * @returns Отфильтрованный список товаров.
 */
export const filterProducts = (
  products: Product[],
  filters: ProductFilters,
): Product[] => {
  const searchLower = filters.search.trim().toLowerCase()

  return products.filter((product) => {
    if (searchLower && !product.name.toLowerCase().includes(searchLower)) {
      return false
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

/**
 * Извлекает уникальные значения поля из списка товаров.
 * @param products - Список товаров.
 * @param field - Поле для извлечения.
 * @returns Отсортированный массив уникальных значений.
 */
export const getUniqueFieldValues = (
  products: Product[],
  field: keyof Pick<Product, 'category' | 'brand'>,
): string[] => [...new Set(products.map((p) => p[field]))].sort()
