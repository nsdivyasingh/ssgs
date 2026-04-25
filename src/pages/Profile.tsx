import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy, doc, getDoc, updateDoc } from "firebase/firestore";
import { Order } from "@/context/OrdersContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Package, MapPin, User, Phone, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ProfilePage = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    displayName: "",
    phone: "",
    address: ""
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        // Fetch user profile
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setProfileData({
            displayName: data.displayName || user.displayName || "",
            phone: data.phone || "",
            address: data.address || ""
          });
        }

        // Fetch user orders
        const q = query(
          collection(db, "orders"), 
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        })) as Order[];
        
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      if (user) {
        fetchUserData();
      } else {
        setLoading(false);
      }
    }
  }, [user, authLoading]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSaving(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        displayName: profileData.displayName,
        phone: profileData.phone,
        address: profileData.address,
        updatedAt: new Date().toISOString()
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800'; // pending
    }
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl font-bold">My Account</h1>
        <Button variant="outline" onClick={logout}>Sign Out</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-6">
            <h2 className="font-display font-bold text-xl mb-4">Profile Details</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" /> Name
                </label>
                <Input 
                  value={profileData.displayName}
                  onChange={e => setProfileData(prev => ({...prev, displayName: e.target.value}))}
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </label>
                <Input 
                  value={user.email || ""}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Phone
                </label>
                <Input 
                  value={profileData.phone}
                  onChange={e => setProfileData(prev => ({...prev, phone: e.target.value}))}
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Default Delivery Address
                </label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={profileData.address}
                  onChange={e => setProfileData(prev => ({...prev, address: e.target.value}))}
                  placeholder="Your full address"
                />
              </div>

              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
              </Button>
            </form>
          </div>
        </div>

        {/* Order History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border p-6">
            <h2 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
              <Package className="h-5 w-5" /> Order History
            </h2>
            
            {orders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>You haven't placed any orders yet.</p>
                <Button variant="link" onClick={() => window.location.href = '/products'} className="mt-2">
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 pb-3 border-b">
                      <div>
                        <span className="font-semibold">{order.orderNumber}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <Badge className={`${getStatusColor(order.status)} border-0 capitalize`}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.quantity}x {item.product.name}
                          </span>
                          <span>₹{item.product.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t font-medium">
                      <span>Total</span>
                      <span>₹{order.totalAmount}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
