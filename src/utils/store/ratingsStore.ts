import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { STORAGE_KEYS } from '@/utils/constants/catalog'
import type { ProductRating } from '@/utils/types/product'

type RatingsState = {
  ratings: Record<string, ProductRating>
  setRating: (productId: string, rating: ProductRating) => void
  getRating: (productId: string) => ProductRating | undefined
}

/**
 * Store пользовательских оценок товаров с персистентностью в localStorage.
 */
export const useRatingsStore = create<RatingsState>()(
  persist(
    (set, get) => ({
      ratings: {},
      setRating: (productId, rating) => {
        set({ ratings: { ...get().ratings, [productId]: rating } })
      },
      getRating: (productId) => get().ratings[productId],
    }),
    {
      name: STORAGE_KEYS.RATINGS,
      partialize: (state) => ({ ratings: state.ratings }),
    },
  ),
)
