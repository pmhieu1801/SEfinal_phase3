export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: string;
  description: string;
  specs?: string[];
  stockQuantity?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  paymentMethod: string;
  createdAt: Date;
}
