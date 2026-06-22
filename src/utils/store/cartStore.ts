import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { STORAGE_KEYS } from '@/utils/constants/catalog'
import type { CartItem } from '@/utils/types/product'

type CartState = {
  items: CartItem[]
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

/**
 * Store корзины с персистентностью в localStorage.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId, quantity = 1) => {
        const existing = get().items.find((item) => item.productId === productId)

        if (existing) {
          set({
            items: get().items.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          })
          return
        }

        set({ items: [...get().items, { productId, quantity }] })
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.productId !== productId) })
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set({
          items: get().items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item,
          ),
        })
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: STORAGE_KEYS.CART,
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
