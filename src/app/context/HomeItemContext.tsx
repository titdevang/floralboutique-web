"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { apiRequest } from "../utils/apiRequest";
import { ApiResponse } from "../types/ApiRequest";
import {
  categoryMenu,
  customerReview,
  headerCategoryMenu,
  sliderImages,
} from "../types/HomeItem";
import { useAppContext } from "./AppContext";
import { Product } from "../types/Product";

interface HomeItemContextType {
  headerCategoryMenu: headerCategoryMenu[];
  sliderImages: sliderImages[];
  categoryMenu: categoryMenu[];
  trandingProducts: Product[];
  customerReview: customerReview[]
}

const HomeItemContext = createContext<HomeItemContextType | undefined>(
  undefined
);

export const HomeItemProvider = ({ children }: { children: ReactNode }) => {
  const [headerCategoryMenu, setHeaderCategoryMenu] = useState<
    headerCategoryMenu[]
  >([]);
  const [sliderImages, setSliderImages] = useState<sliderImages[]>([]);
  const [categoryMenu, setCategoryMenu] = useState<categoryMenu[]>([]);
  const [trandingProducts, setTrandingProducts] = useState<Product[]>([]);
  const [customerReview, setCustomerReview] = useState<customerReview[]>([])
  const { setLoading } = useAppContext();

  useEffect(() => {
    const fetchHeaderItems = async () => {
      setLoading(true);
      try {
        const response = await apiRequest<ApiResponse>("GET", `/home-items`);
        if (response?.status == 200) {
          setHeaderCategoryMenu(response.data.menu);
          setCategoryMenu(response.data.categories);
          setSliderImages(response.data.sliderImages);
          setTrandingProducts(response.data.trendingProducts);
          setCustomerReview(response.data.review)
        } 
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeaderItems();
  }, [setLoading]);

  return (
    <HomeItemContext.Provider
      value={{
        headerCategoryMenu,
        sliderImages,
        categoryMenu,
        trandingProducts,
        customerReview,
      }}
    >
      {children}
    </HomeItemContext.Provider>
  );
};

export const useHomeItem = () => {
  const context = useContext(HomeItemContext);
  if (!context) {
    throw new Error("useHomeItem must be used within a HomeItemProvider");
  }
  return context;
};
