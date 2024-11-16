'use client'; // Required for React hooks in Next.js (App Router)

import React, { createContext, useEffect, useState } from 'react';

// Create the Cart Context
export const CartContext = createContext(
  {} as {
    cart: any[];
    addToCart: (item: {
      id: string;
      name: string;
      price: number;
      quantity: number;
    }) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
    updateCart: (itemId: string, quantity: number) => void;
    onCheckout: () => void;
    cartTotal: number;
  }
);

// Cart Provider Component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as string) : [])

  // Add item to the cart
  const addToCart = (item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }) => {
    if (cart.some((cartItem: any) => cartItem.id === item.id)) {
      return;
    }

    setCart((prevCart: any) => [...prevCart, item] as any);
  };

  const updateCart = (itemId: string, quantity: number) => {
    setCart((prevCart: any) =>
      prevCart.map((item: any) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Remove item from the cart
  const removeFromCart = (itemId: string) => {
    setCart((prevCart: any) => prevCart.filter((item: any) => item.id !== itemId));
  };

  // Cart total
  const cartTotal = cart.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  );

  const onCheckout = async () => {
    // save order to database
    try {
      // save order to database
      const payload = {
        user_id: Number(localStorage.getItem('user_id')),
        status: 'pending',
        items: cart,
      }

      const response = await fetch('http://localhost:8080/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok) {
        window.location.href = `/checkout?id=${data.id}`
      } else {
        console.error('Order failed')
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateCart, cartTotal, onCheckout }}>
      {children}
    </CartContext.Provider>
  );
}