import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product as ApiProduct } from '../services/api';

// Extend API Product for UI
interface Product extends ApiProduct {
  image?: string;
  reviews?: number;
  inStock?: boolean;
  badge?: string;
  specs?: string[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onProductClick }: ProductCardProps) {
  // Map API fields to UI fields
  const displayProduct = {
    ... product,
    image: product. imageUrl,
    reviews: product.reviewCount,
    inStock: product.stock > 0,
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div 
        className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer"
        onClick={() => onProductClick(displayProduct)}
      >
        <img
          src={displayProduct. image}
          alt={displayProduct.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {displayProduct.isFeatured && (
          <Badge className="absolute left-3 top-3" variant="default">
            Featured
          </Badge>
        )}
        {! displayProduct.inStock && (
          <Badge className="absolute left-3 top-3" variant="secondary">
            Out of Stock
          </Badge>
        )}
        {displayProduct.originalPrice && displayProduct.originalPrice > displayProduct.price && (
          <Badge className="absolute right-3 top-3" variant="destructive">
            Sale
          </Badge>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      
      <CardContent className="p-4 cursor-pointer" onClick={() => onProductClick(displayProduct)}>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">{displayProduct.category}</div>
          <h3 className="line-clamp-1 font-semibold">{displayProduct.name}</h3>
          <p className="text-xs text-muted-foreground">{displayProduct.brand}</p>
          {displayProduct.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{displayProduct.description}</p>
          )}
          
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{displayProduct.rating. toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">({displayProduct.reviews})</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">${displayProduct. price.toFixed(2)}</span>
            {displayProduct. originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${displayProduct.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {displayProduct.stock} in stock
          </p>
        </div>
        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(displayProduct);
          }}
          disabled={! displayProduct.inStock}
          className="gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}