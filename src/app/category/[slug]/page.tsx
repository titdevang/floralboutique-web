"use client";

import React, { useEffect, useState, use } from "react";
import PageNotFound from "@/app/components/section/404";
import CategoryCard from "@/app/components/ui/card/CategoryCard";
import CategoryCardSkeleton from "@/app/components/ui/loader/CategoryCardSkeletion";
import { useAppContext } from "@/app/context/AppContext";
import { ApiResponse } from "@/app/types/ApiRequest";
import { Product } from "@/app/types/Product";
import { apiRequest } from "@/app/utils/apiRequest";
import { useCategoryFilter } from "@/app/context/CategoryFilterContext";
import { useInView } from "react-intersection-observer";

const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

const CategoryPage = ({ params }: CategoryPageProps) => {
    const { slug } = use(params);
    const { setPageNotFound, pageNotFound } = useAppContext();
    const { filtterCategorySlug } = useCategoryFilter();

    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [categoryData, setCategoryData] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const { ref: loadMoreRef, inView } = useInView({
        rootMargin: "300px",
        triggerOnce: false,
    });

    const debouncedFilter = useDebounce(filtterCategorySlug, 500);

    const fetchCategoryData = async (pageNum: number) => {
        try {
            if (pageNum === 1) setLoading(true);
            else setLoadingMore(true);

            const response = await apiRequest<{ data: ApiResponse }>(
                "GET",
                `/categories/${slug}/products?page=${pageNum}&${filtterCategorySlug}`
            );

            if (response?.status === 200 && Array.isArray(response.data.data)) {
                const newProducts = response.data.data as Product[];
                if (newProducts.length === 0) setHasMore(false);
                else
                    setCategoryData((prev) => [
                        ...prev,
                        ...newProducts.filter(
                            (p) => !prev.some((item) => item.id === p.id)
                        ),
                    ]);
            } else if (response?.status === 404) {
                setPageNotFound(true);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setHasMore(false);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        if (!slug) return;
        setCategoryData([]);
        setPage(1);
        setHasMore(true);
        setPageNotFound(false);
        fetchCategoryData(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug, debouncedFilter]);

    useEffect(() => {
        if (slug) window.scrollTo(0, 0);
    }, [slug]);

    useEffect(() => {
        if (inView && !loading && !loadingMore && hasMore) {
            setPage((prev) => prev + 1);
        }
    }, [inView]);

    useEffect(() => {
        if (page > 1 && hasMore) fetchCategoryData(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    if (pageNotFound) return <PageNotFound />;

    return (
        <div className="w-full py-3">
            {loading && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <CategoryCardSkeleton key={i} />
                    ))}
                </div>
            )}

            {/* Empty state */}
            {!loading && categoryData.length === 0 && (
                <p className="text-center py-10 text-muted">
                    No products found in this category.
                </p>
            )}

            {/* Product grid */}
            {!loading && categoryData.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:gap-2">
                    {categoryData.map((product, i) => (
                        <CategoryCard key={product.id || i} product={product} categoryName="" />
                    ))}
                </div>
            )}

            {/* Sentinel for infinite scroll */}
            {hasMore && <div ref={loadMoreRef} className="h-10 w-full" />}

            {/* Loading more skeletons */}
            {loadingMore && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <CategoryCardSkeleton key={i} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
