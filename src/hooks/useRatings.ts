import { useRatingsStore } from '@/stores/ratingsStore'
import type { ProductRating } from '@/types'

type UseRatingsReturn = {
  getRating: (productId: string) => ProductRating | undefined
  setRating: (productId: string, rating: ProductRating) => void
}

export const useRatings = (): UseRatingsReturn => {
  const getRating = useRatingsStore((state) => state.getRating)
  const setRating = useRatingsStore((state) => state.setRating)

  return { getRating, setRating }
}
