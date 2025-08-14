import React, { useState } from 'react';
import { Search, ShoppingCart, User, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import ProfileSidebar from './ProfileSidebar';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  const { itemCount } = useCart();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-primary-text">
              WhatBytes
            </h1>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-background/50 border-border/50 focus:bg-background transition-colors"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5 text-black" />
                {itemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center rounded-full"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsProfileOpen(true)}
            >
              <User className="h-5 w-5 text-black" />
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Sidebar Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Account</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsProfileOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4">
              <ProfileSidebar />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
