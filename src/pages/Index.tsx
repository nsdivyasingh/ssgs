import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Building2, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/products";
import heroImage from "@/assets/hero-cleaning.jpg";

const featuredProducts = products.filter(p => p.badge).slice(0, 4);

const HomePage = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary/5">
        <div className="container grid items-center gap-8 py-12 md:py-20 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              🚚 Free delivery within 1 km
            </span>
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl text-balance">
              Quality Cleaning Products for{" "}
              <span className="text-primary">Homes & Apartments</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-lg">
              Siddeshwara Global Services — your trusted supplier of household cleaning products. From single orders to bulk apartment supply.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products">
                <Button size="lg" className="gap-2">
                  <ShoppingBag className="h-5 w-5" /> Shop Now
                </Button>
              </Link>
              <Link to="/bulk-orders">
                <Button size="lg" variant="outline" className="gap-2">
                  <Building2 className="h-5 w-5" /> Bulk Orders
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="gap-2">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img
              src={heroImage}
              alt="Cleaning products flat lay"
              className="w-full rounded-2xl shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-display text-2xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/products?category=${cat.id}`}
                  className="flex flex-col items-center gap-3 rounded-xl border bg-card p-6 text-center transition-all hover:shadow-[var(--card-shadow-hover)] hover:border-primary/30"
                >
                  <span className="text-3xl">{cat.icon}</span>
                  <span className="text-sm font-medium">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Info Banner */}
      <section className="py-16">
        <div className="container">
          <div className="rounded-2xl bg-primary p-8 md:p-12 text-primary-foreground">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex items-start gap-4">
                <Truck className="h-8 w-8 shrink-0 mt-1" />
                <div>
                  <h3 className="font-display font-bold text-lg">Free Local Delivery</h3>
                  <p className="text-sm opacity-90">Free delivery for orders within 1 km of our store</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Building2 className="h-8 w-8 shrink-0 mt-1" />
                <div>
                  <h3 className="font-display font-bold text-lg">Apartment Supply</h3>
                  <p className="text-sm opacity-90">Monthly bulk supply for apartments & societies</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ShoppingBag className="h-8 w-8 shrink-0 mt-1" />
                <div>
                  <h3 className="font-display font-bold text-lg">Quality Products</h3>
                  <p className="text-sm opacity-90">Trusted brands at competitive prices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
