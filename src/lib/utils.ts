import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Объединяет CSS-классы с поддержкой Tailwind merge.
 * @param inputs - Список классов или условных выражений clsx.
 * @returns Итоговая строка классов.
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))
