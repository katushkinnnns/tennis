/**
 * Товар в каталоге магазина Tennis Boom.
 */
export type Product = {
  /** Уникальный идентификатор товара */
  id: string
  /** Название товара */
  name: string
  /** Подробное описание */
  description: string
  /** Цена в рублях */
  price: number
  /** Категория товара */
  category: string
  /** Бренд производителя */
  brand: string
  /** Список URL изображений */
  images: string[]
  /** Средний рейтинг из мок-данных (1–5) */
  rating: number
  /** Наличие на складе */
  inStock: boolean
}

/**
 * Позиция в корзине.
 */
export type CartItem = {
  /** Идентификатор товара */
  productId: string
  /** Количество единиц */
  quantity: number
}

/**
 * Профиль пользователя.
 */
export type UserProfile = {
  /** Имя пользователя */
  name: string
  /** Email */
  email: string
  /** Телефон */
  phone: string
}

/**
 * Оценка товара пользователем (1–5 звёзд).
 */
export type ProductRating = 1 | 2 | 3 | 4 | 5

/**
 * Параметры фильтрации каталога.
 */
export type ProductFilters = {
  /** Поисковый запрос по названию */
  search: string
  /** Фильтр по категории (пустая строка — все) */
  category: string
  /** Фильтр по бренду (пустая строка — все) */
  brand: string
  /** Минимальная цена */
  minPrice: number
  /** Максимальная цена */
  maxPrice: number
  /** Показывать только товары в наличии */
  inStockOnly: boolean
}
