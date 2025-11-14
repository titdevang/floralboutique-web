// lib/categoryCacheSingleton.ts
import { Product } from "@/app/types/Product";

type CacheState = {
  categoryData: Product[];
  page: number;
  hasMore: boolean;
  lastUpdated: number;
};

const store: Record<string, CacheState> = {};

export const getCache = (key: string) => store[key];
export const setCache = (key: string, value: CacheState) => {
  store[key] = value;
};
export const deleteCache = (key: string) => {
  delete store[key];
};
export const keys = () => Object.keys(store);
