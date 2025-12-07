import { useState, useMemo, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { CartSheet } from './components/CartSheet';
import { Footer } from './components/Footer';
import { LoginPage } from './components/LoginPage';
import { AccountPage } from './components/AccountPage';
import { AdminDashboard } from './components/AdminDashboard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CheckoutPage, OrderData } from './components/CheckoutPage';
import { OrderConfirmationPage } from './components/OrderConfirmationPage';
import { products as initialProducts } from './data/products';
import { Product, CartItem, Order } from './types/product';
import { productsApi } from './services/api';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

type Page = 'store' | 'login' | 'account' | 'admin' | 'product' | 'checkout' | 'confirmation';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState<Page>('store');
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [orderId, setOrderId] = useState<string>('');
  const productsRef = useRef<HTMLDivElement>(null);
  const [showOnlySale, setShowOnlySale] = useState(false);
  
  // User preferences
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [language, setLanguage] = useState('en');
  
  // Initialize products with empty array (will be fetched from API)
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch products from API on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiProducts = await productsApi.getAll();
        
        console.log('🔍 API Response:', apiProducts. length, 'products');
        console.log('🔍 First API product:', apiProducts[0]);
        
        // Map API Product format to UI Product format
        const mappedProducts: Product[] = apiProducts.map(p => ({
          id: String(p. id),
          name: p. name,
          price: p. price,
          originalPrice: p.originalPrice || undefined,
          category: p.category,
          image: p.imageUrl || '',  // Map imageUrl to image field with fallback
          rating: p. rating || 0,
          reviews: p.reviewCount || 0,
          inStock: p. stock > 0,
          badge: p.originalPrice && p. originalPrice > p.price ? 'Sale' : p.isFeatured ? 'Featured' : undefined,
          description: p. description || '',
          specs: [],
          stockQuantity: p. stock
        }));
        
        console.log('✅ Mapped products:', mappedProducts. length);
        console.log('✅ First mapped product:', mappedProducts[0]);
        console.log('✅ First product image:', mappedProducts[0]?.image);
        
        setProducts(mappedProducts);
        
        if (import.meta. env.DEV) {
          console.log(`✅ Loaded ${mappedProducts.length} products from API`);
        }
      } catch (error) {
        console.error('❌ Failed to fetch products from API:', error);
        
        if (import.meta.env.DEV) {
          console.log('⚠️ Using fallback local products data');
        }
        // Fallback to local data if API fails
        setProducts(initialProducts.map(p => ({ ...p, stockQuantity: p.stockQuantity || 50 })));
      }
    };
    
    fetchProducts();
  }, []);

  // Check if user is staff
  const isStaff = user?.email.endsWith('@awe.staff.org.au') || false;

  // Apply theme effect
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System theme
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDarkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  // Helper function for category icons
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Laptops': '💻',
      'Smartphones': '📱',
      'Audio': '🎧',
      'Wearables': '⌚',
      'Cameras': '📷',
      'Gaming': '🎮',
      'Monitors': '🖥️',
      'Tablets': '📱',
      'Drones': '🚁',
      'Accessories': '⌨️',
    };
    return icons[category] || '📦';
  };

  // Calculate categories based on current products
  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>();
    products.forEach(p => {
      categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1);
    });

    return [
      { name: 'All Products', count: products.length, icon: '📱' },
      ...Array.from(categoryMap.entries()). map(([name, count]) => ({
        name,
        count,
        icon: getCategoryIcon(name)
      }))
    ];
  }, [products]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        toast.success('Quantity updated in cart');
        return prev.map((item) =>
          item.id === product. id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success('Added to cart');
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev. filter((item) => item.id !== id));
    toast.info('Item removed from cart');
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by sale status first
    if (showOnlySale) {
      filtered = filtered.filter((p) => p. badge === 'Sale');
    }

    // Filter by category
    if (selectedCategory !== 'All Products') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery. trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description. toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery, products, showOnlySale]);

  // Handler for "Shop Now" button
  const handleShopNow = () => {
    setSelectedCategory('All Products');
    setSearchQuery('');
    setShowOnlySale(false);
    setTimeout(() => {
      productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Handler for "View Deals" button - show only products with badge === 'Sale'
  const handleViewDeals = () => {
    setSelectedCategory('All Products');
    setSearchQuery('');
    setShowOnlySale(true);
    setTimeout(() => {
      productsRef. current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleLogin = (userData: { email: string; name: string }) => {
    setUser(userData);
    const isStaffUser = userData.email.endsWith('@awe.staff.org. au');
    
    if (isStaffUser) {
      setCurrentPage('admin');
      toast.success(`Welcome back, ${userData.name}!  (Staff)`);
    } else {
      setCurrentPage('store');
      toast.success(`Welcome back, ${userData.name}!`);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('store');
    toast.info('Logged out successfully');
  };

  const handleAccountClick = () => {
    if (user) {
      if (isStaff) {
        setCurrentPage('admin');
      } else {
        setCurrentPage('account');
      }
    } else {
      setCurrentPage('login');
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const handleBackToStore = () => {
    setCurrentPage('store');
    setSelectedProduct(null);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    if (!user) {
      toast. error('Please log in or sign up to proceed to checkout');
      setIsCartOpen(false);
      setCurrentPage('login');
      return;
    }
    
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  const handlePlaceOrder = (data: OrderData) => {
    // Generate order ID
    const newOrderId = 'AWE-' + Math.random().toString(36).substr(2, 9). toUpperCase();
    setOrderId(newOrderId);
    setOrderData(data);
    
    // Create order record
    const newOrder: Order = {
      id: Date.now().toString(),
      orderNumber: newOrderId,
      customerName: data.shipping.fullName,
      customerEmail: data.shipping.email,
      items: data.items,
      total: data.total,
      status: 'pending',
      shippingAddress: `${data.shipping.address}\n${data.shipping.city}, ${data.shipping.state} ${data.shipping.postcode}\n${data.shipping.country}`,
      paymentMethod: data.payment.method,
      createdAt: new Date(),
    };
    
    setOrders(prev => [newOrder, ...prev]);
    
    // Update product stock quantities
    cartItems.forEach(item => {
      setProducts(prev => prev.map(p => 
        p.id === item.id 
          ? { ... p, stockQuantity: Math.max(0, (p.stockQuantity || 0) - item.quantity) }
          : p
      ));
    });
    
    // Clear cart
    setCartItems([]);
    
    // Navigate to confirmation
    setCurrentPage('confirmation');
    
    toast.success('Order placed successfully!');
  };

  const handleContinueShopping = () => {
    setCurrentPage('store');
    setOrderData(null);
    setOrderId('');
  };

  // Admin handlers
  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev. map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [...prev, newProduct]);
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ?  { ...o, status } : o));
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Render Login Page
  if (currentPage === 'login') {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  // Render Admin Dashboard (for staff)
  if (currentPage === 'admin' && user && isStaff) {
    return (
      <>
        <AdminDashboard
          user={user}
          onLogout={handleLogout}
          onBackToStore={handleBackToStore}
          products={products}
          orders={orders}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onAddProduct={handleAddProduct}
          onUpdateOrderStatus={handleUpdateOrderStatus}
        />
        <Toaster />
      </>
    );
  }

  // Render Account Page
  if (currentPage === 'account' && user) {
    return (
      <>
        <AccountPage
          user={user}
          onLogout={handleLogout}
          onBackToStore={() => setCurrentPage('store')}
          theme={theme}
          language={language}
          onSavePreferences={(newTheme, newLanguage) => {
            setTheme(newTheme);
            setLanguage(newLanguage);
            toast.success('Preferences saved successfully!');
          }}
        />
        <Toaster />
      </>
    );
  }

  // Render Product Detail Page
  if (currentPage === 'product' && selectedProduct) {
    return (
      <>
        <ProductDetailPage
          product={selectedProduct}
          onBack={handleBackToStore}
          onAddToCart={handleAddToCart}
          cartItemCount={cartItemCount}
          onCartClick={() => setIsCartOpen(true)}
        />
        <CartSheet
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
        <Toaster />
      </>
    );
  }

  // Render Checkout Page
  if (currentPage === 'checkout') {
    return (
      <>
        <CheckoutPage
          cartItems={cartItems}
          onBack={() => {
            setCurrentPage('store');
            setIsCartOpen(true);
          }}
          onPlaceOrder={handlePlaceOrder}
          user={user}
        />
        <Toaster />
      </>
    );
  }

  // Render Order Confirmation Page
  if (currentPage === 'confirmation' && orderData) {
    return (
      <>
        <OrderConfirmationPage
          orderData={orderData}
          orderId={orderId}
          onContinueShopping={handleContinueShopping}
          onViewAccount={handleAccountClick}
          user={user}
        />
        <Toaster />
      </>
    );
  }

  // Render Store (Main Page)
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        onSearchChange={setSearchQuery}
        user={user}
        onAccountClick={handleAccountClick}
      />
      
      <Hero onShopNow={handleShopNow} onViewDeals={handleViewDeals} productCount={products.length} />
      
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          setShowOnlySale(false);
        }}
      />

      <main className="flex-1 container mx-auto px-4 py-8" ref={productsRef}>
        <div className="mb-6">
          <h2 className="text-2xl mb-2">
            {showOnlySale ? 'Sale Products' : selectedCategory}
          </h2>
          <p className="text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No products found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />

      <CartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <Toaster />
    </div>
  );
}