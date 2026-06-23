/** Ключи localStorage для Zustand persist (legacy-префикс сохранён для совместимости). */
export const STORAGE_KEYS = {
  CART: 'tennis-boom-cart',
  FAVORITES: 'tennis-boom-favorites',
  USER: 'tennis-boom-user',
  RATINGS: 'tennis-boom-ratings',
} as const

/** Категории товаров */
export const CATEGORIES = [
  'Ракетки',
  'Мячи',
  'Одежда',
  'Обувь',
  'Аксессуары',
] as const

/** Бренды товаров */
export const BRANDS = [
  'Wilson',
  'Head',
  'Babolat',
  'Nike',
  'Adidas',
  'Yonex',
  'Asics',
] as const
