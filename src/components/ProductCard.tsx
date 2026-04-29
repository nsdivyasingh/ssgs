import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import QuantityStepper from "@/components/ui/QuantityStepper";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/products";
import { toast } from "sonner";

export default function ProductCard({ product }: { product: Product }) {
  const { items, addItem, updateQuantity, removeItem } = useCart();
  const cartItem = items.find((item) => item.product.id === product.id);
  const inCart = Boolean(cartItem);
  const cartQuantity = cartItem?.quantity ?? 1;

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
      className="group relative flex flex-col overflow-hidden rounded-xl border border-primary/10 bg-gradient-to-b from-rose-50/60 via-card to-primary/5 shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all duration-300"
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
          <motion.div 
            className="flex flex-col"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-primary">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
              )}
            </div>
            {product.originalPrice > product.price && (
              <span className="text-xs font-semibold text-green-600">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
              </span>
            )}
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            {!inCart ? (
              <Button
                size="sm"
                onClick={handleAdd}
                className="gap-1.5 transition-all duration-150 active:scale-95"
              >
                <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
              </Button>
            ) : (
              <QuantityStepper
                value={cartQuantity}
                onChange={(qty) => updateQuantity(product.id, qty)}
                onRemove={() => removeItem(product.id)}
              />
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
