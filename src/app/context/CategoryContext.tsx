// context/CategoryContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../types/Product";

interface CategoryContextType {
    categoryData: Product[];
    setCategoryData: React.Dispatch<React.SetStateAction<Product[]>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    hasMore: boolean;
    setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loadingMore: boolean;
    setLoadingMore: React.Dispatch<React.SetStateAction<boolean>>;
    lastSlug: string;
    setLastSlug: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
    const [categoryData, setCategoryData] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [lastSlug, setLastSlug] = useState("");

    return (
        <CategoryContext.Provider
            value={{
                categoryData,
                setCategoryData,
                page,
                setPage,
                hasMore,
                setHasMore,
                loading,
                setLoading,
                loadingMore,
                setLoadingMore,
                lastSlug,
                setLastSlug,
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategoryContext = (): CategoryContextType => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategoryContext must be used within a CategoryProvider");
    }
    return context;
};
