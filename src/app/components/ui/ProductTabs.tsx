"use client";
import { ProductProps } from "@/app/types/Product";
import React, { useState } from "react";

const ProductTabs: React.FC<ProductProps> = ({ product }) => {
  const tabs = [
    { id: "description", label: "Description", content: product.description },
    { id: "info", label: "Product Info", content: product.productInfo },
    { id: "more", label: "More Info", content: product.moreInfo },
  ];

  const [activeTab, setActiveTab] = useState("description");
  const [fade, setFade] = useState(true);
  const [nextTab, setNextTab] = useState<string | null>(null);

  const handleTabChange = (id: string) => {
    if (id === activeTab) return;
    setFade(false);
    setNextTab(id);
  };

  const onTransitionEnd = () => {
    if (!fade && nextTab) {
      setActiveTab(nextTab);
      setFade(true);
      setNextTab(null);
    }
  };

  return (
    <div className="mt-1 bg-white border border-gray shadow-sm w-full">
      {/* Tabs Header */}
      <div className="flex w-full " role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-6 py-3 text-sm font-semibold transition border-b-2 w-full ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent hover:text-primary"
            }`}
            role="tab"
            aria-selected={activeTab === tab.id}
            tabIndex={activeTab === tab.id ? 0 : -1}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        className={`p-6 leading-relaxed transition-opacity duration-100 product-details max-h-[350px] overflow-y-auto ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        onTransitionEnd={onTransitionEnd}
        dangerouslySetInnerHTML={{
          __html: tabs.find((t) => t.id === activeTab)?.content || "",
        }}
      />
    </div>
  );
};

export default ProductTabs;
