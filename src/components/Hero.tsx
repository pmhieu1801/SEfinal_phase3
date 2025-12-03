import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { productsApi } from '../services/api';

interface HeroProps {
  onShopNow: () => void;
  onViewDeals: () => void;
}

export function Hero({ onShopNow, onViewDeals }: HeroProps) {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const products = await productsApi.getAll();
        setProductCount(products.length);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProductCount();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-blue-100 px-4 py-1. 5 text-sm text-blue-700">
              ⚡ New Arrivals 2025
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl">
              Latest Tech,
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Best Prices
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Discover the newest electronics and gadgets. Free shipping on orders over $50. Shop with confidence. 
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="gap-2" onClick={onShopNow}>
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={onViewDeals}>
                View Deals
              </Button>
            </div>
            <div className="flex gap-6 pt-4">
              <div>
                <div className="text-2xl">{productCount}+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="border-l pl-6">
                <div className="text-2xl">50K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="border-l pl-6">
                <div className="text-2xl">4.8★</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1571857089849-f6390447191a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMHN0b3JlfGVufDF8fHx8MTc2MTgyNjYzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Electronics"
              className="relative rounded-3xl shadow-2xl object-cover w-full h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}