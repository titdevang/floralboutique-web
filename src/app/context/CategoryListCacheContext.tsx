// context/CategoryListCacheContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";
import { Product } from "@/app/types/Product";

interface CacheState {
    categoryData: Product[];
    page: number;
    hasMore: boolean;
    scrollY: number;
}

interface CacheContextValue {
    cache: Record<string, CacheState>;
    setCache: React.Dispatch<React.SetStateAction<Record<string, CacheState>>>;
}

const CategoryListCacheContext = createContext<CacheContextValue | undefined>(undefined);

export const CategoryListCacheProvider = ({ children }: { children: React.ReactNode }) => {
    const [cache, setCache] = useState<Record<string, CacheState>>({});
    return (
        <CategoryListCacheContext.Provider value={{ cache, setCache }}>
            {children}
        </CategoryListCacheContext.Provider>
    );
};

export const useCategoryListCache = () => {
    const ctx = useContext(CategoryListCacheContext);
    if (!ctx) throw new Error("useCategoryListCache must be used inside provider");
    return ctx;
};
