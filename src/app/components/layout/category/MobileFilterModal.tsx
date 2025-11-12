"use client";

import React, { useEffect, useMemo, useState } from "react";
import BottomToUpModal from "@/app/components/ui/modal/BottomToUpModal";
import Checkbox from "@/app/components/common/fields/Checkbox";
import { useCategoryFilter } from "@/app/context/CategoryFilterContext";
import { FilterConfigItem } from "@/app/types/Category";
import SvgIcon from "@/app/components/ui/SvgIcon";

interface MobileFilterModalProps {
    filtersConfig: FilterConfigItem[];
}

type FilterValue = string[] | [number, number];

const MobileFilterModal: React.FC<MobileFilterModalProps> = ({ filtersConfig }) => {
    const [openModal, setOpenModal] = useState(false);
    const { setFiltterCategorySlug } = useCategoryFilter();

    // safe default tab
    const [openTab, setOpenTab] = useState<string>(filtersConfig[0]?.key ?? "");

    // memoized initial defaults so they don't recreate every render
    const initialFilters = useMemo(() => {
        const obj: Record<string, FilterValue> = {};
        filtersConfig.forEach((item) => {
            if (item.type === "checkbox") obj[item.key] = [];
            else if (item.type === "range" && item.range)
                obj[item.key] = [item.range.min, item.range.max];
        });
        return obj;
    }, [filtersConfig]);

    const [filters, setFilters] = useState<Record<string, FilterValue>>(initialFilters);

    // If filtersConfig changes, reset filters to the new defaults and ensure openTab exists
    useEffect(() => {
        setFilters(initialFilters);
        if (!filtersConfig.find((f) => f.key === openTab)) {
            setOpenTab(filtersConfig[0]?.key ?? "");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialFilters, filtersConfig]);

    const handleCheckboxChange = (key: string, value: string) => {
        setFilters((prev) => {
            // ensure we treat prev[key] as an array (fallback to [])
            const selected = Array.isArray(prev[key]) ? (prev[key] as string[]) : [];
            const updated = selected.includes(value)
                ? selected.filter((v) => v !== value)
                : [...selected, value];

            return { ...prev, [key]: updated };
        });
    };

    const handleRangeChange = (key: string, index: number, value: number) => {
        setFilters((prev) => {
            // find range defaults from config
            const cfg = filtersConfig.find((f) => f.key === key);
            const defaultRange: [number, number] =
                cfg && cfg.type === "range" && cfg.range ? [cfg.range.min, cfg.range.max] : [0, 0];

            // if prev[key] is present and is a two-number array, use it; otherwise fallback to defaultRange
            const prevRange = Array.isArray(prev[key]) && (prev[key] as any).length === 2
                ? (prev[key] as [number, number])
                : defaultRange;

            // copy to avoid mutating prev
            const range = [...prevRange] as [number, number];
            range[index] = value;

            // keep range from inverting
            if (range[0] > range[1]) {
                if (index === 0) range[0] = range[1];
                else range[1] = range[0];
            }

            return { ...prev, [key]: range };
        });
    };

    // when filters change, build query string and update context
    useEffect(() => {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            const config = filtersConfig.find((f) => f.key === key);
            if (!config) return;

            if (config.type === "range" && Array.isArray(value)) {
                const [min, max] = value;
                const defaultMin = config.range?.min ?? 0;
                const defaultMax = config.range?.max ?? 0;
                if (min !== defaultMin || max !== defaultMax) {
                    params.append("min_price", String(min));
                    params.append("max_price", String(max));
                }
            } else if (Array.isArray(value) && value.length > 0) {
                params.append('categories', value.join(","));
            }
        });

        setFiltterCategorySlug(params.toString());
    }, [filters, filtersConfig, setFiltterCategorySlug]);

    const clearAll = () => {
        setFilters(initialFilters);
        setOpenModal(false);
    };

    const applyFilters = () => {
        setOpenModal(false);
    };

    return (
        <>
            {/* Trigger Button */}
            <div onClick={() => setOpenModal(true)}
                 className={"bg-white flex items-center justify-center gap-2 text-primary border-primary border border-r-0 py-2"}>
                <SvgIcon
                    name={"filter.svg"}
                    width={25}
                    height={25}
                    fill={"currentColor"}
                    localImage={"filter.svg"}
                    className={"rotate-90"}
                />
                <div>
                    <p className={"text-md"}>Filter</p>
                    <div>
                        <p className={"font-light"}>
                            {Object.values(filters).filter(f => Array.isArray(f) && f.length > 0).length } Filters
                        </p>

                    </div>
                </div>
            </div>

            {/* Bottom Modal */}
            <BottomToUpModal isOpen={openModal} onClose={() => setOpenModal(false)}>
                <div className="flex flex-col h-[80vh] relative pb-16">
                    {/* Header */}
                    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-light">
                        <h3 className="text-lg font-semibold">Filter</h3>
                    </div>

                    <div className="flex flex-1 overflow-hidden">
                        {/* Left Tabs */}
                        <div className="w-[45%] border-r border-gray-light overflow-y-auto">
                            {filtersConfig.map((item) => (
                                <button
                                    key={item.key}
                                    onClick={() => setOpenTab(item.key)}
                                    className={`block w-full text-left pr-4 pl-2 py-3 font-medium border-l-4 transition-all ${
                                        openTab === item.key ? "border-primary  text-primary bg-soft-primary" : "border-transparent text-secondary"
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        {/* Right Content */}
                        <div className="flex-1 overflow-y-auto px-4 pt-3">
                            {filtersConfig.map(
                                (item, index) =>
                                    openTab === item.key && (
                                        <div key={item.key} className="space-y-4">
                                            {item.type === "checkbox" &&
                                                item.options?.map((option) => {
                                                    const checked = Array.isArray(filters[item.key])
                                                        ? (filters[item.key] as string[]).includes(String(option.id))
                                                        : false;
                                                    return (
                                                        <Checkbox
                                                            key={option.id}
                                                            id={`${item.key}-${option.id}-${index}`}
                                                            name={option.name}
                                                            label={`${option.name} (${option.productCount ?? 0})`}
                                                            checked={checked}
                                                            onChange={() => handleCheckboxChange(item.key, String(option.id))}
                                                            value={String(option.id)}
                                                            className="!h-4 !w-4"
                                                            labelClassName="text-xs"
                                                            type={"checkbox"}
                                                        />
                                                    );
                                                })}

                                            {item.type === "range" && item.range && (
                                                (() => {
                                                    const current = Array.isArray(filters[item.key]) && (filters[item.key]).length === 2
                                                        ? (filters[item.key] as [number, number])
                                                        : [item.range.min, item.range.max];
                                                    const [minVal, maxVal] = current;
                                                    const min = item.range.min;
                                                    const max = item.range.max;

                                                    const denom = max - min || 1;

                                                    return (
                                                        <div className="flex flex-col gap-4 max-w-[120px] mx-auto my-10">
                                                            <div className="relative h-1.5 border border-gray-light rounded-full mt-6">
                                                                <div
                                                                    className="absolute h-1.5 bg-primary rounded-full"
                                                                    style={{
                                                                        left: `${((minVal - min) / denom) * 100}%`,
                                                                        right: `${100 - ((maxVal - min) / denom) * 100}%`,
                                                                    }}
                                                                />

                                                                <div
                                                                    className="absolute -top-7 -translate-x-1/2"
                                                                    style={{
                                                                        left: `${((minVal - min) / denom) * 100}%`,
                                                                    }}
                                                                >
                                                                    <span className="px-2 py-0.5 bg-white">{minVal}</span>
                                                                </div>

                                                                <div
                                                                    className="absolute -top-7 -translate-x-1/2"
                                                                    style={{
                                                                        left: `${((maxVal - min) / denom) * 100}%`,
                                                                    }}
                                                                >
                                                                    <span className="px-2 py-0.5 bg-white">{maxVal}</span>
                                                                </div>

                                                                <input
                                                                    type="range"
                                                                    min={min}
                                                                    max={max}
                                                                    step={1}
                                                                    value={minVal}
                                                                    onChange={(e) => handleRangeChange(item.key, 0, Number(e.target.value))}
                                                                    className="absolute w-full top-[-6px] appearance-none bg-transparent range-thumb"
                                                                />
                                                                <input
                                                                    type="range"
                                                                    min={min}
                                                                    max={max}
                                                                    step={1}
                                                                    value={maxVal}
                                                                    onChange={(e) => handleRangeChange(item.key, 1, Number(e.target.value))}
                                                                    className="absolute w-full top-[-6px] appearance-none bg-transparent range-thumb"
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                })()
                                            )}
                                        </div>
                                    )
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="absolute bottom-0 left-0 w-full flex gap-3 px-4 pt-4 bg-white border-t border-gray-light">
                        <button
                            onClick={clearAll}
                            className="border border-primary text-primary font-semibold px-4 py-3 rounded-md w-1/2 text-sm bg-white"
                        >
                            Clear All
                        </button>
                        <button onClick={applyFilters} className="bg-primary text-white font-semibold px-4 py-2 rounded-md w-1/2 text-sm">
                            Show Results
                        </button>
                    </div>
                </div>
            </BottomToUpModal>
        </>
    );
};

export default MobileFilterModal;
