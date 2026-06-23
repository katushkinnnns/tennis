import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { STORAGE_KEYS } from '@/constants/catalog'

type FavoritesState = {
  productIds: string[]
  toggleFavorite: (productId: string) => void
  isFavorite: (productId: string) => boolean
  removeFavorite: (productId: string) => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      productIds: [],
      toggleFavorite: (productId) => {
        const { productIds } = get()

        if (productIds.includes(productId)) {
          set({ productIds: productIds.filter((id) => id !== productId) })
          return
        }

        set({ productIds: [...productIds, productId] })
      },
      isFavorite: (productId) => get().productIds.includes(productId),
      removeFavorite: (productId) => {
        set({ productIds: get().productIds.filter((id) => id !== productId) })
      },
    }),
    {
      name: STORAGE_KEYS.FAVORITES,
      partialize: (state) => ({ productIds: state.productIds }),
    },
  ),
)
