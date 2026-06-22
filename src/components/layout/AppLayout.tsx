import { Outlet } from 'react-router-dom'

import { Toaster } from '@/components/ui/sonner'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

/**
 * Общий layout приложения с шапкой, контентом и подвалом.
 */
export const AppLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" richColors closeButton />
    </div>
  )
}
