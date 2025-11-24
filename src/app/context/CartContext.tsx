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

interface CartItem extends Product {
  quantity: number;
  productData?: Product;
  id: number;
}

interface CartContextType {
  cartData: CartItem[];
  setCartData: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: Product) => void;
  updateQuantity: (product: Product, newQuantity: number) => void;
  removeFromCart: (cartId: number) => void;
  clearCart: () => void;
  getCartData: ()=> void;
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
          ...item,
        })) || [];

      setCartData(result as unknown as CartItem[]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    getCartData();
  }, [userAuthenticated]);

  const addToCart = async (product: Product): Promise<number | null> => {    

    // CASE 2: New product
    setLoading(true);

    const payload = {
      product_id: product.id,
      price: product.finalPrice,
      tax: product.taxes[0].tax,
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
// {
//     "id": 5389,
//     "productData": {
//         "id": 184,
//         "name": "Tropical Sunshine In-Box: Lilies & Sunflowers",
//         "slug": "tropical-sunshine-in-box",
//         "imageUrl": "https://floralboutique.in/images/products/tropical-sunshine-in-box-lilies-and-sunflowers-front-view-2.webp",
//         "unitPrice": 1299,
//         "finalPrice": 1299,
//         "discount": {
//             "discount_type": "amount",
//             "discount": 0,
//             "discount_start_date": "1720117800",
//             "discount_end_date": "1722450540"
//         },
//         "rating": 4.6,
//         "totalReviews": null
//     },
//     "deliveryDate": "2025-11-24",
//     "deliveryTimeSlot": "7pm - 8pm",
//     "deliveryType": "Fixed Time Delivery",
//     "deliveryPrice": "149",
//     "pinCode": "110003",
//     "quantity": 1,
//     "city": {
//         "id": 48411,
//         "name": "Delhi"
//     },
//     "state": {
//         "id": 4124,
//         "name": "Delhi"
//     },
// }
  const updateQuantity = (product: Product, newQuantity: number) => {
    
    const payload = {
      quantity: newQuantity,
      product_id: product.productData?.id,
      price: product.productData?.finalPrice,
      tax: product.taxes?.[0]?.tax || 0,
      pincode: product.pinCode,
      city_id: (product.city as {id: number}).id,
      deliveryDate: product.deliveryDate,
      deliveryTypeId: product.deliveryType?.id,
      deliveryTimeSlot: product.deliveryTimeSlot,
      cutoff_time: product.deliveryTimeSlot.start_time,
      delivery_type: product.deliveryType,
      delivery_price: product.deliveryPrice,
    };

    apiRequest("PUT", `/cart/${product.id}`, payload, {
      headers: userAuthenticated ? {} : { "X-Guest-Token": getGuestToken() },
    });

    getCartData();
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
