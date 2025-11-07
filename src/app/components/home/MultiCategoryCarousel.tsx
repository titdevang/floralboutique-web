"use client";

import { useEffect, useRef, useState } from "react";
import ProductCarousel from "../ui/slider/ProductCarousel";
import { apiRequest } from "@/app/utils/apiRequest";
import { Product } from "@/app/types/Product";
import ProductCardSkeleton from "../ui/loader/ProductCardSkeletion";
import {categoryMenu} from "@/app/types/HomeItem";
import {ApiResponse} from "@/app/types/ApiRequest";

const MultiCategoryCarousel: React.FC<{ categoryMenu: categoryMenu[] }> = ({ categoryMenu }) => {

  const [productsByCategory, setProductsByCategory] = useState<{
    [categoryName: string]: Product[];
  }>({});

  const [fetchedCategories, setFetchedCategories] = useState<Set<string>>(
    new Set()
  );

  const sectionRefs = useRef<{ [slug: string]: HTMLElement | null }>({});

  useEffect(() => {
    if (!categoryMenu?.length) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const categorySlug =
              entry.target.getAttribute("data-category-slug") || "";
            const categoryName =
              entry.target.getAttribute("data-category-name") || "";

            if (categorySlug && !fetchedCategories.has(categorySlug)) {
              try {
                const response = await apiRequest<ApiResponse>(
                  "GET",
                  `/categories/${categorySlug}/products`
                );
                if (response?.status === 200) {
                  setProductsByCategory((prev) => ({
                    ...prev,
                    [categoryName]: response.data?.data as Product[],
                  }));
                  setFetchedCategories((prev) =>
                    new Set(prev).add(categorySlug)
                  );
                }
              } catch (err) {
                console.error("Error loading category:", categoryName, err);
              }
            }
          }
        }
      },
      {
        root: null,
        rootMargin: "800px",
        // threshold: 0.1,
      }
    );

    categoryMenu.forEach((category) => {
      const el = sectionRefs.current[category.slug as string];
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [categoryMenu, fetchedCategories]);

  return (
    <div className="space-y-6">
      {categoryMenu.map((category) => (
        <div
          key={category.slug}
          ref={(el: HTMLDivElement | null) => {
            sectionRefs.current[category.slug as string] = el;
          }}
          data-category-slug={category.slug}
          data-category-name={category.name}
          className="min-h-[300px]"
        >
          <h2 className="heading-2 mb-2">{category.name}</h2>
          {productsByCategory[category.name] ? (
            <ProductCarousel
              products={productsByCategory[category.name]}
              categoryName={category.name}
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MultiCategoryCarousel;
