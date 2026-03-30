import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "./CartContext";

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
  addOrder: (order: Omit<Order, "id" | "orderNumber" | "createdAt">) => Order;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  getOrder: (orderId: string) => Order | undefined;
  deleteOrder: (orderId: string) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

const ORDERS_STORAGE_KEY = "sgs_orders";

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Load orders from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load orders from localStorage:", error);
    }
    setInitialized(true);
  }, []);

  // Save orders to localStorage
  useEffect(() => {
    if (initialized) {
      try {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
      } catch (error) {
        console.error("Failed to save orders to localStorage:", error);
      }
    }
  }, [orders, initialized]);

  const addOrder = (orderData: Omit<Order, "id" | "orderNumber" | "createdAt">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const orderNumber = `SGS-${Date.now()}`;
    const order: Order = {
      ...orderData,
      id,
      orderNumber,
      createdAt: new Date().toISOString(),
    };

    setOrders(prev => [order, ...prev]);
    return order;
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const getOrder = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus, getOrder, deleteOrder }}>
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
