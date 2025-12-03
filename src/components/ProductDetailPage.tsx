import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Check,
  Minus,
  Plus,
} from "lucide-react";
import { Product } from "../types/product";

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  cartItemCount?: number;
  onCartClick?: () => void;
}

export function ProductDetailPage({
  product,
  onBack,
  onAddToCart,
  cartItemCount = 0,
  onCartClick,
}: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  // Mock additional images (in production, these would come from product data)
  const images = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  // Mock reviews
  const reviews = [
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      date: "2025-10-20",
      comment:
        "Excellent product! Exceeded my expectations. Fast delivery and great quality.",
      verified: true,
    },
    {
      id: 2,
      author: "John D.",
      rating: 4,
      date: "2025-10-15",
      comment:
        "Very good value for money. Works perfectly for my needs.",
      verified: true,
    },
    {
      id: 3,
      author: "Emma W.",
      rating: 5,
      date: "2025-10-10",
      comment:
        "Amazing! Will definitely buy from AWE Electronics again.",
      verified: true,
    },
  ];

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) /
    reviews.length;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Store
            </Button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span
                  className="text-2xl"
                  style={{
                    fontFamily: "'Rubik 80s Fade', cursive",
                  }}
                >
                  AWE
                </span>
                <div className="flex flex-col">
                  <span className="tracking-tight">
                    Electronics
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Online
                  </span>
                </div>
              </div>
              {onCartClick && (
                <Button
                  variant="outline"
                  size="icon"
                  className="relative"
                  onClick={onCartClick}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square relative bg-gray-100">
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.inStock === false && (
                    <Badge
                      className="absolute top-4 left-4"
                      variant="destructive"
                    >
                      Out of Stock
                    </Badge>
                  )}
                  {product.featured && (
                    <Badge className="absolute top-4 right-4 bg-amber-500 hover:bg-amber-600">
                      Featured
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-blue-600 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl mb-2">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(avgRating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {avgRating.toFixed(1)} ({reviews.length}{" "}
                  reviews)
                </span>
              </div>

              <p className="text-muted-foreground">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Price and Actions */}
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl">
                  ${product.price}
                </span>
                <span className="text-muted-foreground line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
                <Badge variant="destructive">Save 20%</Badge>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setQuantity(Math.max(1, quantity - 1))
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={product.inStock === false}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.inStock === false
                    ? "Out of Stock"
                    : "Add to Cart"}
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {product.inStock !== false && (
                <p className="text-sm text-green-600 flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  In Stock - Ready to Ship
                </p>
              )}
            </div>

            <Separator />

            {/* Benefits */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                  <Truck className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-muted-foreground">
                    On orders over $50
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">2 Year Warranty</p>
                  <p className="text-muted-foreground">
                    Extended protection plan
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50">
                  <RotateCcw className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">30 Day Returns</p>
                  <p className="text-muted-foreground">
                    Hassle-free returns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="specs" className="w-full">
            <TabsList>
              <TabsTrigger value="specs">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="reviews">
                Reviews ({reviews.length})
              </TabsTrigger>
              <TabsTrigger value="shipping">
                Shipping & Returns
              </TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg mb-4">
                    Technical Specifications
                  </h3>
                  <div className="grid gap-3">
                    <div className="grid grid-cols-2 gap-4 py-2 border-b">
                      <span className="text-muted-foreground">
                        Brand
                      </span>
                      <span>AWE Electronics</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-2 border-b">
                      <span className="text-muted-foreground">
                        Model
                      </span>
                      <span>{product.id}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-2 border-b">
                      <span className="text-muted-foreground">
                        Category
                      </span>
                      <span>{product.category}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-2 border-b">
                      <span className="text-muted-foreground">
                        Warranty
                      </span>
                      <span>2 Years Manufacturer Warranty</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-2">
                      <span className="text-muted-foreground">
                        Country of Origin
                      </span>
                      <span>Australia</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg mb-2">
                      Customer Reviews
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">
                        {avgRating.toFixed(1)}
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(avgRating)
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Based on {reviews.length} reviews
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span>{review.author}</span>
                              {review.verified && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          {review.comment}
                        </p>
                        {review.id !==
                          reviews[reviews.length - 1].id && (
                          <Separator className="mt-6" />
                        )}
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-6"
                  >
                    Write a Review
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg mb-3">
                      Shipping Information
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>
                          Free standard shipping on orders over
                          $50
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>
                          Express shipping available (2-3
                          business days)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>
                          Local pickup available at Glenferrie
                          Road store
                        </span>
                      </li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg mb-3">
                      Returns Policy
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>30-day money-back guarantee</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>
                          Free returns for change of mind
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>
                          Items must be in original packaging
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h3 className="text-2xl mb-6">You May Also Like</h3>
          <div className="text-center py-8 text-muted-foreground">
            Related products would appear here
          </div>
        </div>
      </div>
    </div>
  );
}