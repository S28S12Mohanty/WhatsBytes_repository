import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Filters } from '@/types/product';

interface ProductFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  maxPrice: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  maxPrice,
}) => {
  const allCategories = ['All', 'Electronics', 'Furniture', 'Clothing'];
  const brands = ['AudioTech', 'FitTech', 'ComfortPlus', 'EcoWear', 'PhotoPro', 'LightWorks', 'SportMax', 'ChargeTech'];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (category === 'All') {
      if (checked) {
        onFiltersChange({
          ...filters,
          categories: [],
        });
      }
    } else {
      const newCategories = checked
        ? [...filters.categories, category]
        : filters.categories.filter(c => c !== category);
      
      onFiltersChange({
        ...filters,
        categories: newCategories,
      });
    }
  };


  const handlePriceRangeChange = (range: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [range[0], range[1]],
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Card className="sticky top-24 bg-gradient-card border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Categories</h3>
          <div className="space-y-2">
            {allCategories.map((category) => {
              const isChecked = category === 'All' 
                ? filters.categories.length === 0
                : filters.categories.includes(category);
              
              return (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="text-sm cursor-pointer hover:text-primary transition-colors"
                  >
                    {category}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-3">Price Range</h3>
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceRangeChange}
              max={maxPrice}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatPrice(filters.priceRange[0])}</span>
              <span>{formatPrice(filters.priceRange[1])}</span>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};