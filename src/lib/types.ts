export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  images: string[];
  rating?: number;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type PriceRange = {
  min: number;
  max: number;
};

export type ProductFilters = {
  q?: string;
  categories?: string[];
  brand?: string;
  price?: PriceRange;
};


