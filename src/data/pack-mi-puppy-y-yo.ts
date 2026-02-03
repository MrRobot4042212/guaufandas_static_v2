import type { Pack } from '../types/pack';

export const packMiPuppyYo: Pack = {
  id: 6,
  name: 'Pack Mi Peludo y Yo',
  description:
    'Pack especial para ti y tu perro. Incluye una Guaufanda artesanal para tu puppy y una Personifanda para ti. Haz conjunto con tu mejor amigo y disfruta del 10% de descuento.',
  basePrice: 51.9,
  compareAtPrice: 57.8,
  currency: 'EUR',
  mainImage: 'https://i.ibb.co/TDtQB8r1/cherry.png',
  category: 'Packs',
  slug: 'pack-mi-puppy-y-yo',
  weight: 0.45,
  tags: ['pack', 'perros', 'conjunto', 'regalo', 'puppy'],
  variants: [
    {
      color: 'Cherry',
      colorHex: '#4f0817',
      images: ['https://i.ibb.co/TDtQB8r1/cherry.png'],
      sku: 'GUAU-PERSONI-PAK-CHERRY'
    },
    {
      color: 'Candy',
      colorHex: '#FFB6C1',
      images: ['https://i.ibb.co/4wkrPZD4/candy.png'],
      sku: 'GUAU-PERSONI-PAK-CANDY'
    },
    {
      color: 'Caramelo',
      colorHex: '#C68642',
      images: ['https://i.ibb.co/TMcqFdP1/caramelo.png'],
      sku: 'GUAU-PERSONI-PAK-CARAMELO'
    },
    {
      color: 'Mango',
      colorHex: '#FFB347',
      images: ['https://i.ibb.co/WvPCgYQk/mango.png'],
      sku: 'GUAU-PERSONI-PAK-MANGO'
    },
    {
      color: 'Zafiro',
      colorHex: '#0F52BA',
      images: ['https://i.ibb.co/fYY3ZVXM/zafiro.png'],
      sku: 'GUAU-PERSONI-PAK-ZAFIRO'
    },
    {
      color: 'Capri',
      colorHex: '#3B7BBF',
      images: ['https://i.ibb.co/xrV18jv/capri.png'],
      sku: 'GUAU-PERSONI-PAK-CAPRI'
    }
  ],
  items: [
    { productId: '1', productName: 'Guaufanda', quantity: 1 },
    { productId: '2', productName: 'Personifanda', quantity: 1 }
  ]
};
