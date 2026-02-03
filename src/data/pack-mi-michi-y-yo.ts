import type { Pack, PackItem, PackVariant } from '../types/pack';

export const packMiMichiYo: Pack = {
  id: 5,
  name: 'Pack Mi Michi y Yo',
  description:
    'Pack especial para ti y tu gato. Incluye una Miaufanda artesanal para tu michi y una Personifanda para ti. Haz conjunto con tu mascota favorita y disfruta del 10% de descuento.',
  basePrice: 51.9,
  compareAtPrice: 57.8,
  currency: 'EUR',
  mainImage: 'https://i.ibb.co/nMmKnZqh/cherry.webp',
  category: 'Packs',
  slug: 'pack-mi-michi-y-yo',
  weight: 0.4,
  tags: ['pack', 'gatos', 'conjunto', 'regalo', 'michi'],
  variants: [
    {
      color: 'Cherry',
      colorHex: '#4f0817',
      images: ['https://i.ibb.co/bgRCdHJ9/cherry.webp'],
      sku: 'MIAU-PERSONI-PAK-CHERRY'
    },
    {
      color: 'Candy',
      colorHex: '#FFB6C1',
      images: ['https://i.ibb.co/BVmSKN1r/candy.webp'],
      sku: 'MIAU-PERSONI-PAK-CANDY'
    },
    {
      color: 'Caramelo',
      colorHex: '#C68642',
      images: ['https://i.ibb.co/gMXxtQ47/caramelo.webp'],
      sku: 'MIAU-PERSONI-PAK-CARAMELO'
    },
    {
      color: 'Mango',
      colorHex: '#FFB347',
      images: ['https://i.ibb.co/cSDP2wdP/mango.webp'],
      sku: 'MIAU-PERSONI-PAK-MANGO'
    },
    {
      color: 'Zafiro',
      colorHex: '#0F52BA',
      images: ['https://i.ibb.co/fd2F9gWR/zafiro.webp'],
      sku: 'MIAU-PERSONI-PAK-ZAFIRO'
    },
    {
      color: 'Capri',
      colorHex: '#3B7BBF',
      images: ['https://i.ibb.co/ks74HSWf/capri.webp'],
      sku: 'MIAU-PERSONI-PAK-CAPRI'
    }
  ],
  items: [
    { productId: '4', productName: 'Miaufanda', quantity: 1 },
    { productId: '2', productName: 'Personifanda', quantity: 1 }
  ]
};
