import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Product } from "@/lib/products";
import { useAuth } from "./AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "sgs_cart";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [initialized, setInitialized] = useState(false);
  const { user } = useAuth();

  // Load cart from localStorage or Firestore on mount/user change
  useEffect(() => {
    const loadCart = async () => {
      try {
        if (user) {
          const cartDoc = await getDoc(doc(db, "carts", user.uid));
          if (cartDoc.exists()) {
            setItems(cartDoc.data().items || []);
          } else {
            // Merge localStorage if any
            const saved = localStorage.getItem(CART_STORAGE_KEY);
            if (saved) {
              const localItems = JSON.parse(saved);
              setItems(localItems);
              await setDoc(doc(db, "carts", user.uid), {
                userId: user.uid,
                items: localItems,
                updatedAt: new Date().toISOString()
              });
            }
          }
        } else {
          const saved = localStorage.getItem(CART_STORAGE_KEY);
          if (saved) {
            setItems(JSON.parse(saved));
          }
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
      setInitialized(true);
    };

    loadCart();
  }, [user]);

  // Save cart whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      if (!initialized) return;
      
      try {
        if (user) {
          await setDoc(doc(db, "carts", user.uid), {
            userId: user.uid,
            items,
            updatedAt: new Date().toISOString()
          }, { merge: true });
        } else {
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        }
      } catch (error) {
        console.error("Failed to save cart:", error);
      }
    };
    
    saveCart();
  }, [items, initialized, user]);

  const addItem = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.product.id !== productId));
    } else {
      setItems(prev => prev.map(i => i.product.id === productId ? { ...i, quantity } : i));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
