"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

const MobileSearch = () => {
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);;

  // Close search bar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !(wrapperRef.current).contains(event.target as Node)
      ) {
        setSearchBarOpen(false);
      }
    };

    if (searchBarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBarOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setSearchBarOpen(!searchBarOpen)}
        aria-label="Toggle search bar"
      >
        <Image
          src={"/assets/svg/search.svg"}
          width={20}
          height={20}
          alt="search"
        />
      </button>

      <form
        onSubmit={handleSubmit}
        className={`absolute top-[90px] right-0 z-50 bg-white rounded-b-3xl shadow-md w-full overflow-hidden transition-all duration-500 ease-in-out ${
          searchBarOpen ? "max-h-[300px]" : "max-h-0"
        }`}
      >
        <div className="p-6 px-10 flex gap-4 items-center">
          <input
            name="search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full border-2 border-primary rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-0"
          />
          <button
            type="submit"
            className=" rounded-full transition-colors text-white text-sm"
            aria-label="Submit search"
          >
            <Image
              src="/assets/svg/search.svg"
              alt="Submit search"
              width={24}
              height={24}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MobileSearch;
