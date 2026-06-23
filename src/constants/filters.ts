import { catalogMaxPrice, catalogMinPrice } from '@/data/products'
import type { ProductFilters } from '@/types'

/** Начальные значения фильтра каталога. */
export const defaultProductFilters: ProductFilters = {
  search: '',
  category: '',
  brand: '',
  minPrice: catalogMinPrice,
  maxPrice: catalogMaxPrice,
  inStockOnly: false,
}
