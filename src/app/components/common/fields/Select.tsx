import { useState, useRef, useEffect } from "react";

interface SelectProps {
  options: string[];
  selected: string;
  onChange: (selection: string) => void;
  placeholder?: string;
}

export default function Select({ options, selected, onChange, placeholder = "Select..." }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement | HTMLInputElement>
  ) => {
    if (!isOpen) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
        setHighlightIndex(0);
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
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

  // Auto-scroll highlighted item
  useEffect(() => {
    if (listRef.current && isOpen) {
      const highlighted = listRef.current.querySelector(
        `li[data-index="${highlightIndex}"]`
      );
      if (highlighted) {
        highlighted.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightIndex, isOpen]);

  return (
    <div
      ref={wrapperRef}
      className="w-full mx-auto mt-6"
    >
      <div className="flex gap-5">
        <div className="relative w-full">
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            className="peer w-full focus:border-primary border border-gray-light px-4 py-3 rounded-sm flex justify-between items-center focus:outline-none"
          >
            <span>{selected || placeholder}</span>
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
          {isOpen && (
            <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-50">
              {/* Search box */}
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setHighlightIndex(0);
                }}
                className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none"
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <ul
                ref={listRef}
                className="max-h-48 overflow-y-auto focus:outline-none"
              >
                {filtered.length === 0 ? (
                  <li className="px-3 py-2 text-gray-400">No results</li>
                ) : (
                  filtered.map((option, idx) => (
                    <li
                      key={option}
                      data-index={idx}
                      onClick={() => {
                        onChange(option);
                        setIsOpen(false);
                        setSearch("");
                      }}
                      onMouseEnter={() => setHighlightIndex(idx)}
                      className={`px-3 py-2 cursor-pointer duration-500 ${
                        idx === highlightIndex
                          ? "bg-[#671945] text-white"
                          : selected === option
                          ? "bg-[#671945] text-white"
                          : ""
                      }`}
                    >
                      {option}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}