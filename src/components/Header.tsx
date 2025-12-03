import image_609f42ca63ab7c4240720dd189a1298658e9d856 from "figma:asset/609f42ca63ab7c4240720dd189a1298658e9d856.png";
import {
  ShoppingCart,
  Search,
  Menu,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearchChange: (query: string) => void;
  user?: { email: string; name: string } | null;
  onAccountClick: () => void;
}

export function Header({
  cartItemCount,
  onCartClick,
  onSearchChange,
  user,
  onAccountClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
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
              <span className="tracking-tight">
                Electronics
              </span>
              <span className="text-xs text-muted-foreground">
                Online
              </span>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full pl-9"
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <Button
                variant="ghost"
                className="hidden md:inline-flex gap-2"
                onClick={onAccountClick}
              >
                <User className="h-5 w-5" />
                <span>{user.name}</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="hidden md:inline-flex"
                onClick={onAccountClick}
              >
                Login
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="flex md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-9"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
}