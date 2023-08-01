import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (product) => {
    const updatedCartItems = [...cartItems, product];
    const newTotalPrice = totalPrice + product.price;
    setCartItems(updatedCartItems);
    setTotalPrice(newTotalPrice);
  };

  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    const newTotalPrice = totalPrice - item.price;
    setCartItems(updatedCartItems);
    setTotalPrice(newTotalPrice);
  };

  return (
    <CartContext.Provider value={{ cartItems, totalPrice, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
