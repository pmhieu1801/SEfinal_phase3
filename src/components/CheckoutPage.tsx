import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  ShoppingBag, 
  Check,
  MapPin,
  Lock
} from 'lucide-react';
import { CartItem } from '../types/product';

interface CheckoutPageProps {
  cartItems: CartItem[];
  onBack: () => void;
  onPlaceOrder: (orderData: OrderData) => void;
  user?: { email: string; name: string } | null;
}

export interface OrderData {
  shipping: ShippingInfo;
  payment: PaymentInfo;
  items: CartItem[];
  total: number;
}

interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

interface PaymentInfo {
  method: 'card' | 'paypal' | 'afterpay';
  cardNumber?: string;
  cardName?: string;
  expiryDate?: string;
  cvv?: string;
}

export function CheckoutPage({ cartItems, onBack, onPlaceOrder, user }: CheckoutPageProps) {
  const [step, setStep] = useState(1);
  
  // Shipping form state
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: 'VIC',
    postcode: '',
    country: 'Australia',
  });

  // Payment form state
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'card',
  });

  const [saveInfo, setSaveInfo] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState(true);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.1; // 10% GST
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePlaceOrder = () => {
    const orderData: OrderData = {
      shipping: shippingInfo,
      payment: paymentInfo,
      items: cartItems,
      total,
    };
    onPlaceOrder(orderData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                <span className="text-white">⚡</span>
              </div>
              <div className="flex flex-col">
                <span className="tracking-tight">AWE Electronics</span>
                <span className="text-xs text-muted-foreground">Secure Checkout</span>
              </div>
            </div>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[
              { num: 1, label: 'Shipping', icon: Truck },
              { num: 2, label: 'Payment', icon: CreditCard },
              { num: 3, label: 'Review', icon: ShoppingBag },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
                      step > s.num
                        ? 'bg-green-600 border-green-600 text-white'
                        : step === s.num
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-gray-300 text-gray-400'
                    }`}
                  >
                    {step > s.num ? (
                      <Check className="h-6 w-6" />
                    ) : (
                      <s.icon className="h-6 w-6" />
                    )}
                  </div>
                  <span className="text-sm mt-2">{s.label}</span>
                </div>
                {idx < 2 && (
                  <div
                    className={`h-0.5 w-16 mx-4 ${
                      step > s.num ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                  <CardDescription>
                    Enter your delivery details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={shippingInfo.fullName}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, fullName: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, email: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+61 xxx xxx xxx"
                          value={shippingInfo.phone}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, phone: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="address">Street Address *</Label>
                        <Input
                          id="address"
                          value={shippingInfo.address}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, address: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={shippingInfo.city}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, city: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={shippingInfo.state}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, state: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postcode">Postcode *</Label>
                        <Input
                          id="postcode"
                          value={shippingInfo.postcode}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, postcode: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Input
                          id="country"
                          value={shippingInfo.country}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, country: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="save"
                        checked={saveInfo}
                        onCheckedChange={(checked) => setSaveInfo(checked as boolean)}
                      />
                      <Label htmlFor="save" className="text-sm cursor-pointer">
                        Save this information for next time
                      </Label>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="flex-1">
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Information */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                  <CardDescription>
                    Select your preferred payment method
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <RadioGroup
                      value={paymentInfo.method}
                      onValueChange={(value) =>
                        setPaymentInfo({ ...paymentInfo, method: value as any })
                      }
                    >
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                <span>Credit/Debit Card</span>
                              </div>
                              <div className="flex gap-2">
                                <div className="h-6 w-10 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                                  VISA
                                </div>
                                <div className="h-6 w-10 bg-red-600 rounded text-white text-xs flex items-center justify-center">
                                  MC
                                </div>
                              </div>
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                P
                              </div>
                              <span>PayPal</span>
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="afterpay" id="afterpay" />
                          <Label htmlFor="afterpay" className="flex-1 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 bg-black rounded flex items-center justify-center text-white text-xs">
                                AP
                              </div>
                              <span>Afterpay - Pay in 4 installments</span>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>

                    {paymentInfo.method === 'card' && (
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={paymentInfo.cardNumber || ''}
                            onChange={(e) =>
                              setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Cardholder Name *</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            value={paymentInfo.cardName || ''}
                            onChange={(e) =>
                              setPaymentInfo({ ...paymentInfo, cardName: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date *</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={paymentInfo.expiryDate || ''}
                              onChange={(e) =>
                                setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              type="password"
                              maxLength={4}
                              value={paymentInfo.cvv || ''}
                              onChange={(e) =>
                                setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                              }
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-lg">
                      <Lock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-900">
                        Your payment information is encrypted and secure
                      </span>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button type="submit" className="flex-1">
                        Review Order
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Review Order */}
            {step === 3 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <p>{shippingInfo.fullName}</p>
                      <p className="text-muted-foreground">{shippingInfo.address}</p>
                      <p className="text-muted-foreground">
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.postcode}
                      </p>
                      <p className="text-muted-foreground">{shippingInfo.country}</p>
                      <p className="text-muted-foreground pt-2">{shippingInfo.email}</p>
                      <p className="text-muted-foreground">{shippingInfo.phone}</p>
                    </div>
                    <Button
                      variant="link"
                      className="px-0 mt-3"
                      onClick={() => setStep(1)}
                    >
                      Edit
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {paymentInfo.method === 'card' && (
                        <>
                          <p>Credit/Debit Card</p>
                          <p className="text-muted-foreground">
                            •••• •••• •••• {paymentInfo.cardNumber?.slice(-4)}
                          </p>
                        </>
                      )}
                      {paymentInfo.method === 'paypal' && <p>PayPal</p>}
                      {paymentInfo.method === 'afterpay' && <p>Afterpay</p>}
                    </div>
                    <Button
                      variant="link"
                      className="px-0 mt-3"
                      onClick={() => setStep(2)}
                    >
                      Edit
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
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
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={handlePlaceOrder}>
                    Place Order - ${total.toFixed(2)}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded overflow-hidden bg-gray-100 relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                          {item.quantity}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-1">{item.name}</p>
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

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (GST)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="text-xl">${total.toFixed(2)}</span>
                  </div>
                </div>

                {subtotal < 50 && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-900">
                      Add ${(50 - subtotal).toFixed(2)} more for FREE shipping!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
