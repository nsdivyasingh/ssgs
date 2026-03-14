import { motion } from "framer-motion";
import { Tag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { comboDeals, products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const OffersPage = () => {
  const { addItem } = useCart();

  const addCombo = (productIds: string[]) => {
    productIds.forEach(id => {
      const p = products.find(pr => pr.id === id);
      if (p) addItem(p);
    });
    toast.success("Combo deal added to cart!");
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center gap-3 mb-2">
        <Tag className="h-8 w-8 text-accent" />
        <h1 className="font-display text-3xl font-bold">Offers & Combo Deals</h1>
      </div>
      <p className="text-muted-foreground mb-10">Save more with our specially curated cleaning bundles</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {comboDeals.map((deal, i) => (
          <motion.div
            key={deal.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border bg-card overflow-hidden"
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
                {deal.products.map(pid => {
                  const p = products.find(pr => pr.id === pid);
                  return p ? (
                    <div key={pid} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{p.name}</span>
                      <span className="ml-auto text-muted-foreground">₹{p.price}</span>
                    </div>
                  ) : null;
                })}
              </div>
              <div className="flex items-end justify-between border-t pt-4">
                <div>
                  <span className="text-sm text-muted-foreground line-through">₹{deal.originalPrice}</span>
                  <span className="ml-2 font-display font-bold text-xl text-primary">₹{deal.dealPrice}</span>
                </div>
                <Button size="sm" className="gap-1.5" onClick={() => addCombo(deal.products)}>
                  <ShoppingCart className="h-3.5 w-3.5" /> Add All
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bulk discount banner */}
      <div className="mt-12 rounded-2xl bg-primary p-8 md:p-12 text-primary-foreground text-center">
        <h2 className="font-display text-2xl font-bold mb-2">Bulk Purchase Discounts</h2>
        <p className="opacity-90 max-w-lg mx-auto mb-6">
          Order cleaning supplies in bulk and save up to 25%. Perfect for apartments, offices, and residential societies.
        </p>
        <Button variant="secondary" size="lg" asChild>
          <a href="/bulk-orders">Get Bulk Quote</a>
        </Button>
      </div>
    </div>
  );
};

export default OffersPage;
