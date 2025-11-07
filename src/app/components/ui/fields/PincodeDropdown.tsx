import { useState, useRef, useEffect } from "react";

export default function PincodeDropdown() {
  const pincodes = ["560001", "560002", "560003", "560004"];
  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = pincodes.filter((p) =>
    p.toLowerCase().includes(search.toLowerCase())
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
        setSelected(choice);
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
      className="w-full mx-auto mt-6 border-[#dfdfe6] border rounded p-1 shadow-lg 
        animate-shadow-blink transition"
    >
      {/* Country & Pincode Selection */}
      <div className="flex gap-5">
        <div className="w-fit text-[14px] bg-[#d1d1d1] px-6 py-3">INDIA</div>
        <div className="relative w-full">
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            className="w-full border border-[#dfdfe6] px-4 py-3 rounded flex justify-between items-center focus:outline-none"
          >
            <span>{selected ? selected : "Select Pincode"}</span>
            <svg
              className={`ml-2 h-4 w-4 transform transition-transform duration-200 ${
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
                placeholder="Search Pincode"
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
                  filtered.map((pin, idx) => (
                    <li
                      key={pin}
                      data-index={idx}
                      onClick={() => {
                        setSelected(pin);
                        setIsOpen(false);
                        setSearch("");
                      }}
                      onMouseEnter={() => setHighlightIndex(idx)}
                      className={`px-3 py-2 cursor-pointer duration-500 ${
                        idx === highlightIndex
                          ? "bg-[#671945] text-white"
                          : selected === pin
                          ? "bg-[#671945] text-white"
                          : ""
                      }`}
                    >
                      {pin}
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
