import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Search, Eye, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { Order } from '../types/product';
import { toast } from 'sonner@2.0.3';

interface OrderManagementProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export function OrderManagement({ orders, onUpdateOrderStatus }: OrderManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    onUpdateOrderStatus(orderId, newStatus);
    toast.success('Order status updated');
    
    // Update selected order if it's open
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    const variants: Record<Order['status'], { variant: any; icon: any }> = {
      pending: { variant: 'secondary', icon: Package },
      processing: { variant: 'default', icon: Package },
      shipped: { variant: 'default', icon: Truck },
      delivered: { variant: 'default', icon: CheckCircle },
      cancelled: { variant: 'destructive', icon: XCircle },
    };
    
    const { variant, icon: Icon } = variants[status];
    return (
      <Badge variant={variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const statusOptions: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>View and manage customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-4 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.orderNumber}</TableCell>
                      <TableCell>
                        <div>
                          <p>{order.customerName}</p>
                          <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{order.items.length}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                              className="gap-2"
                            >
                              <Eye className="h-4 w-4" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Order Details</DialogTitle>
                              <DialogDescription>
                                Order {selectedOrder?.orderNumber}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedOrder && (
                              <div className="space-y-6">
                                {/* Order Status */}
                                <div className="grid gap-4">
                                  <div>
                                    <label className="text-sm">Order Status</label>
                                    <Select
                                      value={selectedOrder.status}
                                      onValueChange={(value) => handleStatusChange(selectedOrder.id, value as Order['status'])}
                                    >
                                      <SelectTrigger className="mt-2">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {statusOptions.map((status) => (
                                          <SelectItem key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                <Separator />

                                {/* Customer Information */}
                                <div>
                                  <h3 className="mb-3">Customer Information</h3>
                                  <div className="grid gap-2 text-sm">
                                    <div className="grid grid-cols-3">
                                      <span className="text-muted-foreground">Name:</span>
                                      <span className="col-span-2">{selectedOrder.customerName}</span>
                                    </div>
                                    <div className="grid grid-cols-3">
                                      <span className="text-muted-foreground">Email:</span>
                                      <span className="col-span-2">{selectedOrder.customerEmail}</span>
                                    </div>
                                    <div className="grid grid-cols-3">
                                      <span className="text-muted-foreground">Order Date:</span>
                                      <span className="col-span-2">
                                        {new Date(selectedOrder.createdAt).toLocaleString()}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <Separator />

                                {/* Shipping Address */}
                                <div>
                                  <h3 className="mb-3">Shipping Address</h3>
                                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                                    {selectedOrder.shippingAddress}
                                  </p>
                                </div>

                                <Separator />

                                {/* Order Items */}
                                <div>
                                  <h3 className="mb-3">Order Items</h3>
                                  <div className="space-y-3">
                                    {selectedOrder.items.map((item) => (
                                      <div key={item.id} className="flex items-center gap-4 border-b pb-3 last:border-0">
                                        <img
                                          src={item.image}
                                          alt={item.name}
                                          className="h-16 w-16 rounded object-cover"
                                        />
                                        <div className="flex-1">
                                          <p className="text-sm">{item.name}</p>
                                          <p className="text-sm text-muted-foreground">
                                            ${item.price} × {item.quantity}
                                          </p>
                                        </div>
                                        <p className="text-sm">
                                          ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <Separator />

                                {/* Payment Information */}
                                <div>
                                  <h3 className="mb-3">Payment Information</h3>
                                  <div className="grid gap-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Payment Method:</span>
                                      <span className="capitalize">{selectedOrder.paymentMethod}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Total Amount:</span>
                                      <span className="text-lg">${selectedOrder.total.toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Summary Stats */}
          {orders.length > 0 && (
            <div className="mt-6 grid gap-4 md:grid-cols-5">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl">{orders.filter(o => o.status === 'pending').length}</div>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl">{orders.filter(o => o.status === 'processing').length}</div>
                  <p className="text-xs text-muted-foreground">Processing</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl">{orders.filter(o => o.status === 'shipped').length}</div>
                  <p className="text-xs text-muted-foreground">Shipped</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl">{orders.filter(o => o.status === 'delivered').length}</div>
                  <p className="text-xs text-muted-foreground">Delivered</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl">{orders.filter(o => o.status === 'cancelled').length}</div>
                  <p className="text-xs text-muted-foreground">Cancelled</p>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
