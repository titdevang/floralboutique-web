"use client";

import React, {useState, useRef, useEffect} from "react";
import Checkbox from "@/app/components/common/fields/Checkbox";
import {useCategoryFilter} from "@/app/context/CategoryFilterContext";
import {FilterConfigItem} from "@/app/types/Category";

type FilterValue = string[] | boolean | [number, number] | number | null;

interface SidebarFilterProps {
    filtersConfig: FilterConfigItem[];
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({
                                                         filtersConfig,
                                                     }) => {
    const initialFilters: Record<string, FilterValue> = {};
    filtersConfig.forEach((item) => {
        if (item.type === "checkbox") initialFilters[item.key] = [];
        else if (item.type === "range" && item.range)
            initialFilters[item.key] = [item.range.min, item.range.max];
    });

    const [filters, setFilters] = useState(initialFilters);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const {setFiltterCategorySlug} = useCategoryFilter();

    const toggleDropdown = (section: string) => {
        setOpenDropdown((prev) => (prev === section ? null : section));
    };

    const handleCheckboxChange = (key: string, value: string) => {
        setFilters((prev) => {
            const selected = prev[key] as string[];
            const updated = selected.includes(value)
                ? selected.filter((v) => v !== value)
                : [...selected, value];

            return {...prev, [key]: updated};
        });
    };

    const handleRangeChange = (key: string, index: number, value: number) => {
        setFilters((prev) => {
            const range = [...(prev[key] as [number, number])];
            range[index] = value;

            if (range[0] > range[1]) {
                if (index === 0) range[0] = range[1];
                else range[1] = range[0];
            }

            return {...prev, [key]: range as [number, number]};
        });
    };

    useEffect(() => {
        const params = new URLSearchParams();

        if (filters && Object.keys(filters).length > 0) {
            Object.entries(filters).forEach(([key, value]) => {
                if (key === "price" && Array.isArray(value) && value.length === 2) {
                    const rangeConfig = filtersConfig.find((f) => f.key === key)?.range;
                    const defaultMin = rangeConfig?.min ?? 0;
                    const defaultMax = rangeConfig?.max ?? 0;

                    if (value[0] !== defaultMin || value[1] !== defaultMax) {
                        params.append("min_price", value[0].toString());
                        params.append("max_price", value[1].toString());
                    }
                } else if (Array.isArray(value) && value.length > 0) {
                    params.append('categories', value.join(","));
                }
            });
        }

        setFiltterCategorySlug(params.toString());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, setFiltterCategorySlug]);

    const rangePrice = filtersConfig?.find((f) => f.key === "price") || null;

    return (
      <aside className="space-y-4 text-[15px] p-3 pt-2 border border-gray-light rounded text-gray-extra-dark">
        <div
          className={
            "flex justify-between items-center border-b border-neutral-100 py-2"
          }
        >
          <h4 className={"text-lg font-semibold"}>Filter</h4>
          {Object.values(filters).some(
            (value) =>
              (Array.isArray(value) && value.length > 0) ||
              (typeof value === "object" &&
                value !== null &&
                "0" in value &&
                "1" in value &&
                (value[0] !==
                  filtersConfig.find((f) => f.key === "price")?.range?.min ||
                  value[1] !==
                    filtersConfig.find((f) => f.key === "price")?.range?.max))
          ) && (
            <button
              type="button"
              onClick={() => {
                const clearedFilters: Record<string, FilterValue> = {};
                filtersConfig.forEach((item) => {
                  if (item.type === "checkbox") clearedFilters[item.key] = [];
                  else if (item.type === "range" && item.range)
                    clearedFilters[item.key] = [item.range.min, item.range.max];
                });
                setFilters(clearedFilters);
              }}
              className="text-primary text-xs"
            >
              Clear all
            </button>
          )}
        </div>
        {rangePrice && rangePrice?.type === "range" && rangePrice?.range && (
          <div className="flex flex-col gap-3 pb-4">
            <p
              className={
                "w-full lg:text-xs xl:text-sm font-semibold flex justify-between items-center hover:text-primary py-1 transition"
              }
            >
              Price{" "}
            </p>
            <div className="relative w-full flex flex-col px-4">
              <div className="relative h-1 border border-gray-light rounded-full mt-6">
                <div
                  className="absolute h-1 bg-primary rounded-full"
                  style={{
                    left: `${
                      (((filters[rangePrice.key] as [number, number])[0] -
                        rangePrice.range.min) /
                        (rangePrice.range.max - rangePrice.range.min)) *
                      100
                    }%`,
                    right: `${
                      100 -
                      (((filters[rangePrice.key] as [number, number])[1] -
                        rangePrice.range.min) /
                        (rangePrice.range.max - rangePrice.range.min)) *
                        100
                    }%`,
                  }}
                />

                <div
                  className="absolute -top-7 -translate-x-1/2 "
                  style={{
                    left: `${
                      (((filters[rangePrice.key] as [number, number])[0] -
                        rangePrice.range.min) /
                        (rangePrice.range.max - rangePrice.range.min)) *
                      100
                    }%`,
                  }}
                >
                  <span className=" px-2 py-0.5 bg-white lg:text-xs xl:text-sm">
                    {(filters[rangePrice.key] as [number, number])[0]}
                  </span>
                </div>

                <div
                  className="absolute -top-7 -translate-x-2/3 "
                  style={{
                    left: `${
                      (((filters[rangePrice.key] as [number, number])[1] -
                        rangePrice.range.min) /
                        (rangePrice.range.max - rangePrice.range.min)) *
                      100
                    }%`,
                  }}
                >
                  <span className=" px-2 py-0.5 bg-white lg:text-xs xl:text-sm">
                    {(filters[rangePrice.key] as [number, number])[1]}
                  </span>
                </div>

                <input
                  type="range"
                  min={rangePrice.range.min}
                  max={rangePrice.range.max}
                  step={1}
                  value={(filters[rangePrice.key] as [number, number])[0]}
                  onChange={(e) =>
                    handleRangeChange(rangePrice.key, 0, Number(e.target.value))
                  }
                  aria-label="Minimum price"
                  className="absolute w-full top-[-6px] appearance-none bg-transparent pointer-events-auto range-thumb "
                />
                <input
                  type="range"
                  min={rangePrice.range.min}
                  max={rangePrice.range.max}
                  step={1}
                  value={(filters[rangePrice.key] as [number, number])[1]}
                  onChange={(e) =>
                    handleRangeChange(rangePrice.key, 1, Number(e.target.value))
                  }
                  aria-label="Maximum price"
                  className="absolute  w-full top-[-6px] appearance-none bg-transparent pointer-events-auto range-thumb"
                />
              </div>
            </div>
          </div>
        )}
        {filtersConfig
          .filter((item) => item.type !== "range")
          .map((item) => (
            <DropdownSection
              key={item.key}
              title={item.label}
              isOpen={openDropdown === item.key}
              onToggle={() => toggleDropdown(item.key)}
            >
              <div className="flex flex-col gap-3">
                {/* Checkbox Filter */}
                {item.type === "checkbox" &&
                  item.options?.map((option, index) => (
                    <label key={index} className="w-fit">
                      <Checkbox
                        name={option.name}
                        label={
                          option.name + " (" + String(option.productCount) + ")"
                        }
                        checked={(filters[item.key] as string[]).includes(
                          option.id
                        )}
                        onChange={() =>
                          handleCheckboxChange(item.key, option.id)
                        }
                        value={option.id?.toString()}
                        className="!h-4 !w-4"
                        labelClassName={"text-sm"}
                      />
                    </label>
                  ))}
              </div>
            </DropdownSection>
          ))}
      </aside>
    );
};

interface DropdownSectionProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

const DropdownSection: React.FC<DropdownSectionProps> = ({
                                                             title,
                                                             isOpen,
                                                             onToggle,
                                                             children,
                                                         }) => {
    const contentEl = useRef<HTMLDivElement>(null);
    const height = isOpen ? contentEl.current?.scrollHeight : 0;

    return (
        <div>
            <button
                onClick={onToggle}
                className={`w-full lg:text-xs xl:text-sm font-semibold flex justify-between items-center hover:text-primary py-1 transition
          ${isOpen ? "text-primary" : ""}
        `}
            >
                {title}
                <span className="transition-transform duration-300">
          {isOpen ? "−" : "+"}
        </span>
            </button>

            <div
                ref={contentEl}
                style={{
                    maxHeight: height ? `${height}px` : "0px",
                    transition: "max-height 0.4s ease-in-out, opacity 0.4s ease-in-out",
                    opacity: isOpen ? 1 : 0,
                }}
                className="overflow-hidden"
            >
                <div className="pt-3 pl-3 bg-white space-y-1">{children}</div>
            </div>
        </div>
    );
};

export default SidebarFilter;
