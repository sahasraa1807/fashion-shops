import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  // persist cart to localStorage
  const persist = (next) => {
    setCart(next);
    try {
      localStorage.setItem("cart", JSON.stringify(next));
    } catch {}
  };

  const addToCart = (product) => {
    persist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    persist((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0)
    );
  };

  const setQty = (id, qty) => {
    persist((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)).filter((p) => p.qty > 0));
  };

  const clearCart = () => persist([]);

  const getTotal = () => cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, setQty, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// hook
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
