"use client";

import { useState, useRef, useEffect } from "react";

export type Option = string | number | { label: string; value: string | number };

interface SelectProps {
  options: Option[];
  selected?: Option;
  onChange: (selection: Option) => void;
  placeholder?: string;
  dropdownClassName?: string;
}

export default function Select({
  options,
  selected,
  onChange,
  placeholder = "Select...",
  dropdownClassName,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [dropdownWidth, setDropdownWidth] = useState<number | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const normalize = (opt: Option) =>
    typeof opt === "object"
      ? { label: opt.label, value: opt.value }
      : { label: String(opt), value: opt };

  const normalizedOptions = options.map(normalize);
  const filtered = normalizedOptions.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedValue = selected ? normalize(selected).value : undefined;
  const selectedLabel = selected ? normalize(selected).label : "";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownWidth(rect.width);
    }
  }, [isOpen]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement | HTMLInputElement>
  ) => {
    if (!isOpen) {
      if (["ArrowDown", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        setIsOpen(true);
        setHighlightIndex(0);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const choice = filtered[highlightIndex];
      if (choice) {
        onChange(choice);
        setIsOpen(false);
        setSearch("");
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (listRef.current && isOpen) {
      const el = listRef.current.querySelector(
        `li[data-index="${highlightIndex}"]`
      );
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIndex, isOpen]);

  return (
    <div ref={wrapperRef} className="w-full mx-auto">
      <div className="flex gap-5">
        <div className="relative w-full">
          {/* Button */}
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            className="peer w-full focus:border-primary border border-gray-light px-4 py-3 rounded-sm flex justify-between items-center focus:outline-none"
          >
            <span>{selectedLabel || placeholder}</span>
            <svg
              className={`ml-2 h-4 w-4 transform transition-transform text-gray duration-200 peer-focus:text-primary ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown */}
          {
            <div
              style={{ width: dropdownWidth ?? "auto" }}
              className={`${dropdownClassName} mt-1 fixed bg-white z-50 mb-4 overflow-hidden transition-[opacity] duration-500 ease-in-out ${
                isOpen
                  ? "h-fit opacity-100 border border-gray-light shadow-lg"
                  : "h-0 opacity-0"
              }`}
            >
              {/* Search box */}
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setHighlightIndex(0);
                }}
                className="w-full px-3 py-2 border-b border-gray-light focus:outline-none"
                onKeyDown={handleKeyDown}
              />

              {/* List */}
              <ul
                ref={listRef}
                className="max-h-48 overflow-y-auto focus:outline-none"
              >
                {filtered.length === 0 ? (
                  <li className="px-3 py-2 text-gray-400">No results</li>
                ) : (
                  filtered.map((opt, idx) => (
                    <li
                      key={opt.value}
                      data-index={idx}
                      onClick={() => {
                        onChange(opt);
                        setIsOpen(false);
                        setSearch("");
                      }}
                      onMouseEnter={() => setHighlightIndex(idx)}
                      className={`px-3 py-2 cursor-pointer duration-500 ${
                        idx === highlightIndex
                          ? "bg-[#671945] text-white"
                          : selectedValue === opt.value
                          ? "bg-[#671945] text-white"
                          : ""
                      }`}
                    >
                      {opt.label}
                    </li>
                  ))
                )}
              </ul>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
