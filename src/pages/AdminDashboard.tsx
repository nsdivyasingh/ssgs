import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Eye, Edit2, Trash2, Lock, AlertCircle, CheckCircle, Truck, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrders, Order } from "@/context/OrdersContext";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { orders, updateOrderStatus, deleteOrder } = useOrders();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const ADMIN_PASSWORD = "admin123"; // Change this to your preferred password

  const handleLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAuthorized(true);
      toast.success("Welcome Admin!");
    } else {
      toast.error("Incorrect password");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full mx-4 rounded-xl border bg-card p-8"
        >
          <div className="flex justify-center mb-6">
            <Lock className="h-12 w-12 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-center mb-2">Admin Access</h1>
          <p className="text-center text-muted-foreground mb-6">Enter admin password to manage orders</p>

          <div className="space-y-4">
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Enter admin password"
              className="w-full px-4 py-2 border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button onClick={handleLogin} className="w-full" size="lg">
              Login
            </Button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0" />
            <div className="text-sm text-yellow-800">
              <strong>Demo Password:</strong> admin123
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter(order => order.status === filterStatus);

  const statusConfig: Record<Order["status"], { icon: any; color: string; label: string }> = {
    pending: { icon: AlertCircle, color: "bg-yellow-100 text-yellow-800", label: "Pending" },
    confirmed: { icon: CheckCircle, color: "bg-blue-100 text-blue-800", label: "Confirmed" },
    shipped: { icon: Truck, color: "bg-purple-100 text-purple-800", label: "Shipped" },
    delivered: { icon: Package, color: "bg-green-100 text-green-800", label: "Delivered" },
    cancelled: { icon: AlertCircle, color: "bg-red-100 text-red-800", label: "Cancelled" },
  };

  const statistics = [
    { label: "Total Orders", value: orders.length, color: "text-primary" },
    { label: "Pending", value: orders.filter(o => o.status === "pending").length, color: "text-yellow-600" },
    { label: "Shipped", value: orders.filter(o => o.status === "shipped").length, color: "text-purple-600" },
    { label: "Delivered", value: orders.filter(o => o.status === "delivered").length, color: "text-green-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background py-8 md:py-12">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <BarChart className="h-8 w-8 text-primary" />
              <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setIsAuthorized(false);
                setAdminPassword("");
              }}
            >
              Logout
            </Button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statistics.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border bg-card p-6 text-center"
              >
                <div className={`font-display text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Filter */}
          <div className="mb-6 flex items-center gap-3">
            <span className="text-sm font-medium">Filter by Status:</span>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No orders found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order, i) => {
                const statusConfig_ = statusConfig[order.status];
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl border bg-card p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-display font-bold text-lg">{order.orderNumber}</span>
                          <Badge className={statusConfig_.color}>
                            <statusConfig_.icon className="h-3 w-3 mr-1" />
                            {statusConfig_.label}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-3 space-y-1">
                          <div>
                            <strong>Customer:</strong> {order.customerName} ({order.customerPhone})
                          </div>
                          <div>
                            <strong>Items:</strong> {order.items.length} product{order.items.length !== 1 ? "s" : ""} - <strong>₹{order.totalAmount}</strong>
                          </div>
                          <div>
                            <strong>Delivery:</strong> {order.address}
                          </div>
                          <div>
                            <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Select
                          value={order.status}
                          onValueChange={(status) => {
                            updateOrderStatus(order.id, status as Order["status"]);
                            toast.success(`Order status updated to ${status}`);
                          }}
                        >
                          <SelectTrigger className="w-32 h-9 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            deleteOrder(order.id);
                            toast.success("Order deleted");
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Order Details Modal */}
          {selectedOrder && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedOrder(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-2xl w-full bg-card rounded-xl p-6 max-h-96 overflow-y-auto"
              >
                <h2 className="font-display text-2xl font-bold mb-4">Order Details</h2>

                <div className="space-y-4 mb-6">
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Order Number</span>
                      <div className="text-muted-foreground">{selectedOrder.orderNumber}</div>
                    </div>
                    <div>
                      <span className="font-medium">Date</span>
                      <div className="text-muted-foreground">
                        {new Date(selectedOrder.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Customer</span>
                      <div className="text-muted-foreground">{selectedOrder.customerName}</div>
                    </div>
                    <div>
                      <span className="font-medium">Phone</span>
                      <div className="text-muted-foreground">
                        <a href={`tel:${selectedOrder.customerPhone}`} className="hover:text-primary">
                          {selectedOrder.customerPhone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="font-medium">Delivery Address</span>
                    <div className="text-muted-foreground text-sm">{selectedOrder.address}</div>
                  </div>

                  <div className="border-t pt-4">
                    <span className="font-medium block mb-3">Items:</span>
                    <div className="space-y-2 text-sm">
                      {selectedOrder.items.map(item => (
                        <div key={item.product.id} className="flex justify-between">
                          <span>{item.product.name} x {item.quantity}</span>
                          <span className="font-medium">₹{item.product.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4 font-display font-bold text-lg flex justify-between">
                    <span>Total Amount</span>
                    <span className="text-primary">₹{selectedOrder.totalAmount}</span>
                  </div>

                  {selectedOrder.notes && (
                    <div className="bg-secondary/50 p-3 rounded-lg text-sm">
                      <strong>Special Instructions:</strong>
                      <div className="text-muted-foreground">{selectedOrder.notes}</div>
                    </div>
                  )}
                </div>

                <Button onClick={() => setSelectedOrder(null)} className="w-full">
                  Close
                </Button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
