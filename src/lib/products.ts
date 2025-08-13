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
    title: "Minimalist Leather Backpack",
    price: 89.99,
    description:
      "Premium leather build with 15\" laptop sleeve and water-resistant finish.",
    category: "fashion",
    brand: "UrbanCraft",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
    ],
    rating: 4.1,
  },
  {
    id: "p-5",
    title: "Running Shoes Pro",
    price: 139.0,
    description:
      "Lightweight cushioning and responsive outsole engineered for speed.",
    category: "fashion",
    brand: "SprintX",
    images: [
      "https://images.unsplash.com/photo-1528701800489-20be3c2ea4e7",
    ],
    rating: 4.4,
  },
  {
    id: "p-6",
    title: "Stainless Steel Cookware Set (10pcs)",
    price: 159.99,
    description:
      "Tri-ply construction for even heating. Induction compatible.",
    category: "home",
    brand: "ChefWare",
    images: [
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c",
    ],
    rating: 4.3,
  },
  {
    id: "p-7",
    title: "Mountain Bike Helmet",
    price: 74.95,
    description:
      "Lightweight shell with MIPS protection and 22 vents for airflow.",
    category: "sports",
    brand: "RideSafe",
    images: [
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7",
    ],
    rating: 4.0,
  },
  {
    id: "p-8",
    title: "Stainless Insulated Water Bottle 1L",
    price: 29.95,
    description:
      "Keeps beverages cold for 24h or hot for 12h with leak-proof cap.",
    category: "sports",
    brand: "HydraFlex",
    images: [
      "https://images.unsplash.com/photo-1558211580-02228d4f7875",
    ],
    rating: 4.7,
  },
  {
    id: "p-9",
    title: "Modern Table Lamp",
    price: 59.0,
    description:
      "Dimmable LED with warm ambient glow for bedside or desk.",
    category: "home",
    brand: "Lumina",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    ],
    rating: 4.1,
  },
  {
    id: "p-10",
    title: "Denim Jacket Classic",
    price: 79.99,
    description:
      "Timeless fit with reinforced seams and soft wash finish.",
    category: "fashion",
    brand: "BlueForge",
    images: [
      "https://images.unsplash.com/photo-1468070454955-c5b6932bd08d",
    ],
    rating: 4.2,
  },
  {
    id: "p-11",
    title: "Mechanical Keyboard 75%",
    price: 169.0,
    description:
      "Hot-swappable switches, RGB, and wireless mode with low-latency.",
    category: "electronics",
    brand: "KeySmith",
    images: [
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
    ],
    rating: 4.6,
  },
  {
    id: "p-12",
    title: "Sci-Fi Novel: Starbound",
    price: 18.5,
    description:
      "A gripping journey across galaxies, exploring humanity's future.",
    category: "books",
    brand: "Whatbytes Press",
    images: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    ],
    rating: 4.0,
  },
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


