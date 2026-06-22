import { useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'

import { CartItemRow } from '@/components/product/CartItemRow'
import { EmptyState } from '@/components/product/EmptyState'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/utils/helpers/catalog'
import { ROUTES } from '@/utils/constants/routes'
import { useCart } from '@/utils/hooks/useCart'

/**
 * Страница корзины с товарами и итоговой суммой.
 */
export const CartPage = () => {
  const navigate = useNavigate()
  const { getCartProducts, totalPrice, updateQuantity, removeItem, clearCart } = useCart()
  const cartProducts = getCartProducts()

  const handleGoToCatalog = () => navigate(ROUTES.PRODUCTS)

  if (cartProducts.length === 0) {
    return (
      <EmptyState
        title="Корзина пуста"
        description="Добавьте товары из каталога, чтобы оформить заказ."
        actionLabel="Перейти в каталог"
        onAction={handleGoToCatalog}
        icon={<ShoppingCart className="size-12" />}
      />
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">Корзина</h1>

      <Card>
        <CardHeader>
          <CardTitle>Товары ({cartProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {cartProducts.map(({ product, quantity }) => (
            <CartItemRow
              key={product.id}
              product={product}
              quantity={quantity}
              onQuantityChange={(qty) => updateQuantity(product.id, qty)}
              onRemove={() => removeItem(product.id)}
            />
          ))}
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <Separator />
          <div className="flex w-full items-center justify-between">
            <span className="text-lg font-medium">Итого:</span>
            <span className="text-2xl font-bold text-primary">{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex w-full flex-wrap gap-3">
            <Button variant="outline" onClick={clearCart}>
              Очистить корзину
            </Button>
            <Button className="flex-1" onClick={handleGoToCatalog}>
              Продолжить покупки
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
