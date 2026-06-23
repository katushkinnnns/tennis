import { products } from '@/data/products'

export type HomeFeatureIconId =
  | 'assortment'
  | 'delivery'
  | 'quality'
  | 'expert'
  | 'payment'
  | 'support'

export type HomeFeature = {
  iconId: HomeFeatureIconId
  title: string
  description: string
  details: string
}

export const homeFeatures: HomeFeature[] = [
  {
    iconId: 'assortment',
    title: 'Широкий ассортимент',
    description: 'Ракетки, мячи, одежда и обувь от ведущих брендов.',
    details: 'Более 16 позиций в каталоге — от ракеток Wilson Pro Staff до кроссовок Nike Vapor.',
  },
  {
    iconId: 'delivery',
    title: 'Быстрая доставка',
    description: 'Отправляем заказы по всей России в кратчайшие сроки.',
    details: 'Бесплатная доставка при заказе от 10 000 ₽. Отслеживание посылки в личном кабинете.',
  },
  {
    iconId: 'quality',
    title: 'Гарантия качества',
    description: 'Только оригинальная продукция с гарантией производителя.',
    details: 'Каждый товар проходит проверку подлинности. Возврат в течение 14 дней.',
  },
  {
    iconId: 'expert',
    title: 'Подбор экипировки',
    description: 'Поможем выбрать ракетку и обувь под ваш уровень и стиль игры.',
    details: 'Описания товаров с характеристиками, рейтингами и отзывами других игроков.',
  },
  {
    iconId: 'payment',
    title: 'Удобная оплата',
    description: 'Карта, СБП и оплата при получении — выбирайте удобный способ.',
    details: 'Безопасные платежи и прозрачная стоимость без скрытых комиссий.',
  },
  {
    iconId: 'support',
    title: 'Поддержка игроков',
    description: 'Отвечаем на вопросы о размере, натяжении струн и уходе за экипировкой.',
    details: 'Консультация по подбору до и после покупки — мы на связи.',
  },
]

export const featuredProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4)
