import { useMemo } from 'react'

import { products, catalogMaxPrice, catalogMinPrice } from '@/utils/data/products'
import type { Product, ProductFilters } from '@/utils/types/product'
import { useCartStore } from '@/utils/store/cartStore'

type UseCartReturn = {
  items: ReturnType<typeof useCartStore.getState>['items']
  totalItems: number
  totalPrice: number
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getCartProducts: () => Array<{ product: Product; quantity: number }>
}

/**
 * Хук-обёртка над корзиной с расчётом итогов.
 * @returns Методы корзины и агрегированные данные.
 */
export const useCart = (): UseCartReturn => {
  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )

  const getCartProducts = () =>
    items
      .map((item) => {
        const product = products.find((p) => p.id === item.productId)
        if (!product) return null
        return { product, quantity: item.quantity }
      })
      .filter((item): item is { product: Product; quantity: number } => item !== null)

  const totalPrice = useMemo(
    () =>
      items.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId)
        return product ? sum + product.price * item.quantity : sum
      }, 0),
    [items],
  )

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getCartProducts,
  }
}

/**
 * Начальные значения фильтра каталога.
 */
export const defaultFilters: ProductFilters = {
  search: '',
  category: '',
  brand: '',
  minPrice: catalogMinPrice,
  maxPrice: catalogMaxPrice,
  inStockOnly: false,
}
