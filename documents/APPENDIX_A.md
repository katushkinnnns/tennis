# Приложение А. Листинги программы

## Листинг А.1 – Функция loadProducts

```typescript
export const loadProducts = (): Product[] => {
  const imagesBySlug = buildImagesBySlug()

  const products = Object.entries(productMetaModules).map(([path, module]) => {
    const meta = module.default
    const slug = meta.slug || getSlugFromPath(path)
    const productFields: Omit<Product, 'images'> = {
      id: meta.id,
      name: meta.name,
      description: meta.description,
      price: meta.price,
      category: meta.category,
      brand: meta.brand,
      rating: meta.rating,
      inStock: meta.inStock,
    }

    return {
      ...productFields,
      images: resolveProductImages(meta, slug, imagesBySlug),
    } satisfies Product
  })

  return products.sort((a, b) => Number(a.id) - Number(b.id))
}
```

*Файл: `src/lib/loadProducts.ts`*

---

## Листинг А.2 – Функция filterProducts

```typescript
export const filterProducts = (
  productList: Product[],
  filters: ProductFilters,
): Product[] => {
  const searchLower = filters.search.trim().toLowerCase()

  return productList.filter((product) => {
    if (searchLower) {
      const haystack = `${product.name} ${product.category} ${product.brand}`.toLowerCase()
      if (!haystack.includes(searchLower)) {
        return false
      }
    }

    if (filters.category && product.category !== filters.category) {
      return false
    }

    if (filters.brand && product.brand !== filters.brand) {
      return false
    }

    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false
    }

    if (filters.inStockOnly && !product.inStock) {
      return false
    }

    return true
  })
}
```

*Файл: `src/lib/catalog.ts`*

---

## Листинг А.3 – Функция formatPrice

```typescript
export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price)
```

*Файл: `src/lib/catalog.ts`*

---

## Листинг А.4 – Функция getProductById

```typescript
export const getProductById = (
  productList: Product[],
  id: string,
): Product | undefined => productList.find((product) => product.id === id)
```

*Файл: `src/lib/catalog.ts`*

---

## Листинг А.5 – Функция getUniqueFieldValues

```typescript
export const getUniqueFieldValues = (
  productList: Product[],
  field: keyof Pick<Product, 'category' | 'brand'>,
): string[] => [...new Set(productList.map((product) => product[field]))].sort()
```

*Файл: `src/lib/catalog.ts`*

---

## Листинг А.6 – Функция getProductRoute

```typescript
export const getProductRoute = (id: string): string => `/products/${id}`
```

*Файл: `src/constants/routes.ts`*

---

## Листинг А.7 – Функция applyThemeClass

```typescript
export const applyThemeClass = (theme: Theme): void => {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}
```

*Файл: `src/lib/theme.ts`*

---

## Листинг А.8 – Функция getPersistedTheme

```typescript
export const getPersistedTheme = (): Theme | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.THEME)
    if (!raw) {
      return null
    }

    const parsed = JSON.parse(raw) as PersistedThemeState
    const theme = parsed.state?.theme
    return theme === 'dark' || theme === 'light' ? theme : null
  } catch {
    return null
  }
}
```

*Файл: `src/lib/theme.ts`*

---

## Листинг А.9 – Функция initializeTheme

```typescript
export const initializeTheme = (): void => {
  const persistedTheme = getPersistedTheme()
  if (!persistedTheme) {
    return
  }

  applyThemeClass(persistedTheme)
}
```

*Файл: `src/lib/theme.ts`*

---

## Листинг А.10 – Функция cn

```typescript
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))
```

*Файл: `src/lib/utils.ts`*

---

## Листинг А.11 – Функция useProducts

```typescript
export const useProducts = (): Product[] => products
```

*Файл: `src/hooks/useProducts.ts`*

---

## Листинг А.12 – Функция useProductFilters

```typescript
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
```

*Файл: `src/hooks/useProductFilters.ts`*

---

## Листинг А.13 – Функция useCart

```typescript
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
```

*Файл: `src/hooks/useCart.ts`*

---

## Листинг А.14 – Функция useFavorites

```typescript
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
```

*Файл: `src/hooks/useFavorites.ts`*

---

## Листинг А.15 – Функция useRatings

```typescript
export const useRatings = (): UseRatingsReturn => {
  const getRating = useRatingsStore((state) => state.getRating)
  const setRating = useRatingsStore((state) => state.setRating)

  return { getRating, setRating }
}
```

*Файл: `src/hooks/useRatings.ts`*

---

## Листинг А.16 – Функция useTheme

```typescript
export const useTheme = (): UseThemeReturn => {
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  useEffect(() => {
    applyThemeClass(theme)
  }, [theme])

  return {
    theme,
    isDark: theme === 'dark',
    setTheme,
    toggleTheme,
  }
}
```

*Файл: `src/hooks/useTheme.ts`*

---

## Листинг А.17 – Функция useCartStore.addItem

```typescript
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
```

*Файл: `src/stores/cartStore.ts`*

---

## Листинг А.18 – Функция useCartStore.removeItem

```typescript
removeItem: (productId) => {
  set({ items: get().items.filter((item) => item.productId !== productId) })
},
```

*Файл: `src/stores/cartStore.ts`*

---

## Листинг А.19 – Функция useCartStore.updateQuantity

```typescript
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
```

*Файл: `src/stores/cartStore.ts`*

---

## Листинг А.20 – Функция useCartStore.clearCart

```typescript
clearCart: () => set({ items: [] }),
```

*Файл: `src/stores/cartStore.ts`*

---

## Листинг А.21 – Функция useFavoritesStore.toggleFavorite

```typescript
toggleFavorite: (productId) => {
  const { productIds } = get()

  if (productIds.includes(productId)) {
    set({ productIds: productIds.filter((id) => id !== productId) })
    return
  }

  set({ productIds: [...productIds, productId] })
},
```

*Файл: `src/stores/favoritesStore.ts`*

---

## Листинг А.22 – Функция useFavoritesStore.isFavorite

```typescript
isFavorite: (productId) => get().productIds.includes(productId),
```

*Файл: `src/stores/favoritesStore.ts`*

---

## Листинг А.23 – Функция useFavoritesStore.removeFavorite

```typescript
removeFavorite: (productId) => {
  set({ productIds: get().productIds.filter((id) => id !== productId) })
},
```

*Файл: `src/stores/favoritesStore.ts`*

---

## Листинг А.24 – Функция useUserStore.setProfile

```typescript
setProfile: (profile) => set({ ...profile }),
```

*Файл: `src/stores/userStore.ts`*

---

## Листинг А.25 – Функция useUserStore.resetProfile

```typescript
resetProfile: () => set({ ...defaultProfile }),
```

*Файл: `src/stores/userStore.ts`*

---

## Листинг А.26 – Функция useRatingsStore.setRating

```typescript
setRating: (productId, rating) => {
  set({ ratings: { ...get().ratings, [productId]: rating } })
},
```

*Файл: `src/stores/ratingsStore.ts`*

---

## Листинг А.27 – Функция useRatingsStore.getRating

```typescript
getRating: (productId) => get().ratings[productId],
```

*Файл: `src/stores/ratingsStore.ts`*

---

## Листинг А.28 – Функция useThemeStore.setTheme

```typescript
setTheme: (theme) => set({ theme }),
```

*Файл: `src/stores/themeStore.ts`*

---

## Листинг А.29 – Функция useThemeStore.toggleTheme

```typescript
toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
```

*Файл: `src/stores/themeStore.ts`*
