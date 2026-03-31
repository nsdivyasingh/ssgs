import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-secondary/50 transition-all duration-300">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group animate-fade-in-up transition-all duration-300 hover:translate-y-[-4px]">
            <div className="flex items-center gap-2 mb-4 transition-smooth duration-300">
              <img src="/favicon.jpg" alt="Siddeshwara Global Services Logo" className="h-9 w-9 rounded-lg object-cover group-hover:scale-110 transition-smooth duration-300" />
              <div>
                <div className="font-display font-bold leading-tight">Siddeshwara</div>
                <div className="text-xs text-muted-foreground">Global Services</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground transition-smooth duration-300">Your trusted partner for household and apartment cleaning products. Quality supplies for homes and residential complexes.</p>
          </div>

          <div className="animate-fade-in-up transition-all duration-300" style={{ animationDelay: '0.1s' }}>
            <h4 className="font-display font-semibold mb-4 transition-smooth duration-300">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products" className="hover:text-primary transition-smooth duration-200 hover:translate-x-1 inline-block">Shop Products</Link></li>
              <li><Link to="/bulk-orders" className="hover:text-primary transition-smooth duration-200 hover:translate-x-1 inline-block">Bulk Orders</Link></li>
              <li><Link to="/offers" className="hover:text-primary transition-smooth duration-200 hover:translate-x-1 inline-block">Offers & Combos</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-smooth duration-200 hover:translate-x-1 inline-block">About Us</Link></li>
            </ul>
          </div>

          <div className="animate-fade-in-up transition-all duration-300" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-display font-semibold mb-4 transition-smooth duration-300">Delivery Info</h4>
            <ul className="space-y-2 text-sm text-muted-foreground transition-smooth duration-300">
              <li className="transition-smooth duration-200 hover:translate-x-1">🚚 Free delivery within 1 km</li>
              <li className="transition-smooth duration-200 hover:translate-x-1">📦 Charges apply beyond 1 km</li>
              <li className="transition-smooth duration-200 hover:translate-x-1">⏰ Same-day delivery available</li>
              <li className="transition-smooth duration-200 hover:translate-x-1">🛒 Min order: ₹1500</li>
            </ul>
          </div>

          <div className="animate-fade-in-up transition-all duration-300" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-display font-semibold mb-4 transition-smooth duration-300">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2 transition-smooth duration-200 hover:text-foreground"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> Siddeshwara Global Services, Begur Hobli, 191, 1st Cross Rd, AECS Layout - A Block, Singasandra, Bengaluru, Karnataka 560068</li>
              <li className="flex items-center gap-2 transition-smooth duration-200 hover:text-foreground cursor-pointer"><Phone className="h-4 w-4 shrink-0" /> +91 98453 29179</li>
              <li className="flex items-center gap-2 transition-smooth duration-200 hover:text-foreground cursor-pointer"><Mail className="h-4 w-4 shrink-0" /> sgs.blr@outlook.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground transition-smooth duration-300">
          © {new Date().getFullYear()} Siddeshwara Global Services. All rights reserved.
        </div>
      </div>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/919845329179?text=Hi%2C%20I%20want%20to%20place%20an%20order"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(142,70%,45%)] text-white shadow-lg hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </footer>
  );
}
