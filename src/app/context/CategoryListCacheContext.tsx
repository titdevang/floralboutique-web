// app/context/CategoryListCacheContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";
import { Product } from "@/app/types/Product";

export type CacheState = {
  categoryData: Product[];
  page: number;
  hasMore: boolean;
  lastUpdated: number;
};

type CacheMap = Record<string, CacheState>;

type Value = {
  cache: CacheMap;
  get: (key: string) => CacheState | undefined;
  set: (key: string, state: CacheState) => void;
  clear: (key?: string) => void;
};

const CategoryListCacheContext = createContext<Value | undefined>(undefined);

export const CategoryListCacheProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cache, setCache] = useState<CacheMap>({});

  const get = (key: string) => cache[key];

  const set = (key: string, state: CacheState) => {
    setCache((prev) => {
      const old = prev[key];
      // cheap identity checks — don't update if identical to avoid rerenders
      if (
        old &&
        old.page === state.page &&
        old.hasMore === state.hasMore &&
        old.categoryData.length === state.categoryData.length
      ) {
        return prev;
      }
      return { ...prev, [key]: state };
    });
  };

  const clear = (key?: string) => {
    setCache((prev) => {
      if (!key) return {};
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  return (
    <CategoryListCacheContext.Provider value={{ cache, get, set, clear }}>
      {children}
    </CategoryListCacheContext.Provider>
  );
};

export const useCategoryListCache = () => {
  const ctx = useContext(CategoryListCacheContext);
  if (!ctx)
    throw new Error("useCategoryListCache must be used inside provider");
  return ctx;
};
