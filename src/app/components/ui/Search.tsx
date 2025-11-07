"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownVisible(e.target.value.length > 0);
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Input */}
      <div className="flex justify-center items-center w-full relative">
        <input
          type="text"
          placeholder="Search for Flowers..."
          autoComplete="off"
          maxLength={50}
          value={searchTerm}
          onChange={handleChange}
          className="w-full px-4 py-2 text-[0.8rem] font-[400] leading-[1.5] text-primary placeholder:text-primary bg-soft-peach focus:bg-white rounded-full border-2 border-primary focus:outline-none focus:ring-0"
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

      {/* Dropdown */}
      {isDropdownVisible && (
        <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-md z-10">
          <div>
            <div className="bg-soft-secondary text-end uppercase text-[0.625rem] text-muted px-3 py-1 tracking-wide">
              Popular Suggestions
            </div>
            <ul className="py-2 text-[0.8rem]  space-y-2 px-4">
              <li className="cursor-pointer">Plant</li>
              <li className="cursor-pointer">Live Plant</li>
              <li className="cursor-pointer">Fresh Plants</li>
              <li className="cursor-pointer">Exotic Plants</li>
              <li className="cursor-pointer">Plants for Her</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
