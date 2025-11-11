"use client";

import { apiRequest } from "@/app/utils/apiRequest";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import ImageWithFallback from "./fields/ImageWithFallback";
import { useRouter } from "next/navigation";
import SvgIcon from "./SvgIcon";
import { Category } from "@/app/types/Category";
import { Product } from "@/app/types/Product";
import SearchDropdownSkeleton from "./loader/SearchDropdownSkeleton";

interface Shop {
  id: number;
  name: string;
  slug: string;
}

interface SearchResult {
  suggestion?: string[];
  categories?: Category[];
  products?: Product[];
  shops?: Shop[];
}

type SearchItemType = "suggestion" | "category" | "product" | "shop";

type SearchItem =
  | { type: "suggestion"; item: string }
  | { type: "category"; item: Category }
  | { type: "product"; item: Product }
  | { type: "shop"; item: Shop };

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const fetchSearchData = async (value: string) => {
    if (!value.trim()) {
      setResults(null);
      return;
    }
    setLoading(true);
    try {
      const response = await apiRequest("POST", `/search`, { search: value });
      setResults((response?.data as { data : SearchResult})?.data);
    } catch (error) {
      console.error("Search error:", error);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsDropdownVisible(value.length > 0);
    setHighlightIndex(-1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSearchData(value), 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") e.preventDefault();
    if (!results) return;

    const flatList: SearchItem[] = [];

    (results.suggestion || []).forEach((s) =>
      flatList.push({ type: "suggestion", item: s })
    );
    (results.categories || []).forEach((c) =>
      flatList.push({ type: "category", item: c })
    );
    (results.products || []).forEach((p) =>
      flatList.push({ type: "product", item: p })
    );
    (results.shops || []).forEach((s) =>
      flatList.push({ type: "shop", item: s })
    );

    if (!flatList.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % flatList.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev <= 0 ? flatList.length - 1 : prev - 1));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      const { type, item } = flatList[highlightIndex];
      setIsDropdownVisible(false);

      if (type === "suggestion") {
        setSearchTerm(item);
        router.push(`/search?query=${encodeURIComponent(item)}`);
      } else if (type === "product") {
        setSearchTerm(item.name);
        router.push(`/product/${item.slug}`);
      } else if (type === "category") {
        setSearchTerm(item.name);
        router.push(`/category/${item.slug}`);
      } else if (type === "shop") {
        setSearchTerm(item.name);
        router.push(`/shop/${item.slug}`);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const highlightText = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="text-primary font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const renderSection = <
    T extends { id?: number; name?: string; slug?: string }
  >(
    title: string,
    items: T[] | string[],
    type: SearchItemType,
    startIndex: number
  ) => (
    <div>
      <div className="bg-soft-secondary-base text-xs uppercase text-dark px-3 py-2 font-medium tracking-wide">
        {title}
      </div>
      <ul className="py-2 text-sm space-y-1">
        {items.map((item, idx) => {
          const globalIndex = startIndex + idx;
          const isActive = highlightIndex === globalIndex;

          const key = typeof item === "string" ? item : item.id ?? idx;
          const name = typeof item === "string" ? item : item.name ?? "";

          return (
            <li
              key={key}
              className={`cursor-pointer px-4 py-1 transition ${
                isActive
                  ? "bg-soft-primary text-primary"
                  : "hover:bg-soft-primary hover:text-primary"
              }`}
              onMouseEnter={() => setHighlightIndex(globalIndex)}
              onClick={() => setIsDropdownVisible(false)}
            >
              <Link
                href={
                  type === "suggestion"
                    ? `/search?query=${encodeURIComponent(name)}`
                    : type === "product"
                    ? `/product/${(item as unknown as Product).slug}`
                    : type === "shop"
                    ? `/shop/${(item as Shop).slug}`
                    : `/category/${(item as unknown as Category).slug}`
                }
              >
                {type === "product" ? (
                  <div className="flex items-center gap-3">
                    <ImageWithFallback
                      src={(item as unknown as Product).thumbnail_img || ''}
                      width={45}
                      height={45}
                      alt={(item as unknown as Product).name}
                      className="object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium line-clamp-1">
                        {highlightText((item as unknown as Product).name)}
                      </span>
                      <p className="text-primary text-xs">
                        ₹
                        {(item as unknown as Product).finalPrice ??
                          (item as unknown as Product).unitPrice}
                      </p>
                    </div>
                  </div>
                ) : (
                  <span>{highlightText(name)}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );

  let offset = 0;

  return (
    <div ref={wrapperRef} className="relative w-full mx-auto">
      <div className="flex justify-center items-center w-full max-w-xl relative">
        <input
          type="text"
          placeholder="Search for Flowers..."
          autoComplete="off"
          maxLength={50}
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full px-4 pr-9 py-2 text-[0.8rem] font-[400] leading-[1.5] text-primary placeholder:text-primary bg-soft-peach focus:bg-white rounded-full border-2 border-primary focus:outline-none focus:ring-0"
        />
        <span className="absolute right-0 mr-4">
          <Image
            src={"/assets/svg/search.svg"}
            width={20}
            height={20}
            alt="search"
          />
        </span>
      </div>

      <div
        className={`absolute w-[120%] text-gray-extra-dark max-h-[calc(100vh-100px)] overflow-y-auto top-full mt-2 bg-white shadow-xl rounded z-30 border border-gray-light transition-all duration-200 ${
          isDropdownVisible
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-2 invisible"
        }`}
      >
        {!results && <div><SearchDropdownSkeleton/></div>}
        {results && (
          <>
            {results.suggestion?.length
              ? renderSection(
                  "Suggestions",
                  results.suggestion,
                  "suggestion",
                  (offset = 0)
                )
              : null}
            {results.categories?.length
              ? renderSection(
                  "Categories",
                  results.categories as unknown as string[],
                  "category",
                  (offset += results.suggestion?.length || 0)
                )
              : null}
            {results.products?.length
              ? renderSection(
                  "Products",
                  results.products,
                  "product",
                  (offset += results.categories?.length || 0)
                )
              : null}
            {results.shops?.length
              ? renderSection(
                  "Shops",
                  results.shops,
                  "shop",
                  (offset += results.products?.length || 0)
                )
              : null}

            {!results.suggestion?.length &&
              !results.categories?.length &&
              !results.products?.length &&
              !results.shops?.length && (
                <div className="p-2 flex items-center justify-center flex-col text-gray">
                  <div className="py-4">
                    <SvgIcon
                      name="empty-search.svg"
                      width={50}
                      height={50}
                      localImage="empty-search.svg"
                      fill="currentColor"
                      className="text-gray-light"
                    />
                  </div>
                  No results found for{" "}
                  <span className="text-gray-extra-dark">“{searchTerm}”</span>
                </div>
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
