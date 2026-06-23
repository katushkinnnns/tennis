/** Товар в каталоге магазина Vibe Boom Tennis. */
export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  brand: string
  images: string[]
  rating: number
  inStock: boolean
}

/** Параметры фильтрации каталога. */
export type ProductFilters = {
  search: string
  category: string
  brand: string
  minPrice: number
  maxPrice: number
  inStockOnly: boolean
}
