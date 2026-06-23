import { useEffect, useMemo, useState } from 'react'

import { defaultProductFilters } from '@/constants/filters'
import { filterProducts } from '@/lib/catalog'
import type { Product, ProductFilters } from '@/types'
import { useProducts } from '@/hooks/useProducts'

type UseProductFiltersReturn = {
  filters: ProductFilters
  setFilters: React.Dispatch<React.SetStateAction<ProductFilters>>
  resetFilters: () => void
  filteredProducts: Product[]
  isLoading: boolean
}

export const useProductFilters = (): UseProductFiltersReturn => {
  const allProducts = useProducts()
  const [filters, setFilters] = useState<ProductFilters>(defaultProductFilters)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const filteredProducts = useMemo(
    () => filterProducts(allProducts, filters),
    [allProducts, filters],
  )

  const resetFilters = () => setFilters(defaultProductFilters)

  return {
    filters,
    setFilters,
    resetFilters,
    filteredProducts,
    isLoading,
  }
}
