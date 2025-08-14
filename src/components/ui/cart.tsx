'use client';

import React from 'react';
import { Trash2, Plus, Minus, ShoppingCart, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Separator } from './separator';
import { useRouter } from 'next/navigation'; // <-- Added import

interface CartProps {
  className?: string;
}

export function Cart({ className }: CartProps) {
  const { items, total, itemCount, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter(); // <-- Added router

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">
          Add some products to your cart to get started.
        </p>
        <Button
          className="bg-gradient-primary hover:opacity-90"
          onClick={() => router.push('/')}
        >
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col md:flex-row gap-8 ${className}`}>
      {/* Left: Cart Items List */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Shopping Cart ({itemCount} items)</h3>
          <Button 
            variant="outline" 
            onClick={clearCart}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>
        
        {items.map((item) => (
          <Card key={item.product.id} className="overflow-hidden relative">
            <CardContent className="p-4">
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                
                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground text-base mb-1">
                        {item.product.name}
                      </h4>
                      <p className="text-muted-foreground text-sm mb-2">
                        {item.product.brand} • {item.product.category}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {item.product.category}
                      </Badge>
                    </div>
                    
                    {/* Price */}
                    <div className="text-right">
                      <p className="font-bold text-foreground">
                        {formatPrice(item.product.price)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.product.price * item.quantity)} total
                      </p>
                    </div>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-12 text-center font-medium text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    {/* Remove Button - Bottom Right */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Item
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
     

      {/* Right: Price Summary */}
      <div className="w-full md:w-[350px] flex-shrink-0">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="font-medium">{formatPrice(total * 0.08)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(total + (total * 0.08))}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <Button className="w-full bg-gradient-primary hover:opacity-90">
                Proceed to Checkout
              </Button>
            </div>
            
            {/* Additional Info */}
            <div className="text-xs text-muted-foreground text-center pt-4">
              <p>Secure checkout powered by industry-leading encryption</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Cart;
            