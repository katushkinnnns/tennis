import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AppLayout } from '@/components/layout/AppLayout'
import { HomePage } from '@/pages/HomePage/HomePage'
import { ProductsPage } from '@/pages/ProductsPage/ProductsPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage/ProductDetailPage'
import { CartPage } from '@/pages/CartPage/CartPage'
import { FavoritesPage } from '@/pages/FavoritesPage/FavoritesPage'
import { UserPage } from '@/pages/UserPage/UserPage'
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage'
import { ROUTES } from '@/utils/constants/routes'

/**
 * Корневой компонент приложения с маршрутизацией.
 */
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
          <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
          <Route path={ROUTES.CART} element={<CartPage />} />
          <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
          <Route path={ROUTES.USER} element={<UserPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
