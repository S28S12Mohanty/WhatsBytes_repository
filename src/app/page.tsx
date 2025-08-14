'use client';

import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { Footer } from '@/components/Footer';
import { useState } from 'react';
import { Product, Filters } from '@/types/product';

// Enhanced mock data with diverse products and better images
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Sony WH-1000XM4 Wireless Headphones",
    price: 349.99,
    category: "Electronics",
    brand: "Sony",
    description: "Industry-leading noise canceling wireless headphones with 30-hour battery life",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
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
    description: "Advanced health monitoring smartwatch with crash detection",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 2341,
    inStock: true
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    priceRange: [0, 3000],
    brands: [],
    searchQuery: ''
  });

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category);
    
    return matchesSearch && matchesPrice && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              maxPrice={3000}
            />
          </aside>
          
          {/* Products Grid */}
          <section className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Products ({filteredProducts.length})
              </h2>
              {searchQuery && (
                <p className="text-muted-foreground mt-2">
                  Showing results for &quot;{searchQuery}&quot;
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No products found matching your criteria.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
