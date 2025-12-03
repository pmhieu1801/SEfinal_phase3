import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";
import { ShoppingBag } from "lucide-react";

interface LoginPageProps {
  onLogin: (user: { email: string; name: string }) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in production, validate against backend
    if (loginEmail && loginPassword) {
      // Check for guest account
      if (loginEmail === "guest@example.com" && loginPassword === "123") {
        onLogin({
          email: loginEmail,
          name: "Guest User",
        });
      } else {
        onLogin({
          email: loginEmail,
          name: loginEmail.split("@")[0],
        });
      }
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup - in production, create account in backend
    if (signupName && signupEmail && signupPassword) {
      onLogin({
        email: signupEmail,
        name: signupName,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
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
            <span className="tracking-tight">Electronics</span>
          </div>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>
                  Login to your account to continue shopping
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={loginEmail}
                      onChange={(e) =>
                        setLoginEmail(e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">
                      Password
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) =>
                        setLoginPassword(e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) =>
                          setRememberMe(checked as boolean)
                        }
                      />
                      <Label
                        htmlFor="remember"
                        className="text-sm cursor-pointer"
                      >
                        Remember me
                      </Label>
                    </div>
                    <Button
                      variant="link"
                      className="px-0 text-sm"
                      type="button"
                    >
                      Forgot password?
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Join AWE Electronics for exclusive deals and
                  rewards
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSignup}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">
                      Full Name
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={signupName}
                      onChange={(e) =>
                        setSignupName(e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={signupEmail}
                      onChange={(e) =>
                        setSignupEmail(e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a strong password"
                      value={signupPassword}
                      onChange={(e) =>
                        setSignupPassword(e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label
                      htmlFor="terms"
                      className="text-sm cursor-pointer"
                    >
                      I agree to the terms and conditions
                    </Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Benefits */}
        <Card className="mt-4">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
              <span>Member Benefits</span>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Free shipping on orders over $50</li>
              <li>✓ Exclusive member discounts and deals</li>
              <li>✓ Earn loyalty points on every purchase</li>
              <li>✓ Track orders and manage returns easily</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}