"use client";
import React, { useState } from "react";
import DropdownMenu from "../../ui/DropdownMenu";
import {useCategoryFilter} from "@/app/context/CategoryFilterContext";

const SortFilterBar = () => {
  const [selectedSort, setSelectedSort] = useState("Newest");

  // const filters = ["Under 1000", "Under 2000", "Under 3000", "90 Min Delivery"];

  const { setFiltterCategorySlug } = useCategoryFilter()

  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      {/*<div className="flex flex-wrap items-center gap-2">*/}
      {/*  {filters.map((filter, index) => (*/}
      {/*    <button*/}
      {/*      key={index}*/}
      {/*      className="px-3 py-1.5 border border-gray-light rounded-full hover:bg-gray-light transition duration-500"*/}
      {/*    >*/}
      {/*      {filter}*/}
      {/*    </button>*/}
      {/*  ))}*/}
      {/*</div>*/}

      <div className="">
        <DropdownMenu
          items={[
            { name: "Newest", action: () => {
                    setFiltterCategorySlug("orderBy=new&order=DESC");
                    setSelectedSort('Newest');
                } },
            {
              name: "Price: Low to High",
              action: () => {
                  setFiltterCategorySlug("orderBy=price&order=ASC");
                  setSelectedSort('Price: Low to High');
              },
            },
            {
              name: "Price: High to Low",
              action: () => {
                  setFiltterCategorySlug("orderBy=price&order=DESC");
                  setSelectedSort('Price: High to Low');
              },
            },
          ]}
          trigger={
            <button className="flex min-w-[220px] hover:border-primary duration-500 items-center gap-1 text-sm border border-gray-light p-2 px-3 ">
              <span className="flex gap-1 font-light">
                <span>Sort by:</span>
                <span className="font-semibold">{selectedSort}</span>
              </span>
            </button>
          }
          align="right"
          selectedSort={selectedSort}
        />
      </div>
    </div>
  );
};

export default SortFilterBar;
