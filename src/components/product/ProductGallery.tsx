import { useState } from 'react'

import { cn } from '@/lib/utils'

type ProductGalleryProps = {
  /** Список URL изображений */
  images: string[]
  /** Alt-текст для изображений */
  alt: string
}

/**
 * Галерея изображений товара с миниатюрами.
 * @param props - Пропсы ProductGallery.
 */
export const ProductGallery = ({ images, alt }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [imageError, setImageError] = useState<Record<number, boolean>>({})

  const handleSelectImage = (index: number) => setActiveIndex(index)

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleSelectImage(index)
    }
  }

  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-xl bg-muted">
        {!imageError[activeIndex] ? (
          <img
            src={images[activeIndex]}
            alt={`${alt} — фото ${activeIndex + 1}`}
            className="size-full object-cover"
            onError={() => setImageError((prev) => ({ ...prev, [activeIndex]: true }))}
          />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            Нет фото
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2" role="list" aria-label="Миниатюры товара">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              role="listitem"
              className={cn(
                'size-16 overflow-hidden rounded-lg border-2 transition-colors',
                activeIndex === index ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100',
              )}
              onClick={() => handleSelectImage(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-label={`Показать фото ${index + 1}`}
              tabIndex={0}
            >
              <img src={image} alt="" className="size-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
