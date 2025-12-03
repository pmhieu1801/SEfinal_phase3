import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Package, 
  ShoppingCart, 
  LogOut, 
  TrendingUp,
  Users,
  DollarSign,
  ArrowLeft
} from 'lucide-react';
import { Product, Order } from '../types/product';
import { ProductManagement } from './ProductManagement';
import { OrderManagement } from './OrderManagement';

interface AdminDashboardProps {
  user: { email: string; name: string };
  onLogout: () => void;
  onBackToStore: () => void;
  products: Product[];
  orders: Order[];
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onAddProduct: (product: Product) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export function AdminDashboard({ 
  user, 
  onLogout, 
  onBackToStore,
  products,
  orders,
  onUpdateProduct,
  onDeleteProduct,
  onAddProduct,
  onUpdateOrderStatus
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => (p.stockQuantity || 0) < 10).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={onBackToStore} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                View Store
              </Button>
              <div className="flex items-center gap-3 px-3">
                <div className="flex flex-col items-end">
                  <span className="text-sm">{user.name}</span>
                  <span className="text-xs text-muted-foreground">Staff</span>
                </div>
              </div>
              <Button variant="outline" onClick={onLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="overview" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Orders
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div>
              <h2 className="text-3xl mb-2">Dashboard Overview</h2>
              <p className="text-muted-foreground">
                Welcome back, {user.name}. Here's what's happening with your store.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">${totalRevenue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    From {totalOrders} orders
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{totalOrders}</div>
                  <p className="text-xs text-muted-foreground">
                    {pendingOrders} pending
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{totalProducts}</div>
                  <p className="text-xs text-muted-foreground">
                    {lowStockProducts} low stock
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm">Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">
                    {new Set(orders.map(o => o.customerEmail)).size}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Unique customers
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest orders from your store</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No orders yet</p>
                ) : (
                  <div className="space-y-4">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                        <div>
                          <p className="text-sm">{order.orderNumber}</p>
                          <p className="text-sm text-muted-foreground">{order.customerName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">${order.total.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground capitalize">{order.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <ProductManagement
              products={products}
              onUpdateProduct={onUpdateProduct}
              onDeleteProduct={onDeleteProduct}
              onAddProduct={onAddProduct}
            />
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <OrderManagement
              orders={orders}
              onUpdateOrderStatus={onUpdateOrderStatus}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
