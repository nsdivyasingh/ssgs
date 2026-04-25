import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Building2, Truck, ArrowRight, User, Tag, Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { products, categories, comboDeals } from "@/lib/products";
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
              alt="Collection of household and cleaning supplies"
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

      {/* About Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <User className="h-6 w-6 text-primary" />
            <h2 className="font-display text-3xl font-bold">About Siddeshwara Global Services</h2>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2 items-center mb-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg text-muted-foreground mb-4">
                Your trusted partner for quality household and apartment cleaning products. We've been serving hundreds of homes and residential societies for over 5 years.
              </p>
              <p className="text-muted-foreground mb-6">
                We understand the unique cleaning needs of Indian homes and apartments. That's why we carefully curate our product range to include everything from floor cleaners and mops to hygiene essentials — all from trusted brands at competitive prices.
              </p>
              <Link to="/about">
                <Button className="gap-2">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "500+", desc: "Happy Customers" },
                { label: "50+", desc: "Apartments Served" },
                { label: "90+", desc: "Products Available" },
                { label: "5+", desc: "Years Experience" },
              ].map((stat, i) => (
                <div key={i} className="rounded-xl border bg-card p-6 text-center">
                  <div className="font-display text-2xl font-bold text-primary">{stat.label}</div>
                  <div className="text-sm text-muted-foreground mt-2">{stat.desc}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Tag className="h-6 w-6 text-accent" />
              <h2 className="font-display text-3xl font-bold">Featured Offers & Deals</h2>
            </div>
            <Link to="/offers" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {comboDeals.slice(0, 3).map((deal, i) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-accent/10 p-6">
                  <Badge className="bg-accent text-accent-foreground border-0 mb-3">
                    Save ₹{deal.originalPrice - deal.dealPrice}
                  </Badge>
                  <h3 className="font-display font-bold text-lg">{deal.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{deal.description}</p>
                </div>
                <div className="p-6">
                  <div className="space-y-2 mb-4">
                    {deal.products.slice(0, 2).map(pid => {
                      const p = products.find(pr => pr.id === pid);
                      return p ? (
                        <div key={pid} className="flex items-center gap-2 text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span className="truncate">{p.name}</span>
                          <span className="ml-auto text-muted-foreground shrink-0">₹{p.price}</span>
                        </div>
                      ) : null;
                    })}
                    {deal.products.length > 2 && (
                      <div className="text-xs text-muted-foreground italic pt-2">
                        + {deal.products.length - 2} more items
                      </div>
                    )}
                  </div>
                  <div className="flex items-end justify-between border-t pt-4">
                    <div>
                      <span className="text-sm text-muted-foreground line-through">₹{deal.originalPrice}</span>
                      <span className="ml-2 font-display font-bold text-lg text-primary">₹{deal.dealPrice}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Phone className="h-6 w-6 text-primary" />
              <h2 className="font-display text-3xl font-bold">Get In Touch</h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="rounded-xl border bg-card p-6">
                  <h3 className="font-display font-bold text-lg mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    {[
                      { icon: MapPin, label: "Address", value: "Siddeshwara Global Services, Begur Hobli, 191, 1st Cross Rd, near Govt Society, AECS Layout - A Block, Singasandra, Bengaluru, Karnataka 560068", href: "https://maps.google.com/?q=12.9179,77.6457" },
                      { icon: Phone, label: "Phone", value: "+91 98453 29179", href: "tel:+919845329179" },
                      { icon: Mail, label: "Email", value: "sgs.blr@outlook.com", href: "mailto:sgs.blr@outlook.com" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <item.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium">{item.label}</div>
                          {item.href ? (
                            <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                              {item.value}
                            </a>
                          ) : (
                            <div className="text-sm text-muted-foreground">{item.value}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to="/contact" className="block">
                  <Button className="w-full gap-2 transition-all duration-200" size="lg">
                    Send us a Message <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-xl border bg-card p-6"
              >
                <h3 className="font-display font-bold text-lg mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  {[
                    "Quality products from trusted brands",
                    "Competitive prices and special discounts",
                    "Free delivery within 1 km",
                    "Same-day delivery available",
                    "Dedicated bulk order support",
                    "Excellent customer service",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
