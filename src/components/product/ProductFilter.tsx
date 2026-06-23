import type { ProductFilters } from '@/types'
import { catalogMaxPrice, catalogMinPrice } from '@/data/products'
import { getUniqueFieldValues } from '@/lib/catalog'
import { useProducts } from '@/hooks/useProducts'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type ProductFilterProps = {
  /** Текущие значения фильтров */
  filters: ProductFilters
  /** Обработчик изменения фильтров */
  onChange: (filters: ProductFilters) => void
  /** Сброс фильтров */
  onReset: () => void
}

/**
 * Панель фильтрации каталога товаров.
 * @param props - Пропсы ProductFilter.
 */
export const ProductFilter = ({ filters, onChange, onReset }: ProductFilterProps) => {
  const products = useProducts()
  const categories = getUniqueFieldValues(products, 'category')
  const brands = getUniqueFieldValues(products, 'brand')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, search: event.target.value })
  }

  const handleCategoryChange = (value: string | null) => {
    onChange({ ...filters, category: value === 'all' ? '' : (value ?? '') })
  }

  const handleBrandChange = (value: string | null) => {
    onChange({ ...filters, brand: value === 'all' ? '' : (value ?? '') })
  }

  const handlePriceChange = (values: number[]) => {
    onChange({ ...filters, minPrice: values[0], maxPrice: values[1] })
  }

  const handleStockChange = (checked: boolean) => {
    onChange({ ...filters, inStockOnly: checked })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Фильтры</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="search">Поиск</Label>
          <Input
            id="search"
            placeholder="Название товара..."
            value={filters.search}
            onChange={handleSearchChange}
            aria-label="Поиск по названию"
          />
        </div>

        <div className="space-y-2">
          <Label>Категория</Label>
          <Select
            value={filters.category || 'all'}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-full" aria-label="Фильтр по категории">
              <SelectValue placeholder="Все категории" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Бренд</Label>
          <Select value={filters.brand || 'all'} onValueChange={handleBrandChange}>
            <SelectTrigger className="w-full" aria-label="Фильтр по бренду">
              <SelectValue placeholder="Все бренды" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все бренды</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="font-medium">
            Цена: {filters.minPrice.toLocaleString('ru-RU')} —{' '}
            {filters.maxPrice.toLocaleString('ru-RU')} ₽
          </Label>
          <Slider
            min={catalogMinPrice}
            max={catalogMaxPrice}
            step={100}
            value={[filters.minPrice, filters.maxPrice]}
            onValueChange={handlePriceChange}
            aria-label="Диапазон цены"
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="inStock"
            checked={filters.inStockOnly}
            onCheckedChange={(checked) => handleStockChange(checked === true)}
            aria-label="Только в наличии"
          />
          <Label htmlFor="inStock" className="cursor-pointer">
            Только в наличии
          </Label>
        </div>

        <Button variant="outline" className="w-full" onClick={onReset}>
          Сбросить фильтры
        </Button>
      </CardContent>
    </Card>
  )
}
