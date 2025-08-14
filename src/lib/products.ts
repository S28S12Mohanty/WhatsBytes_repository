import { Product } from "./types";

export const products: Product[] = [
  {
    id: "p-1",
    title: "Wireless Noise-Canceling Headphones",
    price: 199.99,
    description:
      "Experience immersive sound with active noise cancellation and 30-hour battery life.",
    category: "electronics",
    brand: "AudioMax",
    images: [
      "https://images.unsplash.com/photo-1518443881324-96b6f5f179f3",
      "https://images.unsplash.com/photo-1518441902117-58f79d0758e1",
    ],
    rating: 4.6,
  },
  {
    id: "p-2",
    title: "Smart Fitness Watch",
    price: 129.0,
    description:
      "Track workouts, heart-rate, and sleep with a vibrant AMOLED display.",
    category: "electronics",
    brand: "FitPro",
    images: [
      "https://images.unsplash.com/photo-1516900557549-41557d405adf",
    ],
    rating: 4.2,
  },
  {
    id: "p-3",
    title: "Ergonomic Office Chair",
    price: 249.5,
    description:
      "Lumbar support, breathable mesh, and multi-angle recline for all-day comfort.",
    category: "home",
    brand: "SeatWell",
    images: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    ],
    rating: 4.5,
  },
  {
    id: "p-4",
    title: "Smart TV",
    price: 599.99,
    description:
      "4K Ultra HD Smart TV with HDR and built-in streaming apps.",
    category: "electronics",
    brand: "Visionary",
    images: [
      "https://images.unsplash.com/photo-1588702547920-1c1c1c1c1c1",
    ],
    rating: 4.8,
  },
  {
    id: "p-5",
    title: "Stylish Jacket",
    price: 89.99,
    description:
      "A fashionable jacket perfect for any occasion.",
    category: "clothing",
    brand: "Fashionista",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
    ],
    rating: 4.3,
  },
  {
    id: "p-6",
    title: "Decorative Vase",
    price: 49.99,
    description:
      "A beautiful vase to enhance your home decor.",
    category: "home",
    brand: "HomeStyle",
    images: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    ],
    rating: 4.5,
  },
  // Existing products...
];

export const categories = Array.from(
  new Set(products.map((p) => p.category))
).sort();

export const brands = Array.from(new Set(products.map((p) => p.brand))).sort();

export const minPrice = Math.floor(
  products.reduce((acc, p) => Math.min(acc, p.price), Number.POSITIVE_INFINITY)
);

export const maxPrice = Math.ceil(
  products.reduce((acc, p) => Math.max(acc, p.price), 0)
);

export function findProductById(id: string) {
  return products.find((p) => p.id === id);
}
