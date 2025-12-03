import { Product } from '../types/product';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Star, ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onProductClick }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div 
        className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer"
        onClick={() => onProductClick(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.badge && (
          <Badge className="absolute left-3 top-3" variant={product.badge === 'Sale' ? 'destructive' : 'default'}>
            {product.badge}
          </Badge>
        )}
        {!product.inStock && (
          <Badge className="absolute left-3 top-3" variant="secondary">
            Out of Stock
          </Badge>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      
      <CardContent className="p-4 cursor-pointer" onClick={() => onProductClick(product)}>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">{product.category}</div>
          <h3 className="line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          disabled={!product.inStock}
          className="gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
