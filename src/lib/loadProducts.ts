import type { Product } from '@/types'

type ProductMeta = Omit<Product, 'images'> & {
  slug: string
  images?: string[]
}

const productMetaModules = import.meta.glob<{ default: ProductMeta }>(
  '../content/products/*/product.json',
  { eager: true },
)

const productImageModules = import.meta.glob<string>(
  '../content/products/*/*.{jpg,jpeg,png,webp}',
  { eager: true, query: '?url', import: 'default' },
)

const getSlugFromPath = (path: string): string => {
  const match = path.match(/\/products\/([^/]+)\//)
  return match?.[1] ?? ''
}

const getFileNameFromPath = (path: string): string => {
  const parts = path.split('/')
  return parts[parts.length - 1] ?? ''
}

const buildImagesBySlug = (): Map<string, Map<string, string>> => {
  const imagesBySlug = new Map<string, Map<string, string>>()

  for (const [path, url] of Object.entries(productImageModules)) {
    const slug = getSlugFromPath(path)
    const fileName = getFileNameFromPath(path)

    if (!slug || !fileName) {
      continue
    }

    if (!imagesBySlug.has(slug)) {
      imagesBySlug.set(slug, new Map())
    }

    imagesBySlug.get(slug)?.set(fileName, url)
  }

  return imagesBySlug
}

const resolveProductImages = (
  meta: ProductMeta,
  slug: string,
  imagesBySlug: Map<string, Map<string, string>>,
): string[] => {
  const folderImages = imagesBySlug.get(slug)

  if (!folderImages || folderImages.size === 0) {
    throw new Error(`Товар "${meta.name}" (${slug}): не найдено ни одного изображения`)
  }

  if (meta.images?.length) {
    return meta.images.map((fileName) => {
      const url = folderImages.get(fileName)

      if (!url) {
        throw new Error(
          `Товар "${meta.name}" (${slug}): файл "${fileName}" указан в product.json, но отсутствует в папке`,
        )
      }

      return url
    })
  }

  return [...folderImages.entries()]
    .sort(([a], [b]) => a.localeCompare(b, 'ru'))
    .map(([, url]) => url)
}

/** Собирает каталог товаров из папок src/content/products/{slug}/ */
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
