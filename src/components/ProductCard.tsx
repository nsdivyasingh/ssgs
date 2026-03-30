import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/products";
import { toast } from "sonner";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex flex-col overflow-hidden rounded-xl border bg-card shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all duration-300"
    >
      {product.badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <Badge className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground border-0">{product.badge}</Badge>
        </motion.div>
      )}
      <div className="aspect-square overflow-hidden bg-muted">
        <motion.img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <motion.h3 
          className="font-display font-semibold text-sm leading-snug mb-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          {product.name}
        </motion.h3>
        <motion.p 
          className="text-xs text-muted-foreground mb-3 line-clamp-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {product.description}
        </motion.p>
        <div className="mt-auto flex items-center justify-between">
          <motion.span 
            className="font-display font-bold text-lg text-primary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.3 }}
          >
            ₹{product.price}
          </motion.span>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button size="sm" onClick={handleAdd} className="gap-1.5 transition-all duration-200">
              <ShoppingCart className="h-3.5 w-3.5" /> Add
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
