export interface PackItem {
  productId: string;
  productName: string;
  quantity: number;
}

export interface PackVariant {
  color: string;
  colorHex: string;
  images: string[];
  sku: string;
}

export interface Pack {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  compareAtPrice?: number | null;
  currency: string;
  mainImage: string;
  category: string;
  slug: string;
  weight: number;
  tags: string[];
  variants: PackVariant[];
  items: PackItem[];
}
