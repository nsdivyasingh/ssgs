import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/products";

type SortOption = "relevance" | "price-low" | "price-high" | "name" | "discount";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") ?? "";
  const validCategoryIds = new Set(categories.map((category) => category.id));
  const selectedCategories = categoryParam
    .split(",")
    .map((value) => value.trim())
    .filter((value) => validCategoryIds.has(value));
  const hasCategoryFilter = selectedCategories.length > 0;
  const activeCategoryNames = categories
    .filter((category) => selectedCategories.includes(category.id))
    .map((category) => category.name);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [pendingCategories, setPendingCategories] = useState<string[]>(selectedCategories);

  const searchTerm = search.trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) => {
      const matchesCategory = !hasCategoryFilter || selectedCategories.includes(p.category);
      const matchesSearch = p.name.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "discount") {
      filtered = [...filtered].sort(
        (a, b) => (b.originalPrice - b.price) / b.originalPrice - (a.originalPrice - a.price) / a.originalPrice
      );
    }

    return filtered;
  }, [hasCategoryFilter, searchTerm, selectedCategories, sortBy]);

  const togglePendingCategory = (categoryId: string, checked: boolean) => {
    setPendingCategories((prev) => {
      if (checked) return [...prev, categoryId];
      return prev.filter((id) => id !== categoryId);
    });
  };

  const applyCategoryFilters = () => {
    const nextParams = new URLSearchParams(searchParams);
    if (pendingCategories.length === 0) {
      nextParams.delete("category");
    } else {
      nextParams.set("category", pendingCategories.join(","));
    }
    setSearchParams(nextParams);
    setFiltersOpen(false);
  };

  const clearFilters = () => {
    setPendingCategories([]);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("category");
    setSearchParams(nextParams);
  };

  const openFilters = (open: boolean) => {
    setFiltersOpen(open);
    if (open) {
      setPendingCategories(selectedCategories);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-8 md:py-12 animate-fade-in-down">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Our Shop</h1>
          <p className="text-primary-foreground/90 text-lg max-w-2xl">Complete range of household cleaning products for homes and residential complexes</p>
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
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 text-base"
            />
          </div>
        </div>

        {/* Filters + Sort */}
        <div className="mb-8 space-y-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex flex-wrap items-center gap-3">
            <Dialog open={filtersOpen} onOpenChange={openFilters}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {hasCategoryFilter ? ` (${selectedCategories.length})` : ""}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Filter Products</DialogTitle>
                  <DialogDescription>Select one or more categories to refine results.</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
                  {categories.map((category) => {
                    const isChecked = pendingCategories.includes(category.id);
                    return (
                      <div key={category.id} className="flex items-center gap-3 rounded-md border p-3">
                        <Checkbox
                          id={`filter-${category.id}`}
                          checked={isChecked}
                          onCheckedChange={(checked) => togglePendingCategory(category.id, checked === true)}
                        />
                        <Label htmlFor={`filter-${category.id}`} className="flex cursor-pointer items-center gap-2">
                          <span>{category.icon}</span>
                          <span>{category.name}</span>
                        </Label>
                      </div>
                    );
                  })}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={clearFilters}>Clear</Button>
                  <Button onClick={applyCategoryFilters}>Apply Filters</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-[220px] transition-smooth duration-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Sort by Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                  <SelectItem value="discount">Best Discount</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredProducts.length}</span> products found
              {hasCategoryFilter && (
                <span className="ml-2">
                  in <span className="font-semibold text-foreground">{activeCategoryNames.join(", ")}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
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
                setPendingCategories([]);
                setSearch("");
                setSortBy("relevance");
              }}
              className="mt-6 transition-smooth duration-200"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((p, index) => (
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
        {filteredProducts.length > 0 && (
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
