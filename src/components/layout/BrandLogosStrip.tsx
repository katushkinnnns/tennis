import { BRANDS } from '@/constants/catalog'
import { cn } from '@/lib/utils'

const brandAccentClasses = [
  'neon-text-green-vibe',
  'neon-text-green-boom',
  'neon-text-green-tennis',
] as const

/**
 * Горизонтальная полоса названий брендов магазина.
 */
export const BrandLogosStrip = () => {
  return (
    <section
      className="overflow-hidden rounded-xl border neon-border bg-card/70 px-3 py-4 backdrop-blur-sm sm:px-5"
      aria-label="Бренды в каталоге"
    >
      <ul className="grid grid-cols-7 items-center gap-2 sm:gap-4">
        {BRANDS.map((brand, index) => (
          <li key={brand} className="flex min-w-0 items-center justify-center">
            <span
              className={cn(
                'truncate text-center text-xs font-bold tracking-wide sm:text-sm',
                brandAccentClasses[index % brandAccentClasses.length],
              )}
            >
              {brand}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
