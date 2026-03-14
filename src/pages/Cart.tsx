import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { toast } from "sonner";

const CartPage = () => {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

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

  if (showCheckout) {
    return <CheckoutForm totalPrice={totalPrice} onBack={() => setShowCheckout(false)} onSuccess={() => { clearCart(); setShowCheckout(false); }} />;
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="font-display text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.product.id} className="flex gap-4 rounded-xl border bg-card p-4">
              <img src={item.product.image} alt={item.product.name} className="h-20 w-20 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-sm">{item.product.name}</h3>
                <p className="text-primary font-bold mt-1">₹{item.product.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                  <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7 ml-auto text-destructive" onClick={() => removeItem(item.product.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="text-right font-display font-bold">
                ₹{item.product.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border bg-card p-6 h-fit sticky top-24">
          <h3 className="font-display font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{totalPrice}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-primary font-medium">Free*</span></div>
            <div className="border-t pt-2 flex justify-between font-display font-bold text-lg">
              <span>Total</span><span className="text-primary">₹{totalPrice}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">*Free delivery within 1 km</p>
          <Button className="w-full mt-4" size="lg" onClick={() => setShowCheckout(true)}>Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  );
};

function CheckoutForm({ totalPrice, onBack, onSuccess }: { totalPrice: number; onBack: () => void; onSuccess: () => void }) {
  const [payment, setPayment] = useState("cod");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order placed successfully! We'll contact you shortly.");
    onSuccess();
  };

  return (
    <div className="container py-8 md:py-12 max-w-2xl">
      <Button variant="ghost" className="mb-4 gap-2" onClick={onBack}>
        <ArrowLeft className="h-4 w-4" /> Back to Cart
      </Button>
      <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h3 className="font-display font-semibold">Delivery Address</h3>
          <Input placeholder="Full Name" required />
          <Input placeholder="Phone Number" type="tel" required />
          <Input placeholder="Address Line 1" required />
          <Input placeholder="Address Line 2" />
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="City" required />
            <Input placeholder="Pincode" required />
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h3 className="font-display font-semibold">Payment Method</h3>
          <div className="space-y-2">
            {[
              { id: "cod", label: "💵 Cash on Delivery" },
              { id: "upi", label: "📱 UPI Payment" },
              { id: "card", label: "💳 Card Payment" },
            ].map(opt => (
              <label key={opt.id} className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${payment === opt.id ? "border-primary bg-primary/5" : ""}`}>
                <input type="radio" name="payment" value={opt.id} checked={payment === opt.id} onChange={() => setPayment(opt.id)} className="accent-[hsl(var(--primary))]" />
                <span className="text-sm font-medium">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border bg-card p-6">
          <span className="font-display font-bold text-lg">Total: ₹{totalPrice}</span>
          <Button type="submit" size="lg">Place Order</Button>
        </div>
      </form>
    </div>
  );
}

export default CartPage;
