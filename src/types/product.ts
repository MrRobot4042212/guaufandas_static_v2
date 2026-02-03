export interface Size {
  size: string;
  price: number;
  stock: number | null;
  sku: string;
}

export interface Variant {
  color: string;
  colorHex: string;
  images: string[];
  sizes: Size[];
  sku: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  currency: string;
  mainImage: string;
  category: string;
  slug: string;
  weight: number;
  tags: string[];
  variants: Variant[];
}