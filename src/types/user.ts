/** Профиль пользователя. */
export type UserProfile = {
  name: string
  email: string
  phone: string
}

/** Оценка товара пользователем (1–5 звёзд). */
export type ProductRating = 1 | 2 | 3 | 4 | 5
