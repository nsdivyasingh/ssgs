import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Phone, Mail, MapPin, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingInput, FloatingTextarea } from "@/components/ui/floating-input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrdersContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "upi" | "card">("cash");

  const [formData, setFormData] = useState({
    customerName: user?.displayName || "",
    customerPhone: "",
    customerEmail: user?.email || "",
    address: "",
    notes: "",
  });

  // Pre-fill user data if available
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setFormData(prev => ({
              ...prev,
              customerName: data.displayName || user.displayName || prev.customerName,
              customerPhone: data.phone || prev.customerPhone,
              address: data.address || prev.address
            }));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to place an order");
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!formData.customerName || !formData.customerPhone || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const order = await addOrder({
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail,
        address: formData.address,
        items,
        totalAmount: totalPrice,
        status: "pending",
        paymentMethod,
        notes: formData.notes,
      });

      toast.success(`Order placed! Order #${order.orderNumber}`);
      clearCart();

      // Redirect to order confirmation
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container py-12">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">Add some products before checking out</p>
          <Button asChild>
            <a href="/products">Continue Shopping</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-secondary/20 to-background min-h-screen py-8 md:py-12">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <h1 className="font-display text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground mb-8">Complete your order in just a few steps</p>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Order Summary */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="rounded-xl border bg-card sticky top-4 p-6">
                <h2 className="font-display font-bold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.product.id} className="flex justify-between text-sm pb-3 border-b">
                      <div>
                        <div className="font-medium">{item.product.name}</div>
                        <div className="text-xs text-muted-foreground">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-medium">₹{item.product.price * item.quantity}</div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm text-muted-foreground">
                    <span>Delivery</span>
                    <span className="text-primary">Free</span>
                  </div>
                  <div className="flex justify-between font-display font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">₹{totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 order-1 lg:order-2 space-y-6">
              {/* Customer Details */}
              <div className="rounded-xl border bg-card p-6">
                <h2 className="font-display font-bold mb-4 flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" /> Delivery Details
                </h2>
                <div className="space-y-6 mt-4">
                  <FloatingInput
                    name="customerName"
                    label="Full Name *"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                  />
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FloatingInput
                      name="customerPhone"
                      label="Phone Number (10-digit) *"
                      value={formData.customerPhone}
                      onChange={handleChange}
                      type="tel"
                      required
                    />
                    <FloatingInput
                      name="customerEmail"
                      label="Email"
                      value={formData.customerEmail}
                      onChange={handleChange}
                      type="email"
                    />
                  </div>
                  <FloatingTextarea
                    name="address"
                    label="Delivery Address (Apartment, Street, Area) *"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                  <FloatingTextarea
                    name="notes"
                    label="Special Instructions (Optional)"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-xl border bg-card p-6">
                <h2 className="font-display font-bold mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { value: "cash" as const, label: "💵 Cash on Delivery", desc: "Pay when order arrives" },
                    { value: "upi" as const, label: "📱 UPI", desc: "Google Pay, PhonePe, Paytm" },
                    { value: "card" as const, label: "💳 Debit/Credit Card", desc: "Secure payment" },
                  ].map(method => (
                    <label key={method.value} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors" style={{ borderColor: paymentMethod === method.value ? "var(--primary)" : "var(--border)" }}>
                      <input
                        type="radio"
                        name="payment"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={(e) => setPaymentMethod(e.target.value as typeof paymentMethod)}
                      />
                      <div>
                        <div className="font-medium text-sm">{method.label}</div>
                        <div className="text-xs text-muted-foreground">{method.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Processing Order...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Place Order (₹{totalPrice})
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By placing an order, you agree to our terms and conditions
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;
