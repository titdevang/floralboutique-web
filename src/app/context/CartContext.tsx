"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "../types/Product";
import { apiRequest } from "@/app/utils/apiRequest";
import { getGuestToken } from "@/app/utils/cartToken";
import { ApiResponse } from "../types/ApiRequest";

interface CartItem extends Product {
  quantity: number;
  productData?: Product
}

interface CartContextType {
  cartData: CartItem[];
  setCartData: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: Product) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartData, setCartData] = useState<CartItem[]>([]);

  const getCartData = async () => {
    try {
      const response = await apiRequest<ApiResponse>(
        "GET",
        "/cart",
        {},
        { headers: { "X-Guest-Token": getGuestToken() } }
      );

      const result =
        (response?.data?.data as unknown as CartItem[])?.map((item) => ({
          ...item.productData,
          quantity: item.quantity,
        })) || [];

      setCartData(result as unknown as CartItem[]);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  const addToCart = async (product: Product) => {
    try {
      const response = await apiRequest<ApiResponse>(
        "POST",
        "/cart",
        { product_id: product.id },
        { headers: { "X-Guest-Token": getGuestToken() } }
      );

      if (
        response?.status === 201 &&
        (response.data?.data as unknown as { guest_token : 'string'})?.guest_token
      ) {
        localStorage.setItem(
          "guest_token",
          (response.data?.data as unknown as { guest_token: "string" })
            ?.guest_token
        );
      }

      setCartData((prevCart) => {
        const existingIndex = prevCart.findIndex((p) => p.id === product.id);
        if (existingIndex > -1) {
          const updatedCart = [...prevCart];
          updatedCart[existingIndex].quantity += 1;
          return updatedCart;
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    apiRequest(
      "PUT",
      "/cart/update",
      { product_id: productId, quantity: newQuantity },
      { headers: { "X-Guest-Token": getGuestToken() } }
    );

    setCartData((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, newQuantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    apiRequest(
      "DELETE",
      `/cart/${productId}`,
      {},
      { headers: { "X-Guest-Token": getGuestToken() } }
    );

    setCartData((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCartData([]);

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Hook for using the cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
