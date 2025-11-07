"use client";
import React, {useState} from "react";
import {useCategoryFilter} from "@/app/context/CategoryFilterContext";
import SvgIcon from "@/app/components/ui/SvgIcon";
import BottomToUpModal from "@/app/components/ui/modal/BottomToUpModal";
import Checkbox from "@/app/components/common/fields/Checkbox";
import Radio from "@/app/components/common/fields/Radio";

const MobileSortFilter = () => {
    const [selectedSort, setSelectedSort] = useState("Newest");
    const [openSortModal, setOpenSortModal] = useState(false);

    const {setFiltterCategorySlug} = useCategoryFilter()

    const sortItems = [
        {

            name: "Recommended",
            action: () => {
                setFiltterCategorySlug("orderBy=recommend");
                setSelectedSort("Recommended");
            },
        },
        {
            name: "Newest",
            action: () => {
                setFiltterCategorySlug("orderBy=new&order=DESC");
                setSelectedSort("Newest");
            },
        },
        {
            name: "Price: Low to High",
            action: () => {
                setFiltterCategorySlug("orderBy=price&order=ASC");
                setSelectedSort("Price: Low to High");
            },
        },
        {
            name: "Price: High to Low",
            action: () => {
                setFiltterCategorySlug("orderBy=price&order=DESC");
                setSelectedSort("Price: High to Low");
            },
        },
    ];

    const handleSelect = (item: (typeof sortItems)[number]) => {
        item.action();
        setOpenSortModal(false);
    };

    return (
        <div className="">
            <div onClick={() => setOpenSortModal(true)}
                 className={"bg-white flex items-center justify-center gap-2 text-primary border-primary border border-r-0 py-2"}>
                <SvgIcon
                    name={"short.svg"}
                    width={25}
                    height={25}
                    fill={"currentColor"}
                    localImage={"short.svg"}
                    className={"rotate-90"}
                />
                <div>
                    <h4 className={"text-md"}>Short</h4>
                    <p className={"font-light"}>{selectedSort}</p>
                </div>
            </div>
            <BottomToUpModal isOpen={openSortModal} onClose={() => setOpenSortModal(false)}>
                <div className=" pb-6">
                    {/* Header */}
                    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-light mb-3">
                        <h3 className="text-xl font-semibold">Sort</h3>
                    </div>

                    {/* Sort Options */}
                    <div className="px-4 flex flex-col space-y-3">
                        {sortItems.map((option, index) => (
                            <Radio
                                key={index}
                                id={option.name.toLowerCase().replace(/\s+/g, "-") + "-" + index}
                                name="sort"
                                label={option.name}
                                checked={selectedSort === option.name}
                                onChange={() => handleSelect(option)}
                                className="!h-4 !w-4"
                                labelClassName="text-md"
                            />
                        ))}

                    </div>
                </div>
            </BottomToUpModal>
        </div>
    );
};

export default MobileSortFilter;
