"use client";
import SidebarFilter from "@/app/components/layout/category/SidebarFilter";
import SortFilterBar from "@/app/components/layout/category/SortFilterBar";
import Breadcrumb from "@/app/components/ui/breadcrumb/Breadcrumb";
import {apiRequest} from "@/app/utils/apiRequest";
import {ApiResponse} from "@/app/types/ApiRequest";
import {use, useEffect, useState} from "react";
import SidebarFilterSkeleton from "@/app/components/ui/loader/SidebarFilterSkeleton";
import ImageWithFallback from "@/app/components/ui/fields/ImageWithFallback";
import {FilterConfigItem} from "@/app/types/Category";
import MobileSortFilter from "@/app/components/layout/category/MobileSortFilter";
import MobileFilterModal from "@/app/components/layout/category/MobileFilterModal";
import SmoothAccordion from "@/app/components/section/accordion/SmoothAccordion";
import {accordionItem} from "@/app/types/Types";
import {CategoryProvider} from "@/app/context/CategoryContext";
import {CategoryListCacheProvider} from "@/app/context/CategoryListCacheContext";

export default function Layout({
                                   children,
                                   params,
                               }: Readonly<{
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}>) {
    const {slug} = use(params);
    const [categoryName, setCategoryName] = useState("");
    const [filterConfig, setFilterConfig] = useState<FilterConfigItem[]>([]);
    const [metaDescription, setMetaDescription] = useState<string>("")
    const [catDescription, setCatDescription] = useState<string>("")
    const [faqs, setFaqs] = useState<accordionItem[]>([])

    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                const response = await apiRequest<ApiResponse>("GET", `/category/${slug}/filters`);

                if (response?.status === 200) {
                    const data = response.data;

                    setCategoryName(data.name || "Filters");
                    setMetaDescription(data.metaDescription || "")
                    setCatDescription(data.catDescription || "")
                    setFaqs(data.faqs || [])
                    const groupedFilters: FilterConfigItem[] = data.subCategory.map((group) => ({
                        key: group.slug,
                        label: group.name,
                        type: "checkbox",
                        options: group.subCategory || [],
                    }));

                    groupedFilters.push(
                        {
                            key: "price",
                            label: "Price Range",
                            type: "range",
                            range: {min: data.minPrice || 0, max: data.maxPrice || 10000},
                        },
                    );

                    setFilterConfig(groupedFilters);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        if (slug) fetchFilterData();
    }, [slug]);

    return (
        <CategoryListCacheProvider>
            <div>
                <ImageWithFallback
                    src={"https://floralboutique.in/uploads/all/IAhKAFq9j2vtIdh0CHsEv2cbbspBppp6hURO7RnI.png"}
                    alt={"Floral Background"}
                    className={"w-full h-64 relative object-cover"}
                    width={1920}
                    height={200}
                />
                <div className={"container py-4"}>
                    <h4 className={"heading-2 !text-[22px]"}>{categoryName}</h4>
                    <p className={" text-primary  !text-[14px] font-light"} dangerouslySetInnerHTML={{__html: catDescription}}/>
                </div>
            </div>
            <div className={"container pb-10"}>
                <div className="flex flex-row gap-6">
                    <div
                        className="lg:block hidden w-[28%] sticky top-10 h-full max-h-[calc(100vh-5rem)] overflow-y-auto">
                        {filterConfig.length > 0 ? (
                            <div className=" h-full ">
                                <SidebarFilter
                                    filtersConfig={filterConfig}
                                />
                            </div>
                        ) : (
                            <div className={"w-full"}>
                                <SidebarFilterSkeleton/>
                            </div>
                        )}
                    </div>

                    <div className="w-full scroll-auto">
                        <div className={"lg:flex lg:items-center lg:justify-between lg:w-full hidden border-b border-gray-light pb-3"}>
                            <h3 className={"text-xl font-semibold"}>{categoryName}</h3>
                            <SortFilterBar/>
                        </div>
                        <main className="flex-1">{children}</main>
                    </div>
                </div>
                <div className={"container mt-10 space-y-10"}>

                    <div>
                        {categoryName ? <Breadcrumb pathname={categoryName}/> :
                            <div className={"h-5 bg-gray rounded animate-pulse w-[150px] mb-5"}/>}
                        <p className={" text-primary  !text-[15px]"}
                           dangerouslySetInnerHTML={{__html: metaDescription}}/>
                    </div>

                    <div className={"space-y-2"}>
                        <div>
                            <h2 className={"text-primary !text-[25px]"}>FAQ</h2>
                        </div>
                        <SmoothAccordion items={faqs} cardClasses={"border border-primary rounded-2xl md:max-w-[50%]"} titleClasses={"!font-[500] text-primary text-sm"} contentClasses={"font-light"}/>
                    </div>
                </div>
            </div>

            {/*    ----------------Mobile category filter----------------*/}
            <div className={"lg:hidden block"}>
                <div className={"fixed flex items-center w-full z-10 bottom-0"}>
                    <div className={"w-full"}>
                        <MobileSortFilter/>
                    </div>
                    <div className={"w-full"}>
                        {/*<MobileSortFilter/>*/}
                        <MobileFilterModal filtersConfig={filterConfig}/>
                    </div>

                </div>
            </div>
        </CategoryListCacheProvider>
    );
}
