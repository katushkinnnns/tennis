import { STORE_NAME_PARTS } from '@/constants/branding'
import { cn } from '@/lib/utils'

type StoreNameProps = {
  className?: string
}

/**
 * Название магазина с разными неоновыми оттенками зелёного для каждого слова.
 */
export const StoreName = ({ className }: StoreNameProps) => {
  return (
    <span className={cn('font-extrabold tracking-tight', className)}>
      {STORE_NAME_PARTS.map((part, index) => (
        <span key={part.text}>
          {index > 0 && ' '}
          <span className={part.className}>{part.text}</span>
        </span>
      ))}
    </span>
  )
}
