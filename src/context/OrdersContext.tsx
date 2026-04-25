import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "./CartContext";
import { useAuth } from "./AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc, doc, getDocs, query, where, orderBy, serverTimestamp, deleteDoc } from "firebase/firestore";

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  items: CartItem[];
  totalAmount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "cash" | "upi" | "card";
  createdAt: string;
  notes?: string;
}

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "orderNumber" | "createdAt" | "userId">) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order["status"]) => Promise<void>;
  getOrder: (orderId: string) => Order | undefined;
  deleteOrder: (orderId: string) => Promise<void>;
  fetchAllOrders: () => Promise<void>; // For admin
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

const ORDERS_STORAGE_KEY = "sgs_orders";

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user, isAdmin } = useAuth();

  // Load orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setOrders([]);
        return;
      }
      
      try {
        const ordersRef = collection(db, "orders");
        const q = isAdmin
          ? query(ordersRef, orderBy("createdAt", "desc")) // Admin sees all orders
          : query(ordersRef, where("userId", "==", user.uid)); // User sees only their orders (no orderBy to prevent index error)
        
        const querySnapshot = await getDocs(q);
        let ordersData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        })) as Order[];
        
        // Sort client-side if we couldn't sort in the database query
        if (!isAdmin) {
          ordersData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        
        setOrders(ordersData);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, [user, isAdmin]);

  const addOrder = async (orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "userId">) => {
    if (!user) throw new Error("Must be logged in to place an order");

    const orderNumber = `SGS-${Date.now()}`;
    const newOrderData = {
      ...orderData,
      orderNumber,
      userId: user.uid,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "orders"), newOrderData);
    const order: Order = { ...newOrderData, id: docRef.id } as Order;

    setOrders(prev => [order, ...prev]);
    return order;
  };

  const updateOrderStatus = async (orderId: string, status: Order["status"]) => {
    if (!isAdmin) throw new Error("Only admins can update order status");
    
    await updateDoc(doc(db, "orders", orderId), { status });
    
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const getOrder = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  const deleteOrder = async (orderId: string) => {
    if (!isAdmin) throw new Error("Only admins can delete orders");
    
    await deleteDoc(doc(db, "orders", orderId));
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };
  
  const fetchAllOrders = async () => {
    if (!isAdmin) return;
    try {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Order[];
      setOrders(ordersData);
    } catch (error) {
       console.error("Failed to fetch all orders:", error);
    }
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus, getOrder, deleteOrder, fetchAllOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within OrdersProvider");
  }
  return context;
};
