/**
 * Подвал сайта с информацией о магазине.
 */
export const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-primary">Tennis Boom</p>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Магазин теннисной экипировки: ракетки, мячи, одежда и обувь от ведущих брендов.
              Доставка по всей России.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tennis Boom. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
