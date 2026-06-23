import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
}

/**
 * Логотип Vibe Boom Tennis: круглый знак с надписью, перекрёстными ракетками и мячом.
 */
export const Logo = ({ className }: LogoProps) => {
  return (
    <img
      src="/logo.png"
      alt="Vibe Boom Tennis"
      width={200}
      height={200}
      decoding="async"
      className={cn(
        'logo-img size-12 shrink-0 object-contain transition-[transform,filter] duration-300',
        className,
      )}
    />
  )
}
