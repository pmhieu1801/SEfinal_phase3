const API_BASE_URL = 'http://localhost:5000/api';

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  description?: string;
  imageUrl: string;
  stock: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
}

export interface CreateProductDto {
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  description?: string;
  imageUrl: string;
  stock: number;
  isFeatured: boolean;
}

// Products API
export const productsApi = {
  // Get all products
  getAll: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  // Get product by ID
  getById: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  // Create product
  create: async (product: CreateProductDto): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  // Update product
  update: async (id: number, product: CreateProductDto): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON. stringify(product),
    });
    if (!response.ok) throw new Error('Failed to update product');
  },

  // Delete product
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
  },

  // Get by category
  getByCategory: async (category: string): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    if (!response. ok) throw new Error('Failed to fetch products');
    return response.json();
  },
};

// Orders API
export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface CreateOrderDto {
  userId: string;
  shippingAddress: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  orderItems: OrderItem[];
}

export const ordersApi = {
  // Create order
  create: async (order: CreateOrderDto) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  // Get order by ID
  getById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  },

  // Get user orders
  getByUserId: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/user/${userId}`);
    if (!response. ok) throw new Error('Failed to fetch orders');
    return response. json();
  },
};