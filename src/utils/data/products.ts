import type { Product } from '@/utils/types/product'

const img = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=600&q=80`

/**
 * Мок-каталог товаров магазина Tennis Boom.
 */
export const products: Product[] = [
  {
    id: '1',
    name: 'Wilson Pro Staff 97',
    description:
      'Профессиональная ракетка с отличным контролем и мощностью. Идеальна для игроков среднего и продвинутого уровня. Рама из графита обеспечивает стабильность удара.',
    price: 24990,
    category: 'Ракетки',
    brand: 'Wilson',
    images: [img('1554066275-24cecd4f1aa4'), img('1622169511255-d1242fafc2c4')],
    rating: 4.8,
    inStock: true,
  },
  {
    id: '2',
    name: 'Head Radical MP',
    description:
      'Универсальная ракетка серии Radical с балансом мощности и контроля. Подходит для агрессивной игры с задней линии.',
    price: 18990,
    category: 'Ракетки',
    brand: 'Head',
    images: [img('1595435934249-2238a3adfcaf'), img('1599586120429-48281b6f8739')],
    rating: 4.5,
    inStock: true,
  },
  {
    id: '3',
    name: 'Babolat Pure Drive',
    description:
      'Легендарная ракетка с акцентом на мощность. Технология Cortex Pure Feel снижает вибрации при ударе.',
    price: 21990,
    category: 'Ракетки',
    brand: 'Babolat',
    images: [img('1617884447378-2f5d86e46266'), img('1554066275-24cecd4f1aa4')],
    rating: 4.7,
    inStock: true,
  },
  {
    id: '4',
    name: 'Yonex EZONE 100',
    description:
      'Ракетка с расширенной зоной поражения. Отличный выбор для игроков, ценящих комфорт и лёгкость замаха.',
    price: 23490,
    category: 'Ракетки',
    brand: 'Yonex',
    images: [img('1626224583764-f87db24ac4e4'), img('1595435934249-2238a3adfcaf')],
    rating: 4.6,
    inStock: false,
  },
  {
    id: '5',
    name: 'Wilson US Open Мячи (4 шт.)',
    description:
      'Официальные мячи турнира US Open. Высокая износостойкость и стабильный отскок на любых покрытиях.',
    price: 890,
    category: 'Мячи',
    brand: 'Wilson',
    images: [img('1551698618-1dfe5d97d256'), img('1534157870154-0cac42335db0')],
    rating: 4.9,
    inStock: true,
  },
  {
    id: '6',
    name: 'Head Tour XT (3 шт.)',
    description:
      'Турнирные мячи с усиленным войлоком. Подходят для тренировок и соревнований на хардовых кортах.',
    price: 750,
    category: 'Мячи',
    brand: 'Head',
    images: [img('1595435934249-2238a3adfcaf'), img('1551698618-1dfe5d97d256')],
    rating: 4.4,
    inStock: true,
  },
  {
    id: '7',
    name: 'Babolat Team All Court (3 шт.)',
    description:
      'Универсальные мячи для всех типов покрытий. Оптимальное соотношение цены и качества.',
    price: 690,
    category: 'Мячи',
    brand: 'Babolat',
    images: [img('1534157870154-0cac42335db0'), img('1551698618-1dfe5d97d256')],
    rating: 4.3,
    inStock: true,
  },
  {
    id: '8',
    name: 'Nike Dri-FIT Victory Polo',
    description:
      'Дышащая теннисная поло с технологией Dri-FIT. Лёгкая ткань отводит влагу и обеспечивает комфорт в игре.',
    price: 4990,
    category: 'Одежда',
    brand: 'Nike',
    images: [img('1515886657613-9f3515b0c78f'), img('1483986767636-40801e7e9ccc')],
    rating: 4.6,
    inStock: true,
  },
  {
    id: '9',
    name: 'Adidas Club 3-Stripes Tee',
    description:
      'Классическая теннисная футболка из мягкого хлопка с влагоотводящей вставкой.',
    price: 3490,
    category: 'Одежда',
    brand: 'Adidas',
    images: [img('1483986767636-40801e7e9ccc'), img('1515886657613-9f3515b0c78f')],
    rating: 4.2,
    inStock: true,
  },
  {
    id: '10',
    name: 'Nike Court Flex Shorts',
    description:
      'Лёгкие шорты с эластичным поясом и карманами для мячей. Свобода движений на корте.',
    price: 4290,
    category: 'Одежда',
    brand: 'Nike',
    images: [img('1515886657613-9f3515b0c78f'), img('1483986767636-40801e7e9ccc')],
    rating: 4.5,
    inStock: false,
  },
  {
    id: '11',
    name: 'Asics Gel-Resolution 9',
    description:
      'Теннисные кроссовки с усиленной поддержкой стопы. Подошва AHAR+ обеспечивает отличное сцепление.',
    price: 12990,
    category: 'Обувь',
    brand: 'Asics',
    images: [img('1542291026-7eec264c27ff'), img('1606107557192-4867c976725f')],
    rating: 4.8,
    inStock: true,
  },
  {
    id: '12',
    name: 'Nike Air Zoom Vapor Pro',
    description:
      'Профессиональные кроссовки с технологией Zoom Air. Лёгкие и отзывчивые для быстрой игры у сетки.',
    price: 14990,
    category: 'Обувь',
    brand: 'Nike',
    images: [img('1606107557192-4867c976725f'), img('1542291026-7eec264c27ff')],
    rating: 4.7,
    inStock: true,
  },
  {
    id: '13',
    name: 'Adidas Barricade 13',
    description:
      'Надёжные кроссовки с усиленным мысом для игры на харде. Максимальная защита и стабильность.',
    price: 11990,
    category: 'Обувь',
    brand: 'Adidas',
    images: [img('1542291026-7eec264c27ff'), img('1606107557192-4867c976725f')],
    rating: 4.6,
    inStock: true,
  },
  {
    id: '14',
    name: 'Wilson Tour 6 Racket Bag',
    description:
      'Вместительная сумка на 6 ракеток с термоотделением. Дополнительные карманы для обуви и аксессуаров.',
    price: 7990,
    category: 'Аксессуары',
    brand: 'Wilson',
    images: [img('1553062407-98eeb64c6a62'), img('1622560481651-996f84ca456f')],
    rating: 4.4,
    inStock: true,
  },
  {
    id: '15',
    name: 'Babolat RPM Blast 200m',
    description:
      'Полиестеровая струна с шестигранным профилем для максимального вращения мяча.',
    price: 1890,
    category: 'Аксессуары',
    brand: 'Babolat',
    images: [img('1622560481651-996f84ca456f'), img('1553062407-98eeb64c6a62')],
    rating: 4.5,
    inStock: true,
  },
  {
    id: '16',
    name: 'Head Pro Overgrip (3 шт.)',
    description:
      'Тонкие обмотки с отличным сцеплением и влагопоглощением. Подходят для любых ракеток.',
    price: 590,
    category: 'Аксессуары',
    brand: 'Head',
    images: [img('1553062407-98eeb64c6a62'), img('1622560481651-996f84ca456f')],
    rating: 4.1,
    inStock: true,
  },
]

/**
 * Минимальная цена в каталоге.
 */
export const catalogMinPrice = Math.min(...products.map((p) => p.price))

/**
 * Максимальная цена в каталоге.
 */
export const catalogMaxPrice = Math.max(...products.map((p) => p.price))
