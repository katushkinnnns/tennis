import { useCallback } from 'react'

import { useFavoritesStore } from '@/stores/favoritesStore'

type UseFavoritesReturn = {
  productIds: string[]
  favoritesCount: number
  isFavorite: (productId: string) => boolean
  toggleFavorite: (productId: string) => void
  removeFavorite: (productId: string) => void
}

export const useFavorites = (): UseFavoritesReturn => {
  const productIds = useFavoritesStore((state) => state.productIds)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const isFavorite = useFavoritesStore((state) => state.isFavorite)
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite)

  const handleToggleFavorite = useCallback(
    (productId: string) => toggleFavorite(productId),
    [toggleFavorite],
  )

  return {
    productIds,
    favoritesCount: productIds.length,
    isFavorite,
    toggleFavorite: handleToggleFavorite,
    removeFavorite,
  }
}
