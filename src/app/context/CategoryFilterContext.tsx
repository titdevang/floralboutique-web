"use client";

import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

interface CategoryFilterContextType {
    filtterCategorySlug: string;
    setFiltterCategorySlug: (slug: string) => void;
}

const CategoryFilterContext = createContext<
    CategoryFilterContextType | undefined
>(undefined);

export const CategoryFilterProvider = ({
                                           children,
                                       }: {
    children: ReactNode;
}) => {
    const [filtterCategorySlug, setFiltterCategorySlug] = useState<string>("")

    return (
        <CategoryFilterContext.Provider value={{filtterCategorySlug, setFiltterCategorySlug}}>
            {children}
        </CategoryFilterContext.Provider>
    );
};

export const useCategoryFilter = () => {
    const context = useContext(CategoryFilterContext);
    if (!context) {
        throw new Error(
            "CategoryFilter must be used within a CategoryFilterProvider"
        );
    }
    return context;
};
