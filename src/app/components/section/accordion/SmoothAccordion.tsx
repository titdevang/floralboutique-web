// components/SmoothAccordion.tsx
"use client";

import {useState, useRef} from "react";
import {accordionItem} from "@/app/types/Types";

interface SmoothAccordionProps {
    items: accordionItem[];
    cardClasses?: string;
    titleClasses?: string;
    contentClasses?: string;
}

export default function SmoothAccordion({items, cardClasses, titleClasses, contentClasses}: SmoothAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full mx-auto divide-y divide-gray-light">
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                const contentEl = contentRefs.current[index];
                const height = isOpen ? contentEl?.scrollHeight || 0 : 0;

                return (
                    <div key={index} className={`${cardClasses}`}>
                        {/* Header */}
                        <button
                            onClick={() => toggle(index)}
                            className={`flex hover:text-primary duration-500 justify-between w-full px-5 py-4 text-left font-semibold hover:bg-gray-50 transition-colors
                            ${isOpen ? "text-primary" : ""} ${titleClasses}
                            `}
                        >
                            {item.title}
                            <span
                                className={`transform transition-transform duration-300 `}
                            >
                                <svg
                                    className={`ml-2 h-4 w-4 transform transition-transform duration-300 ${
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

                            </span>
                        </button>

                        {/* Smooth Content */}
                        <div
                            ref={(el) => {
                                contentRefs.current[index] = el
                            }}
                            style={{
                                maxHeight: `${height}px`,
                                transition: "max-height 0.4s ease, opacity 0.4s ease",
                                opacity: isOpen ? 1 : 0,
                                overflow: "hidden",
                            }}
                        >
                            <div className={`px-5 pb-4 ${contentClasses}`} dangerouslySetInnerHTML={{__html: item.content}}/>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}