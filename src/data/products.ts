import { loadProducts } from '@/lib/loadProducts'

export const products = loadProducts()

export const catalogMinPrice = Math.min(...products.map((p) => p.price))

export const catalogMaxPrice = Math.max(...products.map((p) => p.price))
