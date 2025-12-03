import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { CheckCircle, Package, Truck, Mail, Download, ArrowRight } from 'lucide-react';
import { OrderData } from './CheckoutPage';

interface OrderConfirmationPageProps {
  orderData: OrderData;
  orderId: string;
  onContinueShopping: () => void;
  onViewAccount: () => void;
  user?: { email: string; name: string } | null;
}

export function OrderConfirmationPage({
  orderData,
  orderId,
  onContinueShopping,
  onViewAccount,
  user,
}: OrderConfirmationPageProps) {
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
              <span className="text-white">⚡</span>
            </div>
            <div className="flex flex-col">
              <span className="tracking-tight">AWE Electronics</span>
              <span className="text-xs text-muted-foreground">Order Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-4">
            Thank you for your purchase. We've sent a confirmation email to{' '}
            <span className="font-medium">{orderData.shipping.email}</span>
          </p>
          <Badge variant="secondary" className="text-base px-4 py-2">
            Order #{orderId}
          </Badge>
        </div>

        {/* Order Timeline */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Order Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Order Confirmed</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString('en-AU', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="ml-5 h-8 w-0.5 bg-gray-200" />

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <Package className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-muted-foreground">Processing</p>
                  <p className="text-sm text-muted-foreground">
                    We're preparing your order
                  </p>
                </div>
              </div>

              <div className="ml-5 h-8 w-0.5 bg-gray-200" />

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <Truck className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-muted-foreground">Shipped</p>
                  <p className="text-sm text-muted-foreground">
                    Expected by{' '}
                    {estimatedDelivery.toLocaleDateString('en-AU', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-1">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>
                  $
                  {orderData.items
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0) >
                  50 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    '$9.99'
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (GST)</span>
                <span>
                  $
                  {(
                    orderData.items.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    ) * 0.1
                  ).toFixed(2)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Total</span>
                <span className="text-xl">${orderData.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping & Payment Info */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <p>{orderData.shipping.fullName}</p>
                <p className="text-muted-foreground">{orderData.shipping.address}</p>
                <p className="text-muted-foreground">
                  {orderData.shipping.city}, {orderData.shipping.state}{' '}
                  {orderData.shipping.postcode}
                </p>
                <p className="text-muted-foreground">{orderData.shipping.country}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                {orderData.payment.method === 'card' && (
                  <>
                    <p>Credit/Debit Card</p>
                    <p className="text-muted-foreground">
                      •••• •••• •••• {orderData.payment.cardNumber?.slice(-4)}
                    </p>
                  </>
                )}
                {orderData.payment.method === 'paypal' && (
                  <p>PayPal ({orderData.shipping.email})</p>
                )}
                {orderData.payment.method === 'afterpay' && (
                  <>
                    <p>Afterpay</p>
                    <p className="text-muted-foreground">4 interest-free payments</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className={`grid gap-3 ${user ? 'sm:grid-cols-2' : ''}`}>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download Invoice
            </Button>
            {user && (
              <Button variant="outline" className="gap-2" onClick={onViewAccount}>
                <Mail className="h-4 w-4" />
                View Order in Account
              </Button>
            )}
          </div>
          <Button className="w-full gap-2" onClick={onContinueShopping}>
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Help Section */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-medium mb-2">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Our customer support team is here to help you with any questions.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="tel:+61..." className="text-blue-600 hover:underline">
                📞 Call Us
              </a>
              <a href="mailto:support@aweelectronics.com" className="text-blue-600 hover:underline">
                ✉️ Email Support
              </a>
              <a href="#" className="text-blue-600 hover:underline">
                💬 Live Chat
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
