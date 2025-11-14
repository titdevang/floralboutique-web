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
import { useAuth } from "./AuthContext";

interface CartItem extends Product {
  quantity: number;
  productData?: Product
  id: number
}

interface CartContextType {
  cartData: CartItem[];
  setCartData: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: Product) => void;
  updateQuantity: (
    productId: number,
    newQuantity: number,
    cartId: number
  ) => void;
  removeFromCart: (cartId: number) => void;
  clearCart: () => void;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen: boolean;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userAuthenticated } = useAuth();

  const getCartData = async () => {
    try {
      setLoading(true);
      const response = await apiRequest<ApiResponse>(
        "GET",
        "/cart",
        {},
        {
          headers: userAuthenticated
            ? {}
            : { "X-Guest-Token": getGuestToken() },
        }
      );

      const result =
        (response?.data?.data as unknown as CartItem[])?.map((item) => ({
          ...item.productData,
          quantity: item.quantity,
          cart_id: item.id,
          deliverySlot: {
            date: "17th Nov",
            time: "09:00 - 21:00 Hrs",
            type: "Courier",
            cost: 19,
          },
        })) || [];

      setCartData(result as unknown as CartItem[]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  const addToCart = async (product: Product) => {
          //  setLoading(true);
           const existingProduct = cartData.find((p) => p.id === product.id);
            setMenuOpen(true);
           if (existingProduct) {
             updateQuantity(
               existingProduct.id,
               existingProduct.quantity + 1,
               existingProduct
             .cart_id);
           } else {
            setLoading(true);
            
             try {
               const response = await apiRequest<ApiResponse>(
                 "POST",
                 "/cart",
                 { product_id: product.id },
                 {
                   headers: userAuthenticated
                     ? {}
                     : { "X-Guest-Token": getGuestToken() },
                 }
               );

               if (
                 response?.status === 201 &&
                 (response.data?.data as unknown as { guest_token: "string" })
                   ?.guest_token &&
                 !userAuthenticated
               ) {
                 localStorage.setItem(
                   "guest_token",
                   (response.data?.data as unknown as { guest_token: "string" })
                     ?.guest_token
                 );
               }
                 setCartData((prevCart) => {
                   return [
                     ...prevCart,
                     {
                       ...product,
                       quantity: 1,
                       deliverySlot: {
                         date: "17th Nov",
                         time: "09:00 - 21:00 Hrs",
                         type: "Courier",
                         cost: 19,
                       },
                       cart_id: (
                         response?.data.data as unknown as { cart_id: {id: number} }
                       ).cart_id.id,
                     },
                   ];
                 });
              
             } catch (error) {
               console.error("Error adding to cart:", error);
             }
            }

            setMenuOpen(true);
            setLoading(false);
  };

  const updateQuantity = (productId: number, newQuantity: number, cartId: number) => {
    apiRequest(
      "PUT",
      `/cart/${cartId}`,
      { product_id: productId, quantity: newQuantity },
      {
        headers: userAuthenticated ? {} : { "X-Guest-Token": getGuestToken() },
      }
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

  const removeFromCart = (cartId: number) => {
    apiRequest(
      "DELETE",
      `/cart/${cartId}`,
      {},
      {
        headers: userAuthenticated ? {} : { "X-Guest-Token": getGuestToken() },
      }
    );

    setCartData((prev) => prev.filter((item) => item.cart_id !== cartId));
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
        setMenuOpen,
        menuOpen,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
