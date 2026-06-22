import { useMemo } from 'react'

import { products } from '@/utils/data/products'
import type { Product } from '@/utils/types/product'

/**
 * Хук для доступа к мок-каталогу товаров.
 * @returns Список всех товаров.
 */
export const useProducts = (): Product[] => {
  return useMemo(() => products, [])
}
