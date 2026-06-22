import { useEffect, useMemo, useState } from 'react'

import { defaultFilters } from '@/utils/hooks/useCart'
import { filterProducts } from '@/utils/helpers/catalog'
import type { Product, ProductFilters } from '@/utils/types/product'
import { useProducts } from '@/utils/hooks/useProducts'

type UseProductFiltersReturn = {
  filters: ProductFilters
  setFilters: React.Dispatch<React.SetStateAction<ProductFilters>>
  resetFilters: () => void
  filteredProducts: Product[]
  isLoading: boolean
}

/**
 * Хук фильтрации каталога товаров с имитацией загрузки.
 * @returns Состояние фильтров и отфильтрованный список.
 */
export const useProductFilters = (): UseProductFiltersReturn => {
  const allProducts = useProducts()
  const [filters, setFilters] = useState<ProductFilters>(defaultFilters)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const filteredProducts = useMemo(
    () => filterProducts(allProducts, filters),
    [allProducts, filters],
  )

  const resetFilters = () => setFilters(defaultFilters)

  return {
    filters,
    setFilters,
    resetFilters,
    filteredProducts,
    isLoading,
  }
}
