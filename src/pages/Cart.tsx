import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/40 mb-4" />
        <h1 className="font-display text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add some cleaning products to get started</p>
        <Link to="/products"><Button>Browse Products</Button></Link>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="font-display text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.product.id} className="flex gap-4 rounded-xl border bg-card p-4 hover:shadow-md transition-shadow">
              <img src={item.product.image} alt={item.product.name} className="h-24 w-24 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold">{item.product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.product.description}</p>
                <p className="text-primary font-bold">₹{item.product.price}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium min-w-8 text-center">{item.quantity}</span>
                  <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 ml-auto text-destructive hover:text-destructive" onClick={() => removeItem(item.product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-right">
                <div className="font-display font-bold text-lg">₹{item.product.price * item.quantity}</div>
                <div className="text-xs text-muted-foreground">x{item.quantity}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border bg-card p-6 h-fit sticky top-24">
          <h3 className="font-display font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span className="text-primary font-medium">Free*</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-display font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">₹{totalPrice}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-4">*Free delivery within 1 km</p>
          <Button 
            className="w-full" 
            size="lg" 
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </Button>
          <Button 
            variant="outline"
            className="w-full mt-2"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
