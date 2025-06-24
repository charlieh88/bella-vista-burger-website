'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customizations?: any;
  specialInstructions?: string;
  totalPrice?: number;
  customizationText?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem | any) => void;
  removeFromCart: (cartIndex: number) => void;
  clearCart: () => void;
  getTotalPrice: () => string;
  getTotalItems: () => number;
  isLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('bellavistaCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
    setIsLoaded(true); // Mark as loaded whether or not there was saved data
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    if (isLoaded) { // Only save if we've loaded first
      localStorage.setItem('bellavistaCart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (item: CartItem | any) => {
    setCart(prevCart => {
      // Check if this is a customized item
      if (item.customizations) {
        // Add customized item as new entry
        return [...prevCart, { ...item }];
      }
      
      // Regular item - check if it exists and increment quantity
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id && !cartItem.customizations);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id && !cartItem.customizations
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (cartIndex: number) => {
    setCart(prevCart => {
      const item = prevCart[cartIndex];
      if (item.quantity > 1) {
        return prevCart.map((cartItem, index) =>
          index === cartIndex 
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prevCart.filter((_, index) => index !== cartIndex);
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const itemPrice = item.totalPrice || item.price;
      return total + (itemPrice * item.quantity);
    }, 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      getTotalPrice,
      getTotalItems,
      isLoaded
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}