import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Search, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/bulk-orders", label: "Bulk Orders" },
  { to: "/offers", label: "Offers" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 animate-fade-in-down">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="overflow-hidden py-1.5 text-sm">
          <div className="marquee-track">
            <div className="marquee-content">
              <span>🚚 Free delivery within 1 km!</span>
              <a href="tel:+919845329179" className="flex items-center gap-1 hover:underline transition-smooth duration-200">
                <Phone className="h-3 w-3" /> Contact us on +91 98453 29179
              </a>
              <span>🏢 Bulk apartment supply available</span>
              <span>✅ Trusted quality products at fair prices</span>
              <span>⚡ Fast doorstep service in your area</span>
              <span>🎁 Ask for combo deals and seasonal offers</span>
              <span>🚚 Free delivery within 1 km!</span>
              <a href="tel:+919845329179" className="flex items-center gap-1 hover:underline transition-smooth duration-200">
                <Phone className="h-3 w-3" /> Contact us on +91 98453 29179
              </a>
              <span>🏢 Bulk apartment supply available</span>
              <span>✅ Trusted quality products at fair prices</span>
              <span>⚡ Fast doorstep service in your area</span>
              <span>🎁 Ask for combo deals and seasonal offers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-smooth duration-200">
          <img src="/favicon.jpg?v=3" alt="Siddeshwara Global Services Logo" className="h-10 w-10 rounded-lg object-cover" loading="lazy" />
          <div className="hidden sm:block">
            <div className="font-display font-bold text-lg leading-tight">Siddeshwara</div>
            <div className="text-xs text-muted-foreground leading-tight">Global Services</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-smooth duration-300 ${
                location.pathname === link.to
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted hover:-translate-y-0.5"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {/* Admin Link */}
          {(!user || isAdmin) && (
            <Link
              to={user && isAdmin ? "/admin" : "/admin-login"}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-smooth duration-300 ${
                location.pathname.includes("admin")
                  ? "bg-blue-600/10 text-blue-600"
                  : "text-blue-600/70 hover:text-blue-600 hover:bg-blue-50 hover:-translate-y-0.5"
              }`}
            >
              {user && isAdmin ? "Admin Dashboard" : "Admin Portal"}
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/products">
            <Button variant="ghost" size="icon" className="text-foreground/70 transition-smooth duration-200 hover:scale-110 hover:text-foreground">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="text-foreground/70 transition-smooth duration-200 hover:scale-110 hover:text-foreground">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold animate-bounce-in">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          {user ? (
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="hidden md:inline-flex text-foreground/70 transition-smooth duration-200 hover:scale-110 hover:text-foreground">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/login" className="hidden sm:block">
              <Button variant="outline" size="sm" className="ml-2">
                Sign In
              </Button>
            </Link>
          )}
          <Button variant="ghost" size="icon" className="md:hidden text-foreground/70 transition-smooth duration-200 hover:scale-110" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t pb-4 animate-slide-in-up">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-6 py-3 text-sm font-medium transition-smooth duration-300 hover:bg-primary/5 ${
                location.pathname === link.to ? "bg-primary/10 text-primary" : "text-foreground/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Mobile Admin Link */}
          {(!user || isAdmin) && (
            <Link
              to={user && isAdmin ? "/admin" : "/admin-login"}
              onClick={() => setMobileOpen(false)}
              className={`block px-6 py-3 text-sm font-medium transition-smooth duration-300 hover:bg-blue-50 ${
                location.pathname.includes("admin") ? "bg-blue-600/10 text-blue-600" : "text-blue-600/70"
              }`}
            >
              {user && isAdmin ? "Admin Dashboard" : "Admin Portal"}
            </Link>
          )}

          {user && (
            <Link
              to="/profile"
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-3 text-sm font-medium transition-smooth duration-300 hover:bg-primary/5 text-foreground/70"
            >
              Profile
            </Link>
          )}

          {!user && (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-3 text-sm font-medium text-primary hover:bg-primary/5"
            >
              Sign In
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
