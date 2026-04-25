import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BarChart, Eye, Trash2, AlertCircle, CheckCircle, Truck, Package, 
  Users, LayoutDashboard, ShoppingCart, ListOrdered, Mail, Search, 
  MoreHorizontal, LogOut, Loader2 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";

import { useOrders, Order } from "@/context/OrdersContext";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { toast } from "sonner";

interface BulkOrder {
  id: string;
  orgName: string;
  contactPerson: string;
  phone: string;
  email: string;
  numberOfUnits: number;
  requirements: string;
  status: string;
  createdAt: string;
}

interface Customer {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  address?: string;
  role: string;
  createdAt: string;
}

const statusConfig: Record<string, { icon: any; color: string; label: string }> = {
  pending: { icon: AlertCircle, color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100", label: "Pending" },
  confirmed: { icon: CheckCircle, color: "bg-blue-100 text-blue-800 hover:bg-blue-100", label: "Confirmed" },
  shipped: { icon: Truck, color: "bg-purple-100 text-purple-800 hover:bg-purple-100", label: "Shipped" },
  delivered: { icon: Package, color: "bg-green-100 text-green-800 hover:bg-green-100", label: "Delivered" },
  cancelled: { icon: AlertCircle, color: "bg-red-100 text-red-800 hover:bg-red-100", label: "Cancelled" },
};

export default function AdminDashboard() {
  const { orders, updateOrderStatus, deleteOrder, fetchAllOrders } = useOrders();
  const { user, isAdmin, loading: authLoading, logout } = useAuth();
  
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  const [bulkOrders, setBulkOrders] = useState<BulkOrder[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "bulk" | "customers">("overview");
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchAllOrders();
      
      const fetchAdminData = async () => {
        setDataLoading(true);
        try {
          // Fetch bulk orders
          const bulkQ = query(collection(db, "bulkOrders"), orderBy("createdAt", "desc"));
          const bulkSnap = await getDocs(bulkQ);
          setBulkOrders(bulkSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as BulkOrder)));
          
          // Fetch customers
          const usersQ = query(collection(db, "users"), orderBy("createdAt", "desc"));
          const usersSnap = await getDocs(usersQ);
          setCustomers(usersSnap.docs.map(doc => ({ uid: doc.id, ...doc.data() } as Customer)));
        } catch (error) {
          console.error("Failed to fetch admin data:", error);
          toast.error("Some data might not have loaded due to missing database indexes.");
        } finally {
          setDataLoading(false);
        }
      };
      
      fetchAdminData();
    }
  }, [isAdmin]);

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary/20 to-background flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full mx-4 rounded-xl border bg-card p-8 text-center shadow-xl">
          <div className="flex justify-center mb-6">
            <Lock className="h-16 w-16 text-red-500" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">Your account does not have administrator privileges.</p>
          <Button onClick={logout} className="w-full">Sign Out</Button>
        </motion.div>
      </div>
    );
  }

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statistics = [
    { label: "Total Orders", value: orders.length, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Pending", value: orders.filter(o => o.status === "pending").length, color: "text-yellow-600", bg: "bg-yellow-100" },
    { label: "Delivered", value: orders.filter(o => o.status === "delivered").length, color: "text-green-600", bg: "bg-green-100" },
    { label: "Total Customers", value: customers.length, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  const totalRevenue = orders.filter(o => o.status !== "cancelled").reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50/50">
        <Sidebar className="border-r shadow-sm">
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center gap-3 px-2">
              <div className="h-8 w-8 rounded-md overflow-hidden shrink-0 border border-border/50">
                <img src="/favicon.jpg" alt="Logo" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm leading-tight">SSGS Admin</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Management Portal</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
                      <LayoutDashboard />
                      <span>Overview</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={activeTab === "orders"} onClick={() => setActiveTab("orders")}>
                      <ShoppingCart />
                      <span>Regular Orders</span>
                      <Badge className="ml-auto bg-primary/10 text-primary hover:bg-primary/20">{orders.length}</Badge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={activeTab === "bulk"} onClick={() => setActiveTab("bulk")}>
                      <ListOrdered />
                      <span>Bulk Orders</span>
                      {bulkOrders.length > 0 && <Badge className="ml-auto bg-primary/10 text-primary hover:bg-primary/20">{bulkOrders.length}</Badge>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={activeTab === "customers"} onClick={() => setActiveTab("customers")}>
                      <Users />
                      <span>Customers</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-3 px-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="font-bold text-primary text-xs">{user?.email?.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex flex-col truncate">
                <span className="font-medium text-sm truncate">{user?.displayName || "Administrator"}</span>
                <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col min-w-0 bg-background">
          <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-card px-4 shadow-sm sticky top-0 z-10">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h1 className="font-display font-semibold text-lg capitalize">{activeTab.replace('-', ' ')}</h1>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            {dataLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
                
                {/* OVERVIEW TAB */}
                {activeTab === "overview" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {statistics.map((stat, i) => (
                        <div key={i} className="rounded-xl border bg-card p-6 shadow-sm flex items-center gap-4">
                          <div className={`h-12 w-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                            {i === 0 ? <ShoppingCart /> : i === 1 ? <AlertCircle /> : i === 2 ? <Package /> : <Users />}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                            <div className={`font-display text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-xl border bg-card p-6 shadow-sm bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-sm font-medium text-muted-foreground mb-1">Total Estimated Revenue</h2>
                          <div className="font-display text-4xl font-bold text-primary">₹{totalRevenue.toLocaleString()}</div>
                        </div>
                        <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center">
                          <BarChart className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                      <div className="p-4 border-b bg-muted/40">
                        <h2 className="font-display font-semibold">Recent Orders</h2>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.slice(0, 5).map(order => {
                            const status = statusConfig[order.status] || statusConfig.pending;
                            return (
                              <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.orderNumber}</TableCell>
                                <TableCell>{order.customerName}</TableCell>
                                <TableCell>
                                  <Badge className={status.color} variant="secondary">
                                    {status.label}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right font-medium">₹{order.totalAmount}</TableCell>
                              </TableRow>
                            );
                          })}
                          {orders.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">No orders found.</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </>
                )}

                {/* REGULAR ORDERS TAB */}
                {activeTab === "orders" && (
                  <div className="rounded-xl border bg-card shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b flex flex-col sm:flex-row gap-4 items-center justify-between bg-muted/40">
                      <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search orders or customers..."
                          className="pl-8 bg-background"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Filter:</span>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                          <SelectTrigger className="w-full sm:w-[160px] bg-background">
                            <SelectValue placeholder="All Status" />
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
                    </div>
                    
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order #</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="w-[80px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredOrders.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center h-48 text-muted-foreground">
                                <Package className="h-10 w-10 mx-auto mb-2 opacity-20" />
                                No orders found matching your criteria
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredOrders.map((order) => {
                              const status = statusConfig[order.status] || statusConfig.pending;
                              return (
                                <TableRow key={order.id} className="hover:bg-muted/50">
                                  <TableCell className="font-medium text-primary">{order.orderNumber}</TableCell>
                                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                  <TableCell>
                                    <div className="font-medium">{order.customerName}</div>
                                    <div className="text-xs text-muted-foreground">{order.customerPhone}</div>
                                  </TableCell>
                                  <TableCell>{order.items.length} items</TableCell>
                                  <TableCell>
                                    <Badge className={status.color} variant="secondary">
                                      {status.label}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-right font-medium">₹{order.totalAmount}</TableCell>
                                  <TableCell>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                                          <Eye className="mr-2 h-4 w-4" /> View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel className="text-xs text-muted-foreground">Update Status</DropdownMenuLabel>
                                        {Object.keys(statusConfig).map(s => (
                                          <DropdownMenuItem 
                                            key={s} 
                                            onClick={() => {
                                              updateOrderStatus(order.id, s as Order["status"]);
                                              toast.success(`Status updated to ${s}`);
                                            }}
                                            disabled={order.status === s}
                                          >
                                            <span className="capitalize">{s}</span>
                                          </DropdownMenuItem>
                                        ))}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem 
                                          className="text-red-600 focus:text-red-600" 
                                          onClick={() => {
                                            if(window.confirm("Are you sure you want to delete this order?")) {
                                              deleteOrder(order.id);
                                              toast.success("Order deleted");
                                            }
                                          }}
                                        >
                                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}

                {/* BULK ORDERS TAB */}
                {activeTab === "bulk" && (
                  <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    <div className="p-4 border-b bg-muted/40 flex justify-between items-center">
                      <h2 className="font-display font-semibold">Wholesale & Apartment Inquiries</h2>
                      <Badge variant="outline">{bulkOrders.length} Inquiries</Badge>
                    </div>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Organization</TableHead>
                            <TableHead>Contact Person</TableHead>
                            <TableHead>Requirements</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-[80px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bulkOrders.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center h-48 text-muted-foreground">
                                <ListOrdered className="h-10 w-10 mx-auto mb-2 opacity-20" />
                                No bulk orders received yet
                              </TableCell>
                            </TableRow>
                          ) : (
                            bulkOrders.map((order) => (
                              <TableRow key={order.id}>
                                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="font-medium">{order.orgName}</TableCell>
                                <TableCell>
                                  <div>{order.contactPerson}</div>
                                  <div className="text-xs text-muted-foreground">{order.email}</div>
                                  <div className="text-xs text-muted-foreground">{order.phone}</div>
                                </TableCell>
                                <TableCell className="max-w-[250px]">
                                  <div className="text-sm">{order.numberOfUnits} Units</div>
                                  <div className="text-xs text-muted-foreground truncate" title={order.requirements}>
                                    {order.requirements}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="capitalize">{order.status}</Badge>
                                </TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="sm" onClick={() => window.location.href = `mailto:${order.email}`}>
                                    <Mail className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}

                {/* CUSTOMERS TAB */}
                {activeTab === "customers" && (
                  <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    <div className="p-4 border-b bg-muted/40 flex justify-between items-center">
                      <h2 className="font-display font-semibold">Registered Users</h2>
                      <Badge variant="outline">{customers.length} Users</Badge>
                    </div>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Joined</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>ID</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {customers.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center h-48 text-muted-foreground">
                                <Users className="h-10 w-10 mx-auto mb-2 opacity-20" />
                                No customers found
                              </TableCell>
                            </TableRow>
                          ) : (
                            customers.map((c) => (
                              <TableRow key={c.uid}>
                                <TableCell>{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="font-medium">{c.displayName || 'Unknown'}</TableCell>
                                <TableCell>{c.email}</TableCell>
                                <TableCell>
                                  <Badge variant={c.role === 'admin' ? "default" : "secondary"}>
                                    {c.role}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground font-mono truncate max-w-[100px]">
                                  {c.uid}
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>

          {/* ORDER DETAILS MODAL */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedOrder(null)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-2xl w-full bg-card border rounded-xl shadow-2xl p-0 overflow-hidden flex flex-col max-h-[90vh]"
              >
                <div className="p-6 border-b bg-muted/30 flex justify-between items-start">
                  <div>
                    <h2 className="font-display text-2xl font-bold">Order {selectedOrder.orderNumber}</h2>
                    <p className="text-sm text-muted-foreground">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>
                  <Badge className={statusConfig[selectedOrder.status]?.color || ''} variant="secondary">
                    {statusConfig[selectedOrder.status]?.label || selectedOrder.status}
                  </Badge>
                </div>

                <div className="p-6 overflow-y-auto space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-1">
                      <span className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">Customer Details</span>
                      <div className="font-medium">{selectedOrder.customerName}</div>
                      <div>{selectedOrder.customerPhone}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">Delivery Address</span>
                      <div>{selectedOrder.address}</div>
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-muted-foreground uppercase text-xs tracking-wider block mb-3">Order Items</span>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader className="bg-muted/30">
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead className="text-right w-20">Qty</TableHead>
                            <TableHead className="text-right w-24">Price</TableHead>
                            <TableHead className="text-right w-24">Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedOrder.items.map(item => (
                            <TableRow key={item.product.id}>
                              <TableCell className="font-medium">{item.product.name}</TableCell>
                              <TableCell className="text-right">{item.quantity}</TableCell>
                              <TableCell className="text-right">₹{item.product.price}</TableCell>
                              <TableCell className="text-right font-medium">₹{item.product.price * item.quantity}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {selectedOrder.notes && (
                    <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg text-sm border border-amber-200 dark:border-amber-900">
                      <strong className="text-amber-800 dark:text-amber-400 block mb-1">Special Instructions:</strong>
                      <div className="text-amber-900/80 dark:text-amber-200/80">{selectedOrder.notes}</div>
                    </div>
                  )}
                </div>

                <div className="p-6 border-t bg-muted/10 flex items-center justify-between mt-auto">
                  <div className="font-display font-bold text-xl">
                    <span className="text-muted-foreground text-sm font-normal mr-2">Total Amount:</span>
                    <span className="text-primary">₹{selectedOrder.totalAmount}</span>
                  </div>
                  <Button onClick={() => setSelectedOrder(null)} variant="outline">
                    Close Details
                  </Button>
                </div>
              </motion.div>
            </div>
          )}

        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
