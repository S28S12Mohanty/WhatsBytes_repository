'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Cart } from '@/components/ui/cart';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
        </div>
        
        {/* Cart Content */}
        <Cart />
      </div>
    </div>
  );
}
