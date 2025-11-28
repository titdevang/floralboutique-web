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
import { Cities } from "../types/Types";

export interface CartItem extends Product {
  quantity: number;
  productData?: Product;
  id: number;
}

interface CartContextType {
  cartData: CartItem[];
  setCartData: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: Product) => void;
  updateQuantity: (product: Product, newQuantity?: number) => void;
  removeFromCart: (cartId: number) => void;
  clearCart: () => void;
  getCartData: () => void;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen: boolean;
  loading: boolean;
  calculateTotal: number;
  deliveryChargeTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [calculateTotal, setCalculateTotal] = useState(0);
  const [deliveryChargeTotal, setDeliveryChargeTotal] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userAuthenticated } = useAuth();

  const getCartData = async () => {
    
    if (!userAuthenticated && !getGuestToken()) {
      setCartData([])
      return;
    };

      try {
        // setLoading(true);
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
            ...item,
          })) || [];

        setCartData(result as unknown as CartItem[]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
  };

  useEffect(() => {
    if (userAuthenticated !== undefined) {
      getCartData();
    }
  }, [userAuthenticated]);

  const addToCart = async (product: Product): Promise<number | null> => {    

    // CASE 2: New product
    setLoading(true);

    const payload = {
      product_id: product.id,
      price: product.finalPrice,
      tax: product.taxes[0].tax || "0",
      pincode: product.pincode,
      city_id: product.city_id,
      deliveryDate: product.deliveryDate,
      deliveryTypeId: product.deliveryType?.id,
      deliveryTimeSlot: product.deliveryTimeSlot.time_slots,
      cutoff_time: product.deliveryTimeSlot.start_time,
      delivery_type: product.deliveryType?.name,
      delivery_price: product.deliveryType?.price,
    };

    try {
      const response = await apiRequest<ApiResponse>("POST", "/cart", payload, {
        headers: userAuthenticated ? {} : { "X-Guest-Token": getGuestToken() },
      });

      // Save guest token
      if (
        response?.status === 201 &&
        (response.data?.data as any)?.guest_token &&
        !userAuthenticated
      ) {
        localStorage.setItem(
          "guest_token",
          (response.data?.data as any).guest_token
        );
      }

      const newProduct = response?.data.data as unknown as Product;

      if (newProduct) {
        getCartData();

        return newProduct.id ?? null;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
       setLoading(false);
    }

    return null;
  };

  const updateQuantity = async(product: Product, newQuantity?: number) => {
    console.log(product);
    
    const payload = {
      quantity: newQuantity ? newQuantity : product.quantity,
      product_id: product.productData?.id,
      price: product.productData?.finalPrice,
      tax: product.productData?.taxes?.[0]?.tax || 0,
      pincode: product.pinCode,
      city_id: (product.city as { id: number }).id,
      deliveryDate: product.deliveryDate,
      deliveryTypeId: product.deliveryTypeId,
      deliveryTimeSlot: product.deliveryTimeSlot,
      cutoff_time: product.startTime,
      delivery_type: product.deliveryType,
      delivery_price: product.deliveryPrice,
      address_id: product.address?.id,
    };

   const response = await apiRequest("PUT", `/cart/${product.id}`, payload, {
      headers: userAuthenticated ? {} : { "X-Guest-Token": getGuestToken() },
    });
    
    if (response?.status == 200) {
      const responseCartItem = (response.data as {data: Product})?.data;
       setCartData((prev) =>
         prev.map((item) =>
           item.id == responseCartItem.id
             ? { ...item, ...responseCartItem }
             : item
         )
       );
      }
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

    setCartData((prev) =>
      prev
        // 1. Remove main item if item.id === cartId
        .filter((item) => item.id !== cartId)
        // 2. Remove addon products inside each remaining item
        .map((item) => ({
          ...item,
          addonProducts: item.addonProducts?.filter(
            (addon) => addon.cart_id !== cartId
          ),
        }))
    );
  };

  const clearCart = () => setCartData([]);

  const calculateCartTotal = (cart: CartItem[]) => {
    return Number(cart.reduce((total, item) => {
      const productTotal =
        (item.productData?.finalPrice || 0) * (item.quantity || 0);

      const addonsTotal = (item.addonProducts || []).reduce((sum, addon) => {
        return sum + (addon.finalPrice || 0) * (addon.quantity || 0);
      }, 0);

      return total + productTotal + addonsTotal;
    }, 0).toFixed(2));
  };


    const getDeliveryChargestotal = (cart: CartItem[]) => {
      return Number(cart
        .reduce((total, item) => total + Number(item?.deliveryPrice), 0).toFixed(2))
    }

    useEffect(()=>{
      const total = calculateCartTotal(cartData);
      const deliverytotal = getDeliveryChargestotal(cartData);
      setDeliveryChargeTotal(deliverytotal);
      setCalculateTotal(total)
    },[cartData])

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
        getCartData,
        menuOpen,
        loading,
        calculateTotal,
        deliveryChargeTotal,
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
