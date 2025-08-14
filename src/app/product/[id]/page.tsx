'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import { Product } from '@/types/product';

// Mock product data - using the same image URLs as page.tsx
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Sony WH-1000XM4 Wireless Headphones",
    price: 349.99,
    category: "Electronics",
    brand: "Sony",
    description: "Industry-leading noise canceling wireless headphones with 30-hour battery life. Experience premium sound quality with advanced noise cancellation technology that adapts to your environment.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    rating: 4.8,
    reviewCount: 1247,
    inStock: true
  },
  {
    id: "2",
    name: "Apple Watch Series 8",
    price: 399.99,
    category: "Electronics",
    brand: "Apple",
    description: "Advanced health monitoring smartwatch with crash detection and temperature sensing. Track your fitness, monitor your health, and stay connected with style.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
    rating: 4.7,
    reviewCount: 892,
    inStock: true
  },
  {
    id: "3",
    name: "Herman Miller Aeron Chair",
    price: 1499.99,
    category: "Furniture",
    brand: "Herman Miller",
    description: "Ergonomic office chair designed for all-day comfort",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop",
    rating: 4.9,
    reviewCount: 567,
    inStock: true
  },
  {
    id: "4",
    name: "Nike Air Max 270",
    price: 150.00,
    category: "Clothing",
    brand: "Nike",
    description: "Comfortable running shoes with Air Max technology",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    rating: 4.5,
    reviewCount: 2341,
    inStock: true
  },
  {
    id: "5",
    name: "MacBook Pro 14-inch",
    price: 1999.99,
    category: "Electronics",
    brand: "Apple",
    description: "Powerful laptop with M2 Pro chip for professionals",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
    rating: 4.9,
    reviewCount: 756,
    inStock: true
  },
  {
    id: "6",
    name: "Levi's 501 Original Jeans",
    price: 89.99,
    category: "Clothing",
    brand: "Levi's",
    description: "Classic straight-leg jeans in authentic denim",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop",
    rating: 4.3,
    reviewCount: 1892,
    inStock: true
  },
  {
    id: "7",
    name: "IKEA Malm Bed Frame",
    price: 299.99,
    category: "Furniture",
    brand: "IKEA",
    description: "Modern platform bed with storage drawers",
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&h=600&fit=crop",
    rating: 4.2,
    reviewCount: 445,
    inStock: true
  },
  {
    id: "8",
    name: "Canon EOS R6 Mark II",
    price: 2499.99,
    category: "Electronics",
    brand: "Canon",
    description: "Full-frame mirrorless camera for photography enthusiasts",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop",
    rating: 4.8,
    reviewCount: 334,
    inStock: true
  },
  {
    id: "9",
    name: "Adidas Ultraboost 22",
    price: 190.00,
    category: "Clothing",
    brand: "Adidas",
    description: "Premium running shoes with responsive cushioning",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop",
    rating: 4.6,
    reviewCount: 1567,
    inStock: true
  },
  {
    id: "10",
    name: "West Elm Mid-Century Sofa",
    price: 1299.99,
    category: "Furniture",
    brand: "West Elm",
    description: "Timeless mid-century modern sofa in premium fabric",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop",
    rating: 4.4,
    reviewCount: 289,
    inStock: true
  },
  {
    id: "11",
    name: "Samsung 65\" QLED 4K TV",
    price: 1299.99,
    category: "Electronics",
    brand: "Samsung",
    description: "Crystal clear 4K resolution with Quantum Dot technology",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop",
    rating: 4.7,
    reviewCount: 892,
    inStock: true
  },
  {
    id: "12",
    name: "Uniqlo Ultra Light Down Jacket",
    price: 79.99,
    category: "Clothing",
    brand: "Uniqlo",
    description: "Lightweight, packable down jacket for all seasons",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
    rating: 4.5,
    reviewCount: 2341,
    inStock: true
  }
];

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  
  // Find product by ID (in real app, this would be an API call)
  const product = mockProducts.find(p => p.id === productId) || mockProducts[0];
  
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // In a real app, this would dispatch an action to add to cart
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded cursor-pointer hover:opacity-80 transition-opacity">
                  <img 
                    src={product.image} 
                    alt={`${product.name} ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.brand}</p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-yellow-400 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            <div className="text-3xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </div>

            <div className="prose prose-sm text-muted-foreground">
              <p>{product.description}</p>
            </div>

            <div className="space-y-2">
              <div>
                <span className="font-semibold">Category:</span> {product.category}
              </div>
              <div>
                <span className="font-semibold">Brand:</span> {product.brand}
              </div>
              <div>
                <span className="font-semibold">Availability:</span> 
                <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 border rounded hover:bg-muted transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 border rounded hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <span className="ml-2 font-semibold">John D.</span>
              </div>
              <p className="text-muted-foreground">Excellent product! Exactly as described and fast shipping.</p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <span className="ml-2 font-semibold">Sarah M.</span>
              </div>
              <p className="text-muted-foreground">Great quality, but took a bit longer to arrive than expected.</p>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
