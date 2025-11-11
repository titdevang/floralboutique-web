"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageNotFound from "@/app/components/section/404";
import CategoryCard from "@/app/components/ui/card/CategoryCard";
import CategoryCardSkeleton from "@/app/components/ui/loader/CategoryCardSkeletion";
import { apiRequest } from "@/app/utils/apiRequest";
import { Product } from "@/app/types/Product";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchSearchResults = async (pageNum: number) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      const res = await apiRequest<{ data: Product[] }>(
        "GET",
        `/categories/${encodeURIComponent(query)}/products?page=${pageNum}`
      );

      if (res?.status === 200 && Array.isArray(res.data.data)) {
        const newResults = res.data.data;
        if (newResults.length === 0) setHasMore(false);
        else {
          setResults((prev) => [
            ...prev,
            ...newResults.filter((p) => !prev.some((x) => x.id === p.id)),
          ]);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (!query) return;
    setResults([]);
    setPage(1);
    setHasMore(true);
    fetchSearchResults(1);
  }, [query]);

  useEffect(() => {
    if (page > 1 && hasMore) fetchSearchResults(page);
  }, [page]);

  if (!query) return <PageNotFound />;

  return (
    <div className="w-full py-3">
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && results.length === 0 && (
        <p className="text-center py-10 text-muted">
          No products found for “{query}”.
        </p>
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {results.map((product) => (
            <CategoryCard key={product.id} product={product} categoryName="" />
          ))}
        </div>
      )}

      {loadingMore && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={<div className="p-5 text-center">Loading search...</div>}
    >
      <SearchPageContent />
    </Suspense>
  );
}
