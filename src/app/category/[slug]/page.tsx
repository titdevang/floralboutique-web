// pages/.../CategoryPage.tsx (updated)
"use client";

import React, { use, useEffect, useMemo, useRef, useState } from "react";
import PageNotFound from "@/app/components/section/404";
import CategoryCard from "@/app/components/ui/card/CategoryCard";
import CategoryCardSkeleton from "@/app/components/ui/loader/CategoryCardSkeletion";
import { useAppContext } from "@/app/context/AppContext";
import { ApiResponse } from "@/app/types/ApiRequest";
import { Product } from "@/app/types/Product";
import { apiRequest } from "@/app/utils/apiRequest";
import { useCategoryFilter } from "@/app/context/CategoryFilterContext";
import { useInView } from "react-intersection-observer";
import { useCategoryListCache } from "@/app/context/CategoryListCacheContext";
import { makeCategoryCacheKey } from "@/app/utils/cacheKey";

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

const TTL_MS = 1000 * 60 * 5; // 5 minutes

const CategoryPage = ({ params }: CategoryPageProps) => {
  const { slug } = use(params);
  const { setPageNotFound, pageNotFound } = useAppContext();
  const { filtterCategorySlug } = useCategoryFilter();

  const {
    get: getCacheEntry,
    set: setCacheEntry,
    clear: clearCacheKey,
  } = useCategoryListCache();

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

  const cacheKey = useMemo(
    () => makeCategoryCacheKey(slug, debouncedFilter),
    [slug, debouncedFilter]
  );

  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchCategoryData = async (pageNum: number) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      const response = await apiRequest<{ data: ApiResponse }>(
        "GET",
        `/categories/${slug}/products?page=${pageNum}&${filtterCategorySlug}`
      );

      if (!isMounted.current) return;

      if (response?.status === 200 && Array.isArray(response.data.data)) {
        const newProducts = response.data.data as Product[];

        if (newProducts.length === 0) {
          setHasMore(false);
          return;
        }

        // compute merged outside of state updater
        setCategoryData((prev) => {
          const merged = [
            ...prev,
            ...newProducts.filter(
              (p) => !prev.some((item) => item.id === p.id)
            ),
          ];

          return merged;
        });

        const current = getCacheEntry(cacheKey)?.categoryData || [];
        const mergedFinal = [
          ...current,
          ...newProducts.filter(
            (p) => !current.some((item) => item.id === p.id)
          ),
        ];

        setCacheEntry(cacheKey, {
          categoryData: mergedFinal,
          page: pageNum,
          hasMore: newProducts.length > 0,
          lastUpdated: Date.now(),
        });
      } else if (response?.status === 404) {
        setPageNotFound(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setHasMore(false);
    } finally {
      if (!isMounted.current) return;
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // restore from cache or fetch page 1 (runs when slug or filter changes)
  useEffect(() => {
    if (!slug) return;
    setPageNotFound(false);

    const cached = getCacheEntry(cacheKey);

    const isFresh =
      cached && (TTL_MS === 0 || Date.now() - cached.lastUpdated < TTL_MS);

    if (isFresh) {
      setCategoryData(cached.categoryData || []);
      setPage(cached.page || 1);
      setHasMore(typeof cached.hasMore === "boolean" ? cached.hasMore : true);
      setLoading(false);
      return;
    }

    (async () => {
      if (cached) {
        // clear stale cache (safe inside effect)
        clearCacheKey(cacheKey);
      }
      setCategoryData([]);
      setPage(1);
      setHasMore(true);
      setLoading(true);

      await fetchCategoryData(1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, debouncedFilter, cacheKey]); // don't include entire cache

  // infinite scroll -> increment page
  useEffect(() => {
    if (inView && !loading && !loadingMore && hasMore) setPage((p) => p + 1);
  }, [inView, loading, loadingMore, hasMore]);

  // when page increases, fetch additional pages if not cached
  useEffect(() => {
    if (page <= 1 || !hasMore) return;

    const cached = getCacheEntry(cacheKey);
    const cachedPageCount = cached?.page || 0;

    if (cached && cachedPageCount >= page) {
      setCategoryData(cached.categoryData || []);
      setHasMore(cached.hasMore !== undefined ? cached.hasMore : true);
      setLoading(false);
      setLoadingMore(false);
      return;
    }

    fetchCategoryData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, hasMore]);

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

      {!loading && categoryData.length === 0 && (
        <p className="text-center py-10 text-muted">
          No products found in this category.
        </p>
      )}

      {!loading && categoryData.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:gap-2">
          {categoryData.map((product, i) => (
            <CategoryCard
              key={product.id || i}
              product={product}
              categoryName=""
            />
          ))}
        </div>
      )}

      {hasMore && <div ref={loadMoreRef} className="h-10 w-full" />}

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
