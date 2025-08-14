export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  description: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Filters {
  categories: string[];
  priceRange: [number, number];
  brands: string[];
  searchQuery: string;
}