import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { User, Package, Settings, LogOut, Award, CreditCard, MapPin, Moon, Sun, Monitor, Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useState } from 'react';

interface AccountPageProps {
  user: { email: string; name: string };
  onLogout: () => void;
  onBackToStore: () => void;
  theme: 'light' | 'dark' | 'system';
  language: string;
  onSavePreferences: (theme: 'light' | 'dark' | 'system', language: string) => void;
}

export function AccountPage({ user, onLogout, onBackToStore, theme: initialTheme, language: initialLanguage, onSavePreferences }: AccountPageProps) {
  const [activeTab, setActiveTab] = useState('orders');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(initialTheme);
  const [language, setLanguage] = useState(initialLanguage);

  // Mock data
  const orderHistory = [
    { id: 'ORD-001', date: '2025-10-28', status: 'Delivered', total: 1549.98, items: 2 },
    { id: 'ORD-002', date: '2025-10-15', status: 'Shipped', total: 899.99, items: 1 },
    { id: 'ORD-003', date: '2025-09-30', status: 'Delivered', total: 349.99, items: 1 },
  ];

  const loyaltyPoints = 2450;
  const nextRewardAt = 3000;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
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
            </div>
            </div>
            <Button onClick={onBackToStore} variant="outline">
              Back to Store
            </Button>
          </div>
        </div>
      </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <Card className="lg:col-span-1 h-fit">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <CardTitle className="text-base">{user.name}</CardTitle>
                  <CardDescription className="text-sm">{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <Button 
                variant={activeTab === 'profile' ? 'secondary' : 'ghost'} 
                className="w-full justify-start gap-2"
                onClick={() => setActiveTab('profile')}
              >
                <User className="h-4 w-4" />
                Profile
              </Button>
              <Button 
                variant={activeTab === 'orders' ? 'secondary' : 'ghost'} 
                className="w-full justify-start gap-2"
                onClick={() => setActiveTab('orders')}
              >
                <Package className="h-4 w-4" />
                Orders
              </Button>
              <Button 
                variant={activeTab === 'loyalty' ? 'secondary' : 'ghost'} 
                className="w-full justify-start gap-2"
                onClick={() => setActiveTab('loyalty')}
              >
                <Award className="h-4 w-4" />
                Loyalty Program
              </Button>
              <Button 
                variant={activeTab === 'settings' ? 'secondary' : 'ghost'} 
                className="w-full justify-start gap-2"
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Separator className="my-2" />
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Loyalty Points Card */}
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Loyalty Rewards</CardTitle>
                    <CardDescription className="text-blue-100">
                      Your points and benefits
                    </CardDescription>
                  </div>
                  <Award className="h-8 w-8" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl mb-1">{loyaltyPoints.toLocaleString()} Points</div>
                    <div className="text-sm text-blue-100">
                      {nextRewardAt - loyaltyPoints} points until next reward
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white rounded-full h-2 transition-all"
                      style={{ width: `${(loyaltyPoints / nextRewardAt) * 100}%` }}
                    />
                  </div>
                  <Button variant="secondary" size="sm">
                    View Rewards Catalog
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            {activeTab === 'orders' && (
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View and track your orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderHistory.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span>{order.id}</span>
                            <Badge
                              variant={order.status === 'Delivered' ? 'default' : 'secondary'}
                            >
                              {order.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {order.date} • {order.items} items
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="mb-2">${order.total.toFixed(2)}</div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue={user.name.split(' ')[0]} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue={user.name.split(' ')[1] || ''} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+61 xxx xxx xxx" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'loyalty' && (
              <Card>
                <CardHeader>
                  <CardTitle>Loyalty Program Details</CardTitle>
                  <CardDescription>View your rewards and benefits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="border rounded-lg p-4">
                      <div className="text-2xl mb-1">{loyaltyPoints}</div>
                      <div className="text-sm text-muted-foreground">Total Points</div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="text-2xl mb-1">3</div>
                      <div className="text-sm text-muted-foreground">Rewards Earned</div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="text-2xl mb-1">Gold</div>
                      <div className="text-sm text-muted-foreground">Member Tier</div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="mb-3">Available Rewards</h3>
                    <div className="space-y-3">
                      <div className="border rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <div>$10 Off Next Purchase</div>
                          <div className="text-sm text-muted-foreground">Expires Dec 31, 2025</div>
                        </div>
                        <Button size="sm">Redeem</Button>
                      </div>
                      <div className="border rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <div>Free Shipping</div>
                          <div className="text-sm text-muted-foreground">Valid for 30 days</div>
                        </div>
                        <Button size="sm">Redeem</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'settings' && (
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Manage your preferences and app settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Theme Settings */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Appearance</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Choose how AWE Electronics looks to you
                      </p>
                    </div>
                    <RadioGroup value={theme} onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}>
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value="light" id="light" />
                        <Label htmlFor="light" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Sun className="h-4 w-4" />
                          <div>
                            <div>Light</div>
                            <div className="text-sm text-muted-foreground">Bright and clear interface</div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value="dark" id="dark" />
                        <Label htmlFor="dark" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Moon className="h-4 w-4" />
                          <div>
                            <div>Dark</div>
                            <div className="text-sm text-muted-foreground">Easy on the eyes</div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value="system" id="system" />
                        <Label htmlFor="system" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Monitor className="h-4 w-4" />
                          <div>
                            <div>System</div>
                            <div className="text-sm text-muted-foreground">Match your device settings</div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  {/* Language Settings */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">Language</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Select your preferred language
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English (US)</SelectItem>
                          <SelectItem value="en-gb">English (UK)</SelectItem>
                          <SelectItem value="en-au">English (Australia)</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="it">Italiano</SelectItem>
                          <SelectItem value="pt">Português</SelectItem>
                          <SelectItem value="ja">日本語</SelectItem>
                          <SelectItem value="zh">中文</SelectItem>
                          <SelectItem value="ko">한국어</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <Button onClick={() => onSavePreferences(theme, language)}>Save Preferences</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}