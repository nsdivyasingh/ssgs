import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, CheckCircle2, Shield, Truck } from "lucide-react";
import { products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import QuantityStepper from "@/components/ui/QuantityStepper";
import { toast } from "sonner";
import InteractiveProductImage from "@/components/InteractiveProductImage";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { items, addItem, updateQuantity, removeItem } = useCart();

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you are looking for does not exist or has been removed.</p>
        <Button asChild>
          <Link to="/products">Return to Shop</Link>
        </Button>
      </div>
    );
  }

  const cartItem = items.find((item) => item.product.id === product.id);
  const inCart = Boolean(cartItem);
  const cartQuantity = cartItem?.quantity ?? 1;

  const handleAdd = () => {
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  const discountPercentage = product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background pb-16">
      <div className="bg-primary/5 py-4 border-b border-primary/10">
        <div className="container">
          <Link to="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="container py-8 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Section with 3D Tilt */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-4"
          >
            <InteractiveProductImage src={product.image} alt={product.name} />
            <div className="text-center text-sm text-muted-foreground">
              Hover or interact with the image for a 3D view
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            {product.badge && (
              <div className="mb-4">
                <Badge className="bg-accent text-accent-foreground border-0 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                  {product.badge}
                </Badge>
              </div>
            )}
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-end gap-4 mb-6">
              <span className="font-display font-bold text-3xl md:text-4xl text-primary">
                ₹{product.price}
              </span>
              {discountPercentage > 0 && (
                <>
                  <span className="text-xl text-muted-foreground line-through mb-1">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-sm font-semibold text-green-600 mb-2 bg-green-100 px-2 py-0.5 rounded">
                    {discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="h-px w-full bg-border mb-8" />

            <div className="mb-8">
              {!inCart ? (
                <Button
                  size="lg"
                  onClick={handleAdd}
                  className="w-full md:w-auto min-w-[200px] h-14 text-lg gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <ShoppingCart className="h-5 w-5" /> Add to Cart
                </Button>
              ) : (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="bg-secondary/30 p-2 rounded-lg border">
                    <QuantityStepper
                      value={cartQuantity}
                      onChange={(qty) => updateQuantity(product.id, qty)}
                      onRemove={() => removeItem(product.id)}
                    />
                  </div>
                  <Button asChild variant="default" size="lg" className="h-14 px-8">
                    <Link to="/cart">Go to Checkout</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto pt-8">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Premium Quality Guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Shield className="h-5 w-5 text-primary" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Truck className="h-5 w-5 text-primary" />
                <span>Fast & Reliable Delivery</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
