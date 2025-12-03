import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
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
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted destination for the latest
              electronics and technology.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  All Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Sale
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Returns
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 AWE Electronics. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}