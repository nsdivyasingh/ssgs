import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, ArrowUpDown, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/products";

type SortOption = "featured" | "price-low" | "price-high" | "name";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  // Filter products
  let filtered = products.filter(p => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                         p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  if (sortBy === "price-low") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === "name") {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }

  const activeCategoryName = categories.find(c => c.id === activeCategory)?.name || "All Products";

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-8 md:py-12 animate-fade-in-down">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Our Shop</h1>
          <p className="text-primary-foreground/90 text-lg max-w-2xl">Complete range of cleaning products for homes, residential complexes, corporate offices, and hospitals.</p>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        {/* Search Bar */}
        <div className="mb-8 animate-fade-in-up">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 h-11 text-base"
            />
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-8 space-y-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {/* Category Filters */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <p className="font-display font-semibold text-sm">Categories</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={activeCategory === "all" ? "default" : "outline"}
                onClick={() => setSearchParams({})}
                className="transition-all duration-200 hover:scale-105"
              >
                All Products
              </Button>
              {categories.map(cat => (
                <Button
                  key={cat.id}
                  size="sm"
                  variant={activeCategory === cat.id ? "default" : "outline"}
                  onClick={() => setSearchParams({ category: cat.id })}
                  className="transition-all duration-200 hover:scale-105"
                >
                  {cat.icon} {cat.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Sort & Results */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filtered.length}</span> products found
              {activeCategory !== "all" && (
                <span className="ml-2">in <span className="font-semibold text-foreground">{activeCategoryName}</span></span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-[180px] transition-smooth duration-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="py-16 md:py-24 text-center animate-fade-in">
            <div className="mb-4">
              <Search className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            </div>
            <p className="text-xl font-semibold mb-2">No products found</p>
            <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchParams({});
                setSearch("");
                setSortBy("featured");
              }}
              className="mt-6 transition-smooth duration-200"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, index) => (
              <div
                key={p.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {filtered.length > 0 && (
          <div className="mt-12 pt-8 border-t text-center animate-fade-in-up">
            <p className="text-muted-foreground mb-4">
              Looking for bulk orders? We offer special discounts for residential complexes and bulk buyers.
            </p>
            <Button size="lg" className="transition-smooth duration-200" asChild>
              <a href="/bulk-orders">Bulk Orders</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
