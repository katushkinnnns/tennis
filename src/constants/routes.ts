/** Маршруты приложения */
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  FAVORITES: '/favorites',
  USER: '/user',
  NOT_FOUND: '/404',
} as const

/**
 * Формирует путь к странице товара.
 * @param id - Идентификатор товара.
 * @returns URL страницы товара.
 */
export const getProductRoute = (id: string): string => `/products/${id}`
