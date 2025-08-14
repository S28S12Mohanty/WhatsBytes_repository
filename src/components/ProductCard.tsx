import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group overflow-hidden bg-gradient-card border-border/50 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-2">
            {/* Category Badge */}
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
            
            {/* Product Name */}
            <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>
            
            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              
              {product.inStock ? (
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  className="bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add
                </Button>
              ) : (
                <Badge variant="destructive" className="text-xs">
                  Out of Stock
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};