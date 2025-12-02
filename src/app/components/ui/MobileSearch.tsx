"use client";

import { apiRequest } from "@/app/utils/apiRequest";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageWithFallback from "./fields/ImageWithFallback";
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

const MobileSearch = () => {
    const [searchBarOpen, setSearchBarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<SearchResult | null>(null);
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // 🔎 Fetch Search Data
    const fetchSearchData = async (value: string) => {
        if (!value.trim()) {
            setResults(null);
            return;
        }
        setLoading(true);
        try {
            const response = await apiRequest("POST", `/search`, { search: value });
            setResults((response?.data as { data: SearchResult })?.data);
        } catch (err) {
            console.log(err);
            setResults(null);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => fetchSearchData(value), 400);
    };

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node) &&
                backdropRef.current &&
                !backdropRef.current.contains(e.target as Node)
            ) {
                setSearchBarOpen(false);
            }
        };

        searchBarOpen
            ? document.addEventListener("mousedown", handleClickOutside)
            : document.removeEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [searchBarOpen]);

    // Highlight match
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

    // Render Section Block
    const renderSection = (title: string, items: any[], type: SearchItemType) => (
        <div>
            <div className="bg-soft-secondary-base text-xs uppercase text-dark px-3 py-2 font-medium tracking-wide">
                {title}
            </div>

            <ul className="py-2 text-sm space-y-1">
                {items.map((item, idx) => {
                    const key = typeof item === "string" ? item : item.id ?? idx;
                    const name = typeof item === "string" ? item : item.name ?? "";

                    const link =
                        type === "suggestion"
                            ? `/search?query=${encodeURIComponent(name)}`
                            : type === "product"
                                ? `/product/${item.slug}`
                                : type === "shop"
                                    ? `/shop/${item.slug}`
                                    : `/category/${item.slug}`;

                    return (
                        <li key={key}>
                            <Link
                                href={link}
                                onClick={() => setSearchBarOpen(false)}
                                className="px-4 py-1 block hover:bg-soft-primary hover:text-primary"
                            >
                                {type === "product" ? (
                                    <div className="flex items-center gap-3">
                                        <ImageWithFallback
                                            src={item.thumbnail_img || ""}
                                            width={45}
                                            height={45}
                                            alt={item.name}
                                        />
                                        <div>
                                            <p className="font-medium">{highlightText(item.name)}</p>
                                            <p className="text-xs text-primary">
                                                ₹{item.finalPrice ?? item.unitPrice}
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

    return (
        <div ref={wrapperRef}>
            <button onClick={() => setSearchBarOpen(!searchBarOpen)}>
                <Image src="/assets/svg/search.svg" width={20} height={20} alt="search" />
            </button>

            <div
                ref={backdropRef}
                onClick={() => setSearchBarOpen(false)}
                className={`
        fixed inset-0 
        bg-black/30 
        z-40 
        transition-all duration-300 
        ${searchBarOpen ? "opacity-100 backdrop-blur-[2px]" : "opacity-0 backdrop-blur-none pointer-events-none"}
    `}
            />


            {/* MOBILE SLIDE PANEL — UI NOT CHANGED */}
            <div
                className={`absolute top-[90px] right-0 w-full bg-white rounded-b-3xl shadow-md z-50 overflow-hidden transition-all duration-500 ${
                    searchBarOpen ? "max-h-[410px]" : "max-h-0"
                }`}
            >
                <div className="p-6 px-10 flex gap-4 items-center">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder="Search..."
                        className="w-full border-2 border-primary rounded-full px-3 py-2 text-sm focus:outline-none"
                    />
                    <Image src="/assets/svg/search.svg" width={24} height={24} alt="search" />
                </div>

                {/* SEARCH DROPDOWN RESULT (Same as Desktop) */}
                <div className="max-h-[400px] h-full overflow-y-auto">
                    {!results && searchTerm && <SearchDropdownSkeleton />}

                    {!!results && (
                        <div className={"h-full"}>
                            {!!results.suggestion?.length &&
                                renderSection("Suggestions", results.suggestion, "suggestion")}

                            {!!results.categories?.length &&
                                renderSection("Categories", results.categories, "category")}

                            {!!results.products?.length &&
                                renderSection("Products", results.products, "product")}

                            {!!results.shops?.length &&
                                renderSection("Shops", results.shops, "shop")}

                            {/* No Results */}
                            {!results.suggestion?.length &&
                                !results.categories?.length &&
                                !results.products?.length &&
                                !results.shops?.length && (
                                    <div className="text-center py-6">
                                        <SvgIcon
                                            name="empty-search.svg"
                                            width={50}
                                            height={50}
                                            className="mx-auto text-gray-light"
                                        />
                                        <p className="mt-2 text-gray">
                                            No results for{" "}
                                            <span className="font-medium text-dark">{searchTerm}</span>
                                        </p>
                                    </div>
                                )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MobileSearch;
