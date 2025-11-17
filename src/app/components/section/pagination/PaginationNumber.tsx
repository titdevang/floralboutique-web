"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isPageInQuery?: boolean;
}

const PaginationNumber: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
  isPageInQuery = true,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;

      setCurrentPage(page);
      onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const maxVisible = isMobile ? 3 : 10;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const start = Math.max(2, currentPage - 2);
      const end = Math.min(totalPages - 1, currentPage + 2);

      pages.push(1);
      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {/* Previous button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="w-8 h-8 rounded-full border border-gray-light text-gray hover:bg-soft-success duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {/* Page buttons */}
      {getPageNumbers().map((page, idx) =>
        typeof page === "number" ? (
          <button
            key={idx}
            onClick={() => handlePageChange(page)}
            className={`w-8 h-8 rounded-full  duration-300 ${
              currentPage === page
                ? "bg-slate-400 text-white shadow"
                : "text-gray border border-gray-light hover:bg-soft-success"
            }`}
          >
            {page}
          </button>
        ) : (
          <span
            key={idx}
            className="w-8 h-8 flex items-center justify-center text-gray-light"
          >
            {page}
          </span>
        )
      )}

      {/* Next button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="w-8 h-8 rounded-full border border-gray-light text-gray hover:bg-soft-success duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    </div>
  );
};

export default PaginationNumber;
