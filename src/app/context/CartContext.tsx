"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { Product } from "../types/Product";

interface CartContextType {
  cartData: Product[];
  setCartData: React.Dispatch<React.SetStateAction<Product[]>>;
  addToCart: (product: Product) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<
  CartContextType | undefined
>(undefined);

export const CartProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartData, setCartData] = useState<Product[]>([]);
  const addToCart = (product: Product) => {

    setCartData((prevCartData) => {
      const existingProductIndex = prevCartData.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex > -1) {
        const updatedCartData = [...prevCartData];
        const existingProduct = updatedCartData[existingProductIndex];
        updatedCartData[existingProductIndex] = {
          ...existingProduct,
          quantity: (existingProduct.quantity || 1) + 1,
        };
        return updatedCartData;
      } else {
        return [...prevCartData, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    setCartData((prevCartData) => {
      return prevCartData
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, newQuantity) }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const removeFromCart = (productId: number) => {
    setCartData((prevCartData) =>
      prevCartData.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCartData([]);
  };

  return (
    <CartContext.Provider value={{ cartData, setCartData, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider"
    );
  }
  return context;
};
